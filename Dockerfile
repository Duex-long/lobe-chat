FROM node:20-slim AS base

WORKDIR /app

RUN apt-get update -y && apt-get install git -y && git clone -b dev https://github.com/Duex-long/lobe-chat.git

ENV OPENAI_PROXY_ENDPOINT "http://127.0.0.1:3333"

WORKDIR /app/lobe-chat

RUN  yarn install && yarn run build

EXPOSE 3210

CMD ["yarn","start" ]
