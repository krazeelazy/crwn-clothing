import { createSelector } from 'reselect';

const selectCart = state => state.cart;// input selector

export const selectCartItems = createSelector( // a memoized selector
    [selectCart], // an array of input selectors (just 1 here)
    cart => cart.cartItems // a function that returns the value we want out of the selector
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);
    
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity,
            0
        )
);