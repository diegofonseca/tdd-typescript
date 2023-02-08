import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe('Order service unit tests', () => {

    it("should place an order", async () => {

        const customer1 = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 10);


        const customer2 = new Customer("c1", "Customer 1");
        const item2 = new OrderItem("i1", "Item 1", 20, "p1", 10);

        expect(() => {
            const order = OrderService.placeOrder(customer1, []);
        }).toThrowError("Order must have at least one item");


        const order1 = OrderService.placeOrder(customer1, [item1]);
        expect(customer1.rewardPoints).toEqual(50);
        expect(order1.total).toEqual(100);


        const order2 = OrderService.placeOrder(customer2, [item2]);
        expect(customer2.rewardPoints).toEqual(100);
        expect(order2.total).toEqual(200);

        expect(order1.id).not.toBe(order2.id)

    });

    it('should get total of all orders', () => {

        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 10); 
        const item2 = new OrderItem("i1", "Item 2", 20, "p2", 10); 
        const item3 = new OrderItem("i1", "Item 3", 30, "p3", 10); 

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);
        const order3 = new Order("o3", "c1", [item3]);

        const total = OrderService.total([order1, order2, order3]);
        
        expect(total).toBe(600);
    })

})