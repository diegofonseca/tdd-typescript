import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(customer: Customer) {
        await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city
        })
    }

    async update(customer: Customer) {
        await CustomerModel.update(
            {
                name: customer.name,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                street: customer.address.street,
                number: customer.address.number,
                zipcode: customer.address.zip,
                city: customer.address.city
            },
            {
                where: {id: customer.id}
            }
        )
    }

    async find(id: string): Promise<Customer> {
        let customerModel

        try {

            customerModel = await CustomerModel.findOne({
                where: {id,},
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Customer not found")
        }


        return this.prepareCustomer(customerModel)

    }

    async findAll(): Promise<Customer[]> {
        let customers: Customer[] = [];

        const customerModels = await CustomerModel.findAll();

        customerModels.forEach(async (customerModel) => {
            customers.push(this.prepareCustomer(customerModel))
        });

        return customers;
        
    }

    private prepareCustomer(customerModel: CustomerModel) {
        let customer = new Customer(
            customerModel.id.toString(),
            customerModel.name
        );

        customer.address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        return customer;
    }


}