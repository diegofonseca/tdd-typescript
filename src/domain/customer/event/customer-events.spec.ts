
import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../entity/address";
import Customer from "../entity/customer";
import SendMailWhenCustomerIsCreatedHandler from "./handler/send-mail-when-customer-is-created.handler";
import SendWhatsappMessageWhenCustomerAddressIsChangedHandler from "./handler/send-whatsapp-message-when-customer-address-is-changed.handler";
import SendWhatsappMessageWhenCustomerIsCreatedHandler from "./handler/send-whatsapp-message-when-customer-is-created.handler";

describe("Customer Events", () => {

    beforeEach(() => {
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.unRegisterAll();
    });


    it("should dispatch a message when customer address is changed", () => {
        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler = new SendWhatsappMessageWhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const customer = new Customer("1", "Customer 1");
        customer.address = new Address("Street 1", "1", "12345", "City 1");
        
        customer.changeAddress(new Address("Street 2", "2", "12345", "City 2"));

        expect(spyEventHandler).toBeCalled();
    });

    it("should dispatch a message when customer is created", () => {
        
        const eventHandler1 =  new SendMailWhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        const eventHandler2 =  new SendWhatsappMessageWhenCustomerIsCreatedHandler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customer = new Customer("1", "Customer 1");

        expect(spyEventHandler1).toBeCalled();
        expect(spyEventHandler2).toBeCalled();

    });
})