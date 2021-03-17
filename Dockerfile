FROM node:alpine
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --production

COPY . /usr/src/app
EXPOSE 3000
RUN yarn build
CMD yarn start