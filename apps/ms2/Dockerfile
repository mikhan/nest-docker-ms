FROM node:alpine

WORKDIR /usr/src/app

COPY ./dist/apps/ms2 .

EXPOSE ${MS2_PORT}

RUN yarn

CMD node main
