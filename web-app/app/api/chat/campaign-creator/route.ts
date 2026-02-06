import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from 'ai';
import z from 'zod';

export async function POST(req: Request) {
  const { messages, campaignData }: { messages: UIMessage[], campaignData: unknown } = await req.json();
  
  const result = streamText({
    model: 'anthropic/claude-3-haiku',
    system: `Eres un experto en marketing digital y configuración de campañas publicitarias.

Tu objetivo es ayudar al usuario a configurar una campaña de marketing completa recopilando la siguiente información:

**INFORMACIÓN REQUERIDA:**

1. **Información Básica:**
   - Nombre de la campaña (preferiblemente un ENS - Ethereum Name Service)
   - Descripción detallada de la campaña y sus objetivos

2. **Duración:**
   - Duración total de la campaña (en días)
   - Fecha de inicio
   - Fecha de finalización

3. **Público Objetivo:**
   - Target Demographics (ej: Gen Z, Millennials, Gen X, Baby Boomers, Profesionales, Estudiantes, etc.)

4. **Geográfico:**
   - Regiones objetivo (ej: Norte América, Europa, Asia, etc.)
   - Países específicos (códigos ISO de 2 letras)

5. **Intereses y Afinidades:**
   - Tags/palabras clave de intereses (ej: tecnología, moda, deportes, finanzas, NFTs, crypto, etc.)

6. **Presupuesto:**
   - Budget total de la campaña en USD

7. **Slots:**
   - Número de influencers que pueden unirse a la campaña (por defecto 10)

8. **Estructura de Recompensas (Rewards):**
   Para cada tipo de evento, pregunta si quieren activarlo y el precio por acción:
   
   - **Landing Page View** ($): Pago por visitar la página de destino
     - ¿Activar? (sí/no)
     - Precio por vista
   
   - **Item View** ($): Pago por ver un producto específico
     - ¿Activar? (sí/no)
     - Precio por click/vista
   
   - **Add to Cart** ($$): Pago por agregar producto al carrito (re-marketing)
     - ¿Activar? (sí/no)
     - Precio por acción
   
   - **Checkout** ($$$): Pago por completar el checkout (re-marketing)
     - ¿Activar? (sí/no)
     - Precio por conversión
   
   - **Thank You View** ($$$$): Pago por ver la página de agradecimiento final
     - ¿Activar? (sí/no)
     - Precio por vista

**ESTADO ACTUAL DE LA CAMPAÑA:**
${JSON.stringify(campaignData, null, 2)}

**TU ROL:**
- Haz preguntas estratégicas y profesionales
- Ofrece sugerencias basadas en mejores prácticas de marketing
- Si el usuario no sabe algo, sugiere valores típicos o rangos recomendados
- Explica brevemente el beneficio de cada tipo de reward
- Ayuda a calcular presupuestos aproximados basándose en los rewards configurados
- Sé conversacional pero profesional
- **CRÍTICO**: INMEDIATAMENTE después de que el usuario te proporcione CUALQUIER información (presupuesto, nombre, descripción, fechas, etc.), DEBES usar la herramienta 'updateCampaignData' para actualizar esos campos ANTES de continuar la conversación

**IMPORTANTE:**
- SIEMPRE actualiza los campos en cuanto el usuario te dé información, no esperes a tener todos los datos
- Si el usuario dice "tengo 500 para esto" o "mi presupuesto es 1000", INMEDIATAMENTE llama updateCampaignData con budget: 500 o budget: 1000
- Si el usuario da un nombre, INMEDIATAMENTE actualiza el campo name
- Usa formato de texto simple, sin markdown (**negritas**, *cursivas*, etc.). Solo texto limpio y claro
- No inventes datos. Solo actualiza campos cuando el usuario te proporcione información clara
- Mantén las explicaciones concisas y enfocadas en la acción`,
    messages: await convertToModelMessages(messages),
    tools: {
      updateCampaignData: tool({
        description: 'Actualiza los campos de la campaña con la información proporcionada por el usuario. Solo actualiza los campos que el usuario ha especificado claramente.',
        inputSchema: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
          duration: z.number().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          targetAudience: z.object({
            demographics: z.array(z.string()).optional(),
          }).optional(),
          geographic: z.object({
            regions: z.array(z.string()).optional(),
            countries: z.array(z.string()).optional(),
          }).optional(),
          interests: z.array(z.string()).optional(),
          budget: z.number().optional(),
          slots: z.number().int().positive().optional(),
          selectedRewardEvents: z.array(z.object({
            rewardEventId: z.string(),
            amount: z.number().positive(),
            volumeStep: z.number().int().positive().optional(),
          })).optional(),
          rewards: z.object({
            landingPageView: z.object({
              enabled: z.boolean().optional(),
              pricePerView: z.number().optional(),
            }).optional(),
            itemView: z.object({
              enabled: z.boolean().optional(),
              pricePerClick: z.number().optional(),
            }).optional(),
            addToCart: z.object({
              enabled: z.boolean().optional(),
              pricePerClick: z.number().optional(),
            }).optional(),
            checkout: z.object({
              enabled: z.boolean().optional(),
              pricePerClick: z.number().optional(),
            }).optional(),
            thankYouView: z.object({
              enabled: z.boolean().optional(),
              pricePerView: z.number().optional(),
            }).optional(),
          }).optional(),
        }),
        execute: async (args) => {
          return { status: 'success', data: args };
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });
  
  return result.toUIMessageStreamResponse();
}
