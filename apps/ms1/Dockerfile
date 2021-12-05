FROM node:alpine

WORKDIR /usr/src/app

COPY ./dist/apps/ms1 .

EXPOSE ${MS1_PORT}

RUN yarn

CMD node main
