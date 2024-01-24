package db

import (
	"context"
	"fmt"
	"strings"
	"time"
)

type Daily struct {
	Uid     int32  `json:"uid"`
	Day     string `json:"day"`
	Content string `json:"content"`
	Cts     int64  `json:"create_time"`
	Uts     int64  `json:"update_time"`
}

func (db *DBDriver) GetDaily(ctx context.Context, d *Daily) ([]*Daily, error) {
	where := []string{"1=1"}
	args := []any{}

	if d.Uid != 0 {
		where, args = append(where, "uid = ?"), append(args, d.Uid)
	}
	if d.Day != "" {
		where, args = append(where, "day = ?"), append(args, d.Day)
	}

	sql := `
		select uid, day, content, create_time, update_time
		from daily where ` + strings.Join(where, " and ") + `
		order by create_time desc
	`

	rows, err := db.db.QueryContext(ctx, sql, args...)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	list := make([]*Daily, 0)
	for rows.Next() {
		var daily Daily
		if err := rows.Scan(
			&daily.Uid,
			&daily.Day,
			&daily.Content,
			&daily.Cts,
			&daily.Uts,
		); err != nil {
			fmt.Println(err)
			return nil, err
		}

		list = append(list, &daily)
	}

	return list, nil
}

func (db *DBDriver) UpsertDaily(ctx context.Context, d *Daily) (*Daily, error) {
	ifields := []string{"uid", "day", "content"}
	placeholder := []string{"?", "?", "?"}
	ufields := []string{"content = ?", "update_time = ?"}
	args := []any{d.Uid, d.Day, d.Content, d.Content, time.Now().Unix()}

	sql := `insert into daily (` + strings.Join(ifields, ", ") + `) values (` + strings.Join(placeholder, ", ") + `)
	on conflict(uid, day) do update set ` + strings.Join(ufields, ",") + `
	returning uid, day, content, create_time, update_time`

	if err := db.db.QueryRowContext(ctx, sql, args...).Scan(
		&d.Uid,
		&d.Day,
		&d.Content,
		&d.Cts,
		&d.Uts,
	); err != nil {
		fmt.Println(sql)
		fmt.Println(args)
		fmt.Println(err)
		return nil, err
	}

	return d, nil
}
