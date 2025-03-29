import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import '../components/AddToCart.css'


function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Project Found',
      quantity,
      price: Number(price),
      subtotal: quantity * Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} To Cart</h2>

      <div>
        <input
          className="bg-white text-black border border-gray-400 p-2 rounded"
          type="number"
          placeholder="Enter quantity amount"
          value={quantity}
          min="1"
          onChange={(x) => {
            const value = Math.max(1, Number(x.target.value)); // Prevents values below 1
            setQuantity(value);
          }}
        />
        <br />
        <br />
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default AddToCartPage;
