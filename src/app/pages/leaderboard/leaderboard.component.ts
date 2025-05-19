/**
 * LeaderboardComponent is responsible for displaying the leaderboard data.
 * It fetches the leaderboard entries and handles pagination.
 */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LeaderboardEntry } from '../../models/leaderboard-entry.model';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard', // The selector used to include this component in templates.
  imports: [CommonModule], // Modules imported for this component.
  templateUrl: './leaderboard.component.html', // Path to the HTML template.
  styleUrl: './leaderboard.component.scss', // Path to the SCSS styles.
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  showContent: boolean = false; // Controls the visibility of the content.
  leaderboard: LeaderboardEntry[] = []; // Array to store leaderboard entries.
  currentPage: number = 1; // Current page number for pagination.
  pageSize: number = 10; // Number of entries per page.
  totalRecords: number = 0; // Total number of leaderboard records.
  totalPages: number = 0; // Total number of pages based on records and page size.
  showLeaderboardMessage: boolean = false; // Flag to show a message when leaderboard data is loaded.

  /**
   * Constructor to inject the LeaderboardService.
   * @param leaderboardService Service to fetch leaderboard data.
   */
  constructor(private leaderboardService: LeaderboardService) {}

  /**
   * Lifecycle hook that runs after the view is initialized.
   * Used to delay showing the content for a smoother UI experience.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }

  /**
   * Fetches the total count of leaderboard records and calculates total pages.
   */
  loadLeaderboardCount(): void {
    this.leaderboardService.getCount().subscribe({
      next: (response) => {
        this.totalRecords = response.totalRecords; // Set total records from response.
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize); // Calculate total pages.
        this.showLeaderboardMessage = true; // Show message indicating data is loaded.
      },
      error: (err) => {
        console.error('Error fetching leaderboard count: ', err); // Log error if fetching fails.
        this.showLeaderboardMessage = true; // Show message even if there's an error.
      },
    });
  }

  /**
   * Fetches leaderboard data for a specific page.
   * @param page The page number to load.
   */
  loadPage(page: number): void {
    const start = (page - 1) * this.pageSize; // Calculate the starting index.
    const limit = this.pageSize; // Set the limit for records to fetch.
    this.leaderboardService.getLeaderboard(start, limit).subscribe((data) => {
      this.leaderboard = data; // Update the leaderboard array with fetched data.
    });
  }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Loads the leaderboard count and the first page of data.
   */
  ngOnInit(): void {
    this.loadLeaderboardCount();
    this.loadPage(this.currentPage);
  }

  /**
   * Navigates to the next page if it exists.
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment the current page.
      this.loadPage(this.currentPage); // Load the next page.
    }
  }

  /**
   * Navigates to the previous page if it exists.
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement the current page.
      this.loadPage(this.currentPage); // Load the previous page.
    }
  }
}
