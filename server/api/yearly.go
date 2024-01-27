package api

import (
	"context"
	"net/http"
	"yraid/db"
	"yraid/middleware"

	"github.com/gin-gonic/gin"
)

func (api *Api) RegisterYearly(g *gin.RouterGroup) {
	r := g.Group("/yearly")
	r.Use(middleware.JWT())
	{
		r.POST("/", api.GetYearly)
		r.POST("/update", api.UpsertYearly)
	}
}

func (api *Api) GetYearly(c *gin.Context) {
	var m db.Yearly
	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	m.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	list, err := api.db.GetYearly(ctx, &m)
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

func (api *Api) UpsertYearly(c *gin.Context) {
	var m db.Yearly
	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"msg":     "Bad Request",
		})
		return
	}

	m.Uid = int32(c.GetInt("uid"))
	ctx := context.Background()
	data, err := api.db.UpsertYearly(ctx, &m)
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
