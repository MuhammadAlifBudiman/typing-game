import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

/**
 * The AboutComponent is responsible for displaying the 'About' page of the application.
 * It uses Angular's CommonModule for common directives and features.
 *
 * Features:
 * - Displays content after a delay using Angular's AfterViewInit lifecycle hook.
 * - The `showContent` property is initially set to `false` and is updated to `true` after a delay.
 *
 * Lifecycle Hooks:
 * - `ngAfterViewInit`: Executes logic after the component's view has been fully initialized.
 *
 * Usage:
 * - Add the <app-about> selector in the desired HTML template to include this component.
 */
@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  showContent: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    });
  }
}
