# Stage 1: Build the app
FROM node:20.15-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:20.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
