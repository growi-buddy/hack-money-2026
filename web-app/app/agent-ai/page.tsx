'use client';

import { mapCampaignFormToAPI, validateCampaignForm } from '@/helpers/campaign-mapper';
import { CampaignFormData } from '@/types/campaign-form';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  AlertCircle,
  Bot,
  Calendar,
  CheckCircle2,
  DollarSign,
  Globe,
  Loader2,
  Send,
  Sparkles,
  Target,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const INITIAL_CAMPAIGN_DATA: CampaignFormData = {
  name: '',
  description: '',
  duration: undefined,
  startDate: '',
  endDate: '',
  targetAudience: {
    gender: [],
    ageMin: undefined,
    ageMax: undefined,
  },
  geographic: {
    regions: [],
    countries: [],
  },
  interests: [],
  budget: undefined,
  rewards: {
    landingPageView: { enabled: false, pricePerView: undefined },
    itemView: { enabled: false, pricePerClick: undefined },
    addToCart: { enabled: false, pricePerClick: undefined },
    checkout: { enabled: false, pricePerClick: undefined },
    thankYouView: { enabled: false, pricePerView: undefined },
  },
};

export default function AgentAIPage() {
  const [ campaignData, setCampaignData ] = useState<CampaignFormData>(INITIAL_CAMPAIGN_DATA);
  const [ isCreating, setIsCreating ] = useState(false);
  const [ creationError, setCreationError ] = useState<string | null>(null);
  const [ input, setInput ] = useState('');
  const [ lastUpdatedField, setLastUpdatedField ] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat/campaign-creator',
      body: () => ({ campaignData }),
    }),
    onFinish: ({ message }) => {
      // Actualizar campaignData cuando el AI usa la herramienta
      const parts = message.parts || [];
      console.log('Message parts:', parts); // Debug
      
      for (const part of parts) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyPart = part as any;
        
        // Verificar si es un tool call de updateCampaignData
        if (part.type?.includes('updateCampaignData') || anyPart.toolName === 'updateCampaignData') {
          console.log('Tool part found:', part); // Debug
          
          // Intentar obtener los datos de diferentes estructuras posibles
          let newData: Partial<CampaignFormData> | null = null;
          
          if (anyPart.result?.data) {
            newData = anyPart.result.data;
          } else if (anyPart.args) {
            newData = anyPart.args;
          } else if (anyPart.input) {
            newData = anyPart.input;
          }
          
          console.log('New data extracted:', newData); // Debug
          
          if (newData && Object.keys(newData).length > 0) {
            setCampaignData(prev => ({
              ...prev,
              ...newData,
              targetAudience: {
                ...prev.targetAudience,
                ...newData.targetAudience,
              },
              geographic: {
                ...prev.geographic,
                ...newData.geographic,
              },
              rewards: {
                ...prev.rewards,
                ...newData.rewards,
              },
            }));
            
            // Mostrar qué campo se actualizó
            const updatedFields = Object.keys(newData).filter(key => newData && newData[key as keyof CampaignFormData] !== undefined);
            if (updatedFields.length > 0) {
              const fieldNames: Record<string, string> = {
                name: 'Nombre',
                description: 'Descripción',
                budget: 'Presupuesto',
                duration: 'Duración',
                startDate: 'Fecha inicio',
                endDate: 'Fecha fin',
              };
              
              const readableFields = updatedFields.map(f => fieldNames[f] || f);
              setLastUpdatedField(readableFields.join(', '));
              setTimeout(() => setLastUpdatedField(null), 3000);
            }
          }
        }
      }
    },
  });
  
  const isLoading = status === 'streaming' || status === 'submitted';
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ messages ]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    
    await sendMessage({
      role: 'user',
      parts: [ { type: 'text', text: userMessage } ],
    });
  };
  
  const calculateCompleteness = () => {
    let filled = 0;
    const total = 13; // número de campos principales
    
    if (campaignData.name) filled++;
    if (campaignData.description) filled++;
    if (campaignData.duration) filled++;
    if (campaignData.startDate) filled++;
    if (campaignData.endDate) filled++;
    if (campaignData.targetAudience?.gender?.length) filled++;
    if (campaignData.targetAudience?.ageMin) filled++;
    if (campaignData.targetAudience?.ageMax) filled++;
    if (campaignData.geographic?.regions?.length) filled++;
    if (campaignData.geographic?.countries?.length) filled++;
    if (campaignData.interests?.length) filled++;
    if (campaignData.budget) filled++;
    
    // Contar rewards habilitados
    const rewardsEnabled = Object.values(campaignData.rewards || {}).filter(r => r?.enabled).length;
    if (rewardsEnabled > 0) filled++;
    
    return Math.round((filled / total) * 100);
  };
  
  const handleCreateCampaign = async () => {
    setCreationError(null);
    
    // Validar datos del formulario
    const validation = validateCampaignForm(campaignData);
    if (!validation.valid) {
      setCreationError(validation.errors.join(', '));
      return;
    }
    
    setIsCreating(true);
    
    try {
      // NOTA: Estos valores deben venir del contexto de usuario/sesión
      // Por ahora usamos valores de ejemplo
      const brandId = 'REPLACE_WITH_USER_ID'; // TODO: Obtener del contexto de autenticación
      const escrowAddress = '0x0000000000000000000000000000000000000000'; // TODO: Generar o solicitar
      
      const campaignInput = mapCampaignFormToAPI(
        campaignData,
        brandId,
        escrowAddress,
      );
      
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignInput),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error al crear la campaña');
      }
      
      const result = await response.json();
      
      // Éxito
      alert(`¡Campaña creada exitosamente! ID: ${result.data.id}`);
      
      // Opcional: Redirigir a la página de la campaña
      // window.location.href = `/campaigns/${result.data.id}`;
      
      // O limpiar el formulario
      setCampaignData(INITIAL_CAMPAIGN_DATA);
      
    } catch (error) {
      console.error('Error al crear campaña:', error);
      setCreationError(
        error instanceof Error ? error.message : 'Error desconocido al crear la campaña',
      );
    } finally {
      setIsCreating(false);
    }
  };
  
  const completeness = calculateCompleteness();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-purple-600" />
            Asistente de Campañas AI
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Deja que nuestro agente AI te ayude a configurar tu campaña de marketing
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Panel de Chat */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: '600px' }}
          >
            <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Chat con AI
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <Bot className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-lg font-medium mb-2">¡Hola! Soy tu asistente de campañas</p>
                  <p className="text-sm mb-4">
                    Estoy aquí para ayudarte a configurar tu campaña de marketing.
                    <br />
                    Cuéntame sobre tu campaña para empezar.
                  </p>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto mt-6">
                    <button
                      onClick={() => setInput('Quiero crear una campaña de TikTok para mi marca, tengo $1,000 de presupuesto')}
                      className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-left"
                    >
                      📱 Campaña TikTok
                    </button>
                    <button
                      onClick={() => setInput('Necesito promocionar mi tienda online con Instagram Ads, presupuesto $500')}
                      className="px-4 py-2 text-sm bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors text-left"
                    >
                      📸 Instagram Shopping
                    </button>
                    <button
                      onClick={() => setInput('Quiero hacer remarketing para mi e-commerce con $2,000')}
                      className="px-4 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-left"
                    >
                      🛒 E-commerce + Remarketing
                    </button>
                    <button
                      onClick={() => setInput('Necesito una campaña para mi app DeFi con presupuesto de $5,000')}
                      className="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-left"
                    >
                      💰 Campaña DeFi/Crypto
                    </button>
                  </div>
                </div>
              )}
              
              {messages.map((message) => {
                const textParts = message.parts?.filter(p => p.type === 'text') || [];
                const toolParts = message.parts?.filter(p => p.type?.startsWith('tool-')) || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const messageText = textParts.map(p => (p as any).text).join('') || '';
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {messageText && (
                        <div className="text-sm whitespace-pre-wrap">
                          {messageText}
                        </div>
                      )}
                      
                      {toolParts.length > 0 && (
                        <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Datos actualizados</span>
                        </div>
                      )}
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  autoComplete="off"
                  className="flex-1 px-4 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Panel de Vista Previa */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: '600px' }}
          >
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4">
              <h2 className="text-xl font-semibold flex items-center justify-between">
                <span>Vista Previa de Campaña</span>
                <span className="text-sm font-normal">{completeness}% completo</span>
              </h2>
              <div className="mt-2 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completeness}%` }}
                />
              </div>
              
              {lastUpdatedField && (
                <div className="mt-2 flex items-center gap-2 text-sm animate-fade-in">
                  <Zap className="w-4 h-4" />
                  <span>Actualizado: {lastUpdatedField}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Información Básica */}
              <InfoCard
                icon={<Sparkles className="w-5 h-5" />}
                title="Información Básica"
                color="purple"
              >
                <Field
                  label="Nombre (ENS)"
                  value={campaignData.name}
                  onChange={(value) => setCampaignData(prev => ({ ...prev, name: value }))}
                />
                <Field
                  label="Descripción"
                  value={campaignData.description}
                  onChange={(value) => setCampaignData(prev => ({ ...prev, description: value }))}
                  multiline
                />
              </InfoCard>
              
              {/* Duración */}
              <InfoCard
                icon={<Calendar className="w-5 h-5" />}
                title="Duración"
                color="blue"
              >
                <Field
                  label="Duración (días)"
                  value={campaignData.duration?.toString()}
                  type="number"
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    duration: value ? parseInt(value) : undefined,
                  }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Inicio"
                    value={campaignData.startDate}
                    type="date"
                    onChange={(value) => setCampaignData(prev => ({ ...prev, startDate: value }))}
                  />
                  <Field
                    label="Fin"
                    value={campaignData.endDate}
                    type="date"
                    onChange={(value) => setCampaignData(prev => ({ ...prev, endDate: value }))}
                  />
                </div>
              </InfoCard>
              
              {/* Público Objetivo */}
              <InfoCard
                icon={<Users className="w-5 h-5" />}
                title="Público Objetivo"
                color="green"
              >
                <Field
                  label="Género"
                  value={campaignData.targetAudience?.gender?.join(', ')}
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    targetAudience: {
                      ...prev.targetAudience,
                      gender: value.split(',').map(g => g.trim()).filter(Boolean) as ('male' | 'female' | 'non-binary' | 'all')[],
                    },
                  }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Edad mín"
                    value={campaignData.targetAudience?.ageMin?.toString()}
                    type="number"
                    onChange={(value) => setCampaignData(prev => ({
                      ...prev,
                      targetAudience: {
                        ...prev.targetAudience,
                        ageMin: value ? parseInt(value) : undefined,
                      },
                    }))}
                  />
                  <Field
                    label="Edad máx"
                    value={campaignData.targetAudience?.ageMax?.toString()}
                    type="number"
                    onChange={(value) => setCampaignData(prev => ({
                      ...prev,
                      targetAudience: {
                        ...prev.targetAudience,
                        ageMax: value ? parseInt(value) : undefined,
                      },
                    }))}
                  />
                </div>
              </InfoCard>
              
              {/* Geográfico */}
              <InfoCard
                icon={<Globe className="w-5 h-5" />}
                title="Geográfico"
                color="indigo"
              >
                <Field
                  label="Regiones"
                  value={campaignData.geographic?.regions?.join(', ')}
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    geographic: {
                      ...prev.geographic,
                      regions: value.split(',').map(r => r.trim()).filter(Boolean),
                    },
                  }))}
                />
                <Field
                  label="Países"
                  value={campaignData.geographic?.countries?.join(', ')}
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    geographic: {
                      ...prev.geographic,
                      countries: value.split(',').map(c => c.trim()).filter(Boolean),
                    },
                  }))}
                />
              </InfoCard>
              
              {/* Intereses */}
              <InfoCard
                icon={<Target className="w-5 h-5" />}
                title="Intereses"
                color="pink"
              >
                <Field
                  label="Tags"
                  value={campaignData.interests?.join(', ')}
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    interests: value.split(',').map(i => i.trim()).filter(Boolean),
                  }))}
                />
              </InfoCard>
              
              {/* Presupuesto */}
              <InfoCard
                icon={<DollarSign className="w-5 h-5" />}
                title="Presupuesto"
                color="emerald"
              >
                <Field
                  label="Budget Total"
                  value={campaignData.budget?.toString()}
                  type="number"
                  onChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    budget: value ? parseFloat(value) : undefined,
                  }))}
                />
              </InfoCard>
              
              {/* Rewards */}
              <InfoCard
                icon={<Zap className="w-5 h-5" />}
                title="Recompensas"
                color="amber"
              >
                <RewardField
                  label="Landing Page View ($)"
                  enabled={campaignData.rewards?.landingPageView?.enabled}
                  price={campaignData.rewards?.landingPageView?.pricePerView}
                  onToggle={(enabled) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      landingPageView: { ...prev.rewards?.landingPageView, enabled },
                    },
                  }))}
                  onPriceChange={(price) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      landingPageView: { ...prev.rewards?.landingPageView, pricePerView: price },
                    },
                  }))}
                />
                <RewardField
                  label="Item View ($)"
                  enabled={campaignData.rewards?.itemView?.enabled}
                  price={campaignData.rewards?.itemView?.pricePerClick}
                  onToggle={(enabled) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      itemView: { ...prev.rewards?.itemView, enabled },
                    },
                  }))}
                  onPriceChange={(price) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      itemView: { ...prev.rewards?.itemView, pricePerClick: price },
                    },
                  }))}
                />
                <RewardField
                  label="Add to Cart ($$)"
                  enabled={campaignData.rewards?.addToCart?.enabled}
                  price={campaignData.rewards?.addToCart?.pricePerClick}
                  onToggle={(enabled) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      addToCart: { ...prev.rewards?.addToCart, enabled },
                    },
                  }))}
                  onPriceChange={(price) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      addToCart: { ...prev.rewards?.addToCart, pricePerClick: price },
                    },
                  }))}
                />
                <RewardField
                  label="Checkout ($$$)"
                  enabled={campaignData.rewards?.checkout?.enabled}
                  price={campaignData.rewards?.checkout?.pricePerClick}
                  onToggle={(enabled) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      checkout: { ...prev.rewards?.checkout, enabled },
                    },
                  }))}
                  onPriceChange={(price) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      checkout: { ...prev.rewards?.checkout, pricePerClick: price },
                    },
                  }))}
                />
                <RewardField
                  label="Thank You View ($$$$)"
                  enabled={campaignData.rewards?.thankYouView?.enabled}
                  price={campaignData.rewards?.thankYouView?.pricePerView}
                  onToggle={(enabled) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      thankYouView: { ...prev.rewards?.thankYouView, enabled },
                    },
                  }))}
                  onPriceChange={(price) => setCampaignData(prev => ({
                    ...prev,
                    rewards: {
                      ...prev.rewards,
                      thankYouView: { ...prev.rewards?.thankYouView, pricePerView: price },
                    },
                  }))}
                />
              </InfoCard>
            </div>
            
            <div className="p-4 border-t dark:border-gray-700 space-y-2">
              {creationError && (
                <div className="flex items-start gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{creationError}</span>
                </div>
              )}
              
              <button
                onClick={handleCreateCampaign}
                disabled={completeness < 80 || isCreating}
                className="w-full px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Crear Campaña
                    {completeness < 80 && (
                      <span className="text-xs opacity-75 ml-1">(completa al menos 80%)</span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
                    icon,
                    title,
                    children,
                    color = 'blue',
                  }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  color?: 'purple' | 'blue' | 'green' | 'indigo' | 'pink' | 'emerald' | 'amber';
}) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    indigo: 'from-indigo-500 to-indigo-600',
    pink: 'from-pink-500 to-pink-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all">
      <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-600`}>
        <div className={`p-1.5 rounded-lg bg-linear-to-br ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {title}
        </h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
                 label,
                 value,
                 onChange,
                 multiline = false,
                 type = 'text',
               }: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
  type?: 'text' | 'number' | 'date';
}) {
  const hasValue = value && value.trim() !== '';
  
  return (
    <div>
      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="No especificado"
          className={`w-full mt-1 px-2.5 py-1.5 rounded-lg border text-sm min-h-[50px] focus:outline-none focus:ring-2 transition-all ${
            hasValue
              ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white focus:ring-green-500'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:ring-blue-500'
          }`}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="No especificado"
          className={`w-full mt-1 px-2.5 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            hasValue
              ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white focus:ring-green-500'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:ring-blue-500'
          }`}
        />
      )}
    </div>
  );
}

function RewardField({
                       label,
                       enabled,
                       price,
                       onToggle,
                       onPriceChange,
                     }: {
  label: string;
  enabled?: boolean;
  price?: number;
  onToggle?: (enabled: boolean) => void;
  onPriceChange?: (price: number) => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-2.5 py-2 rounded-lg border transition-all ${
        enabled
          ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      }`}
    >
      <label className="flex items-center gap-2 cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={enabled || false}
          onChange={(e) => onToggle?.(e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
        />
        <span className={`text-sm ${enabled ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
          {label}
        </span>
      </label>
      {enabled && (
        <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded px-2 py-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">$</span>
          <input
            type="number"
            step="0.0001"
            min="0"
            value={price || 0}
            onChange={(e) => onPriceChange?.(parseFloat(e.target.value) || 0)}
            className="w-20 text-sm bg-transparent text-gray-900 dark:text-white focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
