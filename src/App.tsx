import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AppWrapper = styled.main`
  padding-bottom: 2rem;
  background-color: rgba(243,244,246,1)
`

const AppHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items:center;
  border-bottom-width: 1px;
  border-color: rgba(229,231,235,1);
`

const Logo = styled.h1`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-right-color: rgba(229,231,235,1);
  border-right-width: 1px;
`

const SearchWrapper = styled.div`
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  padding-left: 1rem;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`

const SearchInput = styled.input`
  outline: 2px solid transparent;
  outline-offset: 2px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  background-color: transparent;
  height: 2rem;  
`

const PageTitle = styled.h2`
  font-weight: 700;
  font-size: 3rem;
  line-height: 1;
  padding: 3rem;
`

const BookGrid = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  gap: 1rem;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  display: grid;
`

const BookItem = styled.div`
  padding: 0.75rem;  
  background-color: rgba(255,255,255,1);
  gap: 0.5rem;
  flex-direction: column;
  display: flex;
`

const BookTitle = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`

const BookImageWrapper = styled.div`
  padding: 1.5rem;
  background-color: rgba(243,244,246,1);
  justify-content: center;
  align-items: center;
  display: flex;
` 

const BookAuthor = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`

const BookImage = styled.img`
  object-fit: cover;
  height: 20rem;
`

const BookCover = styled.div`
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 10px;
    bottom: 0;
    width: 3px;
    background: rgba(0, 0, 0, 0.06);
    box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
  }
`

const CheckoutButton = styled.button`  
  color: rgba(255,255,255,1);
  padding: 0.5rem;
  background-color: rgba(0,0,0,1);
  border-radius: 0.5rem;
`
type Book = {
  id: string;
  author: string;
  cover_image:string;
  title: string;
}
type Books = Book[]

const App = () => {
  const [books, setBooks] = useState<Books>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const req = await fetch('/api/books');
      const result = await req.json();
      setBooks(result);
    }

    fetchBooks();
  }, []);

  return (
    <AppWrapper>
      <AppHeader>
        <Logo>Booklet</Logo>
        <SearchWrapper>
          <SearchInputWrapper>
            <SearchIcon size={18} strokeWidth={1} />
            <SearchInput type="text" placeholder="Search" />
          </SearchInputWrapper>
        </SearchWrapper>
      </AppHeader>
      <section>
        <PageTitle>
          Books
        </PageTitle>
        <BookGrid>
          {
            books?.map((book) => (
              <BookItem key={book.id}>
                <BookImageWrapper>
                  <BookCover>
                    <BookImage src={book.cover_image} />
                  </BookCover>
                </BookImageWrapper>
                <div>
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                </div>
                <CheckoutButton>Check out</CheckoutButton>
              </BookItem>
            ))
          }
        </BookGrid>
      </section>
    </AppWrapper>
  );
};
export default App;