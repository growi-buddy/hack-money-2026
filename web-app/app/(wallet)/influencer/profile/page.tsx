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
import { InfluencerVerificationStatus, SocialMediaPlatform } from '@/lib/db/enums';
import { SocialMedia } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ExternalLink,
  Instagram,
  Link as LinkIcon,
  Loader2,
  MapPin,
  Plus,
  Save,
  ShieldCheck,
  Star,
  Trash2,
  Twitter,
  User,
  X,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  INSTAGRAM: Instagram,
  TIKTOK: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  YOUTUBE: Youtube,
  TWITTER: Twitter,
  OTHER: LinkIcon,
};

const platformLabels: Record<SocialMediaPlatform, string> = {
  INSTAGRAM: 'Instagram',
  TIKTOK: 'TikTok',
  YOUTUBE: 'YouTube',
  TWITTER: 'Twitter/X',
  OTHER: 'Other',
};

const interestOptions = [
  'Fashion', 'Sports', 'Fitness', 'Gaming', 'Tech', 'Beauty', 'Lifestyle',
  'Food', 'Travel', 'Music', 'Art', 'Photography', 'Health', 'Finance',
];

const affinityOptions = [
  'Gen Z', 'Millennials', 'Young Professionals', 'Parents', 'Students',
  'Entrepreneurs', 'Gamers', 'Athletes', 'Artists', 'Tech Enthusiasts',
];

export default function ProfilePage() {
  
  const [ isSaving, setIsSaving ] = useState(false);
  const [ isRequestingVerification, setIsRequestingVerification ] = useState(false);
  const [ showWelcomeModal, setShowWelcomeModal ] = useState(false);
  const [ socialMedias, setSocialMedias ] = useState<SocialMedia[]>([]);
  const [ selectedInterests, setSelectedInterests ] = useState<string[]>([]);
  const [ selectedAffinities, setSelectedAffinities ] = useState<string[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  const [ verificationSuccess, setVerificationSuccess ] = useState(false);
  const searchParams = useSearchParams();
  const welcome = searchParams.get('welcome');
  console.log({ welcome, showWelcomeModal });
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '/growi-mascot.png',
  });
  
  const { error: errorProfile, profile, isLoading, reload } = useProfile();
  
  useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      bio: profile.bio || '',
      avatar: profile.avatar || '/growi-mascot.png',
    });
    setSocialMedias(profile.socialMedias.map(sm => ({
      id: sm.id,
      platform: sm.platform as SocialMediaPlatform,
      username: sm.username,
      followers: sm.followers || '',
      url: sm.url || '',
    })));
    setSelectedInterests(profile.interests || []);
    setSelectedAffinities(profile.affinities || []);
  }, [ profile ]);
  
  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };
  useEffect(() => {
    if (welcome) {
      setShowWelcomeModal(true);
    }
  }, [ welcome ]);
  
  const handleSave = async () => {
    
    setIsSaving(true);
    setError(null);
    
    try {
      await fetch(`/api/users/profile?walletAddress=${profile.walletAddress}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          location: formData.location || null,
          bio: formData.bio || null,
          avatar: formData.avatar || null,
          interests: selectedInterests,
          affinities: selectedAffinities,
          socialMedias: socialMedias.map(sm => ({
            platform: sm.platform,
            username: sm.username,
            followers: sm.followers,
            url: sm.url,
          })),
        }),
      });
      
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleRequestVerification = async () => {
    setIsRequestingVerification(true);
    setError(null);
    setVerificationSuccess(false);
    
    try {
      const response = await fetch('/api/users/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: profile.walletAddress,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.error?.message || 'Failed to request verification');
        return;
      }
      
      setVerificationSuccess(true);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRequestingVerification(false);
    }
  };
  
  const addSocialMedia = () => {
    const newSocial: SocialMedia = {
      id: `new-${Date.now()}`,
      platform: SocialMediaPlatform.INSTAGRAM,
      username: '',
      followers: '',
      url: '',
    };
    setSocialMedias([ ...socialMedias, newSocial ]);
  };
  
  const removeSocialMedia = (id: string) => {
    setSocialMedias(socialMedias.filter(s => s.id !== id));
  };
  
  const updateSocialMedia = (id: string, field: keyof SocialMedia, value: string) => {
    setSocialMedias(socialMedias.map(s =>
      s.id === id ? { ...s, [field]: value } : s,
    ));
  };
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [ ...prev, interest ],
    );
  };
  
  const toggleAffinity = (affinity: string) => {
    setSelectedAffinities(prev =>
      prev.includes(affinity)
        ? prev.filter(a => a !== affinity)
        : [ ...prev, affinity ],
    );
  };
  
  const totalFollowers = socialMedias.reduce((acc, s) => {
    const num = Number.parseFloat(s.followers.replace(/[^0-9.]/g, '')) || 0;
    const multiplier = s.followers.toLowerCase().includes('k') ? 1000 :
      s.followers.toLowerCase().includes('m') ? 1000000 : 1;
    return acc + (num * multiplier);
  }, 0);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
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
                  Welcome to the Influencer Portal
                </h2>
                <p className="text-muted-foreground">
                  Complete your profile details to get discovered by brands
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
          <div className="flex items-center gap-2">
            {profile.influencerVerification !== InfluencerVerificationStatus.VERIFIED &&
              profile.influencerVerification !== InfluencerVerificationStatus.PENDING && (
                <Button
                  onClick={handleRequestVerification}
                  disabled={isRequestingVerification || socialMedias.length === 0}
                  variant="outline"
                  size="sm"
                  className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                >
                  {isRequestingVerification ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Requesting...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Verify Profile
                    </>
                  )}
                </Button>
              )}
            {profile.influencerVerification === InfluencerVerificationStatus.PENDING && (
              <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Pending
              </Badge>
            )}
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
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your public profile visible to brands
        </p>
      </div>
      
      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}
      
      {errorProfile && (
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          {errorProfile}
        </div>
      )}
      
      {verificationSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-growi-success/10 p-4 text-growi-success"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <span>Verification request submitted successfully! We&#39;ll review your profile and social media
              accounts.
            </span>
          </div>
        </motion.div>
      )}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Profile Preview Card */}
        <motion.div variants={staggerItem} className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto mb-4 relative"
              >
                <Image
                  src={formData.avatar || '/growi-mascot.png'}
                  alt={formData.name || 'Profile'}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-growi-blue/20"
                />
                {profile.influencerVerification === InfluencerVerificationStatus.VERIFIED && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-growi-success text-white">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
                {profile.influencerVerification === InfluencerVerificationStatus.PENDING && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white">
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Pending
                  </Badge>
                )}
                {profile.influencerVerification === InfluencerVerificationStatus.NONE && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-500 text-white">
                    Not Verified
                  </Badge>
                )}
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
                      className={`h-5 w-5 ${i < 4 ? 'fill-growi-yellow text-growi-yellow' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  New Influencer
                </p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-growi-blue">
                    {totalFollowers >= 1000000
                      ? `${(totalFollowers / 1000000).toFixed(1)}M`
                      : totalFollowers >= 1000
                        ? `${(totalFollowers / 1000).toFixed(0)}K`
                        : totalFollowers.toString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-growi-money">{profile?._count?.participations || 0}</p>
                  <p className="text-xs text-muted-foreground">Campaigns</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Connected Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {socialMedias.filter(s => s.username).map((social) => {
                    const IconComponent = platformIcons[social.platform] || LinkIcon;
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs hover:bg-secondary/80 transition-colors"
                      >
                        <IconComponent className="h-3 w-3" />
                        {social.followers || '0'}
                      </a>
                    );
                  })}
                  {socialMedias.filter(s => s.username).length === 0 && (
                    <p className="text-xs text-muted-foreground">No platforms connected</p>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Interests</p>
                <div className="flex flex-wrap gap-1">
                  {selectedInterests.length > 0 ? selectedInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  )) : (
                    <p className="text-xs text-muted-foreground">No interests selected</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Audience</p>
                <div className="flex flex-wrap gap-1">
                  {selectedAffinities.length > 0 ? selectedAffinities.map((affinity) => (
                    <Badge key={affinity} className="bg-growi-blue/20 text-growi-blue text-xs">
                      {affinity}
                    </Badge>
                  )) : (
                    <p className="text-xs text-muted-foreground">No audience selected</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Edit Form */}
        <motion.div variants={staggerItem} className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
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
                  placeholder="Tell brands about yourself..."
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Social Media Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <LinkIcon className="h-5 w-5 text-growi-blue" />
                  Social Media Accounts
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addSocialMedia}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Account
                </Button>
              </div>
              <CardDescription>
                Connect your social media accounts to show your reach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialMedias.map((social, index) => {
                const IconComponent = platformIcons[social.platform] || LinkIcon;
                return (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 sm:flex-row sm:items-end"
                  >
                    <div className="w-full space-y-2 sm:w-32">
                      <Label>Platform</Label>
                      <select
                        value={social.platform}
                        onChange={(e) => updateSocialMedia(social.id, 'platform', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {Object.entries(platformLabels).map(([ value, label ]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Username</Label>
                      <Input
                        value={social.username}
                        onChange={(e) => updateSocialMedia(social.id, 'username', e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                    <div className="w-full space-y-2 sm:w-28">
                      <Label>Followers</Label>
                      <Input
                        value={social.followers}
                        onChange={(e) => updateSocialMedia(social.id, 'followers', e.target.value)}
                        placeholder="125K"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Profile URL</Label>
                      <Input
                        value={social.url}
                        onChange={(e) => updateSocialMedia(social.id, 'url', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-2">
                      {social.url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialMedia(social.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
              {socialMedias.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No social media accounts added yet
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Interests & Affinities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Interests & Audience Affinities</CardTitle>
              <CardDescription>
                Select tags to help brands find you for relevant campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Content Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <motion.button
                      key={interest}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedInterests.includes(interest)
                          ? 'bg-growi-blue text-white'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Audience Demographics</Label>
                <div className="flex flex-wrap gap-2">
                  {affinityOptions.map((affinity) => (
                    <motion.button
                      key={affinity}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAffinity(affinity)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedAffinities.includes(affinity)
                          ? 'bg-growi-money text-white'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {affinity}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
