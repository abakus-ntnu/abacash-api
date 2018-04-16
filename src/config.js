import pino from 'pino';

const config = {
  port: process.env.PORT || 9000,
  web: process.env.WEB_URL || 'localhost:4000',
  pgUrl: process.env.PG_URL || 'postgres://abacash:@localhost/abacash',
  env: process.env.NODE_ENV || 'development',
  release: process.env.RELEASE || null,
  secret: process.env.SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRE || '7 days',
  jwtSecret: process.env.JWT_SECRET || 'hemmelig',
  smtpUrl: process.env.SMTP_URL || 'smtp://127.0.0.1:25',
  segmentKey: process.env.SEGMENT_WRITE_KEY || null,
  forestEnv:
    process.env.FOREST_ENV_SECRET ||
    'babc3f8af8265edf78306b388cc5dbb7038a525c59fb041665bbf747b9a5f436',
  forestSecret:
    process.env.FOREST_AUTH_SECRET || '8M1l1DJ8H2I703t1iDIrd76oKwBg0eo3',
  sentryDsn: process.env.SENTRY_DSN || null
};

const logger = pino({ prettyPrint: config.env !== 'production' });

export default config;
export { logger };
