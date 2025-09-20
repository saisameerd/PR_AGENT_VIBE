"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle, AlertCircle, Instagram, Hash, TrendingUp, Users, Target } from "lucide-react"

interface CorporatePRSession {
  session_id: string
  user_id: string
  status: string
  step: string
  content_request?: string
  competitor_analysis?: any
  content_strategy?: any
  instagram_post?: any
  hashtags?: any
  awaiting_feedback?: boolean
}

export function CorporatePRWizard() {
  const [session, setSession] = useState<CorporatePRSession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contentRequest, setContentRequest] = useState("")
  const [feedback, setFeedback] = useState("")

  const startGeneration = async () => {
    if (!contentRequest.trim()) {
      setError("Please enter a content request")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Initialize session
      const newSession: CorporatePRSession = {
        session_id: `session_${Date.now()}`,
        user_id: 'user_1',
        status: 'active',
        step: 'competitor_analysis',
        content_request: contentRequest
      }
      setSession(newSession)

      // Start competitor analysis
      const response = await fetch('/api/adk/competitor_research_agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze competitors for: ${contentRequest}`,
          content_request: contentRequest
        })
      })

      if (!response.ok) {
        throw new Error('Failed to start competitor analysis')
      }

      const data = await response.json()
      setSession(prev => prev ? { ...prev, competitor_analysis: data.competitor_analysis || data } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const continueToContentStrategy = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch('/api/adk/content_strategy_agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create content strategy for: ${session.content_request}`,
          content_request: session.content_request,
          competitor_analysis: session.competitor_analysis
        })
      })

      const data = await response.json()
      setSession(prev => prev ? { ...prev, content_strategy: data.content_strategy || data, step: 'instagram_generation' } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create content strategy')
    } finally {
      setLoading(false)
    }
  }

  const generateInstagramPost = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch('/api/adk/instagram_generator_agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate Instagram post for: ${session.content_request}`,
          content_request: session.content_request,
          content_strategy: session.content_strategy
        })
      })

      const data = await response.json()
      setSession(prev => prev ? { ...prev, instagram_post: data.instagram_post || data, step: 'hashtag_optimization' } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate Instagram post')
    } finally {
      setLoading(false)
    }
  }

  const optimizeHashtags = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch('/api/adk/hashtag_optimizer_agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Optimize hashtags for: ${session.content_request}`,
          content_request: session.content_request,
          instagram_post: session.instagram_post
        })
      })

      const data = await response.json()
      setSession(prev => prev ? { ...prev, hashtags: data.hashtag_strategy || data, step: 'completed' } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize hashtags')
    } finally {
      setLoading(false)
    }
  }

  const resetWizard = () => {
    setSession(null)
    setContentRequest("")
    setFeedback("")
    setError(null)
  }

  const getProgress = () => {
    if (!session) return 0
    const steps = ['input', 'competitor_analysis', 'content_strategy', 'instagram_generation', 'hashtag_optimization', 'completed']
    const currentStepIndex = steps.indexOf(session.step)
    return ((currentStepIndex + 1) / steps.length) * 100
  }

  const renderInputStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-6 w-6 text-pink-500" />
          EPAM Corporate PR Agent
        </CardTitle>
        <CardDescription>
          Generate Instagram content to boost EPAM's social media presence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="content-request">Content Request</Label>
          <Textarea
            id="content-request"
            placeholder="Describe what content you want to create (e.g., 'Create a post about EPAM hiring 10k+ freshers', 'Generate content about our latest tech achievements')"
            value={contentRequest}
            onChange={(e) => setContentRequest(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        <Button 
          onClick={startGeneration} 
          disabled={loading || !contentRequest.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting Generation...
            </>
          ) : (
            "Start Content Generation"
          )}
        </Button>
      </CardContent>
    </Card>
  )

  const renderCompetitorAnalysisStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-500" />
          Competitor Analysis
        </CardTitle>
        <CardDescription>
          Analyzing competitors' social media strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session?.competitor_analysis ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">TCS Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  {session.competitor_analysis?.competitors?.[0]?.social_media_presence || 'Analysis in progress...'}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Wipro Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  {session.competitor_analysis?.competitors?.[1]?.social_media_presence || 'Analysis in progress...'}
                </p>
              </div>
            </div>
            <Button onClick={continueToContentStrategy} className="w-full">
              Continue to Content Strategy
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Analyzing competitors...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderContentStrategyStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-6 w-6 text-green-500" />
          Content Strategy
        </CardTitle>
        <CardDescription>
          Creating content strategy based on analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session?.content_strategy ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Strategy Overview</h4>
              <p className="text-sm text-muted-foreground">
                {session.content_strategy?.content_strategy?.tone || 'Strategy being created...'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Content Themes</h4>
              <div className="flex flex-wrap gap-2">
                {session.content_strategy?.content_pillars?.map((pillar: any, index: number) => (
                  <Badge key={index} variant="secondary">{pillar.pillar}</Badge>
                ))}
              </div>
            </div>
            <Button onClick={generateInstagramPost} className="w-full">
              Continue to Instagram Generation
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Creating content strategy...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderInstagramGenerationStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-6 w-6 text-pink-500" />
          Instagram Post Generation
        </CardTitle>
        <CardDescription>
          Generating Instagram post content
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session?.instagram_post ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Post Caption</h4>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{session.instagram_post?.caption}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Optimal Timing</h4>
                <p className="text-sm text-muted-foreground">
                  {session.instagram_post?.optimal_timing}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Content Type</h4>
                <Badge variant="outline">{session.instagram_post?.content_type}</Badge>
              </div>
            </div>
            <Button onClick={optimizeHashtags} className="w-full">
              Continue to Hashtag Optimization
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Generating Instagram post...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderHashtagOptimizationStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-6 w-6 text-purple-500" />
          Hashtag Optimization
        </CardTitle>
        <CardDescription>
          Optimizing hashtags for maximum reach
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session?.hashtags ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Optimized Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {session.hashtags?.primary_hashtags?.map((hashtag: string, index: number) => (
                  <Badge key={index} variant="default">{hashtag}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Trending Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {session.hashtags?.trending_hashtags?.map((hashtag: string, index: number) => (
                  <Badge key={index} variant="secondary">{hashtag}</Badge>
                ))}
              </div>
            </div>
            <Button onClick={optimizeHashtags} className="w-full">
              Complete Generation
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Optimizing hashtags...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderCompletedStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          Content Generation Complete!
        </CardTitle>
        <CardDescription>
          Your Instagram content is ready to boost EPAM's social media presence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Final Instagram Post</h4>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm mb-4">{session?.instagram_post?.caption}</p>
              <div className="flex flex-wrap gap-1">
                {session?.hashtags?.primary_hashtags?.map((hashtag: string, index: number) => (
                  <span key={index} className="text-xs text-blue-600">{hashtag} </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Posting Strategy</h4>
            <div className="space-y-2">
              <p className="text-sm"><strong>Best Time:</strong> {session?.instagram_post?.optimal_timing}</p>
              <p className="text-sm"><strong>Content Type:</strong> {session?.instagram_post?.content_type}</p>
              <p className="text-sm"><strong>Visual Suggestions:</strong> {session?.instagram_post?.visual_suggestions}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex gap-4">
          <Button onClick={resetWizard} variant="outline" className="flex-1">
            Generate New Content
          </Button>
          <Button className="flex-1">
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCurrentStep = () => {
    if (!session) return renderInputStep()
    
    switch (session.step) {
      case 'input':
        return renderInputStep()
      case 'competitor_analysis':
        return renderCompetitorAnalysisStep()
      case 'content_strategy':
        return renderContentStrategyStep()
      case 'instagram_generation':
        return renderInstagramGenerationStep()
      case 'hashtag_optimization':
        return renderHashtagOptimizationStep()
      case 'completed':
        return renderCompletedStep()
      default:
        return renderInputStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            EPAM Corporate PR Agent
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered Instagram content generation for EPAM's social media growth
          </p>
        </div>

        {/* Progress Bar */}
        {session && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="w-full" />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Current Step */}
        {renderCurrentStep()}
      </div>
    </div>
  )
}
