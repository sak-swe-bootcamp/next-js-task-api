import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'ブログ記事を管理するためのAPI',
    },
    paths: {
      '/blogs': {
        get: {
          summary: 'すべてのブログを取得',
          responses: {
            200: {
              description: 'ブログの一覧',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        userName: { type: 'string' },
                        userImage: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: '新しいブログを作成',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      example: '記事タイトル',
                      pattern: '.*\\S.*',
                      required: true,
                      type: 'string',
                    },
                    content: {
                      example: '記事内容',
                      pattern: '.*\\S.*',
                      required: true,
                      type: 'string',
                    },
                    userName: {
                      example: 'ユーザ名',
                      pattern: '.*\\S.*',
                      required: true,
                      type: 'string',
                    },
                    userImage: {
                      type: 'string',
                      example: 'ユーザ画像URL',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: '新しいブログを作成',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      content: { type: 'string' },
                      userName: { type: 'string' },
                      userImage: { type: 'string' },
                    },
                  },
                },
              },
            },
            400: {
              description:
                'title, content, userNameが空白文字の場合やパラメータが不正な場合',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'paramsが正しくありません',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/blogs/{id}': {
        get: {
          summary: 'IDで指定されたブログを取得',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '取得するブログのID',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: '指定されたIDのブログ',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      content: { type: 'string' },
                      userName: { type: 'string' },
                      userImage: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },

        put: {
          summary: 'IDで指定されたブログを更新',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '更新するブログのID',
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    userName: { type: 'string' },
                    userImage: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'ブログの更新',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      content: { type: 'string' },
                      userName: { type: 'string' },
                      userImage: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: 'IDで指定されたブログを削除',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '削除するブログのID',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            204: {
              description: 'ブログの削除',
            },
          },
        },
      },
    },
  },
  apis: [],
});

export const swagger = new Hono()
  .get('/ui', swaggerUI({ url: '/api/swagger/doc' }))
  .get('/doc', (c) => {
    return c.json(swaggerSpec);
  });
