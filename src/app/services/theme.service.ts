import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

/**
 * Service to manage application themes.
 * Provides methods to set, load, and retrieve the current theme.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Renderer2 instance for DOM manipulation.
   */
  private renderer: Renderer2;

  /**
   * Stores the current theme name. Defaults to 'default'.
   */
  private currentTheme: string = 'default';

  /**
   * Constructor to initialize the Renderer2 instance.
   * @param rendererFactory - Factory to create Renderer2 instances.
   */
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Sets the theme by updating the `data-theme` attribute on the HTML element.
   * Also saves the theme to localStorage.
   * @param theme - The name of the theme to set.
   */
  setTheme(theme: string): void {
    const htmlElement = document.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  /**
   * Loads the theme from localStorage and applies it.
   * If no theme is saved, defaults to 'default'.
   */
  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'default';
    this.setTheme(savedTheme);
  }

  /**
   * Retrieves the current theme name.
   * @returns The name of the current theme.
   */
  getTheme(): string {
    return this.currentTheme;
  }
}
