import {createCart} from "../../models/Cart";
import calculateCheckoutDiscount from "../../rules/checkout-rule";

describe('Checkout Rules',  () => {
    it('should give flat 20% discount to new user', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'John Doe',
            age: 37,
            isNewUser: true,
            coupon: '',
            items: [{itemId: 1, itemQty: 2, itemName: 'Sample A', itemUnitPrice: 100}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(200);
        expect(cartResult.discount).toBe(40);
        expect(cartResult.payableAmount).toBe(160);
    });

    it('should give 10% discount to existing user if order value is greater than 1000', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'Jane Doe',
            age: 37,
            isNewUser: false,
            coupon: '',
            items: [{itemId: 1, itemQty: 2, itemName: 'Sample B', itemUnitPrice: 1000}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(2000);
        expect(cartResult.discount).toBe(200);
        expect(cartResult.payableAmount).toBe(1800);
    });

    it('should give 5% discount to existing user if WELCOMEBACK coupon is used', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'Jane Doe',
            age: 37,
            isNewUser: false,
            coupon: 'WELCOMEBACK',
            items: [{itemId: 1, itemQty: 1, itemName: 'Sample Y', itemUnitPrice: 500}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(500);
        expect(cartResult.discount).toBe(25);
        expect(cartResult.payableAmount).toBe(475);
    });

    it('should NOT give discount if no rule matches', async () => {
        const newUserCart = createCart({
            userId: 1,
            name: 'Jane Doe',
            age: 37,
            isNewUser: false,
            coupon: '',
            items: [{itemId: 1, itemQty: 2, itemName: 'Sample X', itemUnitPrice: 100}]
        });

        const cartResult = await calculateCheckoutDiscount(newUserCart);

        expect(cartResult.totalBeforeDiscount).toBe(200);
        expect(cartResult.discount).toBe(0);
        expect(cartResult.payableAmount).toBe(200);
    });
});