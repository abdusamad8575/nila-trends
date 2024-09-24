
export const setCart = (state) => ({
    type: 'SET_CART',
    payload: state,
});

export const setCheckout = (state) => ({
    type: 'SET_CHECKOUT',
    payload: state,
});

export const setProfile = (state) => ({
    type: 'SET_PROFILE',
    payload: state,
});

export const setCheckoutProduct = (state) => {
    return {
       type: 'SET_CHECKOUT_PRODUCT',
       payload: state,
    };
 };
