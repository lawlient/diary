package db

import (
	"context"
	"fmt"
	"strings"
	"time"
)

type Task struct {
	ID       int    `json:"id"`
	Uid      int32  `json:"uid"`
	Day      string `json:"day"`
	Content  string `json:"content"`
	Est      int    `json:"est"`
	Act      int    `json:"act"`
	Comments string `json:"comments"`
	Status   string `json:"status"`
	Cts      int64  `json:"create_time"`
	Uts      int64  `json:"update_time"`
}

type TaskCount struct {
	Day   string `json:"day"`
	Count int    `json:"count"`
}

func (db *DBDriver) ListTask(ctx context.Context, t *Task) ([]*Task, error) {
	where := []string{"1=1"}
	args := []any{}

	if t.ID != 0 {
		where, args = append(where, "id = ?"), append(args, t.ID)
	}
	if t.Uid != 0 {
		where, args = append(where, "uid = ?"), append(args, t.Uid)
	}
	if len(t.Day) > 0 {
		where, args = append(where, "day = ?"), append(args, t.Day)
	}

	sql := `select id, uid, day, content, est, act, comments, status, create_time, update_time
		from tasks where ` + strings.Join(where, " and ")

	list := make([]*Task, 0)
	rows, err := db.db.QueryContext(ctx, sql, args...)
	if err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return nil, err
	}

	for rows.Next() {
		var tmp Task
		if err := rows.Scan(
			&tmp.ID,
			&tmp.Uid,
			&tmp.Day,
			&tmp.Content,
			&tmp.Est,
			&tmp.Act,
			&tmp.Comments,
			&tmp.Status,
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

func (db *DBDriver) AddTask(ctx context.Context, t *Task) (*Task, error) {
	fields := []string{"uid", "day", "content", "est", "act", "comments", "status"}
	placeholder := []string{"?", "?", "?", "?", "?", "?", "?"}
	args := []any{t.Uid, t.Day, t.Content, t.Est, t.Act, t.Comments, t.Status}

	sql := `insert into tasks (` + strings.Join(fields, ",") + `) values (
		` + strings.Join(placeholder, ",") + `)
		returning id, uid, day, content, est, act, comments, status, create_time, update_time`

	if err := db.db.QueryRowContext(ctx, sql, args...).Scan(
		&t.ID,
		&t.Uid,
		&t.Day,
		&t.Content,
		&t.Est,
		&t.Act,
		&t.Comments,
		&t.Status,
		&t.Cts,
		&t.Uts,
	); err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return nil, err
	}

	return t, nil
}

func (db *DBDriver) ModTask(ctx context.Context, t *Task) (*Task, error) {
	fields := []string{"content = ?", "est = ?", "act = ?", "comments = ?", "status = ?", "update_time = ?"}
	args := []any{t.Content, t.Est, t.Act, t.Comments, t.Status, time.Now().Unix()}
	args = append(args, t.ID)

	sql := `update tasks set ` + strings.Join(fields, ",") + ` where id = ? 
	returning id, uid, day, content, est, act, comments, status, create_time, update_time`

	if err := db.db.QueryRowContext(ctx, sql, args...).Scan(
		&t.ID,
		&t.Uid,
		&t.Day,
		&t.Content,
		&t.Est,
		&t.Act,
		&t.Comments,
		&t.Status,
		&t.Cts,
		&t.Uts,
	); err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return nil, err
	}

	return t, nil
}

func (db *DBDriver) DelTask(ctx context.Context, id int, uid int32) error {
	sql := `delete from tasks where id = ? and uid = ?`
	affect, err := db.db.ExecContext(ctx, sql, id, uid)
	if err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return err
	}

	if _, err := affect.RowsAffected(); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (db *DBDriver) ListTaskCount(ctx context.Context, uid int32, begin, end string) ([]*TaskCount, error) {
	sql := `select day, count(*) as c from tasks where uid = ? and (day between ? and ?) group by day`

	rows, err := db.db.QueryContext(ctx, sql, uid, begin, end)
	if err != nil {
		fmt.Println(sql)
		fmt.Println(err)
		return nil, err
	}

	list := make([]*TaskCount, 0)
	for rows.Next() {
		var tmp TaskCount
		if err := rows.Scan(
			&tmp.Day,
			&tmp.Count,
		); err != nil {
			fmt.Println(sql)
			fmt.Println(err)
			return nil, err
		}

		list = append(list, &tmp)
	}

	return list, nil
}
