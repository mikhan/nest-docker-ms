FROM node:lts-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${PORT}

WORKDIR /app

COPY ./dist/apps/api .
RUN yarn

CMD node ./main.js
