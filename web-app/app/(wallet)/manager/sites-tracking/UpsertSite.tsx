import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { SiteResponseDTO, UpsertSiteInput } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Loader2, Save, X } from 'lucide-react';
import { useState } from 'react';

interface UpsertSiteProps {
  isOpen: boolean,
  close: () => void,
  siteId: string,
  site: SiteResponseDTO,
  reload: () => void,
  showSuccess: (message: string) => void,
}

export const UpsertSite = ({
                             siteId,
                             site,
                             showSuccess,
                             reload,
                             isOpen,
                             close,
                           }: UpsertSiteProps) => {
  
  const { address } = useWallet();
  
  const [ formData, setFormData ] = useState<UpsertSiteInput>({
    name: site.name,
    description: site.description,
    url: site.url,
  });
  const [ isSaving, setIsSaving ] = useState(false);
  const [ formError, setFormError ] = useState<string | null>(null);
  
  const isEditing = siteId !== '';
  
  const handleSave = async () => {
    
    if (!formData.name.trim()) {
      setFormError('Site name is required');
      return;
    }
    
    if (!formData.url.trim()) {
      setFormError('Site URL is required');
      return;
    }
    
    // Validate URL format
    try {
      new URL(formData.url);
    } catch {
      setFormError('Please enter a valid URL');
      return;
    }
    
    try {
      setIsSaving(true);
      setFormError(null);
      
      const url = (isEditing ? `/api/sites/${siteId}` : '/api/sites') + `?walletAddress=${address}`;
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to save site');
      }
      
      reload();
      close();
      showSuccess(isEditing ? 'Site updated successfully' : 'Site created successfully');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save');
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
                    {isEditing ? 'Edit Site' : 'Create Site'}
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
                  <label className="text-sm font-medium text-foreground">Site Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., My E-commerce Store"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Site URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your site"
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-growi-blue/50 resize-none"
                  />
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
                        {isEditing ? 'Save Changes' : 'Create Site'}
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
