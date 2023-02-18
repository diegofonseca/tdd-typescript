import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private static instance: EventDispatcher;
    private _handlers: Map<string, Set<EventHandlerInterface>>;

    private constructor() {
        this._handlers = new Map();
    }

    public static getInstance(): EventDispatcher {
        if (!EventDispatcher.instance) {
            EventDispatcher.instance = new EventDispatcher();
        }

        return EventDispatcher.instance;
    }

    notify(event: EventInterface): void {
        let eventName = event.constructor.name;

        if (!this._handlers.has(eventName)) {
            return;
        }

        this._handlers.get(eventName).forEach((handler) => {
            handler.handle(event);
        });
    }

    register(eventName: string, eventHander: EventHandlerInterface): void {
        if (!this._handlers.has(eventName)) {
            this._handlers.set(eventName, new Set());
        }

        this._handlers.get(eventName).add(eventHander);
    }

    unRegister(eventName: string, eventHander: EventHandlerInterface): void {
        if (!this._handlers.has(eventName)) {
            return;
        }

        this._handlers.get(eventName).delete(eventHander);
    }

    unRegisterAll(): void {
        this._handlers.clear();
    }

    getEventHandlers(eventName: string): Set<EventHandlerInterface> {
        return this._handlers.get(eventName);
    }
}