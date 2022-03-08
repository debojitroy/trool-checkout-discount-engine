import path from 'path';
import trool from 'trool';
import {Cart} from "../models/Cart";

interface IFactsHolder {
    Carts: Cart[];
}

const csvFilePath = '../rule-files/CheckoutRules.csv';

export default async (cart: Cart): Promise<Cart> => {
    try {
        const csvFilePathFull = path.join(__dirname, csvFilePath);
        const facts: IFactsHolder = {
            Carts: [cart],
        };
        const engine = await trool(csvFilePathFull);
        const updatedFacts = engine.applyRules<IFactsHolder>(facts);

        return  updatedFacts.Carts[0];
    } catch (e) {
        console.error('Failed to run rules...', e);
        throw e;
    }
}