/**
 * Class representing a word and its associated operations.
 */
export class Word {
  /**
   * Array of individual letters in the word.
   */
  letters: string[];

  /**
   * Creates an instance of the Word class.
   * @param word - The word as a string.
   */
  constructor(public word: string) {
    this.letters = this.word.split('');
  }

  /**
   * Checks if the current word is equal to another word.
   * @param otherWord - The word to compare with.
   * @returns True if the words are equal, false otherwise.
   */
  equals(otherWord: Word): boolean {
    return this.word === otherWord.word;
  }

  /**
   * Gets the number of letters in the word.
   * @returns The number of letters in the word.
   */
  getLetterNumber(): number {
    return this.letters.length;
  }

  /**
   * Compares the letters of the current word with another word.
   * @param otherWord - The word to compare with.
   * @returns The number of matching letters at the same positions.
   */
  compareLetters(otherWord: Word): number {
    let correctLetterCount = 0;

    const lengthToCompare = Math.min(
      this.letters.length,
      otherWord.letters.length
    );

    for (let i = 0; i < lengthToCompare; i++) {
      if (this.letters[i] === otherWord.letters[i]) {
        correctLetterCount++;
      }
    }

    return correctLetterCount;
  }

  /**
   * Converts the word to a string representation.
   * @returns The word as a string.
   */
  toString() {
    return this.word;
  }
}
