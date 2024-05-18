FROM node:18-alpine3.19

# Declaring env
ENV NODE_ENV development

# COPY [host machine] [container]
COPY package.json ./

RUN npm install

# Install additional package
RUN npm run install-qr-reader

# Install additional package
RUN npm run install-qr-code

COPY . .

# Starting our application
CMD ["npm", "run", "build"]