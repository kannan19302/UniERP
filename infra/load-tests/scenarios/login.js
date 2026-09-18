import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { SharedArray } from 'k6/data';
import { baseOptions } from '../config/options.js';
import { env } from '../helpers/env.js';

const credentials = new SharedArray('credentials', () => [
  { email: env.EMAIL, password: env.PASSWORD },
]);

export const options = baseOptions({
  scenarios: {
    login_ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '2m', target: 50 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario: 'login_load' },
    },
  },
});

export default function () {
  group('auth login flow', () => {
    const cred = credentials[0];
    const url = `${env.API_URL}/auth/login`;
    const payload = JSON.stringify({
      email: cred.email,
      password: cred.password,
    });
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      tags: { name: 'auth_login' },
    };

    const res = http.post(url, payload, params);

    check(res, {
      'login status 200': (r) => r.status === 200,
      'login response < 2s': (r) => r.timings.duration < 2000,
      'token returned': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.token !== undefined || body.accessToken !== undefined;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);
}
