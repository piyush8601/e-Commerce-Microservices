export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3002,
  database: {
    uri: process.env.MONGODB_URI || "put your mongoDB URI",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  auth: {
    serviceUrl: process.env.AUTH_SERVICE_URL || '0.0.0.0:5051',
  },
}); 
