package middleware

import (
	"net/http"
	"yraid/util"

	"github.com/gin-gonic/gin"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		reqToken := c.Request.Header.Get("Authorization")
		uid, err := util.GetUidFromAccessToken(reqToken, util.Secret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"msg":     "Permission Denied",
			})
			c.Abort()
			return
		}

		c.Set("uid", uid)
		c.Next()
	}
}
