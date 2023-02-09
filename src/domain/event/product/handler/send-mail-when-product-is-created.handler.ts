import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendMailWhenProductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent>
{
    handle(event: ProductCreatedEvent): void {
        console.log('SendMailWhenProductIsCreatedHandler.handle()');
        console.log(event);
    }
}