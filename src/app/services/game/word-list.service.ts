import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

/**
 * Service to manage the word list for the typing game.
 * Handles loading words from a file, storing them, and providing random selections.
 */
@Injectable({
  providedIn: 'root', // Makes this service available throughout the app.
})
export class WordListService {
  /**
   * Path to the file containing the word list.
   */
  private filePath = 'english-1k.txt';

  /**
   * Array to store the loaded words.
   */
  private loadedWords: string[] = [];

  /**
   * Default number of words to return when no count is specified.
   */
  private defaultWordCount = 25;

  /**
   * Constructor to inject the HttpClient for making HTTP requests.
   * @param http - Angular's HttpClient for fetching the word list.
   */
  constructor(private http: HttpClient) {}

  /**
   * Loads words from the file specified in `filePath`.
   * @returns An Observable that emits an array of words.
   */
  loadWords(): Observable<string[]> {
    return this.http.get(this.filePath, { responseType: 'text' }).pipe(
      map((data) =>
        data
          .split('\n') // Split the file content into lines.
          .map((word) => word.trim()) // Remove extra spaces from each word.
          .filter((word) => word.length > 0) // Exclude empty lines.
      ),
      tap((words) => {
        this.loadedWords = words; // Store the loaded words.
      })
    );
  }

  /**
   * Generates a set of unique random indices.
   * @param count - The number of random indices to generate.
   * @returns A set of unique random indices.
   * @throws Error if the requested count exceeds the number of loaded words.
   */
  getRandomIndices(count: number): Set<number> {
    if (count > this.loadedWords.length) {
      throw new Error(
        'Requested number of indices exceeds the available words.'
      );
    }

    const randomIndices = new Set<number>();

    while (randomIndices.size < count) {
      const randomIndex = Math.floor(Math.random() * this.loadedWords.length);
      randomIndices.add(randomIndex);
    }
    return randomIndices;
  }

  /**
   * Retrieves a specified number of random words from the loaded word list.
   * @param count - Optional number of words to retrieve. Defaults to `defaultWordCount`.
   * @returns An array of random words.
   * @throws Error if words have not been loaded yet.
   */
  getRandomWords(count?: number): string[] {
    if (this.loadedWords.length === 0) {
      throw new Error('Words have not been loaded. Call loadWords() first.');
    }

    const effectiveCount = count ?? this.defaultWordCount; // Use the provided count or the default.
    const randomIndices = this.getRandomIndices(effectiveCount);
    const result: string[] = [];

    randomIndices.forEach((index) => {
      result.push(this.loadedWords[index]); // Add the word at the random index to the result.
    });

    return result;
  }
}
