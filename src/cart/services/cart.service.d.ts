import { Cart } from '../models';
export declare class CartService {
    private userCarts;
    findByUserId(userId: string): Cart;
    createByUserId(userId: string): Cart;
    findOrCreateByUserId(userId: string): Cart;
    updateByUserId(userId: string, { items }: Cart): Cart;
    removeByUserId(userId: string): void;
}
