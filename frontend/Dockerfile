FROM node:20.11.1 as BUILD_IMAGE

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

FROM node:20.11.1 as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
COPY package*.json .
COPY vite.config.ts .

RUN npm i typescript

EXPOSE 4173

CMD ["npm", "run", "preview"]