import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats } from '../../models/stats.model';
import { Word } from '../../models/word.model';

/**
 * Service to manage and calculate typing statistics.
 * Provides methods to calculate and update typing stats such as speed, accuracy, and errors.
 */
@Injectable({
  providedIn: 'root',
})
export class StatsService {
  /**
   * BehaviorSubject to hold the current stats.
   * Initialized with default values as NaN.
   */
  private statsSubject = new BehaviorSubject<Stats>({
    cleanSpeed: NaN, // Clean speed in words per minute (WPM)
    accuracy: NaN,   // Accuracy percentage
    rawSpeed: NaN,   // Raw speed in WPM
    allWords: NaN,   // Total number of words
    incorrectWords: NaN, // Number of incorrect words
    allLetters: NaN, // Total number of letters
    incorrectLetters: NaN, // Number of incorrect letters
  });

  /**
   * Observable to expose the stats to other components.
   */
  stats$ = this.statsSubject.asObservable();

  /**
   * Updates the stats with new values.
   * @param newStats - The new stats to update.
   */
  updateStats(newStats: Stats): void {
    this.statsSubject.next(newStats);
    console.log('Stats updated');
  }

  /**
   * Resets the stats to their default values.
   */
  resetStats(): void {
    this.statsSubject.next({
      cleanSpeed: NaN,
      accuracy: NaN,
      rawSpeed: NaN,
      allWords: NaN,
      incorrectWords: NaN,
      allLetters: NaN,
      incorrectLetters: NaN,
    });
  }

  /**
   * Calculates the accuracy percentage.
   * @param correctLetters - Number of correct letters typed.
   * @param totalLetters - Total number of letters typed.
   * @returns Accuracy as a percentage.
   */
  private calculateAccuracy(correctLetters: number, totalLetters: number): number {
    return (correctLetters / totalLetters) * 100;
  }

  /**
   * Calculates the raw typing speed in words per minute (WPM).
   * @param totalLetters - Total number of letters typed.
   * @param timeElapsed - Time elapsed in seconds.
   * @returns Raw speed in WPM.
   */
  private calculateRawSpeed(totalLetters: number, timeElapsed: number): number {
    const timeElapsedInMinutes = timeElapsed / 60;
    if (timeElapsedInMinutes <= 0) {
      console.warn('Warning: Value is too small!');
      return 0;
    }
    return totalLetters / 4 / timeElapsedInMinutes;
  }

  /**
   * Calculates the clean typing speed in words per minute (WPM).
   * @param rawSpeed - Raw speed in WPM.
   * @param accuracy - Accuracy percentage.
   * @returns Clean speed in WPM.
   */
  private calculateCleanSpeed(rawSpeed: number, accuracy: number): number {
    return rawSpeed * (accuracy / 100);
  }

  /**
   * Compares the target words with the typed words to calculate errors and correctness.
   * @param allWords - Array of target words.
   * @param wordsTyped - Array of words typed by the user.
   * @returns Object containing total letters, correct letters, incorrect letters, and incorrect words.
   */
  private compareWords(
    allWords: string[],
    wordsTyped: string[]
  ): {
    totalLetters: number;
    correctLetters: number;
    incorrectLetters: number;
    incorrectWords: number;
  } {
    let totalLetters = 0;
    let correctLetters = 0;
    let incorrectLetters = 0;
    let incorrectWords = 0;

    for (let i = 0; i < allWords.length; i++) {
      const targetWord = new Word(allWords[i]);
      const typedWord = new Word(wordsTyped[i]);

      totalLetters += targetWord.getLetterNumber();
      correctLetters += typedWord.compareLetters(targetWord);
      incorrectLetters +=
        targetWord.getLetterNumber() - typedWord.compareLetters(targetWord);

      if (!typedWord.equals(targetWord)) {
        incorrectWords++;
      }
    }

    return { totalLetters, correctLetters, incorrectLetters, incorrectWords };
  }

  /**
   * Calculates and updates the typing stats based on the provided data.
   * @param timeElapsed - Time elapsed in seconds.
   * @param allWords - Array of target words.
   * @param wordsTyped - Array of words typed by the user.
   */
  calculateStats(
    timeElapsed: number,
    allWords: string[],
    wordsTyped: string[]
  ): void {
    if (timeElapsed <= 0) {
      console.warn('Time elapsed should be greater than zero!');
      return;
    }
    if (!allWords || allWords.length === 0) {
      throw new Error('All words array is empty!');
    }
    if (!wordsTyped || wordsTyped.length === 0) {
      throw new Error('Error: wordsTyped array is empty.');
    }

    const wordComparison = this.compareWords(allWords, wordsTyped);
    const accuracy = this.calculateAccuracy(
      wordComparison.correctLetters,
      wordComparison.totalLetters
    );
    const rawSpeed = this.calculateRawSpeed(
      wordComparison.totalLetters,
      timeElapsed
    );
    const cleanSpeed = this.calculateCleanSpeed(rawSpeed, accuracy);

    const newStats: Stats = {
      cleanSpeed: parseFloat(cleanSpeed.toFixed(2)),
      accuracy: parseFloat(accuracy.toFixed(2)),
      rawSpeed: parseFloat(rawSpeed.toFixed(2)),
      allWords: allWords.length,
      incorrectWords: wordComparison.incorrectWords,
      allLetters: wordComparison.totalLetters,
      incorrectLetters: wordComparison.incorrectLetters,
    };

    this.updateStats(newStats);
  }
}
