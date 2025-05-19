/**
 * Interface representing typing test statistics.
 */
export interface Stats {
  /**
   * The speed of typing in words per minute, considering only correctly typed words.
   */
  cleanSpeed: number;

  /**
   * The speed of typing in words per minute, including all typed words (correct and incorrect).
   */
  rawSpeed: number;

  /**
   * The percentage of correctly typed characters out of all typed characters.
   */
  accuracy: number;

  /**
   * The total number of words typed during the test.
   */
  allWords: number;

  /**
   * The number of incorrectly typed words during the test.
   */
  incorrectWords: number;

  /**
   * The total number of characters typed during the test.
   */
  allLetters: number;

  /**
   * The number of incorrectly typed characters during the test.
   */
  incorrectLetters: number;
}
