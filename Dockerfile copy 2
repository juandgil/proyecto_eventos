FROM node:18

# Instalar nodemon
RUN yarn global add nodemon

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8081

CMD ["nodemon", "--watch", "src", "--ext", "ts,json", "--exec", "ts-node", "src/index.ts"]
