import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should add rewards points to customer", () => {

        const customer = new Customer("c1", "Customer 1")

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    })

    it("shoud throw error when id is empty", () => {


        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    })

    it("shoud throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    })


    it("shoud change name", () => {

        // Arrange
        let customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");
    })


    it("shoud change address", () => {

        // Arrange
        let customer = new Customer("123", "John");

        customer.address = new Address("Rua X", "123", "76000-000", "Jipa");

        // Act
        customer.changeAddress(new Address("Rua Y", "123", "76000-000", "Jipa"))

        // Assert
        expect(customer.address.street).toBe("Rua Y");
        expect(customer.address.number).toBe("123");
        expect(customer.address.zip).toBe("76000-000");
        expect(customer.address.city).toBe("Jipa");
    })

    it("show throw error when change name to empty string",()=> {
        
         // Assert
         expect(() => {
            // Arrange
            let customer = new Customer("123", "John");

            // Act
            customer.changeName("");
         }).toThrowError("Name is required");
    })

    it("should activate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("123", "Rua X", "76000-000", "Jipa");
        
        customer.address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it("should throw error when activate customer with address is undefined", () => {
        const customer = new Customer("123", "John");
        const address = new Address("123", "Rua X", "76000-000", "Jipa");

        expect(() => customer.activate()).toThrowError("Address is required");
    })

    it ("should deactivate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("123", "Rua X", "76000-000", "Jipa");

        customer.address = address;

        customer.activate();

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

});