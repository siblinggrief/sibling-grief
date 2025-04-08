# Use Node.js LTS version as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Cloud Run expects the container to listen on $PORT (usually 8080)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
