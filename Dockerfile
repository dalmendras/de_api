FROM node:22.0.0

# Create app directory
WORKDIR /app

COPY package*.json /app

RUN npm install

# Bundle app source
COPY . /app

# Build the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

