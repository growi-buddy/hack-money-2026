import { CampaignRewardEventInput, CreateCampaignInput } from '@/types';
import { CampaignFormData } from '@/types/campaign-form';

/**
 * Maps campaign form data to API input.
 * Requires rewardEventIds to be pre-created and passed in the formData.
 */
export function mapCampaignFormToAPI(formData: CampaignFormData): CreateCampaignInput {
  const siteEvents: CampaignRewardEventInput[] = [];
  
  // Map selected reward events from the form
  if (formData.selectedRewardEvents) {
    for (const selectedEvent of formData.selectedRewardEvents) {
      siteEvents.push({
        siteEventId: selectedEvent.rewardEventId,
        amount: selectedEvent.amount,
        volumeStep: selectedEvent.volumeStep || 1,
      });
    }
  }
  
  return {
    title: formData.name || 'Draft',
    description: formData.description,
    budgetTotal: formData.budget || 0,
    slots: formData.slots || 10,
    interests: formData.interests || [],
    demographics: formData.demographics || [],
    regions: formData.geographic?.regions || [],
    countries: formData.geographic?.countries || [],
    startDate: new Date(formData.startDate || 0).toISOString(),
    endDate: new Date(formData.endDate || 0).toISOString(),
    siteEvents,
  };
}

/**
 * Validates that the form data is sufficient to create a campaign
 */
export function validateCampaignForm(formData: CampaignFormData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!formData.name || formData.name.trim() === '') {
    errors.push('Campaign name is required');
  }

  if (!formData.budget || formData.budget <= 0) {
    errors.push('Budget must be greater than 0');
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.push('Description is required');
  }

  // Validate that at least one reward event is selected with amount > 0
  const hasRewardEvents = formData.selectedRewardEvents &&
    formData.selectedRewardEvents.length > 0 &&
    formData.selectedRewardEvents.some(e => e.amount > 0);

  if (!hasRewardEvents) {
    errors.push('You must select at least one reward event with an amount greater than 0');
  }

  // Validate dates
  if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end <= start) {
      errors.push('End date must be after start date');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates useful campaign statistics
 */
export function calculateCampaignStats(formData: CampaignFormData) {
  const selectedEvents = formData.selectedRewardEvents || [];
  
  const totalRewardsCost = selectedEvents.reduce((sum, event) => {
    return sum + (event.amount || 0);
  }, 0);
  
  const averageRewardPrice = selectedEvents.length > 0
    ? totalRewardsCost / selectedEvents.length
    : 0;
  
  const estimatedActions = formData.budget && averageRewardPrice > 0
    ? Math.floor(formData.budget / averageRewardPrice)
    : 0;
  
  return {
    enabledRewardsCount: selectedEvents.length,
    totalRewardsCost,
    averageRewardPrice,
    estimatedActions,
    budget: formData.budget || 0,
  };
}
