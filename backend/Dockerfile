FROM node:16
LABEL maintainer "winhtaikaung28@hotmail.com"

RUN mkdir /app
WORKDIR /app

ADD package.json /tmp
RUN cd /tmp && npm install

RUN mv /tmp/node_modules /app

COPY . /app

RUN npm run tsc
EXPOSE 5000

CMD ["node","./build/index.js"]