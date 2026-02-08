import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from 'ai';
import z from 'zod';

export async function POST(req: Request) {
  const { messages, campaignData }: { messages: UIMessage[], campaignData: unknown } = await req.json();
  
  const result = streamText({
    model: 'anthropic/claude-3-haiku',
    system: `You are an expert in digital marketing and setting up advertising campaigns.

Your goal is to help the user set up a complete marketing campaign by gathering the following information:

**REQUIRED INFORMATION:**

1. **Basic Information:**

- Campaign name (preferably an ENS - Ethereum Name Service)

- Detailed description of the campaign and its objectives

2. **Duration:**

- Total campaign duration (in days)

- Start date

- End date

3. **Target Audience:**

- Target Demographics (e.g., Gen Z, Millennials, Gen X, Baby Boomers, Professionals, Students, etc.)

4. **Geographic:**

- Target regions (e.g., North America, Europe, Asia, etc.)

- Specific countries (2-letter ISO codes)

5. **Interests and Affinities:**

- Interest tags/keywords (e.g., technology, fashion, sports, finance, NFTs, crypto, etc.)

6. **Budget:**

- Budget Total campaign cost in USD

7. **Slots:**

- Number of influencers who can join the campaign (10 by default). They all work simultaneously, so their tasks cannot be divided. I cannot tell the influencers how to work.

8. **Rewards Structure:**

For each type of event, ask if they want to activate it and the price per action:

- **Landing Page View** ($): Payment for visiting the landing page

- Activate? (yes/no)

- Price per view

- **Item View** ($): Payment for viewing a specific product

- Activate? (yes/no)

- Price per click/view

- **Add to Cart** ($$): Payment for adding a product to the cart (remarketing)

- Activate? (yes/no)

- Price per action

- **Checkout** ($$$): Payment for completing the checkout (remarketing)

- Activate? (Yes/No)

- Price per conversion

- **Thank You View** ($$$$): Payment for viewing the final thank you page

- Activate? (yes/no)

- Price per view

**CURRENT CAMPAIGN STATUS:**
${JSON.stringify(campaignData, null, 2)}

**YOUR ROLE:**
- Ask strategic and professional questions
- Offer suggestions based on marketing best practices
- If the user doesn't know something, suggest typical values ​​or recommended ranges
- Briefly explain the benefit of each reward type
- Help calculate approximate budgets based on the configured rewards
- Be conversational but professional
- **CRITICAL**: IMMEDIATELY after the user provides you with ANY information (budget, name, description, dates, etc.), you MUST use the 'updateCampaignData' tool to update those fields BEFORE continuing the conversation

**IMPORTANT:**
- ALWAYS update the fields as soon as the user gives you information; don't wait until you have all the data
- If the user says "I have 500 for this" or "my budget is 1000”, IMMEDIATELY call updateCampaignData with budget: 500 or budget: 1000
- If the user provides a name, IMMEDIATELY update the name field
- Use plain text formatting, without Markdown (bold, italics, etc.). Only clean, clear text
- Don't fabricate data. Only update fields when the user provides clear information
- Keep explanations concise and action-oriented`,
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
          demographics: z.array(z.string()).optional(),
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
