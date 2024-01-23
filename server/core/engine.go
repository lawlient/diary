package core

import (
	"context"
	"fmt"
	"yraid/api"
	"yraid/db"

	"github.com/gin-gonic/gin"
)

type Engine struct {
	En  *gin.Engine
	Api *api.Api
	Db  *db.DBDriver
}

func NewEngine() (*Engine, error) {
	var e Engine
	e.En = gin.Default()

	driver, err := db.NewDriver()
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return nil, err
	}
	e.Db = driver
	if err := e.Db.InitSchema(context.Background()); err != nil {
		return nil, err
	}

	var api api.Api
	api.Register(e.En, driver)
	e.Api = &api

	return &e, nil
}
