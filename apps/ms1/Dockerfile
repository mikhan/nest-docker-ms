FROM node:lts-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

WORKDIR /usr/src/app

COPY ./dist/apps/ms1 .

RUN yarn

CMD node main
