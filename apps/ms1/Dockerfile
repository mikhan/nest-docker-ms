FROM node:lts-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3001

EXPOSE ${PORT}

WORKDIR /app

COPY ./dist/apps/ms1 .
RUN yarn

CMD node ./main.js
