package api

import (
	"context"
	"net/http"
	"yraid/db"
	"yraid/middleware"

	"github.com/gin-gonic/gin"
)

func (api *Api) RegisterTasks(e *gin.RouterGroup) {
	r := e.Group("/tasks")
	r.Use(middleware.JWT())
	{
		r.POST("/", api.ListTask)
		r.POST("/add", api.AddTask)
		r.POST("/update", api.ModTask)
		r.POST("/del", api.DelTask)
		r.GET("/countbyday", api.ListTaskCount)
	}
}

func (api *Api) ListTask(c *gin.Context) {
	var t db.Task
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	t.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	list, err := api.db.ListTask(ctx, &t)
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
		"data":    list,
	})
}

func (api *Api) AddTask(c *gin.Context) {
	var t db.Task
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	t.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	n, err := api.db.AddTask(ctx, &t)
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
		"data":    n,
	})
}

func (api *Api) ModTask(c *gin.Context) {
	var t db.Task
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	t.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	n, err := api.db.ModTask(ctx, &t)
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
		"data":    n,
	})
}

func (api *Api) DelTask(c *gin.Context) {
	var t db.Task
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     err.Error(),
		})
		return
	}

	t.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	err := api.db.DelTask(ctx, t.ID, t.Uid)
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
	})
}

func (api *Api) ListTaskCount(c *gin.Context) {
	begin := c.Query("begin")
	end := c.Query("end")

	if len(begin) == 0 || len(end) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"msg":     "begin and end are required",
		})
		return
	}

	uid := int32(c.GetInt("uid"))
	ctx := context.Background()
	list, err := api.db.ListTaskCount(ctx, uid, begin, end)
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
		"data":    list,
	})
}
