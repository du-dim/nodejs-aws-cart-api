"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const cart_module_1 = require("./cart/cart.module");
const auth_module_1 = require("./auth/auth.module");
const order_module_1 = require("./order/order.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
        ],
        controllers: [
            app_controller_1.AppController,
        ],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkNBQXdDO0FBRXhDLHFEQUFpRDtBQUVqRCxvREFBZ0Q7QUFDaEQsb0RBQWdEO0FBQ2hELHVEQUFtRDtBQWE1QyxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7Q0FBRyxDQUFBO0FBQVosOEJBQVM7b0JBQVQsU0FBUztJQVhyQixJQUFBLGVBQU0sRUFBQztRQUNOLE9BQU8sRUFBRTtZQUNQLHdCQUFVO1lBQ1Ysd0JBQVU7WUFDViwwQkFBVztTQUNaO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsOEJBQWE7U0FDZDtRQUNELFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztHQUNXLFNBQVMsQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEFwcENvbnRyb2xsZXIgfSBmcm9tICcuL2FwcC5jb250cm9sbGVyJztcclxuXHJcbmltcG9ydCB7IENhcnRNb2R1bGUgfSBmcm9tICcuL2NhcnQvY2FydC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi9hdXRoL2F1dGgubW9kdWxlJztcclxuaW1wb3J0IHsgT3JkZXJNb2R1bGUgfSBmcm9tICcuL29yZGVyL29yZGVyLm1vZHVsZSc7XHJcblxyXG5ATW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBBdXRoTW9kdWxlLFxyXG4gICAgQ2FydE1vZHVsZSxcclxuICAgIE9yZGVyTW9kdWxlLFxyXG4gIF0sXHJcbiAgY29udHJvbGxlcnM6IFtcclxuICAgIEFwcENvbnRyb2xsZXIsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XHJcbiJdfQ==