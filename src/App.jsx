import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  let stringifiedData; 

  const [search, setSearch] = useState('')
  console.log(search)

  useEffect(() => {
    const url = "/books";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        stringifiedData = JSON.stringify(json);
        setBooks(json.body);
        return stringifiedData;
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  function sortByTitle() {
    console.log('sort is firing')
    const sortedBooks = [...books].sort((a,b) => a.title.localeCompare(b.title));
    setBooks(sortedBooks);
  }

  function sortByAuthor() {
    console.log('sort is firing')
    const sortedBooks = [...books].sort((a,b) => a.author.localeCompare(b.author));
    setBooks(sortedBooks);
  }

//TODO: Figure out how to handle items with null data.
  // function sortByISBN() {
  //   console.log('sort is firing')
  //   const sortedBooks = [...books].sort((a,b) => a.isbn.localeCompare(b.isbn));
  //   setBooks(sortedBooks);
  // }

  // function sortByYear() {
  //   console.log('sort is firing')
  //   const sortedBooks = [...books].sort((a,b) => a.year.localeCompare(b.year));
  //   setBooks(sortedBooks);
  // }

  return (
    <div className="App">
      <h1 class="header">BOOKS AHOY</h1>
      <div class="navbox">
        <h5><input 
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Search book by title'
        ></input></h5>
        <h5><button onClick={sortByTitle} class="navButton">sort by title</button></h5>
        <h5><button onClick={sortByAuthor} class="navButton">sort by author</button></h5>
        {/* <h5><button onClick={sortByISBN} class="navButton">sort by ISBN</button></h5>
        <h5><button onClick={sortByYear} class="navButton">sort by year</button></h5> */}
      </div>



      {books.filter((book) => {
        return search.toLowerCase() === '' ? book : book.title.toLowerCase().includes(search);
      }).map(book => (
        <div className="card" key={book.id}>
          <h2 className="title">{book.title}</h2>
          <h5 className="author">by {book.author} </h5>
          <h5 className="isbn">ISBN: {book.isbn} </h5>
          <h5 className="year">Year: {book.year} </h5>
        </div>

      ))}
    </div>
  )
}

export default App