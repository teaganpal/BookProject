import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();

  return (
    <>
      <WelcomeBand />
      <div>
        <h2>Your Cart</h2>
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
