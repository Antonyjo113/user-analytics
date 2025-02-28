# Use official Node.js image as base image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on (default React port is 3000)
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "start"]