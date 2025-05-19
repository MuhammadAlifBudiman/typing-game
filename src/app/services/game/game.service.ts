import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WordListService } from './word-list.service';
import { TimerService } from './timer.service';
import { StatsService } from './stats.service';

/**
 * Injectable service that manages the core logic of the typing game.
 * It handles word management, game state, user input, and interactions with other services.
 */
@Injectable({
  providedIn: 'root',
})
export class GameService {
  /**
   * List of words for the current game session.
   */
  words: string[] = [];

  /**
   * List of words typed by the user during the game.
   */
  wordsTyped: string[] = [];

  /**
   * BehaviorSubject to emit the current list of words to subscribers.
   */
  wordsSubject = new BehaviorSubject<string[]>([]);

  /**
   * Current input typed by the user.
   */
  currentInput: string = '';

  /**
   * Array to track the correctness of each letter in the words.
   * Each word is represented as an array of objects with a `correct` property.
   */
  letterStatus: { correct: boolean | null }[][] = [];

  /**
   * Index of the current word being typed by the user.
   */
  currentWordIndex: number = 0;

  /**
   * Flag to indicate whether the game has started.
   */
  gameStarted: boolean = false;

  /**
   * Constructor to initialize the GameService with required dependencies.
   * @param wordListService Service to manage the list of words.
   * @param timerService Service to manage the game timer.
   * @param statsService Service to calculate and manage game statistics.
   */
  constructor(
    public wordListService: WordListService,
    public timerService: TimerService,
    public statsService: StatsService
  ) {
    this.loadGameWords();
  }

  /**
   * Returns an observable of the current list of words.
   */
  getWords() {
    return this.wordsSubject.asObservable();
  }

  /**
   * Fetches a random set of words and initializes the letter status for each word.
   * @param count Optional number of words to fetch.
   */
  getRandomWords(count?: number): void {
    this.words = this.wordListService.getRandomWords(count);
    this.letterStatus = this.words.map((word) =>
      word.split('').map(() => ({ correct: null }))
    );
    this.wordsSubject.next(this.words);
  }

  /**
   * Loads words from the WordListService and initializes the game with them.
   * @param count Optional number of words to load.
   */
  loadGameWords(count?: number): void {
    this.wordListService.loadWords().subscribe({
      next: () => {
        this.getRandomWords(count);
      },
      error: (err) => {
        console.error('Error loading words:', err);
      },
    });
  }

  /**
   * Retrieves the current word being typed by the user.
   */
  getCurrentWord(): string {
    return this.words[this.currentWordIndex] || '';
  }

  /**
   * Updates the user's input and checks the correctness of each letter.
   * @param input The current input typed by the user.
   */
  updateUserInput(input: string): void {
    this.currentInput = input;
    const currentWord = this.getCurrentWord();
    const inputLetters = this.currentInput.split('');
    inputLetters.forEach((letter, index) => {
      if (letter === currentWord[index]) {
        this.letterStatus[this.currentWordIndex][index] = { correct: true };
      } else {
        this.letterStatus[this.currentWordIndex][index] = { correct: false };
      }
    });
  }

  /**
   * Starts the game and initializes the timer.
   */
  startGame(): void {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.timerService.start();
  }

  /**
   * Ends the game, stops the timer, and calculates statistics.
   */
  endGame(): void {
    if (!this.gameStarted) return;
    this.timerService.stop();
    this.gameStarted = false;
    const elapsedTime = this.timerService.getElapsedTimeInSeconds();
    if (this.words.length === this.wordsTyped.length) {
      this.statsService.calculateStats(
        elapsedTime,
        this.words,
        this.wordsTyped
      );
    }
  }

  /**
   * Clears all game-related data.
   */
  clearGameData(): void {
    this.currentInput = '';
    this.currentWordIndex = 0;
    this.wordsTyped = [];
  }

  /**
   * Resets the game by clearing data, reloading words, and restarting the timer.
   */
  resetGame(): void {
    this.endGame();
    this.clearGameData();
    this.getRandomWords();
    this.timerService.restart();
    this.gameStarted = true;
  }

  /**
   * Marks skipped letters in the current word as incorrect.
   */
  private markSkippedLettersAsIncorrect(): void {
    const currentWord = this.getCurrentWord();
    const inputLength = this.currentInput.length;

    if (inputLength < currentWord.length) {
      for (let i = inputLength; i < currentWord.length; i++) {
        this.letterStatus[this.currentWordIndex][i] = { correct: false };
      }
    }
  }

  /**
   * Checks if the current word is the last word in the list.
   */
  private isLastWord(): boolean {
    return this.currentWordIndex >= this.words.length - 1;
  }

  /**
   * Advances to the next word in the list.
   */
  private advanceToNextWord(): void {
    this.currentWordIndex++;
    this.currentInput = '';
  }

  /**
   * Handles the transition to the next word or resets the game if the last word is reached.
   */
  onNextWord(): void {
    this.wordsTyped.push(this.currentInput);
    this.markSkippedLettersAsIncorrect();
    if (this.isLastWord()) {
      this.resetGame();
    } else {
      this.advanceToNextWord();
    }
  }

  /**
   * Removes the styling for the last character typed by the user.
   */
  removeLastCharacterStyling(): void {
    const typedLetterIndex = this.currentInput.length - 1;
    if (typedLetterIndex < 0) return;
    this.letterStatus[this.currentWordIndex][typedLetterIndex] = {
      correct: null,
    };
  }

  /**
   * Removes all styling from the current word.
   */
  removeAllStylingFromCurrentWord(): void {
    const currentWordLength = this.getCurrentWord().length;
    for (let i = 0; i < currentWordLength; i++) {
      this.letterStatus[this.currentWordIndex][i] = { correct: null };
    }
  }
}
