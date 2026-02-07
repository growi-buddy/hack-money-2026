'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { mapCampaignFormToAPI, validateCampaignForm } from '@/helpers/campaign-mapper';
import { useSite } from '@/hooks';
import { float, scaleIn } from '@/lib/animations';
import { AUDIENCE_DEMOGRAPHIC_OPTIONS, INTEREST_OPTIONS, SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { CampaignFormData } from '@/types/campaign-form';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Calendar,
  CheckCircle2,
  DollarSign,
  Globe,
  Loader2,
  Send,
  Settings,
  Sparkles,
  Target,
  User,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const INITIAL_CAMPAIGN_DATA: CampaignFormData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  targetAudience: {
    demographics: [],
  },
  geographic: {
    regions: [],
    countries: [],
  },
  interests: [],
  budget: undefined,
  slots: 10,
  selectedRewardEvents: [],
};

const QUICK_PROMPTS = [
  {
    emoji: '👟',
    label: 'E-commerce Campaign',
    text: 'I want to create a campaign for my sneaker store with a $2,000 budget',
  },
  {
    emoji: '📱',
    label: 'App Launch',
    text: 'Help me promote my new mobile app with $1,500 budget targeting Gen Z',
  },
  {
    emoji: '💰',
    label: 'DeFi/Crypto',
    text: 'I need a campaign for my DeFi protocol with $5,000 budget',
  },
  {
    emoji: '🛍️',
    label: 'Fashion Brand',
    text: 'Create a fashion campaign targeting millennials with $3,000 budget',
  },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const { address } = useWallet();
  const [ campaignData, setCampaignData ] = useState<CampaignFormData>(INITIAL_CAMPAIGN_DATA);
  const [ isCreating, setIsCreating ] = useState(false);
  const [ creationError, setCreationError ] = useState<string | null>(null);
  const [ input, setInput ] = useState('');
  const [ lastUpdatedField, setLastUpdatedField ] = useState<string | null>(null);
  const [ showSuccess, setShowSuccess ] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sites, hasSiteEvents, isLoading } = useSite();
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat/campaign-creator',
      body: () => ({ campaignData }),
    }),
    onFinish: ({ message }) => {
      const parts = message.parts || [];
      
      for (const part of parts) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyPart = part as any;
        
        if (part.type?.includes('updateCampaignData') || anyPart.toolName === 'updateCampaignData') {
          let newData: Partial<CampaignFormData> | null = null;
          
          if (anyPart.result?.data) {
            newData = anyPart.result.data;
          } else if (anyPart.args) {
            newData = anyPart.args;
          } else if (anyPart.input) {
            newData = anyPart.input;
          }
          
          if (newData && Object.keys(newData).length > 0) {
            setCampaignData((prev) => ({
              ...prev,
              name: newData?.name || prev.name,
              description: newData?.description || prev.description,
              startDate: newData?.startDate || prev.startDate,
              endDate: newData?.endDate || prev.endDate,
              geographic: {
                ...prev.geographic,
                ...newData.geographic,
              },
              interests: newData?.interests || prev.interests,
              targetAudience: {
                ...prev.targetAudience,
                ...newData.targetAudience,
              },
              budget: newData?.budget || prev.budget,
              slots: newData?.slots || prev.slots,
            }));
            
            const updatedFields = Object.keys(newData).filter(
              (key) => newData && newData[key as keyof CampaignFormData] !== undefined,
            );
            if (updatedFields.length > 0) {
              const fieldNames: Record<string, string> = {
                name: 'Name',
                description: 'Description',
                budget: 'Budget',
                startDate: 'Start Date',
                endDate: 'End Date',
                slots: 'Slots',
                interests: 'Interests',
                targetAudience: 'Target Audience',
                geographic: 'Geographic',
              };
              
              const readableFields = updatedFields.map((f) => fieldNames[f] || f);
              setLastUpdatedField(readableFields.join(', '));
              setTimeout(() => setLastUpdatedField(null), 3000);
            }
          }
        }
      }
    },
  });
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ messages ]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    
    await sendMessage({
      role: 'user',
      parts: [ { type: 'text', text: userMessage } ],
    });
  };
  
  const calculateCompleteness = () => {
    let filled = 0;
    const total = 11;
    
    if (campaignData.name) filled++;
    if (campaignData.description) filled++;
    if (campaignData.startDate) filled++;
    if (campaignData.endDate) filled++;
    if (campaignData.geographic?.regions?.length) filled++;
    if (campaignData.interests?.length) filled++;
    if (campaignData.targetAudience?.demographics?.length) filled++;
    if (campaignData.interests?.length) filled++;
    if (campaignData.budget) filled++;
    if (campaignData.slots) filled++;
    
    // Check selected reward events instead of legacy rewards
    const rewardEventsSelected = (campaignData.selectedRewardEvents || []).filter(
      (e) => e.amount > 0,
    ).length;
    if (rewardEventsSelected > 0) filled++;
    
    return Math.round((filled / total) * 100);
  };
  
  const handleCreateCampaign = async () => {
    setCreationError(null);
    
    const validation = validateCampaignForm(campaignData);
    if (!validation.valid) {
      setCreationError(validation.errors.join(', '));
      return;
    }
    
    if (!address) {
      setCreationError('Please connect your wallet first');
      return;
    }
    
    setIsCreating(true);
    
    try {
      const campaignInput = mapCampaignFormToAPI(campaignData, address);
      
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignInput),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error creating campaign');
      }
      
      const result = await response.json();
      
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/manager/campaigns/${result.data.id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setCreationError(error instanceof Error ? error.message : 'Unknown error creating campaign');
    } finally {
      setIsCreating(false);
    }
  };
  
  const completeness = calculateCompleteness();
  
  return (
    <div className="relative mx-auto max-w-7xl space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <Link href="/manager/campaigns">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Campaign Creator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell our AI about your campaign goals and let it create the perfect structure for you
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
        {/* Chat Panel */}
        <motion.div variants={scaleIn} initial="hidden" animate="visible">
          <Card className="flex h-[calc(100vh-220px)] flex-col overflow-hidden p-0 gap-0">
            <CardHeader className="border-b border-border bg-secondary/30 pt-5 min-h-[100px]">
              <div className="flex items-center gap-4">
                <motion.div variants={float} initial="initial" animate="animate" className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-growi-blue/20">
                    <Image
                      src="/growi-mascot.png"
                      alt="AI Assistant"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </div>
                  <motion.div
                    animate={{
                      scale: [ 1, 1.2, 1 ],
                      opacity: [ 0.5, 1, 0.5 ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-growi-blue"
                  >
                    <Sparkles className="h-3 w-3 text-white" />
                  </motion.div>
                </motion.div>
                <div>
                  <CardTitle className="text-foreground">GROWI AI Assistant</CardTitle>
                  <CardDescription>I&apos;ll help you create the perfect campaign</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Bot className="mx-auto mb-4 h-12 w-12 text-growi-blue/50" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Hi! I&apos;m your campaign assistant. Tell me about your campaign goals.
                  </p>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto">
                    {QUICK_PROMPTS.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(prompt.text)}
                        className="px-4 py-2 text-sm bg-growi-blue/10 text-growi-blue rounded-lg hover:bg-growi-blue/20 transition-colors text-left"
                      >
                        {prompt.emoji} {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((message) => {
                const textParts = message.parts?.filter((p) => p.type === 'text') || [];
                const toolParts = message.parts?.filter((p) => p.type?.startsWith('tool-')) || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const messageText = textParts.map((p) => (p as any).text).join('') || '';
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growi-blue">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-growi-blue text-white'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {messageText && (
                        <div className="whitespace-pre-wrap text-sm">{messageText}</div>
                      )}
                      
                      {toolParts.length > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-xs opacity-75">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Data updated</span>
                        </div>
                      )}
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growi-lime">
                        <User className="h-5 w-5 text-growi-blue" />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growi-blue">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="rounded-2xl bg-secondary px-4 py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-growi-blue" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your campaign..."
                  disabled={isLoading}
                  autoComplete="off"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-growi-blue text-white hover:bg-growi-blue/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
        
        {/* Preview Panel */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card className="flex h-[calc(100vh-220px)] flex-col overflow-hidden p-0 gap-0">
            <CardHeader className="border-b border-border bg-growi-blue/10 pt-5 min-h-[100px]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Campaign Preview</CardTitle>
                <span className="text-sm text-muted-foreground">{completeness}% complete</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full bg-growi-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${completeness}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {lastUpdatedField && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-growi-blue"
                >
                  <Zap className="h-4 w-4" />
                  <span>Updated: {lastUpdatedField}</span>
                </motion.div>
              )}
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <InfoCard icon={<Sparkles className="h-4 w-4" />} title="Basic Info" color="blue">
                <Field
                  label="Campaign Name"
                  value={campaignData.name}
                  onChange={(value) => setCampaignData((prev) => ({ ...prev, name: value }))}
                />
                <Field
                  label="Description"
                  value={campaignData.description}
                  onChange={(value) => setCampaignData((prev) => ({ ...prev, description: value }))}
                  multiline
                />
              </InfoCard>
              
              <InfoCard icon={<Calendar className="h-4 w-4" />} title="Duration" color="green">
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Start"
                    value={campaignData.startDate}
                    type="date"
                    onChange={(value) => setCampaignData((prev) => ({ ...prev, startDate: value }))}
                  />
                  <Field
                    label="End"
                    value={campaignData.endDate}
                    type="date"
                    onChange={(value) => setCampaignData((prev) => ({ ...prev, endDate: value }))}
                  />
                </div>
              </InfoCard>
              
              
              <InfoCard icon={<Globe className="h-4 w-4" />} title="Geographic" color="indigo">
                <Field
                  label="Regions"
                  value={campaignData.geographic?.regions?.join(', ')}
                  onChange={(value) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      geographic: {
                        ...prev.geographic,
                        regions: value
                          .split(',')
                          .map((r) => r.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                />
              </InfoCard>
              
              <InfoCard icon={<Target className="h-4 w-4" />} title="Interests & Audience" color="pink">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Interests</label>
                    <div className="flex flex-wrap gap-1.5">
                      {INTEREST_OPTIONS.map((interest) => (
                        <button
                          key={interest}
                          onClick={() =>
                            setCampaignData((prev) => ({
                              ...prev,
                              interests: prev.interests?.includes(interest)
                                ? prev.interests.filter((i) => i !== interest)
                                : [ ...(prev.interests || []), interest ],
                            }))
                          }
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            campaignData.interests?.includes(interest)
                              ? 'bg-pink-500/20 text-pink-600 border border-pink-500/30'
                              : 'bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Target Audience</label>
                    <div className="flex flex-wrap gap-1.5">
                      {AUDIENCE_DEMOGRAPHIC_OPTIONS.map((demo) => (
                        <button
                          key={demo}
                          onClick={() => {
                            const current = campaignData.targetAudience?.demographics || [];
                            setCampaignData((prev) => ({
                              ...prev,
                              targetAudience: {
                                ...prev.targetAudience,
                                demographics: current.includes(demo) ? current.filter((d) => d !== demo) : [ ...current, demo ],
                              },
                            }));
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            campaignData.targetAudience?.demographics?.includes(demo)
                              ? 'bg-purple-500/20 text-purple-600 border border-purple-500/30'
                              : 'bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border'
                          }`}
                        >
                          {demo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </InfoCard>
              
              <InfoCard icon={<DollarSign className="h-4 w-4" />} title="Budget & Slots" color="emerald">
                <Field
                  label="Total Budget ($)"
                  value={campaignData.budget?.toString()}
                  type="number"
                  onChange={(value) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      budget: value ? parseFloat(value) : undefined,
                    }))
                  }
                />
                <Field
                  label="Influencer Slots"
                  value={campaignData.slots?.toString()}
                  type="number"
                  onChange={(value) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      slots: value ? parseInt(value) : undefined,
                    }))
                  }
                />
              </InfoCard>
              
              <InfoCard icon={<Zap className="h-4 w-4" />} title="Reward Events" color="amber">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-growi-blue" />
                  </div>
                ) : !hasSiteEvents ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      You don&apos;t have any reward events configured
                    </p>
                    <a
                      href="/manager/sites-tracking"
                      className="text-sm text-growi-blue hover:underline"
                    >
                      Configure events →
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sites.map((site) => (
                      <div key={site.id} className="space-y-2">
                        <div className="flex items-center gap-2 pb-1 border-b border-border/50">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {site.name}
                          </h4>
                          <span className="text-xs text-muted-foreground/60">
                            ({site.events.length} event{site.events.length !== 1 ? 's' : ''})
                          </span>
                        </div>
                        {site.events.map((event) => {
                          const isSelected = campaignData.selectedRewardEvents?.some(
                            (e) => e.rewardEventId === event.id,
                          );
                          const selectedEvent = campaignData.selectedRewardEvents?.find(
                            (e) => e.rewardEventId === event.id,
                          );
                          
                          return (
                            <RewardEventField
                              key={event.id}
                              label={event.name}
                              eventType={SITE_EVENT_TYPE_LABELS[event.eventType]}
                              enabled={isSelected}
                              amount={selectedEvent?.amount}
                              onToggle={(enabled) => {
                                setCampaignData((prev) => {
                                  if (enabled) {
                                    return {
                                      ...prev,
                                      selectedRewardEvents: [
                                        ...(prev.selectedRewardEvents || []),
                                        { rewardEventId: event.id!, amount: 0.01, volumeStep: 1 },
                                      ],
                                    };
                                  } else {
                                    return {
                                      ...prev,
                                      selectedRewardEvents: (prev.selectedRewardEvents || []).filter(
                                        (e) => e.rewardEventId !== event.id,
                                      ),
                                    };
                                  }
                                });
                              }}
                              onAmountChange={(amount) => {
                                setCampaignData((prev) => ({
                                  ...prev,
                                  selectedRewardEvents: (prev.selectedRewardEvents || []).map((e) =>
                                    e.rewardEventId === event.id ? { ...e, amount } : e,
                                  ),
                                }));
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </InfoCard>
            </div>
            
            <div className="border-t border-border p-4 space-y-2">
              {creationError && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{creationError}</span>
                </div>
              )}
              
              <Button
                onClick={handleCreateCampaign}
                disabled={completeness < 50 || isCreating || !address}
                className="w-full bg-growi-blue text-white hover:bg-growi-blue/90"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Create Campaign
                    {completeness < 50 && (
                      <span className="ml-1 text-xs opacity-75">(complete at least 50%)</span>
                    )}
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative"
            >
              {[ ...Array(12) ].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-growi-yellow"
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              ))}
              <Card className="w-80 text-center">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [ 0, 1.3, 1 ] }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
                  >
                    <Sparkles className="h-8 w-8 text-growi-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Campaign Created!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Redirecting to your campaign dashboard...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* No Reward Events Modal - covers only content area */}
      <AnimatePresence>
        {!isLoading && !hasSiteEvents && address && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Card className="w-96 text-center shadow-lg border-amber-500/30">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20"
                  >
                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Configuration Required</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    To create a campaign, you first need to configure tracking events on your website.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This will allow you to define which user actions you want to reward.
                  </p>
                  <Button
                    onClick={() => router.push('/manager/sites-tracking')}
                    className="mt-6 w-full bg-growi-blue text-white hover:bg-growi-blue/90"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Events Tracking
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Component helpers
function InfoCard({
                    icon,
                    title,
                    children,
                    color = 'blue',
                  }: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'indigo' | 'pink' | 'emerald' | 'amber'
}) {
  const colorClasses = {
    blue: 'bg-growi-blue/10 text-growi-blue',
    green: 'bg-green-500/10 text-green-600',
    purple: 'bg-purple-500/10 text-purple-600',
    indigo: 'bg-indigo-500/10 text-indigo-600',
    pink: 'bg-pink-500/10 text-pink-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
  };
  
  return (
    <div className="pb-3">
      <div className="mb-2 flex items-center gap-2 border-b border-border pb-2">
        <div className={`rounded-lg p-1.5 ${colorClasses[color]}`}>{icon}</div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
                 label,
                 value,
                 onChange,
                 multiline = false,
                 type = 'text',
               }: {
  label: string
  value?: string
  onChange?: (value: string) => void
  multiline?: boolean
  type?: 'text' | 'number' | 'date'
}) {
  const hasValue = value && value.trim() !== '';
  
  const inputClasses = `w-full mt-1 px-2.5 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
    hasValue
      ? 'border-growi-success/50 bg-growi-success/5 text-foreground focus:ring-growi-success/50'
      : 'border-border bg-background text-muted-foreground focus:ring-growi-blue/50'
  }`;
  
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Not specified"
          className={`${inputClasses} min-h-[50px]`}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Not specified"
          className={inputClasses}
        />
      )}
    </div>
  );
}

function RewardEventField({
                            label,
                            eventType,
                            enabled,
                            amount,
                            onToggle,
                            onAmountChange,
                          }: {
  label: string
  eventType: string
  enabled?: boolean
  amount?: number
  onToggle?: (enabled: boolean) => void
  onAmountChange?: (amount: number) => void
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-2.5 py-2 transition-all ${
        enabled ? 'border-growi-success/50 bg-growi-success/5' : 'border-border bg-background'
      }`}
    >
      <label className="flex flex-1 cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={enabled || false}
          onChange={(e) => onToggle?.(e.target.checked)}
          className="h-4 w-4 rounded text-growi-blue focus:ring-2 focus:ring-growi-blue/50"
        />
        <div className="flex flex-col">
          <span
            className={`text-sm ${enabled ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
          >
            {label}
          </span>
          <span className="text-xs text-muted-foreground">{eventType}</span>
        </div>
      </label>
      {enabled && (
        <div className="flex items-center gap-1 rounded bg-secondary px-2 py-1">
          <span className="text-xs text-muted-foreground">$</span>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={amount || 0.01}
            onChange={(e) => onAmountChange?.(parseFloat(e.target.value) || 0.01)}
            className="w-16 bg-transparent text-sm text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
