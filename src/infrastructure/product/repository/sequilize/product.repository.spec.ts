import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductModel from './product.model';
import ProductRepository from './product.repository';

describe("ProductRepository Unit Tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true}
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            "id": 1,
            "name": "Product 1",
            "price": 100
        })

    })

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        product.changeName("Product 1 updated");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            "id": 1,
            "name": "Product 1 updated",
            "price": 200
        })

    });

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 1", 100);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const productFound = await productRepository.find("2");

        expect(productFound).toStrictEqual(product2);

    });

    it("should find all products", async () => {

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 1", 100);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const productsFound = await productRepository.findAll();

        expect(productsFound).toStrictEqual([product1, product2]);

    });

})

