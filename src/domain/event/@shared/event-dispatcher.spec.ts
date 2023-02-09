import SendMailWhenProductIsCreatedHandler from "../product/handler/send-mail-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    beforeEach(() => {
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.unRegisterAll();
    });

    it ("should register a event handler", () => {

        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler =  new SendMailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").size).toBe(1);

    })

    it ("should un-register a event handler", () => {

        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler =  new SendMailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unRegister("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").size).toBe(0);

    });

    it ("should un-register all event handlers", () => {
            
            const eventDispatcher = EventDispatcher.getInstance();
            const eventHandler =  new SendMailWhenProductIsCreatedHandler();
    
            eventDispatcher.register("ProductCreatedEvent", eventHandler);
            eventDispatcher.unRegisterAll();
            
            expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).not.toBeDefined();
    
    });

    it ("should notify a event handler", () => {

        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler =  new SendMailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        // expect(() => {
        //     eventDispatcher.notify(new ProductCreatedEvent("teste"));
        // }).lastCalledWith("SendMailWhenProductIsCreatedHandler.handle()");
        
        const event = new ProductCreatedEvent("teste"); 

        eventDispatcher.notify(event);

        expect(spyEventHandler).toBeCalledWith(event);


    });
});