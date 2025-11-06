import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/octodock',
  // Optional: set max number of clients in the pool
  max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT, 10) || 30000,
  connectionTimeoutMillis: parseInt(process.env.DB_CONN_TIMEOUT, 10) || 2000,
});

pool.on('error', (err) => {
  // Handles errors on idle clients
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Executes a SQL query using the shared pool.
 * @param {string} text - The query text.
 * @param {Array<any>} [params] - Optional query parameters.
 * @returns {Promise<pg.QueryResult>}
 */
export const query = (text, params) => {
  return pool.query(text, params);
};

/**
 * Acquires a client from the pool for transaction control.
 * @returns {Promise<pg.PoolClient>}
 */
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

export default {
  query,
  getClient,
};
