import {createCart} from "../../models/Cart";
import calculateCheckoutDiscount from "../../rules/checkout-rule";

describe('Checkout Rules',  () => {
    it('should give flat 20% discount to new user', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'John Doe',
            age: 37,
            isNewUser: true,
            previousCoupons: [],
            coupons: [],
            items: [{itemId: 1, itemQty: 2, itemName: 'Sample A', itemUnitPrice: 100}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(200);
        expect(cartResult.discount).toBe(40);
        expect(cartResult.payableAmount).toBe(160);
    });

    it('should give NO discount to existing user', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'Jane Doe',
            age: 37,
            isNewUser: false,
            previousCoupons: [],
            coupons: [],
            items: [{itemId: 1, itemQty: 2, itemName: 'Sample A', itemUnitPrice: 100}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(200);
        expect(cartResult.discount).toBe(0);
        expect(cartResult.payableAmount).toBe(200);
    });
});