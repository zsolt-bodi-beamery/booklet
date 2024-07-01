// @ts-nocheck
import { MockHandler } from 'vite-plugin-mock-server'
import { books } from './books';

let localBooks = books;
export default (): MockHandler[] => [
  {
    pattern: '/api/books',
    handle: (req, res) => {
      res.setHeader('Content-type', 'application/json');
      let books = [...localBooks];
      if (req.query.q) {        
        if (req.query.q.length < 3) {
          res.statusCode = 422;
          res.end();
          return;
        }
        books = books.filter((b) => {
          return b.title.toLowerCase().includes(req.query.q.toLowerCase());
        })
      }
      if (!books.length) {
        res.statusCode = 404
      }
      res.statusCode = 200;
      res.end(JSON.stringify(books));
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
  },
  
]