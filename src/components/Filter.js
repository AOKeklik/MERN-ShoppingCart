import React, { Component } from 'react'

import { connect } from 'react-redux'
import {filterProducts,sortProducts} from '../redux/actions/productActions'

class Filter extends Component {
    render() {
        //console.log(this.props)
        return <>
            {!this.props.filterProducts ? (
                <div>Loading...</div>
            ) : (
                <div className="filter">
                    <div className="filter-result">8 Products</div>
                    <div className="filter-sort">
                    Order 
                    <select
                        onChange={(e) => this.props.sortProducts(this.props.filteredItems, e.target.value)}
                        name="sort"
                    >
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                    </div>
                    <div className="filter-size">
                        Filter
                        <select
                            onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}
                            name="size"
                        >
                            <option value="ALL">All</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                </div>
            )}
        </>
    }
}

export default connect(state => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredItems: state.products.filteredItems 
}), {filterProducts, sortProducts})(Filter)