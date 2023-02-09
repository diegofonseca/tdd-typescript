import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHander: EventHandlerInterface): void;
    unRegister(eventName: string, eventHander: EventHandlerInterface): void;
    unRegisterAll(): void;
}