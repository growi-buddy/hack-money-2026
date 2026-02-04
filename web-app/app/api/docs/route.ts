import { ApiReference } from '@scalar/nextjs-api-reference';

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'Growi API Reference',
    version: '1.0.0',
    description: 'API for managing campaigns, rewards, and marketing events.',
  },
  components: {
    schemas: {
      EventType: {
        type: 'string',
        enum: [ 'VISIT_PAGE', 'ADD_CART', 'BUY_PRODUCT', 'SIGNUP' ],
        description: 'Available event types',
      },
      SelectorEventType: {
        type: 'string',
        enum: [ 'ONCLICK', 'HOVER', 'DOUBLE_CLICK' ],
        description: 'Available selector event types',
      },
      CampaignStatus: {
        type: 'string',
        enum: [ 'ACTIVE', 'PAUSED', 'DEPLETED', 'DELETED' ],
        description: 'Possible campaign statuses',
      },
      
      // User
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique user CUID' },
          walletAddress: { type: 'string', description: 'Blockchain wallet address' },
          name: { type: 'string', nullable: true, description: 'User name' },
          email: { type: 'string', nullable: true, description: 'User email' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [ 'id', 'walletAddress', 'createdAt', 'updatedAt' ],
      },
      
      // Selector
      Selector: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique selector CUID' },
          selector: { type: 'string', description: 'CSS selector (e.g.: .button, #submit)' },
          eventType: { $ref: '#/components/schemas/SelectorEventType' },
          isActive: { type: 'boolean', default: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [ 'id', 'selector', 'eventType', 'isActive', 'createdAt', 'updatedAt' ],
      },
      
      SelectorInput: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique CUID (optional for creation)' },
          selector: { type: 'string', description: 'CSS selector (minimum 1 character)' },
          eventType: { $ref: '#/components/schemas/SelectorEventType' },
          isActive: { type: 'boolean', default: true },
        },
        required: [ 'selector', 'eventType' ],
      },
      
      // Reward Event
      RewardEvent: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique reward event CUID' },
          eventType: { $ref: '#/components/schemas/EventType' },
          amount: { type: 'number', format: 'decimal', description: 'Reward amount (must be greater than 0)' },
          volumeStep: { type: 'integer', description: 'Volume step for scaling (minimum 1)' },
          selectors: {
            type: 'array',
            items: { $ref: '#/components/schemas/Selector' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [ 'id', 'eventType', 'amount', 'volumeStep', 'selectors', 'createdAt', 'updatedAt' ],
      },
      
      RewardEventInput: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique CUID (optional)' },
          eventType: { $ref: '#/components/schemas/EventType' },
          amount: { type: 'number', description: 'Amount must be greater than 0' },
          volumeStep: { type: 'integer', default: 1, description: 'Minimum 1' },
          selectors: {
            type: 'array',
            items: { $ref: '#/components/schemas/SelectorInput' },
            default: [],
          },
        },
        required: [ 'eventType', 'amount' ],
      },
      
      // Campaign Reward Events
      CampaignRewardEventsDTO: {
        type: 'object',
        properties: {
          campaignId: { type: 'string', description: 'Campaign CUID' },
          rewardEvents: {
            type: 'array',
            items: { $ref: '#/components/schemas/RewardEvent' },
          },
        },
        required: [ 'campaignId', 'rewardEvents' ],
      },
      
      UpdateCampaignRewardEventsInput: {
        type: 'object',
        properties: {
          campaignId: { type: 'string', description: 'Valid campaign CUID' },
          rewardEvents: {
            type: 'array',
            items: { $ref: '#/components/schemas/RewardEventInput' },
            description: 'Minimum 1 reward event required',
          },
        },
        required: [ 'campaignId', 'rewardEvents' ],
      },
      
      // Campaign
      Campaign: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique campaign CUID' },
          brandId: { type: 'string', description: 'User (brand) CUID' },
          title: { type: 'string', description: 'Campaign title (minimum 3 characters)' },
          escrowAddress: { type: 'string', description: 'Escrow address (starts with 0x)' },
          budgetTotal: { type: 'number', format: 'decimal', description: 'Total budget (must be positive)' },
          status: { $ref: '#/components/schemas/CampaignStatus' },
          yellowChannelId: { type: 'string', nullable: true },
          rewardEvents: {
            type: 'array',
            items: { $ref: '#/components/schemas/RewardEvent' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [ 'id', 'brandId', 'title', 'escrowAddress', 'budgetTotal', 'status', 'createdAt', 'updatedAt' ],
      },
      
      // Create Campaign Input
      CreateCampaignInput: {
        type: 'object',
        properties: {
          ownerId: { type: 'string', description: 'User CUID' },
          title: { type: 'string', description: 'Minimum 3 characters' },
          escrowAddress: { type: 'string', description: 'Must start with 0x' },
          budgetTotal: { type: 'number', description: 'Must be positive' },
          rewardEvents: {
            type: 'array',
            items: { $ref: '#/components/schemas/RewardEvent' },
            description: 'Minimum 1 payout rate required',
          },
        },
        required: [ 'ownerId', 'title', 'escrowAddress', 'budgetTotal', 'rewardEvents' ],
      },
      
      // Update Campaign Input
      UpdateCampaignInput: {
        type: 'object',
        properties: {
          brandId: { type: 'string', description: 'User (brand) CUID' },
          title: { type: 'string', description: 'Minimum 3 characters' },
          escrowAddress: { type: 'string', description: 'Must start with 0x' },
          budgetTotal: { type: 'number', description: 'Must be positive' },
          rewardEvents: {
            type: 'array',
            items: { $ref: '#/components/schemas/RewardEvent' },
            description: 'Minimum 1 payout rate required',
          },
          status: { $ref: '#/components/schemas/CampaignStatus' },
        },
        required: [ 'brandId', 'title', 'escrowAddress', 'budgetTotal', 'rewardEvents' ],
      },
      
      // Create Tracking Link
      CreateLinkInput: {
        type: 'object',
        properties: {
          participationId: { type: 'string', description: 'Valid participation CUID' },
          url: { type: 'string', format: 'uri', description: 'Valid URL' },
          expiresAt: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            description: 'Expiration date (optional)',
          },
        },
        required: [ 'participationId', 'url' ],
      },
      
      // API Responses
      ApiDataResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', const: true, example: true },
          data: { type: 'object' },
        },
        required: [ 'success', 'data' ],
      },
      
      ApiListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', const: true, example: true },
          data: { type: 'array', items: { type: 'object' } },
          meta: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              page: { type: 'integer' },
              limit: { type: 'integer' },
            },
            required: [ 'total', 'page', 'limit' ],
          },
        },
        required: [ 'success', 'data', 'meta' ],
      },
      
      ApiErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', const: false, example: false },
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                enum: [ 'BAD_REQUEST', 'NOT_FOUND', 'VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR', 'CONFLICT' ],
                example: 'BAD_REQUEST',
              },
              message: { type: 'string' },
              details: { type: 'object', nullable: true },
            },
            required: [ 'code', 'message' ],
          },
        },
        required: [ 'success', 'error' ],
      },
    },
    
    responses: {
      BadRequest: {
        description: 'Bad Request - Invalid parameters or missing required fields',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiErrorResponse' },
          },
        },
      },
      NotFound: {
        description: 'Not Found - Resource does not exist',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiErrorResponse' },
          },
        },
      },
      ValidationError: {
        description: 'Validation Error - Invalid input data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiErrorResponse' },
          },
        },
      },
      InternalServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiErrorResponse' },
          },
        },
      },
    },
  },
  
  paths: {
    '/api/users': {
      get: {
        summary: 'List users',
        description: 'Gets a paginated list of all users',
        operationId: 'listUsers',
        tags: [ 'Users' ],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1, minimum: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10, minimum: 1 } },
        ],
        responses: {
          '200': {
            description: 'User list obtained successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiListResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/User' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        summary: 'Register new user',
        description: 'Creates a new user with wallet address',
        operationId: 'createUser',
        tags: [ 'Users' ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  walletAddress: { type: 'string', example: '0x522E878Bf98CA82f45704F3BaFf762b6a9e071c7' },
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                },
                required: [ 'walletAddress' ],
              },
              example: {
                walletAddress: '0x742d35Cc6634C0532925a3b844Bc022e9421F88',
                name: 'John Doe',
                email: 'john@example.com',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/User' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    
    '/api/users/{id}': {
      get: {
        summary: 'Get user by ID or Wallet',
        description: 'Gets the details of a specific user by ID or wallet address',
        operationId: 'getUser',
        tags: [ 'Users' ],
        parameters: [ {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '0x742d35Cc6634C0532925a3b844Bc022e9421F88' },
          description: 'User ID or wallet',
        } ],
        responses: {
          '200': {
            description: 'User details obtained',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/User' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      patch: {
        summary: 'Update user profile',
        description: 'Updates the user name and/or email',
        operationId: 'updateUser',
        tags: [ 'Users' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string', example: 'clv123abc' } } ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                },
              },
              // ✅ AGREGAR EJEMPLO AQUÍ
              example: {
                name: 'Jane Doe',
                email: 'jane@example.com',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/User' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    
    '/api/campaigns': {
      get: {
        summary: 'List campaigns',
        description: 'Gets a paginated list of all campaigns',
        operationId: 'listCampaigns',
        tags: [ 'Campaigns' ],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1, minimum: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10, minimum: 1 } },
        ],
        responses: {
          '200': {
            description: 'Campaign list obtained successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiListResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Campaign' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        summary: 'Create new campaign',
        description: 'Creates a new campaign with initial payout rates',
        operationId: 'createCampaign',
        tags: [ 'Campaigns' ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCampaignInput' },
              example: {
                'ownerId': 'cml8fjckm0000h0id9x2dal0v',
                title: 'Summer Sales Campaign',
                escrowAddress: '0x742d35Cc6634C0532925a3b844Bc022e9421F88',
                budgetTotal: 1000.5,
                rewardEvents: [
                  { eventType: 'VISIT_PAGE', amount: 0.5, volumeStep: 100 },
                  { eventType: 'BUY_PRODUCT', amount: 5.0, volumeStep: 1 },
                ],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Campaign created successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Campaign' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    
    '/api/campaigns/{id}': {
      patch: {
        summary: 'Update campaign',
        description: 'Updates the details of an existing campaign',
        operationId: 'updateCampaign',
        tags: [ 'Campaigns' ],
        parameters: [ {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: 'clv123campaign' },
          description: 'Campaign ID',
        } ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCampaignInput' },
              // ✅ AGREGAR EJEMPLO AQUÍ
              example: {
                brandId: 'clv123abc',
                title: 'Updated Summer Campaign',
                escrowAddress: '0x742d35Cc6634C0532925a3b844Bc022e9421F88',
                budgetTotal: 1500.75,
                rewardEvents: [
                  { eventType: 'VISIT_PAGE', amount: 0.75, volumeStep: 100 },
                  { eventType: 'BUY_PRODUCT', amount: 7.5, volumeStep: 1 },
                ],
                status: 'ACTIVE',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Campaign updated successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Campaign' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '400': { $ref: '#/components/responses/ValidationError' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      delete: {
        summary: 'Soft Delete campaign',
        description: 'Marks a campaign as DELETED without deleting its data',
        operationId: 'deleteCampaign',
        tags: [ 'Campaigns' ],
        parameters: [ {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: 'clv123campaign' },
        } ],
        responses: {
          '200': {
            description: 'Campaign marked as DELETED successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Campaign' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    
    '/api/campaigns/reward-events': {
      get: {
        summary: 'Get reward events from a campaign',
        description: 'Gets all reward events and their associated selectors for a specific campaign',
        operationId: 'getCampaignRewardEvents',
        tags: [ 'Campaign Reward Events' ],
        parameters: [
          {
            name: 'campaignId',
            in: 'query',
            required: true,
            schema: { type: 'string', example: 'clv123campaign' },
            description: 'Unique campaign ID',
          },
        ],
        responses: {
          '200': {
            description: 'Reward events obtained successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/CampaignRewardEventsDTO' },
                      },
                    },
                  ],
                },
                example: {
                  success: true,
                  data: {
                    campaignId: 'clv123campaign',
                    rewardEvents: [
                      {
                        id: 'clv9k2m8h',
                        eventType: 'VISIT_PAGE',
                        amount: 0.5,
                        volumeStep: 100,
                        selectors: [
                          {
                            id: 'cls8h9k2m',
                            selector: '.product-page',
                            eventType: 'ONCLICK',
                            isActive: true,
                            createdAt: '2024-01-15T10:30:00Z',
                            updatedAt: '2024-01-15T10:30:00Z',
                          },
                        ],
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z',
                      },
                    ],
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        summary: 'Create or update reward events',
        description:
          'Creates new reward events and their associated selectors. Replaces all existing campaign events',
        operationId: 'updateCampaignRewardEvents',
        tags: [ 'Campaign Reward Events' ],
        requestBody: {
          required: true,
          description: 'Reward event data to create/update',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCampaignRewardEventsInput' },
              // ✅ EJEMPLO YA ESTÁ AQUÍ
              example: {
                campaignId: 'clv123campaign',
                rewardEvents: [
                  {
                    eventType: 'VISIT_PAGE',
                    amount: 0.5,
                    volumeStep: 100,
                    selectors: [
                      {
                        selector: '.product-page',
                        eventType: 'ONCLICK',
                        isActive: true,
                      },
                    ],
                  },
                  {
                    eventType: 'BUY_PRODUCT',
                    amount: 2.5,
                    volumeStep: 1,
                    selectors: [
                      {
                        selector: '.checkout-button',
                        eventType: 'ONCLICK',
                        isActive: true,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Reward events created/updated successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiDataResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/CampaignRewardEventsDTO' },
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '404': { $ref: '#/components/responses/NotFound' },
          '500': { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
  },
};

export const GET = ApiReference({
  // @ts-expect-error: as HtmlRenderingConfiguration
  spec: {
    content: spec,
  },
});
