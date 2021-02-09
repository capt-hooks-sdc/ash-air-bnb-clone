FROM  node:12-alpine
WORKDIR /hrr50-front-end-capstone
RUN npm install --production
CMD ["npm start", "npm run seed", "npm watch"]

