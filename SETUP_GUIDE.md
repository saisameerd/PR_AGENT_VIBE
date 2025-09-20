# EPAM Corporate PR Agent - Complete Setup Guide

## 🎯 Overview
This guide will help you run the EPAM Corporate PR Agent locally on any laptop, even without any programming languages or packages installed.

## 📋 System Requirements

### Minimum Requirements:
- **OS**: Windows 10/11, macOS 10.15+, or Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Internet**: Required for API calls and package downloads

## 🛠️ Installation Methods

### Method 1: Docker (Recommended - Easiest)
If you don't have anything installed, Docker is the easiest way.

### Method 2: Manual Installation
If you prefer to install everything manually.

---

## 🐳 Method 1: Docker Setup (Recommended)

### Step 1: Install Docker Desktop
1. Go to [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Download Docker Desktop for your operating system
3. Install and start Docker Desktop
4. Verify installation: Open terminal and run `docker --version`

### Step 2: Clone Repository
```bash
git clone https://github.com/saisameerd/PR_AGENT_VIBE.git
cd PR_AGENT_VIBE
```

### Step 3: Set Up Environment Variables
1. Copy `env.example` to `.env`:
```bash
cp env.example .env
```

2. Edit `.env` file with your API keys:
```env
# Google ADK Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Tavily API Configuration
TAVILY_API_KEY=your_tavily_api_key_here

# Optional: Google Cloud Configuration (for advanced features)
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1
```

### Step 4: Run with Docker Compose
```bash
# Start both backend and frontend
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Step 5: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

---

## 🔧 Method 2: Manual Installation

### Step 1: Install Python 3.11+
1. Go to [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Download Python 3.11 or later
3. **IMPORTANT**: Check "Add Python to PATH" during installation
4. Verify: Open terminal and run `python --version`

### Step 2: Install Node.js 18+
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download Node.js 18 or later (LTS version recommended)
3. Install with default settings
4. Verify: Open terminal and run `node --version` and `npm --version`

### Step 3: Clone Repository
```bash
git clone https://github.com/saisameerd/PR_AGENT_VIBE.git
cd PR_AGENT_VIBE
```

### Step 4: Set Up Backend
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env file with your API keys
```

### Step 5: Set Up Frontend
```bash
cd frontend

# Install Node.js dependencies
npm install

# Set up frontend environment variables
cp env.example .env.local
# Edit .env.local file if needed
```

### Step 6: Run the Application

#### Terminal 1 - Backend:
```bash
# Make sure you're in the root directory
python run_agent.py
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Step 7: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

---

## 🔑 Required API Keys

### 1. Google API Key (Required)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Gemini API
   - Google ADK API
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

### 2. Tavily API Key (Required)
1. Go to [https://tavily.com/](https://tavily.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy the API key to your `.env` file

---

## 🚀 Quick Start Commands

### Docker (Easiest):
```bash
git clone https://github.com/saisameerd/PR_AGENT_VIBE.git
cd PR_AGENT_VIBE
cp env.example .env
# Edit .env with your API keys
docker-compose up --build
```

### Manual:
```bash
git clone https://github.com/saisameerd/PR_AGENT_VIBE.git
cd PR_AGENT_VIBE
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp env.example .env
# Edit .env with your API keys
python run_agent.py
# In another terminal:
cd frontend
npm install
npm run dev
```

---

## 🐛 Troubleshooting

### Common Issues:

1. **Port already in use**:
   - Change ports in `docker-compose.yml` or kill existing processes

2. **API key errors**:
   - Verify your API keys are correct in `.env` file
   - Check if APIs are enabled in Google Cloud Console

3. **Python not found**:
   - Make sure Python is added to PATH
   - Try `python3` instead of `python`

4. **Node.js not found**:
   - Make sure Node.js is installed and added to PATH
   - Try `nodejs` instead of `node`

5. **Docker not working**:
   - Make sure Docker Desktop is running
   - Try restarting Docker Desktop

### Getting Help:
- Check the logs in terminal for error messages
- Verify all environment variables are set correctly
- Make sure all required APIs are enabled

---

## 📱 Usage

1. Open http://localhost:3000 in your browser
2. Enter a content request (e.g., "Create content about EPAM hiring 10k+ freshers")
3. Click "Start Generation"
4. Follow the wizard through each step:
   - Competitor Research
   - Content Strategy
   - Instagram Generation
   - Hashtag Optimization
5. Get your final Instagram post with optimized hashtags!

---

## 🎉 Success!

You should now have the EPAM Corporate PR Agent running locally! The application will help you create engaging Instagram content for EPAM's social media growth.
