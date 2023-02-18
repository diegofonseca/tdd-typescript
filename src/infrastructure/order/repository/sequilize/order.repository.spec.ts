import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequilize/customer.model';
import OrderItemModel from './order_item.model';
import ProductModel from '../../../product/repository/sequilize/product.model';
import CustomerRepository from '../../../customer/repository/sequilize/customer.repository';
import OrderRepository from './order.repository';   
import ProductRepository from '../../../product/repository/sequilize/product.repository';
import OrderModel from './order.model';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/entity/address';
import Product from '../../../../domain/product/entity/product';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Order from '../../../../domain/checkout/entity/order';

describe("Order Repository Unit Tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create an order", async () => {
        const { order } = await createOrder();

        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            "id": "1",
            "customer_id": "1",
            "items": [
                {
                    "id": "1",
                    "order_id": order.id,
                    "product_id": "1",
                    "quantity": 10,
                    "price": 100,
                    "name": "Product 1"
                }
            ],
            "total": 1000
        })
    });


    it ("should update an order", async () => {
        let { order } = await createOrder();

        const customerRepository = new CustomerRepository();
        /** NEW CUSTOMER */
        const customer = new Customer("2", "Customer 2");
        customer.address = new Address("Street 2", "2", "12345", "City 2");
        await customerRepository.create(customer);
        /** NEW ITEMS */
        const productRepository = new ProductRepository();
        const product = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        const item = new OrderItem("2", product.name, product.price, product.id, 10);

        /** UPDATE */
        order.customerId = customer.id;
        order.items = [item];

        const orderRepository = new OrderRepository();
        await orderRepository.update(order);

        const orders = await orderRepository.findAll()
        
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            "id": "1",
            "customer_id": "2",
            "items": [
                {
                    "id": "2",
                    "order_id": order.id,
                    "product_id": "2",
                    "quantity": 10,
                    "price": 200,
                    "name": "Product 2"
                }
            ],
            "total": 1000
        })
    });

    it ("should find an order by id", async () => {
        const orderRepository = new OrderRepository();

        const { order } = await createOrder();

        const orderResp = await orderRepository.find(order.id);

        expect(orderResp).toStrictEqual(order);
    });

    it ("should find all orders", async () => {
        const orderRepository = new OrderRepository();
        const { order } = await createOrder();

        const orders = await orderRepository.findAll()

        expect(orders).toStrictEqual([order]);
    });

})

async function createOrder() {
    const orderOrderRepository = new OrderRepository();

    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Street 1", "1", "12345", "City 1");
    await customerRepository.create(customer);


    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const item = new OrderItem("1", product.name, product.price, product.id, 10);
    const order = new Order("1", customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    return { order };
}

