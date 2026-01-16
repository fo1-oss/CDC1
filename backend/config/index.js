/**
 * Configuration settings
 */

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'cdc-investor-dataroom-secret-key-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },

    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },

    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
    },

    company: {
        name: 'Crep Dog Crew',
        email: 'fo1@crepdogcrew.com',
        website: 'https://crepdogcrew.com'
    }
};
