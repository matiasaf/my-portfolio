const ORDER_EVENTS = Object.freeze([
  { event_id: 'EVT-001', order_id: 'O-1001', customer_id: 'C-001', status: 'Completed', amount: 120, updated_at: '2026-07-01T10:00:00Z' },
  { event_id: 'EVT-002', order_id: 'O-1002', customer_id: 'C-002', status: 'Pending', amount: 80, updated_at: '2026-07-01T10:05:00Z' },
  { event_id: 'EVT-003', order_id: 'O-1003', customer_id: 'C-001', status: 'Completed', amount: 200, updated_at: '2026-07-01T10:10:00Z' },
  { event_id: 'EVT-004', order_id: 'O-1004', customer_id: 'C-003', status: 'Cancelled', amount: 50, updated_at: '2026-07-01T10:15:00Z' },
  { event_id: 'EVT-005', order_id: 'O-1005', customer_id: 'C-004', status: 'Completed', amount: 150, updated_at: '2026-07-01T10:20:00Z' },
  { event_id: 'EVT-006', order_id: 'O-1002', customer_id: 'C-002', status: 'Completed', amount: 80, updated_at: '2026-07-02T11:30:00Z' },
  { event_id: 'EVT-007', order_id: 'O-1006', customer_id: 'C-005', status: 'Completed', amount: 300, updated_at: '2026-07-02T12:00:00Z' },
]);

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

function parseTimestamp(value, parameter) {
  if (value === null) return null;
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    throw new Error(`${parameter} must be an ISO-8601 timestamp`);
  }
  return timestamp;
}

function encodeCursor(offset) {
  return btoa(JSON.stringify({ offset }))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function decodeCursor(cursor) {
  if (!cursor) return 0;

  try {
    const base64 = cursor.replaceAll('-', '+').replaceAll('_', '/');
    const { offset } = JSON.parse(atob(base64));
    if (!Number.isInteger(offset) || offset < 0) throw new Error();
    return offset;
  } catch {
    throw new Error('cursor is invalid');
  }
}

function authorized(request, env) {
  return !env?.API_KEY || request.headers.get('x-api-key') === env.API_KEY;
}

export async function handleRequest(request, env = {}) {
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return json({ error: { code: 'method_not_allowed', message: 'Only GET is supported' } }, 405, { allow: 'GET' });
  }

  if (url.pathname === '/health') {
    return json({ status: 'ok', service: 'incremental-order-events-api' });
  }

  if (url.pathname !== '/v1/order-events') {
    return json({ error: { code: 'not_found', message: 'Route not found' } }, 404);
  }

  if (!authorized(request, env)) {
    return json({ error: { code: 'unauthorized', message: 'A valid x-api-key header is required' } }, 401);
  }

  try {
    const updatedAfter = parseTimestamp(url.searchParams.get('updated_after'), 'updated_after');
    const availableThrough = parseTimestamp(url.searchParams.get('available_through'), 'available_through');
    const rawLimit = url.searchParams.get('limit') ?? '2';
    const limit = Number(rawLimit);

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new Error('limit must be an integer between 1 and 100');
    }

    const offset = decodeCursor(url.searchParams.get('cursor'));
    const matchingEvents = ORDER_EVENTS.filter((event) => {
      const eventTimestamp = Date.parse(event.updated_at);
      return (updatedAfter === null || eventTimestamp > updatedAfter)
        && (availableThrough === null || eventTimestamp <= availableThrough);
    });
    const events = matchingEvents.slice(offset, offset + limit);
    const nextOffset = offset + events.length;
    const hasMore = nextOffset < matchingEvents.length;

    return json({
      data: events,
      pagination: {
        count: events.length,
        has_more: hasMore,
        next_cursor: hasMore ? encodeCursor(nextOffset) : null,
      },
      request: {
        updated_after: url.searchParams.get('updated_after'),
        available_through: url.searchParams.get('available_through'),
      },
    });
  } catch (error) {
    return json({ error: { code: 'invalid_request', message: error.message } }, 400);
  }
}

export default {
  fetch: handleRequest,
};
