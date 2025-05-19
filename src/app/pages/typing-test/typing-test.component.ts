/**
 * TypingTestComponent is the main component for the typing test page.
 * It handles the initialization and cleanup of the typing test game.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { CommonModule } from '@angular/common';
import { InputRowComponent } from './input-row/input-row.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-typing-test', // The selector used to include this component in templates.
  imports: [
    StatsComponent, // Component to display game statistics.
    CommonModule, // Angular's common module for basic directives and pipes.
    InputRowComponent, // Component for user input row.
    WordDisplayComponent, // Component to display words for the typing test.
  ],
  templateUrl: './typing-test.component.html', // Path to the HTML template for this component.
  styleUrl: './typing-test.component.scss', // Path to the SCSS styles for this component.
})
export class TypingTestComponent implements OnInit, OnDestroy {
  /**
   * Constructor to inject the GameService.
   * @param gameService - Service to manage the game logic.
   */
  constructor(public gameService: GameService) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to the word list from the GameService.
   */
  ngOnInit(): void {
    this.gameService.getWords().subscribe();
  }

  /**
   * Lifecycle hook that is called before the component is destroyed.
   * Resets the game state and logs a message to the console.
   */
  ngOnDestroy(): void {
    this.gameService.resetGame();
    console.log('Game reset on component destruction');
  }
}
