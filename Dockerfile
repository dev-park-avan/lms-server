# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm install

COPY . .

RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 5000

CMD ["npm", "start"]

# # ---------- Build Stage ----------
# FROM node:22-alpine AS builder

# WORKDIR /app

# RUN apk add --no-cache openssl ca-certificates curl
# RUN update-ca-certificates

# RUN curl -o /usr/local/share/ca-certificates/rds-ca-bundle.crt \
#     https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem && \
#     update-ca-certificates

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# RUN npm install

# COPY . .

# RUN npm run build


# # ---------- Production Stage ----------
# FROM node:22-alpine

# WORKDIR /app

# RUN apk add --no-cache openssl ca-certificates curl

# RUN curl -o /usr/local/share/ca-certificates/rds-ca-bundle.crt \
#     https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem && \
#     update-ca-certificates

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
# ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/rds-ca-bundle.crt
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# RUN npm install --omit=dev

# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/src/generated ./src/generated

# EXPOSE 5000

# CMD ["npm", "start"]

# # ---------- Build Stage ----------
# FROM node:22-alpine AS builder

# WORKDIR /app

# RUN apk add --no-cache openssl ca-certificates
# RUN update-ca-certificates

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# RUN npm install

# COPY . .

# RUN npm run build


# # ---------- Production Stage ----------
# FROM node:22-alpine

# WORKDIR /app

# RUN apk add --no-cache openssl ca-certificates
# RUN update-ca-certificates

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# RUN npm install --omit=dev

# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/src/generated ./src/generated

# EXPOSE 5000

# CMD ["npm", "start"]