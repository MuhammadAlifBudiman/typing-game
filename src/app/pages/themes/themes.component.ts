/**
 * Angular component for managing and displaying available themes.
 * Implements AfterViewInit lifecycle hook to handle post-view initialization logic.
 */
import { CommonModule } from '@angular/common'; // Importing Angular's CommonModule for common directives.
import { AfterViewInit, Component } from '@angular/core'; // Importing Component decorator and AfterViewInit lifecycle hook.
import { ThemeService } from '../../services/theme.service'; // Importing ThemeService to manage theme-related logic.

/**
 * Component metadata for ThemesComponent.
 * - selector: The HTML tag to use for this component.
 * - imports: Modules required by this component.
 * - templateUrl: Path to the HTML template.
 * - styleUrl: Path to the SCSS styles.
 */
@Component({
  selector: 'app-themes',
  imports: [CommonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export class ThemesComponent implements AfterViewInit {
  /**
   * Boolean flag to control the visibility of the content.
   * Initially set to false and updated after the view is initialized.
   */
  showContent: boolean = false;

  /**
   * Array of theme objects, each containing:
   * - name: Internal identifier for the theme.
   * - displayName: User-friendly name for the theme.
   * - colors: Array of color codes associated with the theme.
   */
  themes = [
    {
      name: 'default',
      displayName: 'Default Theme',
      colors: ['#000000', '#333333', '#ffffff'],
    },
    {
      name: 'ocean-blue',
      displayName: 'Ocean Blue Theme',
      colors: ['#001f3d', '#003366', '#8ab4f8'],
    },
    {
      name: 'dark-blue',
      displayName: 'Dark Blue Theme',
      colors: ['#000', '#000033', '#0000ad'],
    },
    {
      name: 'dark-red',
      displayName: 'Dark Red Theme',
      colors: ['#000', '#330000', '#160000'],
    },
    {
      name: 'cyberpunk',
      displayName: 'Cyperpunk Neon',
      colors: ['#1a1a1a', '#5b005b', '#00ffff'],
    },
    {
      name: 'galaxy',
      displayName: 'Galaxy',
      colors: ['#0d0d1c', '#2a2a44', '#12122e'],
    },
    {
      name: 'light-grey',
      displayName: 'Light Grey Theme',
      colors: ['#ffffff', '#dddddd', '#606060'],
    },
    {
      name: 'pink',
      displayName: 'Pink Theme',
      colors: ['#ffe6f0', '#ff66b2', '#ff1493'],
    },
  ];

  /**
   * Constructor to inject the ThemeService.
   * @param themeService - Service to manage theme-related operations.
   */
  constructor(private themeService: ThemeService) {}

  /**
   * Lifecycle hook that runs after the component's view has been fully initialized.
   * Sets a timeout to update the showContent flag, enabling content visibility.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }

  /**
   * Method to select a theme by its name.
   * Delegates the theme selection logic to the ThemeService.
   * @param themeName - The name of the theme to be applied.
   */
  selectTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
  }
}
