# Use official Node.js image
FROM node:18

# Accept build-time environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG REACT_APP_CLOUDINARY_UPLOAD_URL
ARG REACT_APP_CLOUDINARY_UPLOAD_PRESET

ENV REACT_APP_CLOUDINARY_UPLOAD_URL=$REACT_APP_CLOUDINARY_UPLOAD_URL
ENV REACT_APP_CLOUDINARY_UPLOAD_PRESET=$REACT_APP_CLOUDINARY_UPLOAD_PRESET

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Optional: log value during build
RUN echo "Base URL: $REACT_APP_API_URL"
RUN echo "Cloudinary Upload URL: $REACT_APP_CLOUDINARY_UPLOAD_URL"
RUN echo "Cloudinary Preset: $REACT_APP_CLOUDINARY_UPLOAD_PRESET"

# Build the app with the env var included
RUN npm run build

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Use serve to run the app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
