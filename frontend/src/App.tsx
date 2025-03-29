import './App.css';
import { CartProvider } from './context/CartContext';
import AddToCartPage from './pages/AddToCartPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap extras:

// On AddToCartPage.tsx line 34:
// I added a border,
// colored it gray using "border-gray-400",
// and rounded the border using "rounded"

// On CartPage.tsx:
// line 25: added padding using "p-2"
// line 30: made the subtotal text green using "text-success"
// line 32: made the button red using "btn-danger"

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route
              path="/addToCart/:title/:bookID/:price"
              element={<AddToCartPage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
