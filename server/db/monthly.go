package db

import (
	"context"
	"fmt"
	"strings"
	"time"
)

type Monthly struct {
	Uid     int32  `json:"uid"`
	Day     string `json:"day"`
	Content string `json:"content"`
	Cts     int64  `json:"create_time"`
	Uts     int64  `json:"update_time"`
}

func (db *DBDriver) GetMonthly(ctx context.Context, m *Monthly) ([]*Monthly, error) {
	where := []string{"1=1"}
	args := []any{}

	if m.Uid != 0 {
		where, args = append(where, "uid = ?"), append(args, m.Uid)
	}
	if m.Day != "" {
		where, args = append(where, "day = ?"), append(args, m.Day)
	}

	sql := `
		select uid, day, content, create_time, update_time
		from monthly where ` + strings.Join(where, " and ") + `
		order by create_time desc
	`

	rows, err := db.db.QueryContext(ctx, sql, args...)
	if err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return nil, err
	}

	list := make([]*Monthly, 0)
	for rows.Next() {
		var tmp Monthly
		if err := rows.Scan(
			&tmp.Uid,
			&tmp.Day,
			&tmp.Content,
			&tmp.Cts,
			&tmp.Uts,
		); err != nil {
			fmt.Println(sql)
			fmt.Println(err)
			return nil, err
		}

		list = append(list, &tmp)
	}

	return list, nil
}

func (db *DBDriver) UpsertMonthly(ctx context.Context, m *Monthly) (*Monthly, error) {
	ifields := []string{"uid", "day", "content"}
	placeholder := []string{"?", "?", "?"}
	ufields := []string{"content = ?", "update_time = ?"}
	args := []any{m.Uid, m.Day, m.Content, m.Content, time.Now().Unix()}

	sql := `insert into monthly (` + strings.Join(ifields, ", ") + `) values (` + strings.Join(placeholder, ", ") + `)
	on conflict(uid, day) do update set ` + strings.Join(ufields, ",") + `
	returning uid, day, content, create_time, update_time`

	if err := db.db.QueryRowContext(ctx, sql, args...).Scan(
		&m.Uid,
		&m.Day,
		&m.Content,
		&m.Cts,
		&m.Uts,
	); err != nil {
		fmt.Println(sql)
		fmt.Println(args)
		fmt.Println(err)
		return nil, err
	}

	return m, nil
}
