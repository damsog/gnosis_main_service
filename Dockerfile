# Build step
FROM node as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build

# Production step
FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --quiet

COPY --from=builder /app/prisma ./prisma
# Generate Prisma Client
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/dataModels ./dataModels
COPY --from=builder /app/controllers ./controllers
RUN mkdir /app/dist/tmp

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
