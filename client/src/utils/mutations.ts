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

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input) {
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
            username
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
        }
    }
`;