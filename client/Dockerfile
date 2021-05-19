FROM node:14

WORKDIR /client

ENV PATH = "./node_modules/.bin:$PATH"

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]