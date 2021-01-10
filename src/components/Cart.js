import React, { Component } from 'react'
import Modal from 'react-modal'
import {Fade, Zoom} from 'react-reveal'
import {formatCurrency, generateDate} from '../helpers/util'

import {connect} from 'react-redux'
import {removeFromCart} from '../redux/actions/cartActions'
import {createOrder,clearOrder} from '../redux/actions/orderActions'

class Cart extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showCheckOut: false,
            email: "",
            name: "",
            address: ""
        }
    }
    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleOnSubmit = (e) => {
        e.preventDefault()
        const order = {
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((total, num) => total + num.price * num.count, 0)
        }
        this.props.createOrder(order)
    }
    closeModal = () => {
        this.props.clearOrder()
    }
    render() {
        const {cartItems, order} = this.props
        return (
            <div>
            {!cartItems.length ? (
                <div className="cart cart-header">Cart is empty</div>
            ) : (
                <div className="cart cart-header">
                    You have {cartItems.reduce((total, num) => total + num.count, 0)} in the cart
                </div>
            )}
            {order && (
                <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
                    <Zoom>
                        <button
                            onClick={this.closeModal}
                            className="close-modal"
                        >x</button>
                        <div className="order-details">
                            <h3 className="success-message">Your order has been placed.</h3>
                            <h2>Order {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{generateDate(order.createdAt, 'DD,MM,YYYY')}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total)}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>
                                        {order.cartItems.map(x => (
                                            <div>
                                                {x.count} {" x "} {x.title}
                                            </div>
                                        ))}                                        
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            )}
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(product => (
                                    <li key={product._id}>
                                        <div>
                                            <img src={product.image} alt={product.title}></img>
                                        </div>
                                        <div>
                                            <div>{product.title}</div>
                                            <div className="right">
                                                {formatCurrency(product.price)} x {product.count} {" "}
                                                <button
                                                    onClick={() => this.props.removeFromCart(product)}
                                                    className="button"
                                                >Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length > 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {formatCurrency(cartItems.reduce((total, num) => total + num.price * num.count, 0))}
                                    </div>
                                    <button
                                        onClick={() => this.setState(state => ({showCheckOut: !state.showCheckOut}))}
                                        className="button primary"
                                    >Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckOut && (
                                <Fade right cascade>
                                    <div className="cart">
                                        <form>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input
                                                        onChange={this.handleOnChange}
                                                        value={this.state.email}
                                                        name="email"
                                                        type="email"
                                                        required
                                                    ></input>
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input
                                                        onChange={this.handleOnChange}
                                                        value={this.state.name}
                                                        name="name"
                                                        type="text"
                                                        required
                                                    ></input>
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input
                                                        onChange={this.handleOnChange}
                                                        value={this.state.adress}
                                                        name="address"
                                                        type="text"
                                                        required
                                                    ></input>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={this.handleOnSubmit}
                                                        className="button primary" 
                                                        type="submit"
                                                    >Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                </div> 
            </div>
        )
    }
}

export default connect(state => ({
    cartItems: state.cart.cartItems, 
    order: state.order.order
}), {removeFromCart,createOrder,clearOrder})(Cart)