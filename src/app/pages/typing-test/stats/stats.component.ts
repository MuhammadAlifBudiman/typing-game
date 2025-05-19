/**
 * Angular component to display typing test statistics.
 * Implements OnInit and AfterViewInit lifecycle hooks.
 */
import { CommonModule } from '@angular/common'; // Importing Angular's CommonModule for common directives.
import { Component, OnInit, AfterViewInit } from '@angular/core'; // Importing Angular core decorators and lifecycle hooks.
import { Stats } from '../../../models/stats.model'; // Importing the Stats model interface.
import { StatsService } from '../../../services/game/stats.service'; // Importing the StatsService to fetch and manage stats data.

/**
 * Component metadata for the StatsComponent.
 */
@Component({
  selector: 'app-stats', // The HTML tag to use this component.
  imports: [CommonModule], // Modules to import for this component.
  templateUrl: './stats.component.html', // Path to the HTML template.
  styleUrl: './stats.component.scss', // Path to the SCSS styles.
})
/**
 * StatsComponent class to manage and display typing test statistics.
 */
export class StatsComponent implements OnInit, AfterViewInit {
  showContent: boolean = false; // Flag to control the visibility of the content.
  showStats = true; // Flag to toggle the visibility of stats.

  /**
   * Object to hold the statistics data.
   * @property {number} cleanSpeed - Speed of typing without errors.
   * @property {number} rawSpeed - Overall typing speed including errors.
   * @property {number} accuracy - Accuracy percentage of typing.
   * @property {number} allWords - Total number of words typed.
   * @property {number} incorrectWords - Number of incorrect words typed.
   * @property {number} allLetters - Total number of letters typed.
   * @property {number} incorrectLetters - Number of incorrect letters typed.
   */
  stats: Stats = {
    cleanSpeed: 0,
    rawSpeed: 0,
    accuracy: 0,
    allWords: 0,
    incorrectWords: 0,
    allLetters: 0,
    incorrectLetters: 0,
  };

  /**
   * Constructor to inject the StatsService.
   * @param {StatsService} statsService - Service to manage stats data.
   */
  constructor(private statsService: StatsService) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to the stats observable to update the stats data.
   */
  ngOnInit(): void {
    this.statsService.stats$.subscribe((newStats: Stats) => {
      this.stats = newStats; // Update stats with new data from the service.
    });
  }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Sets a timeout to display the content after a short delay.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true; // Show the content after 30ms.
    }, 30);
  }

  /**
   * Toggles the visibility of the stats section.
   */
  toggleStats(): void {
    this.showStats = !this.showStats; // Toggle the showStats flag.
  }
}
