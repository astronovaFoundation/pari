import { Client, Environment } from "square";

// Initialize Square client
export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === "production" 
    ? Environment.Production 
    : Environment.Sandbox,
});

// Export APIs
export const paymentsApi = squareClient.paymentsApi;
export const bookingsApi = squareClient.bookingsApi;
export const catalogApi = squareClient.catalogApi;
export const customersApi = squareClient.customersApi;
