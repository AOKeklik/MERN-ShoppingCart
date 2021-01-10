import {FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE} from '../types'


export const fetchProducts = () => async (dispatch) => {
    const res = await fetch('/api/products')
    const data = await res.json()
    //console.log(data)
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}

export const filterProducts = (products, size) => (dispatch) => {
    const newproducts = products.slice()
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: (size === "ALL") 
                ? newproducts 
                : newproducts.filter(x => x.availableSizes.indexOf(size) >= 0)
        }
    })
}

export const sortProducts = (filteredItems, sort) => (dispatch) => {
    const newproducts = filteredItems.slice()
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: (sort === 'latest')
                ? newproducts.sort(({_id: a}, {_id: b}) => (a < b) ? 1 : -1)
                : newproducts.sort(({price: a}, {price: b}) => ( (sort === 'lowest')
                    ? (a > b) ? 1 : -1
                    : (a < b) ? 1 : -1
                ))
        }
    })
}

