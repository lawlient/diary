package api

import (
	"context"
	"net/http"
	"yraid/db"
	"yraid/middleware"

	"github.com/gin-gonic/gin"
)

func (api *Api) RegisterDaily(g *gin.RouterGroup) {
	r := g.Group("/daily")
	r.Use(middleware.JWT())
	{
		r.POST("/", api.GetDaily)
		r.POST("/update", api.UpsertDaily)
	}
}

func (api *Api) GetDaily(c *gin.Context) {
	var d db.Daily
	if err := c.ShouldBindJSON(&d); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	d.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	list, err := api.db.GetDaily(ctx, &d)
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

func (api *Api) UpsertDaily(c *gin.Context) {
	var d db.Daily
	if err := c.ShouldBindJSON(&d); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	d.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	data, err := api.db.UpsertDaily(ctx, &d)
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
		"data":    data,
	})
}
