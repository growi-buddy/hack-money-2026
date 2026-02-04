import { CampaignFormData } from '@/types/campaign-form';
import { CreateCampaignInput } from '@/types/dto';
import { EventType } from '@/lib/db/prisma/generated/enums';

/**
 * Mapea los datos del formulario de campaña AI al formato esperado por la API
 */
export function mapCampaignFormToAPI(
  formData: CampaignFormData,
  brandId: string,
  escrowAddress: string
): CreateCampaignInput {
  const payoutRates = [];

  // Mapear rewards a payout rates
  if (formData.rewards?.landingPageView?.enabled && formData.rewards.landingPageView.pricePerView) {
    payoutRates.push({
      eventType: EventType.VISIT_PAGE,
      amount: formData.rewards.landingPageView.pricePerView,
      volumeStep: 1,
    });
  }

  // Item View -> VISIT_PAGE (o puedes crear un nuevo EventType si es necesario)
  if (formData.rewards?.itemView?.enabled && formData.rewards.itemView.pricePerClick) {
    payoutRates.push({
      eventType: EventType.VISIT_PAGE,
      amount: formData.rewards.itemView.pricePerClick,
      volumeStep: 1,
    });
  }

  // Add to Cart -> ADD_CART
  if (formData.rewards?.addToCart?.enabled && formData.rewards.addToCart.pricePerClick) {
    payoutRates.push({
      eventType: EventType.ADD_CART,
      amount: formData.rewards.addToCart.pricePerClick,
      volumeStep: 1,
    });
  }

  // Checkout -> BUY_PRODUCT
  if (formData.rewards?.checkout?.enabled && formData.rewards.checkout.pricePerClick) {
    payoutRates.push({
      eventType: EventType.BUY_PRODUCT,
      amount: formData.rewards.checkout.pricePerClick,
      volumeStep: 1,
    });
  }

  // Thank You View -> VISIT_PAGE (página de agradecimiento)
  if (formData.rewards?.thankYouView?.enabled && formData.rewards.thankYouView.pricePerView) {
    payoutRates.push({
      eventType: EventType.VISIT_PAGE,
      amount: formData.rewards.thankYouView.pricePerView,
      volumeStep: 1,
    });
  }

  return {
    brandId,
    title: formData.name || 'Campaña sin nombre',
    escrowAddress,
    budgetTotal: formData.budget || 0,
    payoutRates,
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

  // Validar que al menos un reward esté habilitado
  const hasRewards = Object.values(formData.rewards || {}).some(
    (reward) => reward?.enabled && reward && 'pricePerView' in reward 
      ? reward.pricePerView && reward.pricePerView > 0
      : reward && 'pricePerClick' in reward && reward.pricePerClick && reward.pricePerClick > 0
  );

  if (!hasRewards) {
    errors.push('Debes habilitar al menos un tipo de recompensa');
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
  const enabledRewards = Object.entries(formData.rewards || {}).filter(
    ([, reward]) => reward?.enabled
  );

  const totalRewardsCost = enabledRewards.reduce((sum, [, reward]) => {
    const price = reward && 'pricePerView' in reward 
      ? reward.pricePerView || 0
      : reward && 'pricePerClick' in reward 
        ? reward.pricePerClick || 0 
        : 0;
    return sum + price;
  }, 0);

  const averageRewardPrice = enabledRewards.length > 0 
    ? totalRewardsCost / enabledRewards.length 
    : 0;

  const estimatedActions = formData.budget && averageRewardPrice > 0
    ? Math.floor(formData.budget / averageRewardPrice)
    : 0;

  return {
    enabledRewardsCount: enabledRewards.length,
    totalRewardsCost,
    averageRewardPrice,
    estimatedActions,
    budget: formData.budget || 0,
  };
}
