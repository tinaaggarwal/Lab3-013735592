const graphql = require("graphql");
var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "lab3-grubhub.cv9vraaep5ay.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "root.1234",
  database: "grubhub",
  debug: false
});

var clientEmail = "";
var ownerEmail = "";
var sessionResponse = "";

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
    type: { type: GraphQLString },
    street_address: { type: GraphQLString },
    apt: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    phone: { type: GraphQLString },
    cross_street: { type: GraphQLString },
    delivery_instructions: { type: GraphQLString },
    address_name: { type: GraphQLString },
    profile_image: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Users.findOne({
          where: {
            email: args.id
          }
        }).then(user => {
          return user;
        });
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
                console.log(sessionResponse);
                clientEmail = sessionResponse[0].clientEmail;
                console.log("clientEmail", sessionResponse[0].client_email);
                return result;
              }
            });
          }
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
