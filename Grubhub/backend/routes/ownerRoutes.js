var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');

// Owner

app.get('/ownerUpdate', function (req, res) {

    console.log('Inside owner profile')
    console.log(sessionResponse[0].owner_email);
    var sql = "SELECT * FROM owner_profile where owner_email = '" + sessionResponse[0].owner_email + "'";
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

app.post('/ownerUpdateProfile', function (req, res) {
    console.log("Inside Update name Handler");
    // var sql = "UPDATE client_update SET first_name = '"+req.body.first_name+"', last_name = '"+req.body.last_name+"'  WHERE client_email = '"+clientEmail+"'" ;
    var sql = "UPDATE owner_profile SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name
        + "', owner_email = '" + req.body.owner_email + "', phone = '" + req.body.phone + "', rest_name = '" + req.body.rest_name
        + "', cuisine = '" + req.body.cuisine + "'  WHERE owner_email = '" + sessionResponse[0].owner_email + "'";
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
            res.end('Owner Name updated Successfully');
        }
    });
});

app.post('/ownerUpdateProfileImage', function (req, res) {
    console.log("Inside Update profile image for owner Handler");
    var sql = "UPDATE owner_profile SET profile_image = '" + req.body.profile_image + "'  WHERE r_id = " + sessionResponse[0].r_id;
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
            res.end('Profile image added Successfully');
        }
    });
});

app.post('/ownerUpdateRestImage', function (req, res) {
    console.log("Inside Update profile image for owner Handler");
    var sql = "UPDATE owner_profile SET rest_image = '" + req.body.rest_image + "'  WHERE r_id = " + sessionResponse[0].r_id;
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
            res.end('Restaurant image added Successfully');
        }
    });
});

app.post('/ownerAddSection', function (req, res) {
    console.log("Inside Insert Section Handler");

    var sql = "INSERT INTO menu_table (r_id, section_name, section_description) VALUES ( " +
        sessionResponse[0].r_id + " , " + mysql.escape(req.body.section_name) + " , " +
        mysql.escape(req.body.section_description) + " ) ";

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
            res.end('Section added Successfully');
        }
    });
});

app.post('/ownerUpdateSection', function (req, res) {
    console.log("Inside update Section Handler");
    console.log(req.body)

    var sql = "UPDATE menu_table SET section_name = " + mysql.escape(req.body.section_name) +
        ", section_description = " + mysql.escape(req.body.section_description)
        + " WHERE section_id = " + mysql.escape(req.body.section_id);
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
            res.end('section updated Successfully');
        }
    });
});

app.post('/ownerDeleteSection', function (req, res) {
    console.log("Inside Delete Section Handler");
    console.log(req.body)

    var sql = "DELETE FROM menu_table WHERE section_id = " + mysql.escape(req.body.deleteId);
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
            res.end('section deleted Successfully');
        }
    });
});


app.get('/ownerSections', function (req, res) {
    console.log("Inside Owner Sections get Request Handler");

    var sql = "SELECT section_name, section_description, section_id from menu_table WHERE r_id = '" + sessionResponse[0].r_id + "'";
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
                    console.log(result);
                    console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.post('/ownerAddItem', function (req, res) {
    console.log("Inside Insert Item Handler");
    console.log(req.body)

    var sql = "INSERT INTO item_table (section_id, item_name, item_image, item_description, item_price) VALUES ( " +
        mysql.escape(req.body.section_id) + " , " + mysql.escape(req.body.item_name) + " , " +
        mysql.escape(req.body.item_image) + " , " + mysql.escape(req.body.item_description) + " , " +
        mysql.escape(req.body.item_price) + " ) ";

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
            res.end('Item added Successfully');
        }
    });
});

app.get('/ownerItemsList', function (req, res) {
    console.log(sessionResponse[0])
    console.log("Inside Owner Sections get items Request Handler");

    var sql = "SELECT item_table.section_id, item_table.item_id, item_table.item_name, item_table.item_image, item_table.item_description, item_table.item_price from item_table, menu_table WHERE item_table.section_id = menu_table.section_id AND menu_table.r_id = " + sessionResponse[0].r_id;

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

app.post('/ownerDeleteItem', function (req, res) {
    console.log("Inside Delete Item Handler");
    console.log(req.body)

    var sql = "DELETE FROM item_table WHERE item_id = " + mysql.escape(req.body.deleteId);
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
            res.end('section deleted Successfully');
        }
    });
});

app.get('/upcomingOrdersForOwner', function (req, res) {
    console.log("Inside get owner's upcoming orders Request Handler");

    var sql = "SELECT * from order_table where r_id = " + sessionResponse[0].r_id + " and status  not in ('Delivered', 'Cancelled')";
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

app.get('/pastOrdersForOwner', function (req, res) {
    console.log("Inside get owner's past orders Request Handler");

    var sql = "SELECT * from order_table where r_id = " + sessionResponse[0].r_id + " and status in ('Delivered', 'Cancelled') order by order_id desc";
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

