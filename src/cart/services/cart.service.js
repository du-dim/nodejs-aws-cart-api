"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CartService = class CartService {
    constructor() {
        this.userCarts = {};
    }
    findByUserId(userId) {
        return this.userCarts[userId];
    }
    createByUserId(userId) {
        const id = (0, uuid_1.v4)();
        const createdAt = new Date();
        const userCart = {
            id,
            user_id: userId,
            created_at: createdAt,
            updated_at: createdAt,
            status: 'OPEN',
            items: [],
        };
        this.userCarts[userId] = userCart;
        return userCart;
    }
    findOrCreateByUserId(userId) {
        const userCart = this.findByUserId(userId);
        if (userCart) {
            return userCart;
        }
        return this.createByUserId(userId);
    }
    updateByUserId(userId, { items }) {
        const { id, created_at, status } = this.findOrCreateByUserId(userId);
        const updatedCart = {
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
    removeByUserId(userId) {
        delete this.userCarts[userId];
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUE0QztBQUM1QywrQkFBMEI7QUFJbkIsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUFqQjtRQUNHLGNBQVMsR0FBeUIsRUFBRSxDQUFDO0lBcUQvQyxDQUFDO0lBbkRDLFlBQVksQ0FBQyxNQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBQSxTQUFFLEdBQUUsQ0FBQztRQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFTO1lBQ3JCLEVBQUU7WUFDRixPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLE1BQU0sRUFBRSxNQUFzQjtZQUM5QixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUVsQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsTUFBYztRQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBYyxFQUFFLEVBQUUsS0FBSyxFQUFRO1FBQzVDLE1BQU0sRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyRSxNQUFNLFdBQVcsR0FBUztZQUN4QixFQUFFO1lBQ0YsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVO1lBQ1YsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU07WUFDTixLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNsQixDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUM7UUFFckMsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0YsQ0FBQTtBQXREWSxrQ0FBVztzQkFBWCxXQUFXO0lBRHZCLElBQUEsbUJBQVUsR0FBRTtHQUNBLFdBQVcsQ0FzRHZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgdjQgfSBmcm9tICd1dWlkJztcclxuaW1wb3J0IHsgQ2FydCwgQ2FydFN0YXR1c2VzIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHVzZXJDYXJ0czogUmVjb3JkPHN0cmluZywgQ2FydD4gPSB7fTtcclxuXHJcbiAgZmluZEJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKTogQ2FydCB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FydHNbdXNlcklkXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKTogQ2FydCB7XHJcbiAgICBjb25zdCBpZCA9IHY0KCk7XHJcbiAgICBjb25zdCBjcmVhdGVkQXQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgdXNlckNhcnQ6IENhcnQgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgIGNyZWF0ZWRfYXQ6IGNyZWF0ZWRBdCxcclxuICAgICAgdXBkYXRlZF9hdDogY3JlYXRlZEF0LFxyXG4gICAgICBzdGF0dXM6ICdPUEVOJyBhcyBDYXJ0U3RhdHVzZXMsXHJcbiAgICAgIGl0ZW1zOiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy51c2VyQ2FydHNbdXNlcklkXSA9IHVzZXJDYXJ0O1xyXG5cclxuICAgIHJldHVybiB1c2VyQ2FydDtcclxuICB9XHJcblxyXG4gIGZpbmRPckNyZWF0ZUJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKTogQ2FydCB7XHJcbiAgICBjb25zdCB1c2VyQ2FydCA9IHRoaXMuZmluZEJ5VXNlcklkKHVzZXJJZCk7XHJcblxyXG4gICAgaWYgKHVzZXJDYXJ0KSB7XHJcbiAgICAgIHJldHVybiB1c2VyQ2FydDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVCeVVzZXJJZCh1c2VySWQpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQnlVc2VySWQodXNlcklkOiBzdHJpbmcsIHsgaXRlbXMgfTogQ2FydCk6IENhcnQge1xyXG4gICAgY29uc3QgeyBpZCwgY3JlYXRlZF9hdCwgc3RhdHVzIH0gPSB0aGlzLmZpbmRPckNyZWF0ZUJ5VXNlcklkKHVzZXJJZCk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZENhcnQ6IENhcnQgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgIGNyZWF0ZWRfYXQsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgaXRlbXM6IFsuLi5pdGVtc10sXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXNlckNhcnRzW3VzZXJJZF0gPSB1cGRhdGVkQ2FydDtcclxuXHJcbiAgICByZXR1cm4gdXBkYXRlZENhcnQ7XHJcbiAgfVxyXG5cclxuICByZW1vdmVCeVVzZXJJZCh1c2VySWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZGVsZXRlIHRoaXMudXNlckNhcnRzW3VzZXJJZF07XHJcbiAgfVxyXG59XHJcbiJdfQ==