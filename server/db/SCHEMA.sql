-- users
create table if not exists users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    passwd TEXT NOT NULL,
    nickname TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    avatar TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'USER')) DEFAULT 'USER',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now'))
)