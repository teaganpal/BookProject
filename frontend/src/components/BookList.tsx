import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <div className="container mt-4">
      {/* Sorting Dropdown */}
      <div className="d-flex justify-content-center mb-3">
        <label className="me-2 fw-bold">Sort by Title:</label>
        <select
          className="form-select w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </div>

      {/* Book Cards */}
      <div className="row">
        {books.map((b) => (
          <div key={b.bookID} className="col-md-6 col-lg-4">
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{b.title}</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li className="list-group-item">
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li className="list-group-item">
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li className="list-group-item">
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li className="list-group-item">
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li className="list-group-item">
                    <strong>Page Count:</strong> {b.pageCount}
                  </li>
                  <li className="list-group-item">
                    <strong>Price:</strong> ${b.price}
                  </li>
                </ul>
                <button
                  className="btn btn-success"
                  onClick={() => navigate('/cart/')}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Page Size Selector */}
      <div className="d-flex justify-content-center mt-3">
        <label className="me-2 fw-bold">Results per page:</label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="6">6</option>
          <option value="15">15</option>
          <option value="21">21</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
