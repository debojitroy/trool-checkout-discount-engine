export interface Cart {
    userId: number;
    name: string;
    age: number;
    isNewUser: boolean;
    items: Array<{ itemId: number, itemName: string; itemQty: number; itemUnitPrice: number }>;
    coupons: string[];
    previousCoupons: Array<{ coupon: string; usageCount: number }>;
    totalBeforeDiscount: number;
    discount: number;
    payableAmount: number;
    hasItem: (itemId: number, itemQty: number) => boolean;
    hasUsedCoupon: (coupon: string, count: number) => boolean;
    applyDiscountPercent: (percent: number) => void;
    applyDiscountAbsolute: (amount: number) => void;
}

export const createCart = ({userId, name, age, isNewUser, items, coupons, previousCoupons}: {
    userId: number; name: string; age: number; isNewUser: boolean; items: Array<{ itemId: number, itemName: string; itemQty: number; itemUnitPrice: number }>; coupons: string[]; previousCoupons: Array<{ coupon: string; usageCount: number }>;
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
        coupons,
        previousCoupons,
        totalBeforeDiscount,
        discount: 0,
        payableAmount: totalBeforeDiscount,
        hasItem(itemId: number, itemQty: number) {
            const item = this.items.find(x => x.itemId === itemId);

            return item && item.itemQty >= itemQty;
        },
        hasUsedCoupon(coupon: string, count: number) {
            const existingCoupon = this.previousCoupons.find(x => x.coupon === coupon);

            return existingCoupon && existingCoupon.usageCount >= count;
        },
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