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


const SavedBooks = () => {

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(token);

  if (!token) {
    return false;
  }
  
  const { loading, error, data: userData } = useQuery(GET_ME);
  
  const [removeBook] = useMutation(REMOVE_BOOK);

   if (error) return <p>Error1: {error.message}</p>;

  
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
          refetchQueries: [{query: GET_ME}],
        });
      
        removeBookId(bookId);
        } catch (error) {
            console.error("Error Removing Book",error);
        }    
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData);
  //console.log(userData.me)

  if (!userData || !userData.me || !userData.me.savedBooks) {
    return <h2>You have no saved books!</h2>;
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
