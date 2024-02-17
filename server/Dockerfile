FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

# Set default value for environment variable if not provided during build
ARG PORT=8080
ENV PORT=$PORT

# Start the server
CMD [ "node", "dist/server.js" ]

