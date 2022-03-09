export interface Cart {
    userId: number;
    name: string;
    age: number;
    isNewUser: boolean;
    items: Array<{ itemId: number, itemName: string; itemQty: number; itemUnitPrice: number }>;
    coupon: string;
    totalBeforeDiscount: number;
    discount: number;
    payableAmount: number;
    applyDiscountPercent: (percent: number) => void;
    applyDiscountAbsolute: (amount: number) => void;
}

export const createCart = ({userId, name, age, isNewUser, items, coupon}: {
    userId: number; name: string; age: number; isNewUser: boolean; items: Array<{ itemId: number, itemName: string; itemQty: number; itemUnitPrice: number }>; coupon: string;
}): Cart => {

    let totalBeforeDiscount = 0;

    items.forEach(x => {
        totalBeforeDiscount += (x.itemQty * x.itemUnitPrice)
    });

    return {
        userId,
        name,
        age,
        isNewUser,
        items,
        coupon,
        totalBeforeDiscount,
        discount: 0,
        payableAmount: totalBeforeDiscount,
        applyDiscountPercent(percent: number) {
            this.discount = this.totalBeforeDiscount * (percent / 100);
            this.payableAmount = this.totalBeforeDiscount * (100 - percent) / 100;
        },
        applyDiscountAbsolute(amount: number) {
            this.discount = amount;
            this.payableAmount = this.totalBeforeDiscount - amount;
        }
    } as Cart;
}