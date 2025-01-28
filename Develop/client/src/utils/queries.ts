import { gql } from "@apollo/client";

export const GET_ME = gql`
    query getMe {
        me{
            username
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }             
        }
    }
`;

