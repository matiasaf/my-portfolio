import { handleRequest } from '../src/worker.js';
import { createVercelHandler } from '../src/vercel.js';

export default createVercelHandler(handleRequest, '/health');
