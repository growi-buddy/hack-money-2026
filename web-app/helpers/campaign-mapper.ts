import { CampaignRewardEventInput, CreateCampaignInput } from '@/types';
import { CampaignFormData } from '@/types/campaign-form';

/**
 * Maps campaign form data to API input.
 * Requires rewardEventIds to be pre-created and passed in the formData.
 */
export function mapCampaignFormToAPI(
  formData: CampaignFormData,
  walletAddress: string,
): CreateCampaignInput {
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
    walletAddress,
    title: formData.name || 'Draft',
    description: formData.description,
    budgetTotal: formData.budget || 0,
    slots: formData.slots || 10,
    interests: formData.interests || [],
    demographics: formData.targetAudience?.demographics || [],
    regions: formData.geographic?.regions || [],
    countries: formData.geographic?.countries || [],
    startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
    endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    siteEvents,
  };
}

/**
 * Valida que los datos del formulario sean suficientes para crear una campaña
 */
export function validateCampaignForm(formData: CampaignFormData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!formData.name || formData.name.trim() === '') {
    errors.push('El nombre de la campaña es requerido');
  }
  
  if (!formData.budget || formData.budget <= 0) {
    errors.push('El presupuesto debe ser mayor a 0');
  }
  
  if (!formData.description || formData.description.trim() === '') {
    errors.push('La descripción es requerida');
  }
  
  // Validar que al menos un reward event esté seleccionado con amount > 0
  const hasRewardEvents = formData.selectedRewardEvents &&
    formData.selectedRewardEvents.length > 0 &&
    formData.selectedRewardEvents.some(e => e.amount > 0);
  
  if (!hasRewardEvents) {
    errors.push('Debes seleccionar al menos un evento de recompensa con un monto mayor a 0');
  }
  
  // Validar fechas
  if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (end <= start) {
      errors.push('La fecha de fin debe ser posterior a la fecha de inicio');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calcula estadísticas útiles de la campaña
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
