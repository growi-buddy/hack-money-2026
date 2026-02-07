'use client';

import { UpsertSite } from '@/app/(wallet)/manager/sites-tracking/UpsertSite';
import { UpsertSiteEvent } from '@/app/(wallet)/manager/sites-tracking/UpsertSiteEvent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { API_BASE_URL } from '@/config/envs';
import { useWallet } from '@/contexts/wallet-context';
import { scaleIn, staggerContainer, staggerItem } from '@/lib/animations';
import { SELECTOR_SITE_EVENT_TYPE_LABELS, SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { SiteEventType } from '@/lib/db/enums';
import { SiteEventResponseDTO, SiteResponseDTO } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, Code, Copy, Loader2, MousePointer2, Pencil, Plus, Trash2, Zap } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const EMPTY_SITE: SiteResponseDTO = {
  id: '',
  name: '',
  url: '',
  description: '',
  events: [],
  createdAt: 0,
  updatedAt: 0,
};

const EMPTY_SITE_EVENT: SiteEventResponseDTO = {
  id: '',
  name: '',
  eventType: SiteEventType.LANDING_PAGE_VIEW,
  selectors: [ {
    id: '',
    selector: '',
    eventType: 'ONCLICK' as const,
    isActive: true,
    createdAt: 0,
    updatedAt: 0,
  } ],
  createdAt: 0,
  updatedAt: 0,
};

export default function RewardEventsPage() {
  
  const { address } = useWallet();
  
  const [ trigger, setTrigger ] = useState(0);
  const [ sites, setSites ] = useState<SiteResponseDTO[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ successMessage, setSuccessMessage ] = useState<string | null>(null);
  const [ upsertSite, setUpsertSite ] = useState<SiteResponseDTO | null>(null);
  const [ upsertSiteEvent, setUpsertSiteEvent ] = useState<SiteEventResponseDTO & { siteId: string } | null>(null);
  
  const [ deleteSiteId, setDeleteSiteId ] = useState<string | null>(null);
  const [ isDeletingSite, setIsDeletingSite ] = useState(false);
  
  const [ deleteSiteEventId, setDeleteSiteEventId ] = useState<string | null>(null);
  const [ isDeletingSiteEvent, setIsDeletingSiteEvent ] = useState(false);
  
  const [ showScript, setShowScript ] = useState(false);
  const [ copied, setCopied ] = useState(false);
  const [ displayedScript, setDisplayedScript ] = useState('');
  
  const fetchSites = useCallback(async () => {
    if (!address) {
      setSites([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/sites?walletAddress=${address}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch sites');
      }
      
      setSites(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [ address ]);
  
  useEffect(() => {
    void fetchSites();
  }, [ fetchSites, trigger ]);
  
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };
  
  const handleDeleteSite = async () => {
    if (!deleteSiteId) return;
    
    try {
      setIsDeletingSite(true);
      
      const response = await fetch(`/api/sites/${deleteSiteId}?walletAddress=${address}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete');
      }
      
      await fetchSites();
      setDeleteSiteId(null);
      showSuccess('Site deleted');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete site');
      setDeleteSiteId(null);
    } finally {
      setIsDeletingSite(false);
    }
  };
  
  const handleDeleteSiteEvent = async () => {
    if (!deleteSiteEventId) return;
    
    try {
      setIsDeletingSiteEvent(true);
      
      const response = await fetch(`/api/sites/events/${deleteSiteEventId}?walletAddress=${address}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete');
      }
      
      await fetchSites();
      setDeleteSiteEventId(null);
      showSuccess('Site event deleted');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete site event');
      setDeleteSiteEventId(null);
    } finally {
      setIsDeletingSiteEvent(false);
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
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Sites Tracking</h1>
          <Button
            onClick={() => setUpsertSite(EMPTY_SITE)}
            variant="outline"
            size="sm"
            className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Site
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your site event templates for campaigns
        </p>
      </div>
      
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
      
      {error && <ErrorCard error={error} />}
      
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      
      {!loading && sites.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {sites.map((site) => (
            <motion.div key={site.id} variants={staggerItem}>
              <Card className="group transition-colors hover:border-growi-blue/50 w-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-xl text-foreground">{site.name}</CardTitle>
                      <CardDescription className="text-sm">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-growi-blue hover:underline"
                        >
                          {site.url}
                        </a>
                      </CardDescription>
                      {site.description && (
                        <p className="text-sm text-muted-foreground mt-1">{site.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setUpsertSite(site)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteSiteId(site.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      Site Events ({site.events.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent h-7"
                      onClick={() => setUpsertSiteEvent({ ...EMPTY_SITE_EVENT, siteId: site.id })}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add Event
                    </Button>
                  </div>
                  
                  {site.events.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {site.events.map((event) => (
                        <div key={event.id} className="group/event">
                          <Card className="transition-colors hover:border-growi-blue/50 bg-secondary/20">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-1">
                                  <CardTitle className="text-base text-foreground">{event.name}</CardTitle>
                                  <CardDescription>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-growi-blue/10 px-2 py-0.5 text-xs font-medium text-growi-blue">
                                      <Zap className="h-3 w-3" />
                                      {SITE_EVENT_TYPE_LABELS[event.eventType]}
                                    </span>
                                  </CardDescription>
                                </div>
                                <div className="flex gap-1 opacity-0 transition-opacity group-hover/event:opacity-100">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                    onClick={() => setUpsertSiteEvent({ ...event, siteId: site.id })}
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                    onClick={() => setDeleteSiteEventId(event.id!)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
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
                                  {event.selectors.slice(0, 2).map((sel, idx) => (
                                    <div
                                      key={sel.id || idx}
                                      className="flex items-center gap-2 rounded bg-secondary/50 px-2 py-1 text-xs"
                                    >
                                      <MousePointer2 className="h-3 w-3 text-muted-foreground" />
                                      <code className="flex-1 truncate text-foreground">{sel.selector}</code>
                                      <span className="text-muted-foreground">
                                        {SELECTOR_SITE_EVENT_TYPE_LABELS[sel.eventType]}
                                      </span>
                                    </div>
                                  ))}
                                  {event.selectors.length > 2 && (
                                    <p className="text-xs text-muted-foreground">
                                      +{event.selectors.length - 2} more
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">No selectors defined</p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">No events for this site yet</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-growi-blue mt-2"
                        onClick={() => setUpsertSiteEvent({ ...EMPTY_SITE_EVENT, siteId: site.id })}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add your first event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Empty State */}
      {!loading && sites.length === 0 && (
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
              <h3 className="text-xl font-bold text-foreground">No Site Events Tracking Yet</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Create a site to start
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                <Button
                  size="lg"
                  className="bg-growi-blue text-white hover:bg-growi-blue/90"
                  onClick={() => setUpsertSite(EMPTY_SITE)}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create SIte
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
      
      {!!upsertSite && (
        <UpsertSite
          siteId={upsertSite.id}
          site={upsertSite}
          reload={() => setTrigger(Date.now())}
          isOpen
          close={() => setUpsertSite(null)}
          showSuccess={showSuccess}
        />
      )}
      
      {!!upsertSiteEvent && (
        <UpsertSiteEvent
          siteId={upsertSiteEvent.siteId}
          siteEventId={upsertSiteEvent.id}
          siteEvent={upsertSiteEvent}
          reload={() => setTrigger(Date.now())}
          isOpen
          close={() => setUpsertSiteEvent(null)}
          showSuccess={showSuccess}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteSiteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setDeleteSiteId(null)}
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
                  <CardTitle className="text-destructive">Delete Site</CardTitle>
                  <CardDescription>
                    Are you sure you want to delete this site? This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteSiteId(null)}
                    className="flex-1"
                    disabled={isDeletingSite}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteSite}
                    className="flex-1"
                    disabled={isDeletingSite}
                  >
                    {isDeletingSite ? (
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
        
        {deleteSiteEventId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setDeleteSiteEventId(null)}
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
                  <CardTitle className="text-destructive">Delete Site Event</CardTitle>
                  <CardDescription>
                    Are you sure you want to delete this site event? This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteSiteEventId(null)}
                    className="flex-1"
                    disabled={isDeletingSiteEvent}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteSiteEvent}
                    className="flex-1"
                    disabled={isDeletingSiteEvent}
                  >
                    {isDeletingSiteEvent ? (
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
