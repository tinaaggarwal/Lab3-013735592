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
  mutation signupClient($firstName: String, $lastName: String, $email: String, $password: String) {
    signupClient(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      status
    }
  }
`;

const signupOwnerMutation = gql`
  mutation signupOwner($firstName: String, $lastName: String, $email: String, $restaurantName: String, $restaurantZipCode: String, $password: String) {
    signupOwner(firstName: $firstName, lastName: $lastName, email: $email, restaurantName: $restaurantName, restaurantZipCode: $restaurantZipCode, password: $password) {
      status
    }
  }
`;

export { loginClientMutation, loginOwnerMutation, signupClientMutation, signupOwnerMutation };
