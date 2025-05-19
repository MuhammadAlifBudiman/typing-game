import { Injectable } from '@angular/core';
import { LeaderboardEntry } from '../models/leaderboard-entry.model';
import { Observable, of } from 'rxjs';

/**
 * LeaderboardService provides methods to retrieve leaderboard data and total record count.
 * It uses a mock leaderboard dataset for demonstration purposes.
 */
@Injectable({
  providedIn: 'root', // Specifies that this service is available application-wide.
})
export class LeaderboardService {
  /**
   * Mock leaderboard data containing user performance statistics.
   * Each entry includes username, cleanSpeed, rawSpeed, and accuracy.
   */
  mockLeaderboard: LeaderboardEntry[] = [
    { username: 'user14', cleanSpeed: 97, rawSpeed: 120, accuracy: 99 },
    { username: 'user5', cleanSpeed: 95, rawSpeed: 120, accuracy: 97 },
    { username: 'user12', cleanSpeed: 93, rawSpeed: 125, accuracy: 98 },
    { username: 'user10', cleanSpeed: 92, rawSpeed: 110, accuracy: 99 },
    { username: 'user8', cleanSpeed: 91, rawSpeed: 115, accuracy: 98 },
    { username: 'user2', cleanSpeed: 90, rawSpeed: 110, accuracy: 96 },
    { username: 'user15', cleanSpeed: 88, rawSpeed: 106, accuracy: 94 },
    { username: 'user7', cleanSpeed: 88, rawSpeed: 105, accuracy: 97 },
    { username: 'user4', cleanSpeed: 85, rawSpeed: 105, accuracy: 98 },
    { username: 'user11', cleanSpeed: 85, rawSpeed: 100, accuracy: 95 },
    { username: 'user9', cleanSpeed: 83, rawSpeed: 102, accuracy: 96 },
    { username: 'user1', cleanSpeed: 80, rawSpeed: 100, accuracy: 95 },
    { username: 'user13', cleanSpeed: 79, rawSpeed: 95, accuracy: 91 },
    { username: 'user6', cleanSpeed: 78, rawSpeed: 98, accuracy: 94 },
    { username: 'user3', cleanSpeed: 75, rawSpeed: 95, accuracy: 92 },
    { username: 'user7', cleanSpeed: 88, rawSpeed: 105, accuracy: 97 },
    { username: 'user4', cleanSpeed: 85, rawSpeed: 105, accuracy: 98 },
    { username: 'user11', cleanSpeed: 85, rawSpeed: 100, accuracy: 95 },
    { username: 'user9', cleanSpeed: 83, rawSpeed: 102, accuracy: 96 },
    { username: 'user1', cleanSpeed: 80, rawSpeed: 100, accuracy: 95 },
    { username: 'user13', cleanSpeed: 79, rawSpeed: 95, accuracy: 91 },
    { username: 'user6', cleanSpeed: 78, rawSpeed: 98, accuracy: 94 },
    { username: 'user3', cleanSpeed: 75, rawSpeed: 95, accuracy: 92 },
  ];

  /**
   * Retrieves a slice of the leaderboard data based on the specified start index and limit.
   * @param start - The starting index of the leaderboard slice.
   * @param limit - The number of entries to retrieve.
   * @returns An Observable emitting the requested slice of leaderboard entries.
   */
  getLeaderboard(start: number, limit: number): Observable<LeaderboardEntry[]> {
    const startIndex = start; // Calculate the starting index.
    const endIndex = start + limit; // Calculate the ending index.
    const leaderboardSlice = this.mockLeaderboard.slice(startIndex, endIndex); // Extract the slice.
    return of(leaderboardSlice); // Return the slice as an Observable.
  }

  /**
   * Retrieves the total number of records in the mock leaderboard.
   * @returns An Observable emitting an object containing the total record count.
   */
  getCount(): Observable<{ totalRecords: number }> {
    const totalRecords = this.mockLeaderboard.length; // Calculate the total number of records.
    return of({ totalRecords }); // Return the count as an Observable.
  }
}
