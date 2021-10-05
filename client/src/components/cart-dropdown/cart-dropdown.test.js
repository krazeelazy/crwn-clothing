import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import CartDropdown  from './cart-dropdown.component';
import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

describe('CartDropdown component', () => {
    let wrapper;
    let spyOnUseSelector;
    let spyOnUseDispatch;
    let spyOnUseHistory;
    let mockDispatch;
    let mockHistory;
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue({cartItems: mockCartItems});
    
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);

        // Mock history function returned from useHistory
        jest.mock('react-router-dom', () => ({
            useHistory: () => ({
                push: jest.fn(),
            }),
        }));

        console.log(mockHistory)

        wrapper = shallow(<CartDropdown />);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render CartDropdown component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call history.push when button is clicked', () => {
        wrapper.find('CartDropdownButton').simulate('click');
        expect(mockHistory.push).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
    });

    it('should render an equal number of CartItem components as the cartItems prop', () => {
        expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
    });

    it('should render EmptyMessageContainer if cartItems is empty', () => {
        const newWrapper = shallow(<CartDropdown />);
        expect(newWrapper.exists('EmptyMessageContainer')).toBe(true);
    });
});