"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCartTotal = void 0;
/**
 * @param {Cart} cart
 * @returns {number}
 */
function calculateCartTotal(cart) {
    return cart ? cart.items.reduce((acc, { product: { price }, count }) => {
        return acc += price * count;
    }, 0) : 0;
}
exports.calculateCartTotal = calculateCartTotal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7O0dBR0c7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxJQUFVO0lBQzNDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBWSxFQUFFLEVBQUU7UUFDdkYsT0FBTyxHQUFHLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUM7QUFKRCxnREFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhcnQsIENhcnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0NhcnR9IGNhcnRcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVDYXJ0VG90YWwoY2FydDogQ2FydCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIGNhcnQgPyBjYXJ0Lml0ZW1zLnJlZHVjZSgoYWNjOiBudW1iZXIsIHsgcHJvZHVjdDogeyBwcmljZSB9LCBjb3VudCB9OiBDYXJ0SXRlbSkgPT4ge1xyXG4gICAgcmV0dXJuIGFjYyArPSBwcmljZSAqIGNvdW50O1xyXG4gIH0sIDApIDogMDtcclxufVxyXG4iXX0=