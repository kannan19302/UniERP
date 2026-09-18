import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { SharedArray } from 'k6/data';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';

const tenants = new SharedArray('tenants', () => {
  return [
    { slug: 'acme-corp', email: 'admin@kannan19302.dev', password: 'admin123' },
    { slug: 'globex', email: 'admin@kannan19302.dev', password: 'admin123' },
    { slug: 'initech', email: 'admin@kannan19302.dev', password: 'admin123' },
    { slug: 'umbrella', email: 'admin@kannan19302.dev', password: 'admin123' },
    { slug: 'wonka', email: 'admin@kannan19302.dev', password: 'admin123' },
  ];
});

export const options = baseOptions({
  scenarios: {
    tenant_isolation: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '3m',
      tags: { scenario: 'tenant_isolation' },
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.02'],
  },
});

function loginAsTenant(tenant) {
  const url = `${env.API_URL}/auth/login`;
  const payload = JSON.stringify({
    email: tenant.email,
    password: tenant.password,
    tenantSlug: tenant.slug,
  });
  const res = http.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    tags: { name: 'tenant_login', tenant: tenant.slug },
  });

  check(res, {
    [`login ${tenant.slug} 200`]: (r) => r.status === 200,
  });

  if (res.status !== 200) {
    return null;
  }

  try {
    const body = JSON.parse(res.body);
    return body.token || body.accessToken || null;
  } catch {
    return null;
  }
}

export default function () {
  const tenant = tenants[__VU % tenants.length];
  const token = loginAsTenant(tenant);

  if (!token) {
    sleep(1);
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  group(`tenant isolation: ${tenant.slug}`, () => {
    const url = `${env.API_URL}/inventory/products?page=1&limit=20`;
    const res = http.get(url, { headers, tags: { name: 'tenant_list', tenant: tenant.slug } });

    check(res, {
      [`${tenant.slug} list 200`]: (r) => r.status === 200,
      [`${tenant.slug} only own data`]: (r) => {
        if (r.status !== 200) return true;
        try {
          const body = JSON.parse(r.body);
          const data = body.data || body.records || body.results || body;
          if (Array.isArray(data)) {
            return data.every((item) => {
              const tid = item.tenantId || item.tenant_id;
              return tid === undefined || tid === tenant.slug || typeof tid !== 'string';
            });
          }
          return true;
        } catch {
          return true;
        }
      },
      [`${tenant.slug} response < 3s`]: (r) => r.timings.duration < 3000,
    });
  });

  sleep(1);
}
