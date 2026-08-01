export const foundations = [
  { number: '01', title: 'Requirements', copy: 'Start with user behavior and business constraints. Functional requirements describe what the system does; non-functional requirements define how well it must do it.', example: '“Send a message” is functional. “Deliver 99.99% within 500 ms” is non-functional.', tone: 'coral' },
  { number: '02', title: 'Scale', copy: 'Estimate traffic, storage, bandwidth, and growth. Rough numbers expose the shape of the problem before a single technology is chosen.', example: '10M daily users × 20 reads = 200M reads/day ≈ 2,300 reads/second on average.', tone: 'blue' },
  { number: '03', title: 'Data', copy: 'Model the entities, access patterns, ownership, retention, and consistency needs. The best database depends on how the data will be used.', example: 'A payment ledger favors consistency; a product feed may favor availability and low read latency.', tone: 'lime' },
  { number: '04', title: 'Failure', copy: 'Assume networks partition, machines restart, dependencies slow down, and messages arrive twice. Reliability comes from designing those states explicitly.', example: 'Idempotency keys make retrying a checkout safe instead of charging the customer twice.', tone: 'violet' },
] as const;

export const buildingBlocks = [
  ['Client', 'Initiates work and renders results. Web, mobile, devices, or another service.'],
  ['Edge + CDN', 'Terminates connections and serves content near users to reduce latency and origin load.'],
  ['Load balancer', 'Distributes requests across healthy instances and removes failed ones from rotation.'],
  ['Service', 'Applies domain rules. Stateless services are easier to replicate horizontally.'],
  ['Cache', 'Trades freshness and complexity for lower latency and database pressure.'],
  ['Database', 'Persists source-of-truth state with a consistency model and access strategy.'],
  ['Queue / stream', 'Decouples producers from consumers and absorbs bursts of asynchronous work.'],
  ['Observability', 'Makes behavior visible through metrics, logs, traces, alerts, and business signals.'],
] as const;

export const cases = [
  { id: 'CASE 01', title: 'URL shortener', question: 'How do we redirect billions of short links with very low latency?', scale: 'Read-heavy · global · small objects', flow: ['Client', 'Edge cache', 'Redirect API', 'Key-value store'], decisions: ['Generate compact, unique IDs without coordinating every request through one machine.', 'Cache popular mappings at the edge because reads greatly outnumber writes.', 'Use an asynchronous analytics pipeline so click tracking never delays the redirect.'], tradeoff: 'A few seconds of delay in analytics is acceptable; a stale or incorrect redirect is not.', tone: 'case-coral' },
  { id: 'CASE 02', title: 'Real-time chat', question: 'How do we preserve conversation order while users move between devices?', scale: 'Connection-heavy · real-time · ordered', flow: ['WebSocket', 'Gateway', 'Chat service', 'Log + fan-out'], decisions: ['Keep long-lived connections in gateways and route a conversation to an owning partition.', 'Assign server-side sequence numbers to order messages within each conversation.', 'Persist before acknowledging, then fan out to online users and notify offline users.'], tradeoff: 'Ordering every message globally is expensive and unnecessary; ordering per conversation is useful.', tone: 'case-blue' },
  { id: 'CASE 03', title: 'Video platform', question: 'How do we accept large uploads and stream efficiently to a global audience?', scale: 'Storage-heavy · bandwidth-heavy · asynchronous', flow: ['Direct upload', 'Object storage', 'Transcoding queue', 'CDN'], decisions: ['Upload directly to object storage with a signed URL instead of passing video through the API.', 'Transcode asynchronously into multiple resolutions and formats with retryable workers.', 'Serve immutable segments through a CDN and keep metadata in a separate database.'], tradeoff: 'Processing takes time after upload; separating it protects the interactive API from heavy work.', tone: 'case-lime' },
  { id: 'CASE 04', title: 'E-commerce checkout', question: 'How do we coordinate inventory, payment, and orders without a distributed transaction?', scale: 'Write-critical · multi-service · correctness-first', flow: ['Checkout API', 'Order state', 'Event bus', 'Payment + stock'], decisions: ['Create an order in a pending state and advance it through an explicit workflow.', 'Use idempotency keys for payment and deduplicate events at every consumer.', 'Compensate when a later step fails: release stock or issue a refund.'], tradeoff: 'Temporary intermediate states are accepted to avoid fragile cross-service locking.', tone: 'case-violet' },
] as const;

export const tradeoffs = [
  ['Consistency', 'Every reader sees the latest accepted write.', 'Payments, inventory, permissions.', 'More coordination and potentially higher latency.'],
  ['Availability', 'The system responds even when part of it is impaired.', 'Feeds, catalogs, cached content.', 'Responses may be stale or incomplete.'],
  ['Low latency', 'The user receives a response quickly.', 'Search suggestions, gaming, chat.', 'Caching, replication, and operational complexity.'],
  ['Durability', 'Accepted data survives failures.', 'Orders, files, audit records.', 'Extra replicas, acknowledgements, and cost.'],
] as const;

export const process = [
  ['Clarify', 'Users, core actions, boundaries, constraints, and what is explicitly out of scope.'],
  ['Estimate', 'Peak requests, data size, read/write ratio, bandwidth, and expected growth.'],
  ['Design the API', 'Define the contract and make retries, pagination, errors, and versioning explicit.'],
  ['Model the data', 'Choose entities, keys, indexes, partitions, retention, and consistency per workflow.'],
  ['Draw the flow', 'Place the minimum components needed for the critical read and write paths.'],
  ['Stress the design', 'Find bottlenecks, hot keys, dependency failures, overload behavior, and recovery paths.'],
  ['Operate it', 'Add service-level objectives, signals, alerts, capacity plans, and safe deployment paths.'],
] as const;
