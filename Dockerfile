# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the EPAM Corporate PR Agent application
COPY . .

# Set working directory to the agent app
WORKDIR /app

# Expose port
EXPOSE 8000

# Set environment variable for ADK
ENV PORT=8000

# Start the ADK API server
CMD ["adk", "api_server", "--port", "8000", "--host", "0.0.0.0", "--allow_origins", "*", "."]
