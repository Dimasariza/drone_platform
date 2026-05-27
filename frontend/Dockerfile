FROM node:20-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=development

# Install dependencies (use install for compatibility when no lockfile)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --prefer-offline --no-audit --no-fund

# Copy rest (mounted in dev by compose, but keep for image build)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
