# Use official Node.js image
FROM node:18

# Set app directory
WORKDIR /notification_service

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the service port
EXPOSE 8002

# Start the service
CMD ["npm", "start"]
