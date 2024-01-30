package core

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

//go:embed public
var ui embed.FS

//go:embed public/index.html
var index string

func getFileSystem(root string) http.FileSystem {
	// 子文件系统，root由path参数指定
	fs, err := fs.Sub(ui, root)
	if err != nil {
		panic(err)
	}

	return http.FS(fs)
}

func embedFrontend() gin.HandlerFunc {
	uifs := getFileSystem("public")
	fileserver := http.FileServer(uifs)

	return func(c *gin.Context) {
		path := c.Request.URL.Path
		fmt.Println(path)

		// server
		if strings.HasPrefix(path, "/api") {
			return
		}

		// ui相关
		_, err := uifs.Open(path)
		if err == nil {
			// 静态资源文件
			fileserver.ServeHTTP(c.Writer, c.Request)
			return
		} else {
			fmt.Println(err)
		}

		// SPA入口文件
		file, err := uifs.Open("index.html")
		if err != nil {
			// 不存在视为异常
			fmt.Println(err)
			return
		}

		http.ServeContent(c.Writer, c.Request, "index.html", time.Now(), file)
	}
}
