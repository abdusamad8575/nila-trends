const initialState = { cart: true };;

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'SET_CHECKOUT':
            return { ...state, checkout: action.payload };
        case 'SET_PROFILE':
            return { ...state, profile: action.payload };
        default: {
            console.warn(action);
            console.warn(state);

            return null
        }
    }
};

export default storeReducer;