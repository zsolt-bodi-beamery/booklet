// @ts-nocheck
import { MockHandler } from 'vite-plugin-mock-server'
import { books } from './books';

let localBooks = books;
export default (): MockHandler[] => [
  {
    pattern: '/api/books',
    handle: (_, res) => {
      res.setHeader('Content-type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(localBooks));
    }
  },
  {
    pattern: '/api/book/{bookId}/checkout',
    method: 'POST',
    handle: (req, res) => {
      const { bookId } = req.params;
      if (!bookId) {
        res.statusCode = 404;
        res.end({});
      }
      const book = localBooks.find((b) => b.id === (bookId - 0));
      const checkedOut = {
        ...book,
        checkedOut: true,
        checkOutDate: new Date()
      }
      localBooks = localBooks.map((b) => {
        if (b.id === (bookId - 0)) {
          return checkedOut;
        }
        return b;
      })

      res.statusCode = 201;
      res.end();
    }
  }
]