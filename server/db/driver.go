package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "modernc.org/sqlite"
)

type DBDriver struct {
	db *sql.DB
}

func NewDriver() (*DBDriver, error) {
	const dbpath = "/var/lib/yraid/"
	const dbfile = dbpath + "core.db"
	_, err := os.Stat(dbfile)
	if os.IsNotExist(err) {
		fmt.Println("db file is not exist, creating now.")
		os.MkdirAll(dbpath, os.ModePerm)
		if _, err := os.Create(dbfile); err != nil {
			fmt.Printf("create db file failed, error: %s\n", err.Error())
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
	schema, err := os.ReadFile("./db/SCHEMA.sql")
	if err != nil {
		return err
	}
	stmt := string(schema)

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
