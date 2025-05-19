/**
 * Application configuration for the Angular app.
 * This configuration provides essential services and settings for the application.
 */

/**
 * Importing necessary modules and functions from Angular core and router.
 * - ApplicationConfig: Interface for defining application-level configurations.
 * - provideZoneChangeDetection: Function to configure zone change detection.
 * - provideRouter: Function to configure the application's router.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

/**
 * Importing the application's route definitions.
 */
import { routes } from './app.routes';

/**
 * Importing the HTTP client provider to enable HTTP communication in the app.
 */
import { provideHttpClient } from '@angular/common/http';

/**
 * The main application configuration object.
 * - providers: An array of providers that configure services and features for the app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Configures zone change detection with event coalescing enabled.
     * Event coalescing improves performance by reducing the number of change detection cycles.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configures the application's router with the defined routes.
     */
    provideRouter(routes),

    /**
     * Provides the HTTP client service for making HTTP requests.
     */
    provideHttpClient(),
  ],
};
