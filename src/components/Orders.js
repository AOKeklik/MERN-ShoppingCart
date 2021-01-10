import React, { Component } from "react";

class Orders extends Component {
    render() {
        return (<>
            {/*orders ?*/}
                {/*<div>Orders</div>*/}
                <div className="orders">
                    <h2>Orders</h2>
                    <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADDRESS</th>
                        <th>ITEMS</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td> $45.66 </td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>
                            
                                <div>
                                    4 x Title
                                </div>
                                <div>
                                    4 x Title
                                </div>
                                <div>
                                    4 x Title
                                </div>
                            
                            </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
            {/*orders ?*/}
        </>)
    }
}

