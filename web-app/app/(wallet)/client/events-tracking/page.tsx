'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletButton } from '@/components/wallet-button';
import { API_BASE_URL } from '@/config/envs';
import { useWallet } from '@/contexts/wallet-context';
import { scaleIn, staggerContainer, staggerItem } from '@/lib/animations';
import { EventType, SelectorEventType } from '@/lib/db/enums';
import { RewardEventDTO, SelectorDTO } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Code,
  Copy,
  Loader2,
  MousePointer2,
  Pencil,
  Plus,
  Save,
  Trash2,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: 'Landing Page View',
  [EventType.VIEW_ITEM]: 'View Item',
  [EventType.ADD_TO_CART]: 'Add to Cart',
  [EventType.CHECKOUT]: 'Checkout',
  [EventType.PURCHASE_SUCCESS]: 'Purchase Success',
};

const SELECTOR_EVENT_TYPE_LABELS: Record<SelectorEventType, string> = {
  [SelectorEventType.ONCLICK]: 'Click',
  [SelectorEventType.HOVER]: 'Hover',
  [SelectorEventType.DOUBLE_CLICK]: 'Double Click',
};

interface RewardEventForm {
  id?: string;
  name: string;
  eventType: EventType;
  selectors: SelectorDTO[];
}

const EMPTY_FORM: RewardEventForm = {
  name: '',
  eventType: EventType.LANDING_PAGE_VIEW,
  selectors: [],
};

const EMPTY_SELECTOR: Omit<SelectorDTO, 'id'> = {
  selector: '',
  eventType: SelectorEventType.ONCLICK,
  isActive: true,
};

export default function RewardEventsPage() {
  const { address, isConnected, connect } = useWallet();
  const [ rewardEvents, setRewardEvents ] = useState<RewardEventDTO[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ successMessage, setSuccessMessage ] = useState<string | null>(null);
  
  // Form state
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ formData, setFormData ] = useState<RewardEventForm>(EMPTY_FORM);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ formError, setFormError ] = useState<string | null>(null);
  
  // Delete confirmation
  const [ deleteId, setDeleteId ] = useState<string | null>(null);
  const [ isDeleting, setIsDeleting ] = useState(false);
  
  // Script generation state
  const [ showScript, setShowScript ] = useState(false);
  const [ copied, setCopied ] = useState(false);
  const [ displayedScript, setDisplayedScript ] = useState('');
  
  const fetchRewardEvents = useCallback(async () => {
    if (!address) {
      setRewardEvents([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/reward-events?walletAddress=${address}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch reward events');
      }
      
      setRewardEvents(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [ address ]);
  
  useEffect(() => {
    fetchRewardEvents();
  }, [ fetchRewardEvents ]);
  
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };
  
  const openCreateForm = () => {
    setFormData(EMPTY_FORM);
    setIsEditing(false);
    setFormError(null);
    setIsFormOpen(true);
  };
  
  const openEditForm = (event: RewardEventDTO) => {
    setFormData({
      id: event.id,
      name: event.name,
      eventType: event.eventType,
      selectors: event.selectors || [],
    });
    setIsEditing(true);
    setFormError(null);
    setIsFormOpen(true);
  };
  
  const closeForm = () => {
    setIsFormOpen(false);
    setFormData(EMPTY_FORM);
    setFormError(null);
  };
  
  const addSelector = () => {
    setFormData(prev => ({
      ...prev,
      selectors: [ ...prev.selectors, { ...EMPTY_SELECTOR } ],
    }));
  };
  
  const updateSelector = (index: number, field: keyof SelectorDTO, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      selectors: prev.selectors.map((sel, i) =>
        i === index ? { ...sel, [field]: value } : sel,
      ),
    }));
  };
  
  const removeSelector = (index: number) => {
    setFormData(prev => ({
      ...prev,
      selectors: prev.selectors.filter((_, i) => i !== index),
    }));
  };
  
  const handleSave = async () => {
    if (!address) {
      setFormError('Please connect your wallet');
      return;
    }
    
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    // Validate selectors
    for (const sel of formData.selectors) {
      if (!sel.selector.trim()) {
        setFormError('All selectors must have a CSS selector');
        return;
      }
    }
    
    try {
      setIsSaving(true);
      setFormError(null);
      
      const payload = {
        walletAddress: address,
        name: formData.name,
        eventType: formData.eventType,
        selectors: formData.selectors.map(sel => ({
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive ?? true,
        })),
      };
      
      const url = isEditing ? `/api/reward-events/${formData.id}` : '/api/reward-events';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to save reward event');
      }
      
      await fetchRewardEvents();
      closeForm();
      showSuccess(isEditing ? 'Reward event updated' : 'Reward event created');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!deleteId || !address) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/reward-events/${deleteId}?walletAddress=${address}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete');
      }
      
      await fetchRewardEvents();
      setDeleteId(null);
      showSuccess('Reward event deleted');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setDeleteId(null);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getScriptContent = () => {
    return `<script>
  (function() {
    const script = document.createElement('script');
    script.src = '${API_BASE_URL}/api/scripts/client?v=' + Date.now();
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
`;
  };
  
  const generateScript = () => {
    
    const script = getScriptContent();
    
    setShowScript(true);
    setDisplayedScript('');
    
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      if (i < script.length) {
        setDisplayedScript(script.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
  };
  
  const copyScript = async () => {
    const script = getScriptContent();
    if (!script) return;
    
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <motion.div
                animate={{ scale: [ 1, 1.05, 1 ] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
              >
                <Wallet className="h-10 w-10 text-growi-blue" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">Connect Your Wallet</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Connect your wallet to manage your reward events.
              </p>
              <WalletButton />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events Tracking</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your reward event templates for campaigns
          </p>
        </div>
        <Button
          onClick={openCreateForm}
          className="bg-growi-blue text-white hover:bg-growi-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </motion.div>
      
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-growi-success/10 p-3 text-sm text-growi-success"
          >
            <CheckCircle2 className="h-4 w-4" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
          </CardContent>
        </Card>
      )}
      
      {/* Reward Events List */}
      {!loading && rewardEvents.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {rewardEvents.map((event) => (
            <motion.div key={event.id} variants={staggerItem}>
              <Card className="group transition-colors hover:border-growi-blue/50">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{event.name}</CardTitle>
                      <CardDescription>
                        <span className="inline-flex items-center gap-1 rounded-full bg-growi-blue/10 px-2 py-0.5 text-xs font-medium text-growi-blue">
                          <Zap className="h-3 w-3" />
                          {EVENT_TYPE_LABELS[event.eventType]}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => openEditForm(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteId(event.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.selectors && event.selectors.length > 0 ? (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">
                        Selectors ({event.selectors.length})
                      </p>
                      {event.selectors.slice(0, 3).map((sel, idx) => (
                        <div
                          key={sel.id || idx}
                          className="flex items-center gap-2 rounded bg-secondary/50 px-2 py-1 text-xs"
                        >
                          <MousePointer2 className="h-3 w-3 text-muted-foreground" />
                          <code className="flex-1 truncate text-foreground">{sel.selector}</code>
                          <span className="text-muted-foreground">
                            {SELECTOR_EVENT_TYPE_LABELS[sel.eventType]}
                          </span>
                        </div>
                      ))}
                      {event.selectors.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{event.selectors.length - 3} more
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No selectors defined</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Empty State */}
      {!loading && rewardEvents.length === 0 && (
        <motion.div variants={scaleIn} initial="hidden" animate="visible">
          <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <motion.div
                animate={{ y: [ 0, -8, 0 ], rotate: [ 0, 5, -5, 0 ] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
              >
                <Zap className="h-10 w-10 text-growi-blue" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">No Events Tracking Yet</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Create reward event templates to use in your campaigns. Define what user actions
                you want to track and reward.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                <Button
                  size="lg"
                  className="bg-growi-blue text-white hover:bg-growi-blue/90"
                  onClick={openCreateForm}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Event
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Generate Tracking Script Section */}
      {!loading && (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Code className="h-5 w-5 text-growi-blue" />
                Generate Tracking Script
              </CardTitle>
              <CardDescription>
                Select a campaign and generate your custom tracking script to add to your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={generateScript}
                  className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90 disabled:opacity-50"
                >
                  <motion.div
                    className="absolute inset-0 bg-growi-lime/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Code className="mr-2 h-4 w-4" />
                  Generate Tracking Script
                </Button>
              </motion.div>
              
              <AnimatePresence>
                {showScript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <pre className="max-h-64 overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
                        <code>{displayedScript}</code>
                      </pre>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-2 top-2"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={copyScript}
                          className="bg-slate-800 text-slate-100 hover:bg-slate-700"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-1"
                              >
                                <Check className="h-4 w-4 text-growi-success" />
                                Copied!
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-1"
                              >
                                <Copy className="h-4 w-4" />
                                Copy
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-lg border border-growi-yellow/30 bg-growi-yellow/10 p-4"
                    >
                      <p className="text-sm text-foreground">
                        <strong>Instructions:</strong> Paste this script before the closing{' '}
                        <code className="rounded bg-secondary px-1 py-0.5 font-mono text-growi-blue">{'</head>'}</code>{' '}
                        tag in your website.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Create/Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <Card>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {isEditing ? 'Edit Reward Event' : 'Create Reward Event'}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                  {/* Form Error */}
                  {formError && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {formError}
                    </div>
                  )}
                  
                  {/* Name Field */}
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Product Page View"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50"
                    />
                  </div>
                  
                  {/* Event Type Field */}
                  <div>
                    <label className="text-sm font-medium text-foreground">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, eventType: e.target.value as EventType }))
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50"
                    >
                      {Object.entries(EVENT_TYPE_LABELS).map(([ value, label ]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Selectors */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        CSS Selectors (optional)
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addSelector}
                        className="text-growi-blue hover:text-growi-blue/80"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.selectors.map((sel, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 rounded-lg border border-border p-2"
                        >
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={sel.selector}
                              onChange={(e) => updateSelector(index, 'selector', e.target.value)}
                              placeholder=".btn-primary, #add-to-cart"
                              className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-growi-blue/50"
                            />
                            <div className="flex items-center gap-2">
                              <select
                                value={sel.eventType}
                                onChange={(e) =>
                                  updateSelector(index, 'eventType', e.target.value as SelectorEventType)
                                }
                                className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-growi-blue/50"
                              >
                                {Object.entries(SELECTOR_EVENT_TYPE_LABELS).map(([ value, label ]) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                              <label className="flex items-center gap-1.5 text-sm">
                                <input
                                  type="checkbox"
                                  checked={sel.isActive ?? true}
                                  onChange={(e) => updateSelector(index, 'isActive', e.target.checked)}
                                  className="h-4 w-4 rounded text-growi-blue"
                                />
                                <span className="text-muted-foreground">Active</span>
                              </label>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSelector(index)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {formData.selectors.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-3 border border-dashed border-border rounded-lg">
                          No selectors added. Click &quot;Add&quot; to define CSS selectors for tracking.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={closeForm}
                      className="flex-1"
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {isEditing ? 'Save Changes' : 'Create Event'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Reward Event</CardTitle>
                  <CardDescription>
                    Are you sure you want to delete this reward event? This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteId(null)}
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </>
                    )}
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
