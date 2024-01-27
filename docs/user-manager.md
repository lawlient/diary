# 用户管理


## 数据库Schema


```sql
CREATE TABLE IF NOasjT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    passwd TEXT NOT NULL,
    nickname TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    avatar TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'USER')) DEFAULT 'USER',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
);
```

## API参数说明

###  用户查询 `/api/user/`

- POST

|  参数       |    含义     |   备注    |
| :-          |    :-       |   :-      |
| username    |   用户名    |   必填    |


###  注册 `/api/auth/signin`


- POST

|  参数       |     含义    |       备注    |
| :-          |     :-      |       :-      |
| username    |  登录名     |   必填        |
| password    |  密码       |   必填        |



###  删除用户 `/api/user/del`
###  信息更新 `/api/user/mod`


