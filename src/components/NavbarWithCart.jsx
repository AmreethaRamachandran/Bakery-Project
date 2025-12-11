import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';

function NavbarWithCart(props) {
  const { getCartCount } = useCart();
  
  return <Navbar {...props} cartCount={getCartCount()} />;
}

export default NavbarWithCart;
