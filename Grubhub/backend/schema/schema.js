var express = require('express');
var app = express();
const graphql = require("graphql");
var mysql = require("mysql");
// var pool = mysql.createPool({
//   connectionLimit: 100,
//   port: "3306",
//   host: "lab3-grubhub.cv9vraaep5ay.us-west-2.rds.amazonaws.com",
//   user: "root",
//   password: "root.1234",
//   database: "grubhub",
//   debug: false
// });
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Tina.1234',
    database: 'grubhub',
    debug: false
})

var clientEmail = "";
var ownerEmail = "";
var sessionResponse = "";
var imageId;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    client_email: { type: GraphQLString },
    password: { type: GraphQLString },
    street_address: { type: GraphQLString },
    apt: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    phone: { type: GraphQLString },
    cross_street: { type: GraphQLString },
    delivery_instructions: { type: GraphQLString },
    address_name: { type: GraphQLString },
    profile_image: { type: GraphQLString },
    status: { type: GraphQLInt }
  })
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    owner_email: { type: GraphQLString },
    password: { type: GraphQLString },
    restaurant_name: { type: GraphQLString },
    restaurant_zip_code: { type: GraphQLString },
    r_id: { type: GraphQLString },
    profile_image: { type: GraphQLString },
    phone: { type: GraphQLString },
    rest_name: { type: GraphQLString },
    rest_image: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    rest_zip_code: { type: GraphQLString },
    status: { type: GraphQLInt }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: "RestaurantType",
  fields: () => ({
    id: { type: GraphQLID },
    r_id: { type: GraphQLInt },
    rest_name: { type: GraphQLString },
    rest_image: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    rest_zip_code: { type: GraphQLString },
  })
});

const itemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rate: { type: GraphQLInt },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    section: { type: GraphQLString }
  })
});

const restaurantMenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    section: { type: GraphQLString },
    id: { type: GraphQLString },
    items: { type: new GraphQLList(itemType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    restaurantList: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        var sql = "SELECT rest_name, rest_image, cuisine, rest_zip_code, r_id from owner_profile";
        console.log('Hereeeeeee', sql);
        return pool.getConnection(function (err, pool) {
            if (err) {
                return err;
            } else {
                return pool.query(sql, function (err, result) {
                    if (err) {
                        return err;
                    } else {
                        console.log('Here', JSON.parse(JSON.stringify(result)))
                        // return JSON.parse(JSON.stringify(result));
                        return result;
                    }
                });
            }
        })
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    loginClient: {
      type: ClientType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        clientEmail = args.email;
        var sql =
          "SELECT *  FROM client_signup WHERE client_email = " +
          mysql.escape(args.email) +
          " and password = " +
          mysql.escape(args.password);
        console.log(sql);
        pool.getConnection(function(err, pool) {
          if (err) {
            return err;
          } else {
            pool.query(sql, function(err, result) {
              if (result.length == 0) {
                return;
              } else {
                sessionResponse = JSON.parse(JSON.stringify(result));
                clientEmail = sessionResponse[0].clientEmail;
                console.log("clientEmail", sessionResponse[0].client_email);
                return result;
              }
            });
          }
        });
      }
    },
    signupClient: {
      type: ClientType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        var sql =
          "INSERT INTO client_signup VALUES ( " +
          mysql.escape(args.firstName) +
          " , " +
          mysql.escape(args.lastName) +
          " , " +
          mysql.escape(args.email) +
          " , " +
          mysql.escape(args.password) +
          " ) ";
        pool.query(sql, function(err, result) {
          console.log("result", result);
          var res = {};
          if (err) {
            res.status = 400;
            return res;
          } else {
            res.status = 200;
            var sql1 =
              "INSERT INTO client_update (client_email) VALUES (" +
              mysql.escape(args.email) +
              ")";
            pool.query(sql1);
            return res;
          }
          return result;
        });
      }
    },
    loginOwner: {
      type: OwnerType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        ownerEmail = args.email;
        var sql =
          "SELECT *  FROM owner_signup WHERE owner_email = " +
          mysql.escape(ownerEmail) +
          "and password = " +
          mysql.escape(args.password);

        console.log(sql);
        pool.getConnection(function(err, pool) {
          if (err) {
            return err;
          } else {
            pool.query(sql, function(err, result) {
              if (result.length == 0) {
                return;
              } else {
                sessionResponse = JSON.parse(JSON.stringify(result));
                console.log(sessionResponse);
                clientEmail = sessionResponse[0].clientEmail;
                console.log("r_id", sessionResponse[0].r_id);
                imageId = sessionResponse[0].r_id;
                console.log("owner Email", sessionResponse[0].owner_email);
                return result;
              }
            });
          }
        });
      }
    },
    signupOwner: {
      type: OwnerType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        restaurantName: { type: GraphQLString },
        restaurantZipCode: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        var sql =
          "INSERT INTO owner_signup (first_name, last_name, owner_email, restaurant_name, restaurant_zip_code, password) VALUES ( " +
          mysql.escape(args.firstName) +
          " , " +
          mysql.escape(args.lastName) +
          " , " +
          mysql.escape(args.email) +
          " , " +
          mysql.escape(args.restaurantName) +
          " , " +
          mysql.escape(args.restaurantZipCode) +
          " , " +
          mysql.escape(args.password) +
          " ) ";
        console.log(sql);
        pool.query(sql, function(err, result) {
          console.log("result", result);
          var res = {};
          if (err) {
            res.status = 400;
            return res;
          } else {
            res.status = 200;
            var sql1 =
            "INSERT INTO owner_profile (first_name, last_name, owner_email, rest_name, rest_zip_code) VALUES ( " +
            mysql.escape(args.firstName) +
            " , " +
            mysql.escape(args.lastName) +
            " , " +
            mysql.escape(args.email) +
            " , " +
            mysql.escape(args.restaurantName) +
            " , " +
            mysql.escape(args.restaurantZipCode) +
            " ) ";
            console.log(sql1);
            pool.query(sql1);
            return res;
          }
          return result;
        });
      }
    },
    restaurantList: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        var sql = "SELECT rest_name, rest_image, cuisine, rest_zip_code, r_id from owner_profile";
        console.log('Hereeeeeee', sql);
        return pool.getConnection(function (err, pool) {
            if (err) {
                return err;
            } else {
                return pool.query(sql, function (err, result) {
                    if (err) {
                        return err;
                    } else {
                        console.log(JSON.parse(JSON.stringify(result)));
                        return result;
                    }
                });
            }
        });
      }
    },
    getRestaurantMenu: {
      type: new GraphQLList(restaurantMenuType),
      args: { restaurant_id: { type: GraphQLID } },
      resolve(parent, args) {
        return restaurantService
          .getRestaurantMenu(args.restaurant_id)
          .then(menu => {
            console.log("here", menu);
            return menu;
          });
      }
    },
    getItem: {
      type: itemType,
      args: { item_id: { type: GraphQLID } },
      resolve(parent, args) {
        return itemService.getItemDetails(args.item_id).then(item => {
          return item;
        });
      }
    },
    addItem: {
      type: itemType,
      args: {
        name: { type: GraphQLString },
        rate: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        section: { type: GraphQLString },
        restaurant_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return itemService.addItem(args).then(item => {
          return item;
        });
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
