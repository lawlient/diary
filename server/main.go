package main

import (
	"flag"
	"fmt"

	"yraid/core"
)

func main() {
	port := flag.String("port", "1625", "server port")
	flag.Parse()

	engine, err := core.NewEngine()
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return
	}

	fmt.Println("Welcome to yraid")

	engine.En.Run(":" + *port)
}
