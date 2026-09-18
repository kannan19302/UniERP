import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';
import { login, getAuthHeaders } from '../helpers/auth.js';

export const options = baseOptions({
  scenarios: {
    document_post_ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario: 'document_post_load' },
    },
  },
});

export default function () {
  const session = {};
  login(session);
  const headers = getAuthHeaders(session);
  const ts = Date.now();

  group('document creation flow: product', () => {
    const url = `${env.API_URL}/inventory/products`;
    const payload = JSON.stringify({
      sku: `k6-load-test-${__VU}-${__ITER}-${ts}`,
      name: `Load Test Product ${__VU}-${__ITER}`,
      description: 'Created during k6 load test',
      type: 'GOODS',
      unit: 'EACH',
      costPrice: 10.99,
      sellPrice: 24.99,
      taxCategory: 'STANDARD',
    });

    const res = http.post(url, payload, {
      headers,
      tags: { name: 'post_product' },
    });

    check(res, {
      'product create status 201 or 200': (r) => r.status === 201 || r.status === 200,
      'product create < 3s': (r) => r.timings.duration < 3000,
      'product has id': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.id !== undefined;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(2);
}
