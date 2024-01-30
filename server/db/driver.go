package db

import (
	"context"
	"database/sql"
	"embed"
	"fmt"
	"os"

	_ "modernc.org/sqlite"
)

//go:embed SCHEMA.sql
var stmt string

// variable is no use
// if there is no 'embed' keyword, then import "embed" will be discard by saving auto format
//
//go:embed SCHEMA.sql
var schema embed.FS

type DBDriver struct {
	db *sql.DB
}

func NewDriver() (*DBDriver, error) {
	const dbpath = ".data/"
	const dbfile = dbpath + "core.db"
	_, err := os.Stat(dbfile)
	if os.IsNotExist(err) {
		fmt.Println("First time running, db file is not exist. Creating now.")
		os.MkdirAll(dbpath, os.ModePerm)
		if _, err := os.Create(dbfile); err != nil {
			fmt.Printf("Create db file failed, error: %s\n", err.Error())
			return nil, err
		}
	}
	var d DBDriver
	conn, err := sql.Open("sqlite", dbfile)
	if err != nil {
		return nil, err
	}
	d.db = conn
	return &d, nil
}

func (d *DBDriver) InitSchema(ctx context.Context) error {
	tx, err := d.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err := tx.ExecContext(ctx, stmt); err != nil {
		return err
	}

	return tx.Commit()
}
