var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');

app.get('/userUpdate', function (req, res) {
    console.log(clientEmail)
    var sql = "SELECT * FROM client_signup where client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    console.log((result[0]).first_name);
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

})

app.get('/userProfileImage', function (req, res) {
    console.log(clientEmail)
    var sql = "SELECT profile_image from client_update where client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    console.log((result[0]).first_name);
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

})

app.post('/userUpdateName', function (req, res) {
    console.log("Inside Update name Handler");
    // var sql = "UPDATE client_update SET first_name = '"+req.body.first_name+"', last_name = '"+req.body.last_name+"'  WHERE client_email = '"+clientEmail+"'" ;
    var sql = "UPDATE client_signup SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "'  WHERE client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating name");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Name updated Successfully');
        }
    });
});

app.post('/userUpdateEmail', function (req, res) {
    console.log("Inside Update email Handler");
    var sql = "UPDATE client_update SET client_email = '" + req.body.client_email + "'  WHERE client_email = '" + clientEmail + "' AND " + "'" + req.body.confirmEmail + "'" + " = '" + req.body.client_email + "'";
    var sql1 = "UPDATE client_signup SET client_email = '" + req.body.client_email + "'  WHERE client_email = '" + clientEmail + "' AND " + "'" + req.body.confirmEmail + "'" + " = '" + req.body.client_email + "'";
    console.log(sql)
    console.log(sql1)
    pool.query(sql1)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating email");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Email updated Successfully');
        }
    });
});

app.post('/userUpdatePassword', function (req, res) {
    console.log("Inside Update Password Handler");
    var sql = "UPDATE client_signup SET password = '" + req.body.newPassword + "'  WHERE password = '" + req.body.password + "' AND " + "'" + req.body.newPassword + "'" + " = '" + req.body.confirmPassword + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating password");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Password updated Successfully');
        }
    });
});

app.get('/addressUpdate', function (req, res) {
    console.log(clientEmail)
    var sql = "SELECT * FROM client_update where client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    // console.log((result[0][0]).first_name); 
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })
})

app.post('/userUpdateAddress', function (req, res) {
    console.log("Inside Update Address Handler");
    var sql = "UPDATE client_update SET street_address = '" + req.body.street_address + "', apt = '" + req.body.apt +
        "', city = '" + req.body.city + "', state = '" + req.body.state + "', zip_code = '" + req.body.zip_code +
        "', phone = '" + req.body.phone + "', cross_street = '" + req.body.cross_street + "', delivery_instructions = '" + req.body.delivery_instructions +
        "', address_name = '" + req.body.address_name + "'  WHERE client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating address");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('client Address updated Successfully');
        }
    });
});


app.post('/userAddAddress', function (req, res) {
    console.log("Inside Insert Address Handler");
    
    var sql = "UPDATE client_update SET street_address = " + mysql.escape(req.body.street_address) +
    ", apt = " +  mysql.escape(req.body.apt) + ", city = " +  mysql.escape(req.body.city) +
    ", state = " +  mysql.escape(req.body.state) + ", zip_code = " +  mysql.escape(req.body.zip_code) +
    ", phone = " +  mysql.escape(req.body.phone) + ", cross_street = " +  mysql.escape(req.body.cross_street) +
    ", delivery_instructions = " +  mysql.escape(req.body.delivery_instructions) + ", address_name = " +  mysql.escape(req.body.address_name) +
    " WHERE client_email = " + mysql.escape(clientEmail);


    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating address");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('client Address added Successfully');
        }
    });
});

app.post('/userUpdateProfileImage', function (req, res) {
    console.log("Inside Update profile image Handler");
    var sql = "UPDATE client_update SET profile_image = '" + req.body.profile_image + "'  WHERE client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating name");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('user profile image added Successfully');
        }
    });
});


// Client side to view restaurants and order items

app.get('/restaurantList', function (req, res) {
    console.log("Inside clients homepage get restaurants list Request Handler");

    var sql = "SELECT rest_name, rest_image, cuisine, rest_zip_code, r_id from owner_profile";
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result)
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
});

app.post('/searchItem', function (req, res) {
    console.log("Inside get all menu sections for client Handler");

    console.log('cuisine....', req.body.filterCuisine)

    if (!req.body.searchItem && req.body.filterCuisine) {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id " +
            "from owner_profile where cuisine = " + mysql.escape(req.body.filterCuisine);
    } else if (!req.body.filterCuisine && req.body.searchItem) {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id "
            + "from owner_profile "
            + "inner join menu_table on owner_profile.r_id = menu_table.r_id "
            + "inner join item_table on menu_table.section_id = item_table.section_id "
            + "where item_table.item_name like " + mysql.escape('%' + req.body.searchItem + '%');
    } else {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id "
            + "from owner_profile "
            + "inner join menu_table on owner_profile.r_id = menu_table.r_id "
            + "inner join item_table on menu_table.section_id = item_table.section_id "
            + "where item_table.item_name like " + mysql.escape('%' + req.body.searchItem + '%') + "and cuisine = " + mysql.escape(req.body.filterCuisine);
    }

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(result)
            res.end(JSON.stringify(result));
        }
    });
});

app.get('/nextOrderId', function (req, res) {
    console.log("Inside clients homepage get id for next order Request Handler");

    var sql = "SELECT MAX(order_id) FROM order_details_table";
    console.log(sql);

    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    orderId = JSON.stringify(result);
                    console.log(orderId)
                    orderId = JSON.parse(orderId);
                    id = Object.values(orderId[0]);
                    nextOrderId = id[0];
                    nextOrderId = nextOrderId + 1
                    // res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.get('/distinctCuisines', function (req, res) {
    console.log("Inside clients homepage get list of distinct cuisines for dropdown filter Request Handler");

    var sql = "SELECT DISTINCT(cuisine) from owner_profile";
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result)
                    res.end(JSON.stringify(result));

                }
            });
        }
    })
});

app.post('/menuSections', function (req, res) {
    console.log("Inside get all menu sections for client Handler");

    console.log(req.body)
    var sql = "SELECT section_name, section_description, section_id from menu_table WHERE r_id = " + mysql.escape(req.body.r_id);
    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(result)
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/menuItems', function (req, res) {
    console.log("Inside get all menu items for client Handler");
    console.log(req.body)
    var sql = "SELECT item_table.section_id, item_table.item_id, item_table.item_name, item_table.item_image, item_table.item_description, item_table.item_price from item_table, menu_table WHERE item_table.section_id = menu_table.section_id AND menu_table.r_id = " + mysql.escape(req.body.r_id);

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(result)
            res.end(JSON.stringify(result));
        }
    });

});

app.post('/addItemToCart', function (req, res) {
    console.log("Inside add items to cart client Handler");
    console.log(req.body.item_quantity * req.body.item_price);

    console.log('order id...', orderId)
    console.log('id.......', id)
    console.log('nextorderid.......', nextOrderId)

    console.log('nextorderid.......', nextOrderId)

    var sql = "INSERT INTO order_details_table (order_id, item_id, item_name, item_quantity, item_total_price) VALUES ( " +
        nextOrderId + " , " + mysql.escape(req.body.item_id) + " , " + mysql.escape(req.body.item_name) + " , " +
        req.body.item_quantity + " , " + req.body.item_quantity * req.body.item_price + " ) ";

    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While adding item to cart");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Item added to cart Successfully');
        }
    });
});


app.get('/cartItems', function (req, res) {
    console.log("Inside clients cart get cart items list Request Handler");

    var sql = "SELECT * FROM order_details_table WHERE order_id = " + nextOrderId;
    console.log(sql);
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    if(result.length === 0){
                        console.log('empty')
                        res.end('Cart is empty')
                    } else{
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        res.end(JSON.stringify(result));
                    }
                }
            });
        }
    })

});

app.get('/cartTotal', function (req, res) {
    console.log("Inside clients calculating total order price Request Handler");

    var sql = "SELECT round(sum(item_total_price),2) from order_details_table group by order_id having order_id = " + nextOrderId;
    console.log(sql);

    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    console.log(JSON.stringify(result))
                    let total = JSON.stringify(result);
                    // console.log(orderId)
                    total = JSON.parse(total);
                    let cartTotal = Object.values(total[0]);
                    console.log(cartTotal)
                    let orderTotal = cartTotal[0];
                    console.log(orderTotal)
                    // nextOrderId = nextOrderId + 1
                    res.end(orderTotal.toString());

                }
            });
        }
    })

});

app.post('/submitOrder', function (req, res) {
    console.log("Inside submit order client Handler");

    var sql = "INSERT INTO order_table (order_id, client_email, client_first_name, client_last_name, client_address, r_id, status, order_bill) VALUES ( " +
        req.body.order_id + " , " + mysql.escape(sessionResponse[0].client_email) + " , "
        + mysql.escape(sessionResponse[0].first_name) + " , " + mysql.escape(sessionResponse[0].last_name) + " , " +
        "(SELECT concat(street_address, ' ', apt, ' ', city, ' ', state, ' ', zip_code ) from client_update where client_email=" + mysql.escape(sessionResponse[0].client_email)
        + " ), " + req.body.r_id + ", 'New', " + req.body.cart_totalPrice + ")"

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While adding item to cart");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Order submitted Successfully');
        }
    });
});


app.get('/upcomingOrdersForClient', function (req, res) {
    console.log("Inside get client's upcoming orders Request Handler");

    var sql = "SELECT order_id, client_email, client_address, order_bill, order_table.r_id, rest_name, status from order_table, owner_profile where client_email = " + mysql.escape(sessionResponse[0].client_email) + " and status not in ('Delivered', 'Cancelled') and order_table.r_id = owner_profile.r_id "
    console.log(sql);
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify(result));

                }
            });
        }
    })
});

app.get('/pastOrdersForClient', function (req, res) {
    console.log("Inside get client's upcoming orders Request Handler");

    var sql = "SELECT order_id, client_email, client_address, order_bill, order_table.r_id, rest_name, status from order_table, owner_profile where client_email = " + mysql.escape(sessionResponse[0].client_email) + " and status in ('Delivered', 'Cancelled') and order_table.r_id = owner_profile.r_id order by order_id desc"
    console.log(sql);
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify(result));

                }
            });
        }
    })
});

app.post('/itemsInOrders', function (req, res) {
    console.log("Inside get orders with list of items Request Handler");
    console.log('array of orderids..........', req.body.order_ids)

    var sql = "SELECT order_details_table.order_id, order_details_table.item_id, item_table.item_image, order_details_table.item_name, order_details_table.item_quantity, order_details_table.item_total_price from order_details_table, item_table WHERE order_id in (" + req.body.order_ids + ") and order_details_table.item_id = item_table.item_id";

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })

            res.end(JSON.stringify(result));

        }
    });
});

app.post('/updateOrderStatus', function (req, res) {
    console.log("Inside update order status Request Handler");
    console.log('status....', req.body.status)
    console.log('order id to update ....', req.body.orderIdToUpdate)

    var sql = "UPDATE order_table SET status = " + mysql.escape(req.body.status) + " WHERE order_id = " + req.body.orderIdToUpdate;

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Order status updated Successfully');
        }
    });
});