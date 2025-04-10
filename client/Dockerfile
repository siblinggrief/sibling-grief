# Use official Node.js image
FROM node:18

# Accept build-time environment variable
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Optional: log value during build
RUN echo "Building with API_BASE_URL=$REACT_APP_API_BASE_URL"

# Build the app with the env var included
RUN npm run build

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Use serve to run the app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
