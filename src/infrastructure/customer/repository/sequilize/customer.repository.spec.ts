import { Sequelize } from 'sequelize-typescript';
import Address from '../../../../domain/customer/entity/address';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';

describe("CustomerRepository Unit Tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true}
        });

        sequilize.addModels([CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("5", "Customer 1");
        customer.address = new Address("Street 1", "1", "12345", "City 1")
        customer.addRewardPoints(10)
        customer.activate()

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "5"}});

        expect(customerModel.toJSON()).toStrictEqual({
            "id": "5",
            "name": "Customer 1",
            "street": "Street 1",
            "number": "1",
            "zipcode": "12345",
            "city": "City 1",
            "rewardPoints": 10,
            "active": true,
        })

    })

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        customer.address = new Address("Street 1", "1", "12345", "City 1")
        customer.addRewardPoints(10)
        customer.activate()

        await customerRepository.create(customer);

        customer.changeName("Customer 1 updated");
        customer.changeAddress(new Address("Street 2", "2", "54321", "City 2"));
        customer.deactivate()
        customer.addRewardPoints(100)

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            "id": "1",
            "name": "Customer 1 updated",
            "street": "Street 2",
            "number": "2",
            "active": false,
            "zipcode": "54321",
            "city": "City 2",
            "rewardPoints": 110,
        })

    });

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        customer1.address = new Address("Street 1", "1", "12345", "City 1")
        const customer2 = new Customer("2", "Customer 1");
        customer2.address = new Address("Street 2", "2", "54321", "City 2")

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customerFound2 = await customerRepository.find("2");
        expect(customerFound2).toStrictEqual(customer2);

        const customerFound1 = await customerRepository.find("1");
        expect(customerFound1).toStrictEqual(customer1);

    });

    it("should find all customers", async () => {

        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        customer1.address = new Address("Street 1", "1", "12345", "City 1")
        const customer2 = new Customer("2", "Customer 1");
        customer2.address = new Address("Street 2", "2", "54321", "City 2")

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customersFound = await customerRepository.findAll();

        expect(customersFound).toStrictEqual([customer1, customer2]);

    });

    it("should throw an error when trying to find a customer that does not exist", async () => {
            
            const customerRepository = new CustomerRepository();
    
            await expect(customerRepository.find("1")).rejects.toThrowError("Customer not found");
    
    })

})

