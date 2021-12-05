FROM node:alpine

WORKDIR /usr/src/app

COPY ./api/package.json ./
COPY ./api/app.js /usr/src/app

EXPOSE ${API_PORT}

RUN npm install

CMD [ "npm", "start" ]