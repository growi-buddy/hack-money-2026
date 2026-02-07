'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MapPin, Save, Star, User, X } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientProfilePage() {
  const [ isSaving, setIsSaving ] = useState(false);
  const [ showWelcomeModal, setShowWelcomeModal ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const welcome = searchParams.get('welcome');
  
  const { error: errorProfile, profile, isLoading, reload } = useProfile();
  
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '/growi-mascot.png',
  });
  
  useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      bio: profile.bio || '',
      avatar: profile.avatar || '/growi-mascot.png',
    });
  }, [ profile ]);
  
  useEffect(() => {
    if (welcome) {
      setShowWelcomeModal(true);
    }
  }, [ welcome ]);
  
  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/profile?walletAddress=${profile.walletAddress}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          location: formData.location || null,
          bio: formData.bio || null,
          avatar: formData.avatar || null,
        }),
      });
      
      const data = await response.json();
      
      if (data?.error) {
        setError(data.error?.message || 'An error occurred');
      }
      
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  const formatBudget = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeWelcomeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative mx-4 w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeWelcomeModal}
                className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-blue/10">
                  <User className="h-8 w-8 text-growi-blue" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Welcome to the Campaign Manager Portal
                </h2>
                <p className="text-muted-foreground">Complete your profile details</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
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
                Save Profile
              </>
            )}
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your campaign manager profile
        </p>
      </div>
      
      {error && <div className="rounded-lg bg-destructive/10 p-4 text-destructive">{error}</div>}
      
      {errorProfile && <div className="rounded-lg bg-destructive/10 p-4 text-destructive">{errorProfile}</div>}
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3 items-stretch"
      >
        {/* Profile Preview Card */}
        <motion.div variants={staggerItem} className="lg:col-span-1 h-full">
          <Card className="h-full">
            <CardHeader className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} className="mx-auto mb-4 relative">
                <Image
                  src={formData.avatar || '/growi-mascot.png'}
                  alt={formData.name || 'Profile'}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-growi-blue/20"
                />
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-growi-success text-white">
                  Verified
                </Badge>
              </motion.div>
              <CardTitle className="text-foreground">{formData.name || 'Your Name'}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {formData.location || 'Location'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Star Rating - placeholder */}
              <div className="text-center">
                <div className="flex justify-center gap-1">
                  {[ ...Array(5) ].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'fill-growi-yellow text-growi-yellow' : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Campaign Manager</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-growi-blue">{formatBudget(profile.budgetSpent || 0)}</p>
                  <p className="text-xs text-muted-foreground">Budget Spent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-growi-money">{profile._count?.campaignsCreated || 0}</p>
                  <p className="text-xs text-muted-foreground">Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Edit Form */}
        <motion.div variants={staggerItem} className="lg:col-span-2 h-full">
          {/* Personal Information */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-growi-blue" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell others about your business..."
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
