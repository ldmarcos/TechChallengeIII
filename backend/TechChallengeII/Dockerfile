FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y postgresql-client

RUN chmod +x /app/wait-for-it.sh

CMD ["npm", "start"]
