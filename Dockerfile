
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY openapi.yaml /app/
EXPOSE 5000
CMD ["node", "server.js"]
