# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the web version
RUN npm run build:web

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:web"]