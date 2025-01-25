import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
        user {
            _id
            username
            email
            password
        }
        token
    }
}
`;