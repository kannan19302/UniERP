import http from 'k6/http';
import { check, fail } from 'k6';
import { env } from './env.js';

export function login(session) {
  const url = `${env.API_URL}/auth/login`;
  const payload = JSON.stringify({
    email: env.EMAIL,
    password: env.PASSWORD,
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
    'login has token': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token !== undefined || body.accessToken !== undefined;
      } catch {
        return false;
      }
    },
  });

  if (res.status !== 200) {
    fail(`Login failed: ${res.status} ${res.body}`);
  }

  let token;
  try {
    const body = JSON.parse(res.body);
    token = body.token || body.accessToken;
  } catch {
    fail(`Could not parse login response body`);
  }

  session.token = token;
  return token;
}

export function getAuthHeaders(session) {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${session.token}`,
  };
}
