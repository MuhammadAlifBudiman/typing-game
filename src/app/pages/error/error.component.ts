import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * ErrorComponent
 * 
 * This component is responsible for displaying an error page.
 * It uses Angular's CommonModule and RouterModule for common functionalities and routing.
 * 
 * Features:
 * - Displays an error message or content when a user navigates to an invalid route or encounters an error.
 * - Implements a delayed content display using Angular's AfterViewInit lifecycle hook.
 * 
 * Properties:
 * - `showContent` (boolean): A flag to control the visibility of the error content. Initially set to `false`.
 * 
 * Methods:
 * - `ngAfterViewInit()`: Lifecycle hook that triggers after the component's view has been initialized. 
 *   It sets a timeout of 10 milliseconds to update the `showContent` property to `true`, enabling the display of the error content.
 */
@Component({
  selector: 'app-error',
  imports: [RouterModule, CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements AfterViewInit {
  showContent: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }
}
