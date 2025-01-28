//import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

//import { getMe, deleteBook } from '../utils/API';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
//import type { User } from '../models/User';
import type { Book } from '../models/Book';

//Added
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';


// interface Book {
//   bookId: string;
//   authors: string[];
//   description: string;
//   title: string;
//   image: string;
//   link: string;
// }

const SavedBooks = () => {

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return false;
  }

  const { loading, error, data: userData } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

 // const user = userData?.me || userData?.user || {};
  
  if (error) return <p>Error1: {error.message}</p>;
  


  // const [userData, setUserData] = useState<User>({
  //   username: '',
  //   email: '',
  //   password: '',
  //   savedBooks: [],
  // });

  // // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;
  // //remove this useEffect() and use useQuery() using GET_ME Query and save it to a variable "userData"
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
        //const response = await deleteBook(bookId, token);
        await removeBook({
          variables: { bookId},
        });
      
        removeBookId(bookId);
        } catch (error) {
            console.error("Error Removing Book",error);
        }

      //const updatedUser = await response.json();
      //userData(updatedUser);
      // upon success, remove book's id from localStorage
      //removeBookId(bookId);
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${
                userData.me.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.me.savedBooks.map((book:Book) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
