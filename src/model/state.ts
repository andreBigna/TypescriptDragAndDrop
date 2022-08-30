import { Listener } from "../types/listener";

export class State<T> {
    protected listeners: Listener<T>[] = [];
    public addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }