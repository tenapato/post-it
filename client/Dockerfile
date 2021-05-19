FROM node:14

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# RUN npm run build /use this whe deploying

CMD ["npm", "start"]