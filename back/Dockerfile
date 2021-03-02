FROM node:12-alpine

WORKDIR /opt/app
COPY ./package*.json ./
RUN npm install -g nodemon \
 && npm install
COPY . .

CMD [ "npm", "run", "dev" ]