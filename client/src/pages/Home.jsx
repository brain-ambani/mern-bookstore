import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3300/api/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {books.map((book) => (
            <div
              key={book._id}
              className="flex justify-between items-center border-b-2 border-sky-200 py-4"
            >
              <div>
                <h2 className="text-2xl">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-600">{book.publishYear}</p>
              </div>
              <div>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-sky-800 text-2xl mx-2" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-sky-800 text-2xl mx-2" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-sky-800 text-2xl mx-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
