import { Client, Environment } from "square";

/**
 * Square SDK Integration
 * 
 * This file initializes the Square client with your credentials and exports
 * the various Square APIs for use throughout the application.
 * 
 * Required Environment Variables:
 * - SQUARE_ACCESS_TOKEN: Your Square Access Token from the Developer Dashboard
 * - SQUARE_ENVIRONMENT: 'sandbox' for testing or 'production' for live
 * 
 * Get your credentials from: https://developer.squareup.com/apps
 */

// Initialize Square client
export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === "production" 
    ? Environment.Production 
    : Environment.Sandbox,
});

/**
 * Exported Square APIs
 * 
 * - paymentsApi: Process payments and refunds
 * - bookingsApi: Manage bookings and appointments
 * - catalogApi: Manage items, variations, categories, and pricing
 * - customersApi: Manage customer data
 */
export const paymentsApi = squareClient.paymentsApi;
export const bookingsApi = squareClient.bookingsApi;
export const catalogApi = squareClient.catalogApi;
export const customersApi = squareClient.customersApi;
