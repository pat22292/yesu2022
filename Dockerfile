FROM node:14

RUN mkdir /depot

WORKDIR /depot

COPY ./package.json /depot

RUN npm install

COPY . /depot

RUN npm run build

CMD ["npm","start"]