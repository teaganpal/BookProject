import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          sortOrder
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
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
      <div className="row justify-content-center">
        {books.length === 0 ? (
          <div className="col-12 text-center">
            <p className="fw-bold text-muted">No books found.</p>
          </div>
        ) : (
          books.map((b) => (
            <div
              key={b.bookID}
              className={`col-12 ${books.length === 1 ? 'col-md-8' : books.length === 2 ? 'col-md-6' : 'col-md-6 col-lg-4'}`}
            >
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
                    className="btn btn-success w-100"
                    onClick={() =>
                      navigate(`/addToCart/${b.title}/${b.bookID}/${b.price}`)
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </div>
  );
}

export default BookList;
