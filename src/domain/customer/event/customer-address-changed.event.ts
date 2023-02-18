import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";


export default class CustomerAddressChangedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Customer;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}