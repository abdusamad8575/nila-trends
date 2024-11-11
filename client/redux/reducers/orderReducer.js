
// const initialState = {
//     orderDetails: {},
//   };
const initialState = null;
  
  const orderReducer = (state = initialState, action) => {
    
    
    switch (action.type) {
      case 'SET_ORDER_DETAILS':
        // return {
        //   ...state,
        //   orderDetails: action.payload,
        // };
        return action.payload;
      case 'CLEAR_ORDER_DETAILS':
        // return initialState;
        return null;
      default:
        return state;
    }
  };
  
  
  export default orderReducer;
  