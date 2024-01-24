package db

import (
	"context"
	"fmt"
	"strings"
	"time"
)

type User struct {
	ID       int32  `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Nickname string `json:"nickname"`
	Email    string `json:"email"`
	Avatar   string `json:"avatar"`
	Role     string `json:"role"`
	Cts      int64  `json:"create_time"`
	Uts      int64  `json:"update_time"`
}

func (d *DBDriver) GetUser(ctx context.Context, u *User) ([]*User, error) {
	where := []string{"1 = 1"}
	args := []any{}

	if u.ID != 0 {
		where, args = append(where, "id = ?"), append(args, u.ID)
	}
	if u.Username != "" {
		where, args = append(where, "username = ?"), append(args, u.Username)
	}

	sql := `
		select id, username, passwd, nickname, email, avatar, role, create_time, update_time 
		from users where ` + strings.Join(where, " and ") + `
		order by create_time desc
	`

	rows, err := d.db.QueryContext(ctx, sql, args...)
	if err != nil {
		fmt.Printf("SQL: %s", sql)
		return nil, err
	}

	list := make([]*User, 0)
	for rows.Next() {
		var tmp User
		if err := rows.Scan(
			&tmp.ID,
			&tmp.Username,
			&tmp.Password,
			&tmp.Nickname,
			&tmp.Email,
			&tmp.Avatar,
			&tmp.Role,
			&tmp.Cts,
			&tmp.Uts,
		); err != nil {
			fmt.Println(err)
			return nil, err
		}

		list = append(list, &tmp)
	}
	return list, nil
}

func (d *DBDriver) AddUser(ctx context.Context, u *User) (*User, error) {
	fields := []string{"username", "passwd", "nickname", "email", "avatar", "role"}
	placeholders := []string{"?", "?", "?", "?", "?", "?"}
	args := []any{u.Username, u.Password, u.Nickname, u.Email, u.Avatar, u.Role}

	sql := `insert into users (` + strings.Join(fields, ", ") + `) values (` + strings.Join(placeholders, ",") + `)
	RETURNING id, username, passwd, nickname, email, avatar, role, create_time, update_time`

	if err := d.db.QueryRowContext(ctx, sql, args...).Scan(
		&u.ID,
		&u.Username,
		&u.Password,
		&u.Nickname,
		&u.Email,
		&u.Avatar,
		&u.Role,
		&u.Cts,
		&u.Uts,
	); err != nil {
		fmt.Printf("SQL: %s", sql)
		return nil, err
	}
	return u, nil
}

func (d *DBDriver) ModUser(ctx context.Context, u *User) (*User, error) {
	fields := []string{}
	args := []any{}

	if u.Username != "" {
		fields, args = append(fields, "username = ?"), append(args, u.Username)
	}
	if u.Password != "" {
		fields, args = append(fields, "passwd = ?"), append(args, u.Password)
	}
	if u.Nickname != "" {
		fields, args = append(fields, "nickname = ?"), append(args, u.Nickname)
	}
	if u.Email != "" {
		fields, args = append(fields, "email = ?"), append(args, u.Email)
	}
	if u.Avatar != "" {
		fields, args = append(fields, "avatar = ?"), append(args, u.Avatar)
	}
	if u.Role != "" {
		fields, args = append(fields, "role = ?"), append(args, u.Role)
	}
	fields, args = append(fields, "update_time = ?"), append(args, time.Now().Format("2006-01-02 15 04 05"))

	sql := `
		update users set ` + strings.Join(fields, ", ") + `
		where id = ?
		RETURNING id, username, passwd, nickname, email, avatar, role, create_time, update_time
	`
	args = append(args, u.ID)

	if err := d.db.QueryRowContext(ctx, sql, args...).Scan(
		&u.ID,
		&u.Username,
		&u.Password,
		&u.Nickname,
		&u.Email,
		&u.Avatar,
		&u.Role,
		&u.Cts,
		&u.Uts,
	); err != nil {
		fmt.Printf("SQL: %s; Error:%s", sql, err.Error())
		return nil, err
	}
	return u, nil
}

func (d *DBDriver) DelUser(ctx context.Context, uid int32) error {
	sql := `delete from users where id = ?`

	affect, err := d.db.ExecContext(ctx, sql, uid)
	if err != nil {
		fmt.Printf("SQL: %s", sql)
		return err
	}

	if _, err := affect.RowsAffected(); err != nil {
		return err
	}

	return nil
}

func (d *DBDriver) UserCount(ctx context.Context) (int, error) {
	sql := `select count(*) from users`

	var size = 0
	if err := d.db.QueryRowContext(ctx, sql).Scan(
		&size,
	); err != nil {
		return 0, err
	}

	return size, nil
}
