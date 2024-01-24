package api

import (
	"context"
	"net/http"
	"yraid/db"
	"yraid/middleware"

	"github.com/gin-gonic/gin"
)

func (api *Api) RegisterMonthly(g *gin.RouterGroup) {
	r := g.Group("/monthly")
	r.Use(middleware.JWT())
	{
		r.POST("/", api.GetMonthly)
		r.POST("/update", api.UpsertMonthly)
	}
}

func (api *Api) GetMonthly(c *gin.Context) {
	var m db.Monthly
	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	m.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	list, err := api.db.GetMonthly(ctx, &m)
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

func (api *Api) UpsertMonthly(c *gin.Context) {
	var m db.Monthly
	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	m.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	data, err := api.db.UpsertMonthly(ctx, &m)
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
