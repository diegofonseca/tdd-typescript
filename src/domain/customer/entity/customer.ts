
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();

        const event = new CustomerCreatedEvent(this);
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.notify(event);
    }

    addRewardPoints(point: number) {
        this._rewardPoints += point;
    }

    get id(): string { 
        return this._id;
    }
    
    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

    set address(value: Address) {
        this._address = value;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    changeName(value: string) {
        this._name = value;

        this.validate();
    }

    changeAddress(value: Address) {
        this._address = value;

        const event = new CustomerAddressChangedEvent(this);
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.notify(event);
    }

    activate() {

        if (this._address === undefined) {
            throw new Error('Address is required');
        }

        this._active = true;
    }

    isActive(): boolean {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }
}