import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game/game.service';

/**
 * InputRowComponent is responsible for handling user input during the typing test.
 * It interacts with the GameService to manage the game state and user input.
 */
@Component({
  selector: 'app-input-row', // The selector used to include this component in templates.
  imports: [CommonModule], // Importing CommonModule for common Angular directives.
  templateUrl: './input-row.component.html', // Path to the HTML template for this component.
  styleUrl: './input-row.component.scss', // Path to the SCSS file for this component's styles.
})
export class InputRowComponent implements AfterViewInit {
  @ViewChild('wordInput') wordInput!: ElementRef<HTMLInputElement>; // Reference to the input element for user typing.
  showContent: boolean = false; // Controls the visibility of the component's content.

  /**
   * Constructor initializes the component with the required GameService.
   * @param gameService - Service to manage game logic and state.
   */
  constructor(private gameService: GameService) {}

  /**
   * Lifecycle hook that runs after the view has been initialized.
   * Sets a timeout to display the content after a short delay.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 20);
  }

  /**
   * Handles changes in the input field and updates the user input in the GameService.
   */
  onInputChange(): void {
    const userInput = this.wordInput.nativeElement.value; // Get the current value of the input field.
    this.gameService.updateUserInput(userInput); // Update the user input in the game service.
  }

  /**
   * Resets the input field and clears the user input in the GameService.
   */
  resetInput(): void {
    if (this.wordInput) {
      this.wordInput.nativeElement.value = ''; // Clear the input field.
    }
    this.gameService.updateUserInput(''); // Clear the user input in the game service.
  }

  /**
   * Handles keydown events to manage game actions based on specific keys.
   * @param event - The keyboard event triggered by the user.
   */
  onKeydown(event: KeyboardEvent): void {
    const userInput = this.wordInput.nativeElement.value; // Get the current value of the input field.

    if (!this.gameService.gameStarted) {
      this.gameService.startGame(); // Start the game if it hasn't started yet.
    }

    this.gameService.updateUserInput(userInput); // Update the user input in the game service.

    if (event.key === ' ') {
      event.preventDefault(); // Prevent default space behavior.
      this.gameService.onNextWord(); // Move to the next word in the game.
      this.resetInput(); // Reset the input field.
    }

    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior.
      this.gameService.resetGame(); // Reset the game state.
      this.resetInput(); // Reset the input field.
      return;
    }

    if (event.key === 'Backspace' && event.ctrlKey) {
      this.gameService.removeAllStylingFromCurrentWord(); // Remove all styling from the current word.
      this.resetInput(); // Reset the input field.
      return;
    }

    if (event.key === 'Backspace') {
      this.gameService.removeLastCharacterStyling(); // Remove styling for the last character.
    }
  }

  /**
   * Resets the game and clears the input field when the redo button is clicked.
   */
  onRedoClick(): void {
    this.gameService.resetGame(); // Reset the game state.
    this.resetInput(); // Reset the input field.
  }
}
