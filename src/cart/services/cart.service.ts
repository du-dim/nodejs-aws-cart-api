import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Cart, CartStatuses } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[userId];
  }

  createByUserId(userId: string): Cart {
    const id = v4();
    const createdAt = new Date();
    const userCart: Cart = {
      id,
      user_id: userId,
      created_at: createdAt,
      updated_at: createdAt,
      status: 'OPEN' as CartStatuses,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, created_at, status } = this.findOrCreateByUserId(userId);

    const updatedCart: Cart = {
      id,
      user_id: userId,
      created_at,
      updated_at: new Date(),
      status,
      items: [...items],
    };

    this.userCarts[userId] = updatedCart;

    return updatedCart;
  }

  removeByUserId(userId: string): void {
    delete this.userCarts[userId];
  }
}
