import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <WelcomeBand />
      <div>
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookID}>
                  {item.title}: ${item.price.toFixed(2)}
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: </h3>
        <button>Checkout</button>
        <button className="btn btn-success" onClick={() => navigate(-1)}>
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default CartPage;
