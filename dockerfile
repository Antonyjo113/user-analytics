# Use official Node.js image as base image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies only if package.json or package-lock.json changes
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start"]