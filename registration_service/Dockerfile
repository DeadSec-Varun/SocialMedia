# Use official Node.js image
FROM node:18

# Set app directory
WORKDIR /registration_service/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the service port
EXPOSE 3001

# Start the service
CMD ["npm", "run", "dev"]
