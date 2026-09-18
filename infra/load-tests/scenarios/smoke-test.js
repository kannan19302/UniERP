import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';
import { login, getAuthHeaders } from '../helpers/auth.js';

export const options = baseOptions({
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      tags: { scenario: 'smoke' },
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.01'],
  },
});

export default function () {
  const session = {};
  login(session);
  const headers = getAuthHeaders(session);

  group('smoke: list endpoints', () => {
    const endpoints = [
      '/inventory/products?page=1&limit=10',
      '/sales/quotations',
      '/sales/orders',
      '/finance/invoices?page=1&limit=10',
    ];
    const ep = endpoints[__ITER % endpoints.length];
    const res = http.get(`${env.API_URL}${ep}`, {
      headers,
      tags: { name: `smoke_list_${ep.replace(/\W/g, '_')}` },
    });
    check(res, {
      'smoke list status 200': (r) => r.status === 200,
    });
  });

  group('smoke: health check', () => {
    const res = http.get(`${env.BASE_URL}/metrics`, {
      tags: { name: 'smoke_health' },
    });
    check(res, {
      'health reachable': (r) => r.status === 200 || r.status === 404,
    });
  });

  sleep(1);
}
