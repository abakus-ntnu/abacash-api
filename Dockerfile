FROM node:7
MAINTAINER Abakus backup <backup@abakus.no>

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install -g yarn && yarn

ENV NODE_ENV production
RUN yarn build

ENTRYPOINT ["yarn", "start"]
