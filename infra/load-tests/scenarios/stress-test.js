import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';
import { login, getAuthHeaders } from '../helpers/auth.js';

export const options = baseOptions({
  scenarios: {
    stress_ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '30s', target: 500 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
      tags: { scenario: 'stress' },
    },
  },
  thresholds: {
    http_req_duration: [
      { threshold: 'p(95)<3000', abortOnFail: false },
      { threshold: 'p(99)<8000', abortOnFail: false },
    ],
    http_req_failed: [
      { threshold: 'rate<0.02', abortOnFail: false },
    ],
  },
});

const LIST_ENDPOINTS = [
  '/inventory/products?page=1&limit=20',
  '/sales/quotations',
  '/sales/orders',
  '/finance/invoices?page=1&limit=20',
  '/crm/accounts',
  '/hr/employees?page=1&limit=20',
];

export default function () {
  const session = {};
  login(session);
  const headers = getAuthHeaders(session);

  group('stress: list actions', () => {
    const ep = LIST_ENDPOINTS[__ITER % LIST_ENDPOINTS.length];
    const res = http.get(`${env.API_URL}${ep}`, {
      headers,
      tags: { name: `stress_list` },
    });
    check(res, {
      'stress list 200': (r) => r.status === 200,
    });
  });

  if (__ITER % 5 === 0) {
    group('stress: document post', () => {
      const url = `${env.API_URL}/inventory/products`;
      const ts = Date.now();
      const payload = JSON.stringify({
        sku: `stress-${__VU}-${__ITER}-${ts}`,
        name: `Stress Product ${__VU}-${__ITER}`,
        type: 'GOODS',
        unit: 'EACH',
        costPrice: 5.00,
        sellPrice: 15.00,
      });
      const res = http.post(url, payload, {
        headers,
        tags: { name: 'stress_post_product' },
      });
      check(res, {
        'stress post 200/201': (r) => r.status === 201 || r.status === 200,
      });
    });
  }

  sleep(0.5);
}
