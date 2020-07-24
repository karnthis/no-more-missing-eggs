import {BehaviorSubject, Observable} from 'rxjs';

export abstract class Stateful<T> {

  protected constructor(initialState?: T) {
    this._state = new BehaviorSubject<T>(initialState ?? null);
  }

  private _state: BehaviorSubject<T>;

  /**
   * Gets a stream of the internal state
   */
  get state$(): Observable<T> {
    return this._state.asObservable();
  }

  /**
   * Gets a the current value of the internal state
   */
  get snapshot$(): T {
    return this._state.getValue();
  }

  /**
   * Sets the next value of the internal state
   */
  next(value: T): void {
    this._state.next(value);
  }

  /**
   * Sets the state to null
   */
  clear(): void {
    this._state.next(null);
  }
}
