FROM node:18-alpine3.15

WORKDIR /usr/share/dooo


COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "./src/app.js"]
