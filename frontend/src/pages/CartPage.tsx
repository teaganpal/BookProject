import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item: CartItem) => (
                <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <p className="mb-0">
                      <span className="text-muted">Price:</span> ${item.price.toFixed(2)}
                      {' | '}
                      <span className="text-muted">Quantity:</span> {item.quantity}
                    </p>
                    <strong className="text-success">Subtotal: ${item.subtotal.toFixed(2)}</strong>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3 className="mt-3">Total: <span className="text-primary">${totalAmount.toFixed(2)}</span></h3>
        <div className="mt-3">
          <button className="btn btn-success me-2">Checkout</button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
