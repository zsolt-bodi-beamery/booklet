import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";


const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const req = await fetch('/api/books');
      const result = await req.json();
      setBooks(result);
    }
    
    fetchBooks();    
  }, []);

  return (
    <main className="pb-8">
      <header className="flex flex-row items-center border-b border-b-gray-200">
        <h1 className="text-lg font-bold px-8 border-r border-r-gray-200 py-7">Booklet</h1>
        <div className="py-7 pl-4">
          <div className="flex flex-row items-center gap-2">
            <SearchIcon size={18} strokeWidth={1} />
            <input type="text" placeholder="Search" className="outline-none bg-transparent text-xl h-8" />
          </div>
        </div>
      </header>
      <section>
        <h2 className="p-12 font-bold text-5xl">
          Books
        </h2>
        <div className="px-12 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4">
          {
            books?.map((book) => (
              <div key={book.id} className="bg-white p-3 flex flex-col gap-2">
                <div className="bg-gray-100 flex items-center justify-center p-6">
                  <div className="book-cover drop-shadow-xl">
                    <img src={book.cover_image} className="object-cover h-80" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold">{book.title}</div>
                  <div className="text-base">{book.author}</div>
                </div>
                <button className="bg-black text-white rounded-lg p-2">Check out</button>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
};
export default App;