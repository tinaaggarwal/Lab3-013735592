import { gql } from "apollo-boost";

const loginClientMutation = gql`
  mutation loginClient($email: String, $password: String) {
    loginClient(email: $email, password: $password) {
      first_name
      last_name
      client_email
      password
    }
  }
`;

const loginOwnerMutation = gql`
  mutation loginOwner($email: String, $password: String) {
    loginOwner(email: $email, password: $password) {
      first_name
      last_name
      owner_email
      password
    }
  }
`;

const signupClientMutation = gql`
  mutation signupClient(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    signupClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      status
    }
  }
`;

const signupOwnerMutation = gql`
  mutation signupOwner(
    $firstName: String
    $lastName: String
    $email: String
    $restaurantName: String
    $restaurantZipCode: String
    $password: String
  ) {
    signupOwner(
      firstName: $firstName
      lastName: $lastName
      email: $email
      restaurantName: $restaurantName
      restaurantZipCode: $restaurantZipCode
      password: $password
    ) {
      status
    }
  }
`;

const restaurantListMutation = gql`
  mutation restaurantList {
    restaurantList {
      rest_name
      rest_image
      cuisine
      rest_zip_code
      r_id
    }
  }
`;

const getRestaurantMenu = gql`
  mutation getRestaurantMenu($restaurant_id: ID) {
    getRestaurantMenu(restaurant_id: $restaurant_id) {
      section
      id
      items {
        id
        name
        rate
        description
        image
        section
      }
    }
  }
`;

const getItemQuery = gql`
  mutation getItem($item_id: ID) {
    getItem(item_id: $item_id) {
      id
      name
      rate
      description
      image
      section
    }
  }
`;

const addItemQuery = gql`
  mutation addItem(
    $name: String
    $rate: String
    $description: String
    $image: String
    $section: String
    $restaurant_id: ID
  ) {
    addItem(
      name: $name
      rate: $rate
      description: $description
      image: $image
      section: $section
      restaurant_id: $restaurant_id
    ) {
      id
      name
      rate
      description
      image
      section
    }
  }
`;

export {
  loginClientMutation,
  loginOwnerMutation,
  signupClientMutation,
  signupOwnerMutation,
  restaurantListMutation,
  getRestaurantMenu,
  getItemQuery,
  addItemQuery
};
