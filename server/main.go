package main

import (
    "flag"
    "fmt"
    "os"
	"net/http"
    "yraid/middleware"


    "github.com/gin-gonic/gin"
)

func Welcome(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "msg":     "OK",
        "data":    "https://jovan.vip.cpolar.cn/docsify/#/webservice/README",
    })
}

func main() {
    BASEPATH := os.Getenv("BASEPATH")

    port := flag.String("port", "1625", "server port")
    flag.Parse()

    e := gin.Default()
    e.Use(middleware.CORS())
    r := e.Group(BASEPATH)
    {
        r.GET("/", Welcome)
    }


    fmt.Println("Welcome to yraid")

    e.Run(":" + *port)
}
