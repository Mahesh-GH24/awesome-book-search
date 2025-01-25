import express from 'express';
const router = express.Router();
import {
  //commented on 1/24
  //createUser,
  getSingleUser,
  //commented on 1/24
  //saveBook,
  deleteBook,
  //commented on 1/24
  //login,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
//commented on 1/24
//router.route('/').post(createUser).put(authenticateToken, saveBook);
//router.route('/login').post(login);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/books/:bookId').delete(authenticateToken, deleteBook);

export default router;
