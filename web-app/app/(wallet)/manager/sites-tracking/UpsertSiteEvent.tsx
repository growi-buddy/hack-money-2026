import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { SelectorEventType, SiteEventType } from '@/lib/db/enums';
import { SelectorDTO, SiteResponseDTO, UpsertSiteEventInput } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Loader2, Plus, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const EMPTY_SELECTOR: SiteResponseDTO['events'][number]['selectors'][number] = {
  id: '',
  selector: '',
  eventType: SelectorEventType.ONCLICK,
  isActive: true,
  createdAt: 0,
  updatedAt: 0,
};

interface UpsertSiteEventProps {
  isOpen: boolean,
  close: () => void,
  siteId: string,
  siteEventId: string,
  siteEvent: SiteResponseDTO['events'][number],
  reload: () => void,
  showSuccess: (message: string) => void,
}

export const UpsertSiteEvent = ({
                                  siteId,
                                  siteEventId,
                                  siteEvent,
                                  showSuccess,
                                  reload,
                                  isOpen,
                                  close,
                                }: UpsertSiteEventProps) => {
  
  const { address } = useWallet();
  
  const [ formData, setFormData ] = useState(siteEvent);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ formError, setFormError ] = useState<string | null>(null);
  
  const isEditing = !!siteEventId;
  
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
    
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (formData.selectors.length === 0) {
      setFormError('At least one CSS selector is required');
      return;
    }
    
    for (const sel of formData.selectors) {
      if (!sel.selector.trim()) {
        setFormError('All selectors must have a CSS selector');
        return;
      }
    }
    
    try {
      setIsSaving(true);
      setFormError(null);
      
      const payload: UpsertSiteEventInput = {
        name: formData.name,
        eventType: formData.eventType,
        selectors: formData.selectors.map(sel => ({
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive ?? true,
        })),
      };
      
      const url = `/api/sites/${siteId}/events` + (isEditing ? `/${formData.id}` : '') + `?walletAddress=${address}`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to save site event');
      }
      
      reload();
      close();
      showSuccess(isEditing ? 'Site event updated' : 'Site event created');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save site event');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={close}
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
                    {isEditing ? 'Edit Site Event' : 'Create Site Event'}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={close}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {formError && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {formError}
                  </div>
                )}
                
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
                
                <div>
                  <label className="text-sm font-medium text-foreground">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        eventType: e.target.value as SiteEventType,
                        selectors: formData.selectors.map((sel) => ({
                          ...sel,
                          eventType: (e.target.value === SiteEventType.LANDING_PAGE_VIEW || e.target.value === SiteEventType.PURCHASE_SUCCESS) ? SelectorEventType.VISIT : SelectorEventType.ONCLICK,
                        })),
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50"
                  >
                    {Object.entries(SITE_EVENT_TYPE_LABELS).map(([ value, label ]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">
                      {formData.eventType === SiteEventType.LANDING_PAGE_VIEW || SiteEventType.PURCHASE_SUCCESS === formData.eventType
                        ? 'Contains urls ' : 'CSS Selectors'}
                      {(formData.eventType === SiteEventType.VIEW_ITEM || formData.eventType === SiteEventType.ADD_TO_CART || formData.eventType === SiteEventType.CHECKOUT) && (
                        ' (clic on)'
                      )}
                      <span className="text-destructive">*</span>
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
                            placeholder={formData.eventType === SiteEventType.LANDING_PAGE_VIEW
                              ? 'https://growi.app'
                              : formData.eventType === SiteEventType.PURCHASE_SUCCESS
                                ? 'https://growi.app/thanks'
                                : '.btn-primary, #add-to-cart'}
                            className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-growi-blue/50"
                          />
                          <div className="flex items-center gap-2">
                            {/*<select*/}
                            {/*  value={sel.eventType}*/}
                            {/*  onChange={(e) =>*/}
                            {/*    updateSelector(index, 'eventType', e.target.value as SelectorEventType)*/}
                            {/*  }*/}
                            {/*  className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-growi-blue/50"*/}
                            {/*>*/}
                            {/*  {Object.entries(SELECTOR_SITE_EVENT_TYPE_LABELS).map(([ value, label ]) => (*/}
                            {/*    <option key={value} value={value}>*/}
                            {/*      {label}*/}
                            {/*    </option>*/}
                            {/*  ))}*/}
                            {/*</select>*/}
                            {/*<label className="flex items-center gap-1.5 text-sm">*/}
                            {/*  <input*/}
                            {/*    type="checkbox"*/}
                            {/*    checked={sel.isActive ?? true}*/}
                            {/*    onChange={(e) => updateSelector(index, 'isActive', e.target.checked)}*/}
                            {/*    className="h-4 w-4 rounded text-growi-blue"*/}
                            {/*  />*/}
                            {/*  <span className="text-muted-foreground">Active</span>*/}
                            {/*</label>*/}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSelector(index)}
                          disabled={formData.selectors.length === 1}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 disabled:opacity-30"
                          title={formData.selectors.length === 1 ? 'At least one selector is required' : 'Remove selector'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {formData.selectors.length === 0 && (
                      <div className="text-center py-3 border border-dashed border-destructive/30 bg-destructive/5 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          At least one CSS selector is required
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click &quot;Add&quot; to define CSS selectors for tracking
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={close}
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
                        {isEditing ? 'Save Changes' : 'Create Site Event'}
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
  );
};
