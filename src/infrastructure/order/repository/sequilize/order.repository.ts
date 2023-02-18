import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";


export default class OrderRepository implements OrderRepositoryInterface {
    async create(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order.id,
                customer_id: order.customerId,
                total: order.total,
                items: order.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                }))
            },
            {
                include: [{model: OrderItemModel }]
            }
        );
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: order.customerId,
            },
            {
                where: {
                    id: order.id
                },
            }
        );

        await OrderItemModel.destroy({where: {order_id: order.id}});

        await OrderItemModel.bulkCreate(order.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: order.id
        })));
    }


    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({where: {id: id}, include: [{model: OrderItemModel}]});


        let items = orderModel.items.map((item) => new OrderItem(item.id.toString(), item.name, item.price, item.product_id, item.quantity));
        let order = new Order(orderModel.id.toString(), orderModel.customer_id, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        let orders: Order[] = [];

        const orderModels = await OrderModel.findAll({include: [{model: OrderItemModel}]});

        orderModels.forEach((orderModel) => {
            let items = orderModel.items.map((item) => new OrderItem(item.id.toString(), item.name, item.price, item.product_id, item.quantity));
            let order = new Order(orderModel.id.toString(), orderModel.customer_id, items);

            orders.push(order);
        });

        return orders;
    }

}