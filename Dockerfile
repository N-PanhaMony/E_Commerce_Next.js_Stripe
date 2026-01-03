# ==============================
# Base deps
# ==============================
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# ==============================
# Development stage
# ==============================
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ==============================
# Build stage
# ==============================
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ==============================
# Production stage
# ==============================
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
