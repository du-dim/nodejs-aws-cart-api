"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("../shared");
const models_rules_1 = require("./models-rules");
let CartController = class CartController {
    constructor(cartService, orderService) {
        this.cartService = cartService;
        this.orderService = orderService;
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    findUserCart(req) {
        const cart = this.cartService.findOrCreateByUserId((0, shared_1.getUserIdFromRequest)(req));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: { cart, total: (0, models_rules_1.calculateCartTotal)(cart) },
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    updateUserCart(req, body) {
        const cart = this.cartService.updateByUserId((0, shared_1.getUserIdFromRequest)(req), body);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: {
                cart,
                total: (0, models_rules_1.calculateCartTotal)(cart),
            }
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    clearUserCart(req) {
        this.cartService.removeByUserId((0, shared_1.getUserIdFromRequest)(req));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    checkout(req, body) {
        const userId = (0, shared_1.getUserIdFromRequest)(req);
        const cart = this.cartService.findByUserId(userId);
        if (!(cart && cart.items.length)) {
            const statusCode = common_1.HttpStatus.BAD_REQUEST;
            req.statusCode = statusCode;
            return {
                statusCode,
                message: 'Cart is empty',
            };
        }
        const { id: cartId, items } = cart;
        const total = (0, models_rules_1.calculateCartTotal)(cart);
        const order = this.orderService.create({
            ...body, // TODO: validate and pick only necessary data
            userId,
            cartId,
            items,
            total,
        });
        this.cartService.removeByUserId(userId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: { order }
        };
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)())
], CartController.prototype, "findUserCart", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)())
], CartController.prototype, "updateUserCart", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)())
], CartController.prototype, "clearUserCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)())
], CartController.prototype, "checkout", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('api/profile/cart')
], CartController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FydC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRztBQUl0RyxzQ0FBNkQ7QUFFN0QsaURBQW9EO0FBSTdDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFDekIsWUFDVSxXQUF3QixFQUN4QixZQUEwQjtRQUQxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNoQyxDQUFDO0lBRUwsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUU3QixZQUFZLENBQVEsR0FBZTtRQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUEsNkJBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU5RSxPQUFPO1lBQ0wsVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBQSxpQ0FBa0IsRUFBQyxJQUFJLENBQUMsRUFBRTtTQUNoRCxDQUFBO0lBQ0gsQ0FBQztJQUVELDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFFN0IsY0FBYyxDQUFRLEdBQWUsRUFBVSxJQUFJO1FBQ2pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUEsNkJBQW9CLEVBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFN0UsT0FBTztZQUNMLFVBQVUsRUFBRSxtQkFBVSxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUU7Z0JBQ0osSUFBSTtnQkFDSixLQUFLLEVBQUUsSUFBQSxpQ0FBa0IsRUFBQyxJQUFJLENBQUM7YUFDaEM7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFFN0IsYUFBYSxDQUFRLEdBQWU7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBQSw2QkFBb0IsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNELE9BQU87WUFDTCxVQUFVLEVBQUUsbUJBQVUsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQTtJQUNILENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBRTdCLFFBQVEsQ0FBUSxHQUFlLEVBQVUsSUFBSTtRQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDakMsTUFBTSxVQUFVLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLENBQUM7WUFDMUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7WUFFM0IsT0FBTztnQkFDTCxVQUFVO2dCQUNWLE9BQU8sRUFBRSxlQUFlO2FBQ3pCLENBQUE7UUFDSCxDQUFDO1FBRUQsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUEsaUNBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDckMsR0FBRyxJQUFJLEVBQUUsOENBQThDO1lBQ3ZELE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRTtTQUNoQixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFqRlksd0NBQWM7QUFTekI7SUFEQyxJQUFBLFlBQUcsR0FBRTtJQUNRLFdBQUEsSUFBQSxZQUFHLEdBQUUsQ0FBQTtrREFRbEI7QUFLRDtJQURDLElBQUEsWUFBRyxHQUFFO0lBQ1UsV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO0lBQW1CLFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTtvREFXN0M7QUFLRDtJQURDLElBQUEsZUFBTSxHQUFFO0lBQ00sV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO21EQU9uQjtBQUtEO0lBREMsSUFBQSxhQUFJLEVBQUMsVUFBVSxDQUFDO0lBQ1AsV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO0lBQW1CLFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTs4Q0E4QnZDO3lCQWhGVSxjQUFjO0lBRDFCLElBQUEsbUJBQVUsRUFBQyxrQkFBa0IsQ0FBQztHQUNsQixjQUFjLENBaUYxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgRGVsZXRlLCBQdXQsIEJvZHksIFJlcSwgUG9zdCwgVXNlR3VhcmRzLCBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5cclxuLy8gaW1wb3J0IHsgQmFzaWNBdXRoR3VhcmQsIEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgnO1xyXG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuLi9vcmRlcic7XHJcbmltcG9ydCB7IEFwcFJlcXVlc3QsIGdldFVzZXJJZEZyb21SZXF1ZXN0IH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZUNhcnRUb3RhbCB9IGZyb20gJy4vbW9kZWxzLXJ1bGVzJztcclxuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzJztcclxuXHJcbkBDb250cm9sbGVyKCdhcGkvcHJvZmlsZS9jYXJ0JylcclxuZXhwb3J0IGNsYXNzIENhcnRDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IENhcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8vIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIC8vIEBVc2VHdWFyZHMoQmFzaWNBdXRoR3VhcmQpXHJcbiAgQEdldCgpXHJcbiAgZmluZFVzZXJDYXJ0KEBSZXEoKSByZXE6IEFwcFJlcXVlc3QpIHtcclxuICAgIGNvbnN0IGNhcnQgPSB0aGlzLmNhcnRTZXJ2aWNlLmZpbmRPckNyZWF0ZUJ5VXNlcklkKGdldFVzZXJJZEZyb21SZXF1ZXN0KHJlcSkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuT0ssXHJcbiAgICAgIG1lc3NhZ2U6ICdPSycsXHJcbiAgICAgIGRhdGE6IHsgY2FydCwgdG90YWw6IGNhbGN1bGF0ZUNhcnRUb3RhbChjYXJ0KSB9LFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXHJcbiAgLy8gQFVzZUd1YXJkcyhCYXNpY0F1dGhHdWFyZClcclxuICBAUHV0KClcclxuICB1cGRhdGVVc2VyQ2FydChAUmVxKCkgcmVxOiBBcHBSZXF1ZXN0LCBAQm9keSgpIGJvZHkpIHsgLy8gVE9ETzogdmFsaWRhdGUgYm9keSBwYXlsb2FkLi4uXHJcbiAgICBjb25zdCBjYXJ0ID0gdGhpcy5jYXJ0U2VydmljZS51cGRhdGVCeVVzZXJJZChnZXRVc2VySWRGcm9tUmVxdWVzdChyZXEpLCBib2R5KVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuT0ssXHJcbiAgICAgIG1lc3NhZ2U6ICdPSycsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjYXJ0LFxyXG4gICAgICAgIHRvdGFsOiBjYWxjdWxhdGVDYXJ0VG90YWwoY2FydCksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIC8vIEBVc2VHdWFyZHMoQmFzaWNBdXRoR3VhcmQpXHJcbiAgQERlbGV0ZSgpXHJcbiAgY2xlYXJVc2VyQ2FydChAUmVxKCkgcmVxOiBBcHBSZXF1ZXN0KSB7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZUJ5VXNlcklkKGdldFVzZXJJZEZyb21SZXF1ZXN0KHJlcSkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuT0ssXHJcbiAgICAgIG1lc3NhZ2U6ICdPSycsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcclxuICAvLyBAVXNlR3VhcmRzKEJhc2ljQXV0aEd1YXJkKVxyXG4gIEBQb3N0KCdjaGVja291dCcpXHJcbiAgY2hlY2tvdXQoQFJlcSgpIHJlcTogQXBwUmVxdWVzdCwgQEJvZHkoKSBib2R5KSB7XHJcbiAgICBjb25zdCB1c2VySWQgPSBnZXRVc2VySWRGcm9tUmVxdWVzdChyZXEpO1xyXG4gICAgY29uc3QgY2FydCA9IHRoaXMuY2FydFNlcnZpY2UuZmluZEJ5VXNlcklkKHVzZXJJZCk7XHJcblxyXG4gICAgaWYgKCEoY2FydCAmJiBjYXJ0Lml0ZW1zLmxlbmd0aCkpIHtcclxuICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1Q7XHJcbiAgICAgIHJlcS5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdDYXJ0IGlzIGVtcHR5JyxcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgaWQ6IGNhcnRJZCwgaXRlbXMgfSA9IGNhcnQ7XHJcbiAgICBjb25zdCB0b3RhbCA9IGNhbGN1bGF0ZUNhcnRUb3RhbChjYXJ0KTtcclxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5vcmRlclNlcnZpY2UuY3JlYXRlKHtcclxuICAgICAgLi4uYm9keSwgLy8gVE9ETzogdmFsaWRhdGUgYW5kIHBpY2sgb25seSBuZWNlc3NhcnkgZGF0YVxyXG4gICAgICB1c2VySWQsXHJcbiAgICAgIGNhcnRJZCxcclxuICAgICAgaXRlbXMsXHJcbiAgICAgIHRvdGFsLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZUJ5VXNlcklkKHVzZXJJZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogSHR0cFN0YXR1cy5PSyxcclxuICAgICAgbWVzc2FnZTogJ09LJyxcclxuICAgICAgZGF0YTogeyBvcmRlciB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==