/**
 * Represents an entry in the leaderboard.
 */
export interface LeaderboardEntry {
  /**
   * The username of the player.
   */
  username: string;

  /**
   * The clean speed of the player, measured in words per minute (WPM).
   * Clean speed refers to the speed without any errors.
   */
  cleanSpeed: number;

  /**
   * The raw speed of the player, measured in words per minute (WPM).
   * Raw speed includes errors made during typing.
   */
  rawSpeed: number;

  /**
   * The accuracy of the player, represented as a percentage.
   */
  accuracy: number;
}
