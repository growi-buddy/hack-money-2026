'use client';

import { CampaignDashboardData } from '@/app/api/campaigns/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Save, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface EditFormData {
  title: string;
  description: string;
  interests: string[];
  slots: number;
  budget: number;
  startDate: string;
  endDate: string;
}

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;
  
  const [ campaign, setCampaign ] = useState<CampaignDashboardData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ saveError, setSaveError ] = useState<string | null>(null);
  
  const [ formData, setFormData ] = useState<EditFormData>({
    title: '',
    description: '',
    interests: [],
    slots: 10,
    budget: 0,
    startDate: '',
    endDate: '',
  });
  
  const [ interestInput, setInterestInput ] = useState('');
  
  // Fetch campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/campaigns/${campaignId}?dashboard=true`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch campaign');
        }
        
        setCampaign(data.data);
        
        // Check if campaign is in DRAFT status
        if (data.data.status !== CampaignStatus.DRAFT) {
          setError('Only campaigns in DRAFT status can be edited');
          return;
        }
        
        // Populate form data
        setFormData({
          title: data.data.title,
          description: data.data.description || '',
          interests: data.data.interests || [],
          slots: data.data.slots || 10,
          budget: data.data.budgetTotal || 0,
          startDate: data.data.startDate ? new Date(data.data.startDate).toISOString().split('T')[0] : '',
          endDate: data.data.endDate ? new Date(data.data.endDate).toISOString().split('T')[0] : '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (campaignId) {
      fetchCampaign();
    }
  }, [ campaignId ]);
  
  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [ ...prev.interests, interestInput.trim() ],
      }));
      setInterestInput('');
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          interests: formData.interests,
          slots: formData.slots,
          budgetTotal: formData.budget,
          startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
          endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update campaign');
      }
      
      router.push(`/manager/campaigns/${campaignId}`);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
      </div>
    );
  }
  
  if (error || !campaign) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-destructive">{error || 'Campaign not found'}</p>
          <Link href="/manager/campaigns">
            <Button variant="outline" className="mt-4">
              Back to Campaigns
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/manager/campaigns/${campaignId}`}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Campaign</h1>
              <p className="mt-1 text-sm text-muted-foreground">Update campaign details and settings</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            variant="outline"
            size="sm"
            className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Error Message */}
      {saveError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive flex items-center justify-between"
        >
          <span>{saveError}</span>
          <button onClick={() => setSaveError(null)} className="hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
      
      {/* Edit Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Campaign Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Campaign title"
              />
            </CardContent>
          </Card>
          
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Campaign description"
                rows={4}
              />
            </CardContent>
          </Card>
          
          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Campaign Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-muted-foreground">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-muted-foreground">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Available Slots</CardTitle>
              <CardDescription>Number of influencer slots available</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                min="1"
                max="1000"
                value={formData.slots}
                onChange={(e) => setFormData((prev) => ({ ...prev, slots: parseInt(e.target.value) || 10 }))}
              />
            </CardContent>
          </Card>
          
          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Interests</CardTitle>
              <CardDescription>Tags to help target the right influencers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add interest (e.g., Fashion, Tech)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddInterest}
                  variant="outline"
                  className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                >
                  Add
                </Button>
              </div>
              
              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center gap-2 rounded-full bg-growi-blue/10 px-3 py-1 text-sm text-growi-blue"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="hover:opacity-70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Budget</CardTitle>
              <CardDescription>Campaign total budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="budget" className="text-sm font-medium text-muted-foreground">
                  Total Budget ($)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div className="rounded-lg bg-secondary/30 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Spent:</span>
                  <span className="font-semibold text-growi-money">${campaign.budgetSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-semibold text-foreground">
                    ${Math.max(0, formData.budget - campaign.budgetSpent).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
