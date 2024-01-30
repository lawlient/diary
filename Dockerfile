FROM node:18-alpine AS ui-builder
WORKDIR /app
COPY . . 
ARG BASEPATH="/"
RUN cd ui/ && npm config set registry https://registry.npmmirror.com \
    && npm install && npm run build -- --base=$BASEPATH


FROM golang:alpine AS server-builder
WORKDIR /app
COPY . .
COPY --from=ui-builder /app/ui/dist/ /app/server/core/public
ENV GOPROXY=https://goproxy.cn
RUN cd server/ && ls -la && go mod tidy && go build


FROM alpine:latest
WORKDIR /app
ENV TZ="Asia/Shanghai"
RUN apk --no-cache --no-progress add \
    #ca-certificates \
    tzdata && \
    cp "/usr/share/zoneinfo/$TZ" /etc/localtime && \
    echo "$TZ" >  /etc/timezone 
COPY --from=server-builder /app/server/yraid /app/yraid

VOLUME ["/app/data"]