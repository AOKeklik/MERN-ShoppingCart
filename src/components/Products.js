import React, { Component } from 'react'
import Modal from 'react-modal'
import {Fade, Zoom} from 'react-reveal'
import {formatCurrency} from '../helpers/util'

import {connect} from 'react-redux'
import {fetchProducts} from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: null
        }
    }
    componentDidMount () {
        this.props.fetchProducts()
    }
    openModal = (product) => {
        this.setState({product})
    }
    closeModal = () => {
        this.setState({product: null})
    }
    render() {
        const {products} = this.props
        const {product} = this.state
        return <>
            <div>
                <Fade bottom cascade>
                    {!products ? (
                        <div>Loading...</div>
                    ) : (
                        <ul className="products">
                            {products.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a 
                                            onClick={() => this.openModal(product)}
                                            href={`#${product._id}`}
                                        >
                                            <img src={product.image} alt={product.title} />
                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>
                                            <button
                                                onClick={() => this.props.addToCart(product)} 
                                                className="button primary text-uppercase"
                                            >add to cart</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
                        <Zoom>
                            <button
                                onClick={this.closeModal}
                                className="close-modal"
                            >x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p><strong>{product.title}</strong></p>
                                    <p>{product.description}</p>
                                    <p>
                                        Avaiable Sizes: {" "}
                                        {product.availableSizes.map((x, index) => (
                                            <span key={index}> 
                                                {" "}                            
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button
                                            onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeModal()
                                            }}
                                            className="button primary"
                                        >Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}                    
            </div>
        </>
    }
}

export default connect(state => ({products: state.products.filteredItems}), {fetchProducts, addToCart})(Products)