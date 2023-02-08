import Product from "./product";

describe("Product unit tests", () => {
    
    it("should change name of product", () => {

        const product = new Product("123", "Product 1", 10);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");

    })
    
    it("should change price of product", () => {

        const product = new Product("123", "Product 1", 10);
        product.changePrice(11);

        expect(product.price).toBe(11);

    })

    it("show return price of product", () => {

        const product = new Product("123", "Product 1", 10);

        expect(product.price).toBe(10);

    })

    it("shoud throw error when id is empty", () => {
        
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required")

    })

    it("shoud throw error when name is empty", () => {
        
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrowError("Name is required")

    })

    it("shoud throw error when price is less or equal to zero", () => {
        
        expect(() => {
            let product = new Product("123", "Product 1", 0);
        }).toThrowError("Price must be greater than 0")
        
        expect(() => {
            let product = new Product("123", "Product 1", -1);
        }).toThrowError("Price must be greater than 0")

    })

})