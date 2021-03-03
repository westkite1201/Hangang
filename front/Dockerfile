FROM node:12-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json /opt/app


RUN npm install

COPY . /opt/app

RUN npm run build



CMD [ "npm", "run", "serve" ]