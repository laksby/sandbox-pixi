export interface Events {
  scoreReachedLevel(this: GameEvents): void | Promise<void>;
}

export type EventPool = {
  [E in keyof Events]: Set<Events[E]>;
};

export class GameEvents {
  private readonly _eventPool: Partial<EventPool> = {};

  public on<E extends keyof Events>(event: E, handler: Events[E]): void {
    if (!(event in this._eventPool)) {
      (this._eventPool as Record<string, unknown>)[event] = new Set<Events[E]>();
    }

    this._eventPool[event]!.add(handler);
  }

  public async emit<E extends keyof Events>(event: E, parameters: Parameters<Events[E]>): Promise<void> {
    if (event in this._eventPool) {
      await Promise.all(
        Array.from(this._eventPool[event]!).map(handler => (handler as Function).apply(this, parameters)),
      );
    }
  }
}
