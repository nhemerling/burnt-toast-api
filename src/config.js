module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
 
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://burnt_toast@localhost/burnt_toast', 
  JWT_SECRET: process.env.JWT_SECRET || 'do-you-smell-something-burning', 
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
};
 
