FROM node:alpine

WORKDIR /usr/src/app

COPY ./dist/apps/api .
COPY ./public ./public

EXPOSE ${API_PORT}

RUN yarn

CMD node main