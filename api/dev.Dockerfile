FROM node:16.9.1-alpine

WORKDIR /api

COPY package.json /api/
ENV NPM_CONFIG_LOGLEVEL warn

COPY . .
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
