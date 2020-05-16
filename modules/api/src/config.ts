
export default () => ({
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
  },
});
