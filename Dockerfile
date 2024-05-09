FROM node:20-slim AS base

WORKDIR /app

RUN apt update && apt install git && git clone -b dev git@github.com:Duex-long/lobe-chat.git

ENV OPENAI_PROXY_ENDPOINT "http://127.0.0.1:3333"

RUN  yarn install && yarn run build


EXPOSE 3210

CMD ["yarn","start" ]
