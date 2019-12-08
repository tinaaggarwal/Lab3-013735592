import { gql } from 'apollo-boost';

const loginClientMutation = gql`
    mutation loginClient($email: String, $password: String){
        loginClient(email: $email, password: $password){
            first_name
            last_name
            client_email
            password
        }
    }
`;

export { loginClientMutation };