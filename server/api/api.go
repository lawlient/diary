package api

import (
	"net/http"
	"yraid/db"
	"yraid/middleware"

	"github.com/gin-gonic/gin"
)

type Api struct {
	e  *gin.Engine
	db *db.DBDriver
}

func (api *Api) Register(e *gin.Engine, db *db.DBDriver) {
	api.db = db
	api.e = e
	api.e.Use(middleware.CORS())
	r := api.e.Group("/api")
	{
		r.GET("/", Welcome)
	}
	api.RegisterAuth(r)
	api.RegisterDaily(r)
	api.RegisterMonthly(r)
	api.RegisterYearly(r)
	api.RegisterTasks(r)
}

func Welcome(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "OK",
		"data":    "https://jovan.vip.cpolar.cn/docsify/#/webservice/README",
	})
}
