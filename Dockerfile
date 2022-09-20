FROM node:16.14-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm install

CMD node index.js
