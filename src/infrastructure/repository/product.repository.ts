import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(product: Product): Promise<void> {
        await Promise.race([
            ProductModel.create({
                id: product.id,
                name: product.name,
                price: product.price
            })
        ])
        
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update(
            {
                name: product.name,
                price: product.price
            },
            {
                where: {id: product.id}
            }
        )
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({where: {id: id}})

        return new Product(
            productModel.id.toString(),
            productModel.name,
            productModel.price
        )
    }

    async findAll(): Promise<Product[]> {
        let products: Product[] = [];

        const productModels = await ProductModel.findAll();

        productModels.forEach((productModel) => {
            products.push(new Product(
                productModel.id.toString(),
                productModel.name,
                productModel.price
            ))
        });

        return products;
        
    }


}