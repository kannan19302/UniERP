const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';
const API_PREFIX = __ENV.API_PREFIX || '/api/v1';

export const env = {
  BASE_URL,
  API_PREFIX,
  API_URL: `${BASE_URL}${API_PREFIX}`,
  EMAIL: __ENV.LOAD_TEST_EMAIL || 'admin@kannan19302.dev',
  PASSWORD: __ENV.LOAD_TEST_PASSWORD || 'admin123',
  TENANT_SLUG: __ENV.LOAD_TEST_TENANT_SLUG || 'acme-corp',
  DEMO_ROLE: __ENV.LOAD_TEST_DEMO_ROLE || 'SUPER_ADMIN',
};
