/*
 * Client Configuration
 *
 */
export const clientConfig = {
  endpoint: {
    web:
      process.env.NEXT_PUBLIC_NODE_ENV === 'development'
        ? 'http://127.0.0.1:3031'
        : 'https://www.hangang.site',
    api:
      process.env.NEXT_PUBLIC_NODE_ENV === 'development'
        ? 'http://127.0.0.1:3031/api'
        : 'https://www.hangang.site/api'
  }
};
