import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * TimerService is responsible for managing a timer that tracks elapsed time.
 * It provides methods to start, stop, and restart the timer, as well as retrieve the elapsed time.
 */
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  /**
   * The timestamp when the timer was started or resumed.
   */
  private startTime: number = 0;

  /**
   * The total elapsed time in milliseconds.
   */
  private elapsedTime: number = 0;

  /**
   * The interval ID for the timer, used to clear the interval when stopping the timer.
   */
  private timerInverval: any = null;

  /**
   * A flag indicating whether the timer is currently running.
   */
  private isRunning: boolean = false;

  /**
   * A BehaviorSubject to emit the elapsed time updates.
   */
  private timeSubject = new BehaviorSubject<number>(0);

  /**
   * An observable that emits the elapsed time in milliseconds.
   */
  time$ = this.timeSubject.asObservable();

  /**
   * Starts the timer. If the timer is already running, it logs a warning and does nothing.
   */
  start(): void {
    if (this.isRunning) {
      console.warn('timer is running');
      return;
    }
    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;
    this.timerInverval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.timeSubject.next(this.elapsedTime);
    }, 100); // Updates the elapsed time every 100 milliseconds.
  }

  /**
   * Stops the timer if it is running. Clears the interval to stop updates.
   */
  stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.timerInverval);
  }

  /**
   * Restarts the timer by stopping it, resetting the elapsed time, and starting it again.
   */
  restart(): void {
    this.stop();
    this.elapsedTime = 0;
    this.start();
  }

  /**
   * Retrieves the total elapsed time in milliseconds.
   * @returns The elapsed time in milliseconds.
   */
  getElapsedTime(): number {
    return this.elapsedTime;
  }

  /**
   * Retrieves the total elapsed time in seconds, rounded to two decimal places.
   * @returns The elapsed time in seconds.
   */
  getElapsedTimeInSeconds(): number {
    const seconds = this.elapsedTime / 1000;
    return parseFloat(seconds.toFixed(2));
  }
}
