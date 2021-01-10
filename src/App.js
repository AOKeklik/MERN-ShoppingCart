import React, { Component } from 'react'
import "./App.css"
import Products from './components/Products'

import {Provider} from 'react-redux'
import store from './redux/store'
import Filter from './components/Filter'
import Cart from './components/Cart'

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <div className="grid-container">
                <header>
                    <a href="/">React Shopping Cart</a>
                </header>
                <main>
                <div className="content">
                    <div className="main">
                    {/* filter */}
                        <Filter />
                    {/* filter */}

                    {/* product */}
                        <Products />
                    {/* product */}
                    </div>
                    <div className="sidebar">
                    {/* cart */}
                        <Cart />
                    {/* cart */}
                    </div>
                </div>
                </main>
                <footer>
                    Allright Is reserved..
                </footer>
            </div>
        </Provider>
    }
}