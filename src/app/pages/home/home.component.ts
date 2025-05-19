import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

/**
 * The HomeComponent is the main component for the home page of the application.
 * It implements the AfterViewInit lifecycle hook to perform actions after the view is initialized.
 *
 * Properties:
 * - showContent: A boolean property that determines whether the content of the home page should be displayed.
 *   Initially set to false and updated to true after a delay when the view is initialized.
 *
 * Methods:
 * - ngAfterViewInit(): A lifecycle hook that is called after the component's view has been fully initialized.
 *   It uses a setTimeout function to delay the display of the content by setting showContent to true.
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  showContent: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    });
  }
}
