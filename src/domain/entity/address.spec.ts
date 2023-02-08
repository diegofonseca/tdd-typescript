import Address from "./address";


describe('Address unit test', () => {

    it("should throw an error when data is missing", () => {

        expect(() => {
            const address = new Address("", "123", "77777-000", "Jipa");
        }).toThrowError('Street is required');

        expect(() => {
            const address = new Address("123", "", "77777-000", "Jipa");
        }).toThrowError('Number is required');

        expect(() => {
            const address = new Address("123", "123", "", "Jipa");
        }).toThrowError('Zip is required');

        expect(() => {
            const address = new Address("123", "123", "77777-000", "");
        }).toThrowError('City is required');

    })

    it("should return a toString",  () =>{
        const address1 = new Address("123", "123", "77777-000", "123");
        const address2 = new Address("123", "123", "77777-000", "123");
        expect(address1.toString()).toBe(address2.toString());
    })

})