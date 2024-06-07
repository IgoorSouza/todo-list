FROM node:20.11.1

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]