# EPAM Corporate PR Agent

An AI-powered Corporate PR Agent designed to boost EPAM's social media presence through intelligent Instagram content generation.

## 🎯 **Objective**

EPAM lacks strong social media presence, especially on Instagram. This agent helps:
- Analyze competitor strategies (TCS, Wipro, Infosys, Accenture)
- Generate engaging Instagram content
- Optimize hashtags for maximum reach
- Create content strategies based on EPAM's achievements

## 🏗️ **Architecture**

```
Root Agent (EPAM Corporate PR Manager)
├── Competitor Research Agent
│   └── Web Scraper Tool (Tavily API)
├── Content Strategy Agent
│   └── Content Analyzer Tool
├── Instagram Generator Agent
│   └── Post Creator Tool
└── Hashtag Optimizer Agent
    └── Hashtag Optimizer Tool
```

## 🚀 **Quick Start**

### Prerequisites

- Python 3.11+
- Node.js 18+
- Tavily API Key (free tier available)

### 1. Backend Setup

```bash
# Navigate to project directory
cd epam-corporate-pr-agent

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env with your Tavily API key

# Run the agent
python run_agent.py
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Start ADK API Server

```bash
# In the main project directory
adk api_server --port 8000 --host 0.0.0.0 --allow_origins "*" .
```

## 🔧 **Configuration**

### Environment Variables

Create a `.env` file with:

```env
# Tavily API Key for web search and research
TAVILY_API_KEY=your_tavily_api_key_here

# Google ADK Configuration
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1
```

### Getting Tavily API Key

1. Visit [Tavily.com](https://tavily.com)
2. Sign up for free account
3. Get your API key from dashboard
4. Add to `.env` file

## 📱 **Usage**

1. **Start the application**: Open `http://localhost:3000`
2. **Enter content request**: Describe what content you want to create
3. **Follow the wizard**: The agent will guide you through each step
4. **Get your content**: Receive optimized Instagram posts and hashtags

### Example Content Requests

- "Create a post about EPAM hiring 10k+ freshers"
- "Generate content about our latest tech achievements"
- "Create a post highlighting EPAM's diversity initiatives"
- "Generate content about our AI/ML capabilities"

## 🎨 **Features**

### Competitor Analysis
- Analyzes TCS, Wipro, Infosys, Accenture strategies
- Identifies successful content patterns
- Provides insights for EPAM's approach

### Content Strategy
- Creates comprehensive content strategies
- Identifies content themes and topics
- Provides posting recommendations

### Instagram Generation
- Generates engaging captions
- Suggests optimal posting times
- Provides visual content suggestions
- Creates content type recommendations

### Hashtag Optimization
- Optimizes hashtags for maximum reach
- Identifies trending hashtags
- Balances popular and niche hashtags

## 🛠️ **Tech Stack**

- **Backend**: Google ADK, Gemini 2.0-flash, Python
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **APIs**: Tavily (web search), Google ADK
- **Deployment**: Docker, Google Cloud

## 📊 **Agent Workflow**

1. **Input**: User provides content request
2. **Competitor Analysis**: Research competitor strategies
3. **Content Strategy**: Create comprehensive strategy
4. **Instagram Generation**: Generate post content
5. **Hashtag Optimization**: Optimize hashtags
6. **Output**: Complete Instagram-ready content

## 🔍 **API Endpoints**

- `POST /api/adk/epam_corporate_pr_manager` - Main agent
- `POST /api/adk/competitor_research_agent` - Competitor analysis
- `POST /api/adk/content_strategy_agent` - Content strategy
- `POST /api/adk/instagram_generator_agent` - Instagram generation
- `POST /api/adk/hashtag_optimizer_agent` - Hashtag optimization

## 🚀 **Deployment**

### Docker Deployment

```bash
# Build Docker image
docker build -t epam-corporate-pr-agent .

# Run container
docker run -p 8000:8000 -e TAVILY_API_KEY=your_key epam-corporate-pr-agent
```

### Google Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy epam-corporate-pr-agent \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 📈 **Expected Results**

- **Increased Engagement**: Optimized content for better reach
- **Competitive Advantage**: Data-driven content strategies
- **Time Savings**: Automated content generation
- **Consistent Branding**: EPAM-focused content themes

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

For issues and questions:
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

## 🎯 **Hackathon Notes**

This is a hackathon MVP focused on:
- ✅ Text-only content generation
- ✅ Free APIs only (Tavily)
- ✅ Instagram-focused strategy
- ✅ Quick setup and deployment
- ✅ EPAM-specific use cases

Perfect for demonstrating AI-powered corporate PR capabilities!
