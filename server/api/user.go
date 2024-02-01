package api

import (
	"context"
	"net/http"
	"time"
	"yraid/db"
	"yraid/middleware"

	"yraid/util"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (api *Api) RegisterAuth(e *gin.RouterGroup) {
	r := e.Group("/auth")
	{
		r.POST("/signin", api.Signin)
		r.POST("/signup", api.Signup)
	}

	u := e.Group("/user")
	u.Use(middleware.JWT())
	{
		u.POST("/")
	}
}

// 注册
func (api *Api) Signup(c *gin.Context) {
	var u db.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "username and password are required.",
		})
		return
	}

	// 密码加密
	pwdhash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}
	u.Password = string(pwdhash)
	u.Role = "USER" // 默认：普通用户

	ctx := context.Background()
	size, err := api.db.UserCount(ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}
	if 0 == size {
		u.Role = "ADMIN" // 第一个用户为管理员
	}

	// 写入用户信息
	uinfo, err := api.db.AddUser(ctx, &u)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	// 生成token
	exp := time.Now().Add(util.TokenExpire)
	token, err := util.GenerateAccessToken(uinfo.Username, uinfo.ID, exp, []byte(util.Secret))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		api.db.DelUser(ctx, uinfo.ID)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "OK",
		"token":   token,
	})
}

// 登录
func (api *Api) Signin(c *gin.Context) {
	var u db.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	ctx := context.Background()
	// 查询用户信息
	list, err := api.db.GetUser(ctx, &u)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}
	if len(list) != 1 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Cannot find user",
		})
		return
	}

	user := list[0]

	// 密码校验
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Password))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	// token生成
	exp := time.Now().Add(util.TokenExpire)
	token, err := util.GenerateAccessToken(user.Username, user.ID, exp, []byte(util.Secret))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "OK",
		"token":   token,
	})
}

// 用户信息(需要鉴权)
func (api *Api) GetUser(c *gin.Context) {
	var u db.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	ctx := context.Background()
	// 查询用户信息
	list, err := api.db.GetUser(ctx, &u)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}
	if len(list) != 1 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Cannot find user",
		})
		return
	}
	user := list[0]
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "OK",
		"data":    user,
	})
}
