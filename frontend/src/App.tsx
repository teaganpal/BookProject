import './App.css';
import { CartProvider } from './context/CartContext';
import AddToCartPage from './pages/AddToCartPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap extras:
// added ...

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/addToCart/:title/:bookID/:price" element={<AddToCartPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
