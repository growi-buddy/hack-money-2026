import { ApiReference } from '@scalar/nextjs-api-reference';

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'Growi API Reference',
    version: '1.0.0',
    description: 'API para la gestión de campañas, recompensas y eventos de marketing.',
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'clv123abc' },
          walletAddress: { type: 'string', example: '0x1234...abcd' },
          name: { type: 'string', nullable: true, example: 'John Doe' },
          email: { type: 'string', nullable: true, example: 'john@growi.com' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      PayoutRate: {
        type: 'object',
        properties: {
          eventType: { type: 'string', enum: [ 'VIEW', 'CART', 'BUY', 'SIGNUP' ] },
          amount: { type: 'number', example: 1.5 },
          volumeStep: { type: 'integer', example: 1000 },
        },
      },
      Campaign: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          brandId: { type: 'string' },
          escrowAddress: { type: 'string' },
          budgetTotal: { type: 'number' },
          status: { type: 'string', enum: [ 'ACTIVE', 'PAUSED', 'DEPLETED', 'DELETED' ] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      ApiDataResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', const: true, example: true },
          data: { type: 'object' },
        },
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
          },
        },
      },
      ApiErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', const: false, example: false },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
              details: { type: 'object', nullable: true },
            },
          },
        },
      },
    },
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Listar usuarios',
        tags: [ 'Users' ],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': {
            description: 'Lista de usuarios',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiListResponseUser' } } },
          },
        },
      },
      post: {
        summary: 'Registrar nuevo usuario',
        tags: [ 'Users' ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [ 'walletAddress' ],
                properties: {
                  walletAddress: { type: 'string', example: '0x...' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario creado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataResponseUser' } } },
          },
          '400': { $ref: '#/components/responses/Error' },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        summary: 'Obtener usuario por ID o Wallet',
        tags: [ 'Users' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: {
          '200': {
            description: 'Detalle del usuario',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataResponseUser' } } },
          },
          '404': { $ref: '#/components/responses/Error' },
        },
      },
      patch: {
        summary: 'Actualizar perfil de usuario',
        tags: [ 'Users' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { name: { type: 'string' }, email: { type: 'string' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Usuario actualizado' },
        },
      },
    },
    '/api/campaigns': {
      get: {
        summary: 'Listar campañas',
        tags: [ 'Campaigns' ],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': {
            description: 'Lista de campañas exitosa',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiListResponse' },
              },
            },
          },
          '400': {
            description: 'Error de validación o parámetros incorrectos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              },
            },
          },
        },
      },
      post: {
        summary: 'Crear campaña',
        tags: [ 'Campaigns' ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [ 'brandId', 'title', 'escrowAddress', 'budgetTotal', 'payoutRates' ],
                properties: {
                  brandId: { type: 'string' },
                  title: { type: 'string' },
                  escrowAddress: { type: 'string' },
                  budgetTotal: { type: 'number' },
                  payoutRates: { type: 'array', items: { $ref: '#/components/schemas/PayoutRate' } },
                },
              },
            },
          },
        },
        responses: { '201': { description: 'Campaña creada' } },
      },
    },
    '/api/campaigns/{id}': {
      patch: {
        summary: 'Actualizar campaña',
        tags: [ 'Campaigns' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Campaign' },
            },
          },
        },
        responses: { '200': { description: 'Campaña actualizada' } },
      },
      delete: {
        summary: 'Soft Delete de campaña',
        tags: [ 'Campaigns' ],
        parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'string' } } ],
        responses: { '200': { description: 'Campaña marcada como DELETED' } },
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
