# Use official Node.js image
FROM node:18

# Set app directory
WORKDIR /post_service

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the service port
EXPOSE 4001

# Start the service
CMD ["npm", "start"]
