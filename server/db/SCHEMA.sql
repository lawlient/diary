-- drop table monthly;

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
);


-- tasks
create table if not exists tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INTEGER NOT NULL,
    day TEXT NOT NULL CHECK (day IS date(day)),
    content TEXT NOT NULL,
    est INTEGER NOT NULL DEFAULT 0,
    act INTEGER NOT NULL DEFAULT 0,
    comments TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL CHECK (status IN ('TODO', 'DONE', 'DISCARD')) DEFAULT 'TODO',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now'))
);



-- daily, 
create table if not exists daily (
    uid INTEGER NOT NULL,
    day TEXT NOT NULL CHECK (day IS strftime('%Y-%m-%d', day)),
    content TEXT NOT NULL DEFAULT '',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    UNIQUE(uid, day)
);


-- monthly okr, day format is "2006-01"
-- sqlite time constraint check not support "YYYY-MM"
create table if not exists monthly (
    uid INTEGER not NULL,
    day TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    UNIQUE(uid, day)
);

-- yearly okr, day format is "2006"
-- sqlite time constraint check not support "YYYY"
create table if not exists yearly (
    uid INTEGER not NULL,
    day TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',

    create_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    update_time BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    UNIQUE(uid, day)
);
