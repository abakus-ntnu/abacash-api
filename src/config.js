const config = {
    port: process.env.PORT || 9000,
    pgUrl: process.env.PG_URL || 'postgres://localhost/abacash',
    nodeEnv: process.env.NODE_ENV || 'production',
    defaultCustomerRole: process.env.DEFAULT_CUSTOMER_ROLE || 'customer'
};

export default config;
