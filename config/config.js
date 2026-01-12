require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'dev.sqlite',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: 'dev.sqlite',
    logging: false
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: false
  }
};
