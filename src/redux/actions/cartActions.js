import { ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART} from "../types"

export const addToCart = (product) => (dispatch, getState) => {
    const newCartItems = getState().cart.cartItems.slice()
    let alreadyInCart = false
    newCartItems.forEach(x => {
        if(x._id === product._id){
            x.count++
            alreadyInCart = true
        }
    })
    if(!alreadyInCart){
        newCartItems.push({...product, count: 1})
    }
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems: newCartItems
        }
    })
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const newCartItems = getState().cart.cartItems.slice().filter(x => x._id !== product._id)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            cartItems: newCartItems
        }
    })
}

