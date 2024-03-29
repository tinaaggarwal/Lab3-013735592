import React, { Component } from 'react';
import Orders from './Orders';
import axios from 'axios';

class UpcomingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false
        }

        this.cancelBtnHandler = this.cancelBtnHandler.bind(this);
    }

    componentDidMount() {

        axios.get('http://localhost:3001/upcomingOrdersForClient')
            .then((response) => {
                console.log(response.data);
                let orderIds = response.data.map(obj => {
                    return obj.order_id;
                });
                this.setState({
                    orders: response.data,
                    order_ids: orderIds
                });
            }).then(() => {
                console.log(this.state.order_ids);
                const data = {
                    order_ids: this.state.order_ids
                }

                //set the with credentials to true
                axios.defaults.withCredentials = true;
                //make a post request with the user data
                axios.post('http://localhost:3001/itemsInOrders', data)
                    .then(response => {
                        console.log("Status Code : ", response.status);
                        if (response.status === 200) {
                            console.log(response.data);
                            this.setState({
                                order_details: response.data,
                                authFlag: true
                            })
                        } else {
                            this.setState({
                                authFlag: false
                            })
                        }
                    });
            });
    }

    cancelBtnHandler = (e) => {

        const data = {
            status: 'Cancelled',
            orderIdToUpdate: e.target.id
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/updateOrderStatus', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });

        window.location.reload();

    }

    render() {
        return (
            <div className="container">
                <Orders
                    orders={this.state.orders}
                    order_details={this.state.order_details}
                    type="Upcoming orders" 
                    cancelBtnHandler={this.cancelBtnHandler}/>
            </div>
        );
    }
}

export default UpcomingOrders;