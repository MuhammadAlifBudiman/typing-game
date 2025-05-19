/**
 * Angular Routes Configuration
 * This file defines the routes for the application, mapping URL paths to components.
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Home page component
import { TypingTestComponent } from './pages/typing-test/typing-test.component'; // Typing test page component
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component'; // Leaderboard page component
import { ThemesComponent } from './pages/themes/themes.component'; // Themes page component
import { AboutComponent } from './pages/about/about.component'; // About page component
import { ErrorComponent } from './pages/error/error.component'; // Error page component

/**
 * Array of route definitions for the application.
 * Each route maps a URL path to a specific component.
 */
export const routes: Routes = [
  {
    path: '', // Default path
    redirectTo: '/home', // Redirect to the home page
    pathMatch: 'full', // Match the full path
  },
  {
    path: 'home', // Path for the home page
    component: HomeComponent, // Component to render for this path
  },
  {
    path: 'typing_test', // Path for the typing test page
    component: TypingTestComponent, // Component to render for this path
  },
  {
    path: 'leaderboard', // Path for the leaderboard page
    component: LeaderboardComponent, // Component to render for this path
  },
  {
    path: 'themes', // Path for the themes page
    component: ThemesComponent, // Component to render for this path
  },
  {
    path: 'about', // Path for the about page
    component: AboutComponent, // Component to render for this path
  },
  {
    path: 'error', // Path for the error page
    component: ErrorComponent, // Component to render for this path
  },
  {
    path: '**', // Wildcard path for undefined routes
    component: ErrorComponent, // Component to render for undefined routes
  },
];
