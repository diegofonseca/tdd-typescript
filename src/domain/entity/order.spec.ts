import Order from "./order"
import OrderItem from "./order_item"
import Product from "./product"

describe("Order unit tests", () => {
    
    it("should return total of items", () => {
        const item1 = new OrderItem("123", "Item 1", 10, "p1", 10);
        const item2 = new OrderItem("123", "Item 1", 20, "p1", 10);

        const order1 = new Order("123", "123", [item1]);
        expect(order1.total).toBe(100);

        const order2 = new Order("123", "123", [item1, item2]);
        expect(order2.total).toBe(300);
    })

    it("should throw an error when id is empty", () => {
        const item1 = new OrderItem("123", "Item 1", 10, "p1", 10);
        const item2 = new OrderItem("123", "Item 1", 10, "p1", 10);

        expect(() => {
            const order = new Order("", "123", [item1, item2]);
        }).toThrowError("Id is required");

    })

    it("should throw an error when customer id is empty", () => {
        const item1 = new OrderItem("123", "Item 1", 10, "p1", 10);
        const item2 = new OrderItem("123", "Item 2", 10, "p1", 10);

        expect(() => {
            const order = new Order("123", "", [item1, item2]);
        }).toThrowError("CustomerId is required");

    })

    it("should throw an error when items is empty", () => {

        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrowError("Items is required.");

    })
})