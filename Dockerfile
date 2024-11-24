FROM node:22.11 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22.11-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit-dev

COPY --from=build /app/dist ./dist

COPY --from=build /app/contracts/abis/ ./contracts/abis

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
