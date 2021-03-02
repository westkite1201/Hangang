FROM node:12-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json /opt/app


RUN yarn install

COPY . /opt/app

RUN yarn run build



CMD [ "yarn", "serve" ]