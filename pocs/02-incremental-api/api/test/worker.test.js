import test from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from '../src/worker.js';

const API = 'https://example.test/v1/order-events';

async function get(path = '', env = {}, headers = {}) {
  const response = await handleRequest(new Request(`${API}${path}`, { headers }), env);
  return { response, body: await response.json() };
}

test('paginates the five-event initial extraction without duplicates', async () => {
  const seen = [];
  let cursor = null;

  do {
    const params = new URLSearchParams({
      available_through: '2026-07-01T23:59:59Z',
      limit: '2',
    });
    if (cursor) params.set('cursor', cursor);

    const { body } = await get(`?${params}`);
    seen.push(...body.data.map((event) => event.event_id));
    cursor = body.pagination.next_cursor;
  } while (cursor);

  assert.deepEqual(seen, ['EVT-001', 'EVT-002', 'EVT-003', 'EVT-004', 'EVT-005']);
  assert.equal(new Set(seen).size, 5);
});

test('returns only the two events after the initial watermark', async () => {
  const { body } = await get('?updated_after=2026-07-01T10%3A20%3A00Z&limit=100');

  assert.deepEqual(body.data.map((event) => event.event_id), ['EVT-006', 'EVT-007']);
});

test('repeating a request returns the same immutable event IDs', async () => {
  const path = '?updated_after=2026-07-01T10%3A20%3A00Z&limit=100';
  const first = await get(path);
  const retry = await get(path);

  assert.deepEqual(retry.body, first.body);
});

test('validates parameters and optional API-key authentication', async () => {
  const invalid = await get('?limit=0');
  assert.equal(invalid.response.status, 400);

  const unauthorized = await get('', { API_KEY: 'secret' });
  assert.equal(unauthorized.response.status, 401);

  const authorized = await get('', { API_KEY: 'secret' }, { 'x-api-key': 'secret' });
  assert.equal(authorized.response.status, 200);
});
