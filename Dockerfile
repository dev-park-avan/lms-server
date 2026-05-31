# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# Needed because prisma generate runs during install
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# Needed because Prisma reads config during install
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 5000

CMD ["npm", "start"]

# # ---------- Build Stage ----------
# FROM node:22-slim AS builder

# WORKDIR /app

# ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# RUN npm install

# COPY . .

# RUN npm run build

# # ---------- Production Stage ----------
# FROM node:22-slim

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --omit=dev

# COPY prisma ./prisma
# COPY prisma.config.ts ./

# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/src/generated ./src/generated

# EXPOSE 5000

# CMD ["npm", "start"]