FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 2562
CMD ["node", "FRONT/js/server.js"]
