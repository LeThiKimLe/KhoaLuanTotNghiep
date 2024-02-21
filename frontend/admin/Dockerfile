FROM node:18-alpine3.19

# Declaring env
ENV NODE_ENV development

# COPY [host machine] [container]
COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Starting our application
CMD ["npm", "run", "build"]