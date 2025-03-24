FROM node:20-alpine

# Create app directory
WORKDIR /app

# COPY package*.json /app/
# Bundle app source
COPY --chown=node:node . /app/

RUN npm install

# Create uploads directory with proper permissions (single command)
RUN mkdir -p /app/uploads && \
    chown -R node:node /app && \
    chmod 755 /app/uploads

# Remove any existing node_modules
RUN rm -rf /app/node_modules

# Set the user
USER node

# Bundle app source
# COPY . /app

# Build the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

