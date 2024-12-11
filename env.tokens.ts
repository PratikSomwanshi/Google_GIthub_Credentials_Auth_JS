const TOKENS = {
    GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_ID,
    GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
};

const HOST = {
    BACKEND_URL: process.env.BACKEND_URL,
    HOST_URL: process.env.HOST_URL,
};

export { TOKENS, HOST };
