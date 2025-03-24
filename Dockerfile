# Node.js application
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app/

# Install app dependencies
RUN npm install && npm ls

# Create uploads directory
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Bundle app source
COPY . /app/

# Build the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

