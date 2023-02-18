import OrderItem from "./order_item";

describe("OrderItem unit test",() =>{
    it("show throw an error when product is empty",() =>{
        
        expect(() => {
            const item = new OrderItem("123", "Item 1", 10, "", 10);
        }).toThrowError("ProductId is required");

    })
    it("show throw an error when id is empty",() =>{
        
        expect(() => {
            const item = new OrderItem("", "Item 1", 10, "p1", 10);
        }).toThrowError("Id is required");

    })
    it("show throw an error when name is empty",() =>{
        
        expect(() => {
            const item = new OrderItem("i1", "", 10, "p1", 10);
        }).toThrowError("Name is required");

    })
    it("show throw an error when quantity is less or equal to 0",() =>{
        
        expect(() => {
            const item = new OrderItem("123", "Item 1", 1, "p1", 0);
        }).toThrowError("Quantity is required");

        expect(() => {
            const item = new OrderItem("123", "Item 1", 1, "p1", -1);
        }).toThrowError("Quantity is required");

    })
    it("show throw an error when price is less or equal to 0",() =>{
        
        expect(() => {
            const item = new OrderItem("123", "Item 1", 0, "p1", 10);
        }).toThrowError("Price is required");

        expect(() => {
            const item = new OrderItem("123", "Item 1", -1, "p1", 10);
        }).toThrowError("Price is required");

    })

    it("show return the price of the order item",() =>{

        const item = new OrderItem("123", "Item 1",  10, "p1", 10);

        expect(item.price).toBe(10);

    })
})