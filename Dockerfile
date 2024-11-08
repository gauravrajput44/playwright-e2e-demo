# Start from the official Playwright image
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Set the working directory in the Docker container
WORKDIR /app

# Copy all files into the container’s /app directory
COPY . /app/

# Install dependencies
RUN yarn install

# Run Playwright tests and generate an HTML report
CMD ["yarn", "test", "--reporter=html"]