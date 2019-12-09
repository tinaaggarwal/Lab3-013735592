import {gql} from 'apollo-boost';

const restaurantList = gql`
    query restaurantList{
        restaurantList{
            rest_name
            rest_image
            cuisine
            rest_zip_code
            r_id
        }
    }
`

export { restaurantList };