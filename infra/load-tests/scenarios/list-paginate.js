import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';
import { login, getAuthHeaders } from '../helpers/auth.js';

export const options = baseOptions({
  scenarios: {
    list_paginate_ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 30 },
        { duration: '2m', target: 30 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario: 'list_paginate_load' },
    },
  },
});

const LIST_ENDPOINTS = [
  { path: '/inventory/products', params: { page: '1', limit: '20' } },
  { path: '/inventory/products', params: { page: '2', limit: '20' } },
  { path: '/inventory/products', params: { page: '1', limit: '50' } },
  { path: '/sales/quotations', params: {} },
  { path: '/sales/orders', params: {} },
  { path: '/crm/accounts', params: {} },
  { path: '/hr/employees', params: { page: '1', limit: '20' } },
  { path: '/finance/invoices', params: { page: '1', limit: '20' } },
];

export default function () {
  const session = {};
  login(session);
  const headers = getAuthHeaders(session);

  group('list + paginate flow', () => {
    const endpoint = LIST_ENDPOINTS[__ITER % LIST_ENDPOINTS.length];
    const qs = new URLSearchParams(endpoint.params).toString();
    const url = `${env.API_URL}${endpoint.path}${qs ? '?' + qs : ''}`;

    const res = http.get(url, {
      headers,
      tags: { name: `list_${endpoint.path.replace(/\//g, '_')}` },
    });

    check(res, {
      'list status 200': (r) => r.status === 200,
      'list response < 2s': (r) => r.timings.duration < 2000,
      'list returns array': (r) => {
        try {
          const body = JSON.parse(r.body);
          return Array.isArray(body.data || body.records || body.results || body) ||
                 (body.data && typeof body.data === 'object');
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);
}
