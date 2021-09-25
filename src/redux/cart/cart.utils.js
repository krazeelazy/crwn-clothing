export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find( // check if the item is already in the cart
        cartItem => cartItem.id === cartItemToAdd.id
    );
        
    if (existingCartItem) { // if the item is already in the cart use map to return a new array with the updated quantities
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id // find the item
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // increment the quantity
            : cartItem // don't modify other items
            );
        }
        
        return [...cartItems, { ...cartItemToAdd, quantity: 1 }]; // if the item wasn't in the cart before, add it with a base quantity of 1
};