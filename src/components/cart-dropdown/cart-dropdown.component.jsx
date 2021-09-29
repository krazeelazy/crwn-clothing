import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
} from './cart-dropdown.styles';

const CartDropdown = ({ history }) => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? // if there are items in the cart
                    ( // render them in cart item components
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem} />
                        ))
                    ) :( // else render a message that the cart is empty
                        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                    )
                }
            </CartItemsContainer>
            <CartDropdownButton
                onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());
                }}
            >
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer>
    );
};
        
export default withRouter(CartDropdown);