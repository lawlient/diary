## AUTO GENERATED

FROM node:18-alpine

WORKDIR /app/ui

COPY . .

RUN npm config set registry https://registry.npm.taobao.org/ \
    && npm install 


CMD ["/bin/sh", "entrypoint.sh"]