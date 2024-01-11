import { useEffect, useState, useContext } from 'react';
import facade from '../util/apiFacade';
function UserPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = () => {
      facade.getCart(
        (cartData) => {
          setCart(cartData);
        },
        (error) => {
          // Handle error (e.g., show an error message)
          console.error("Error fetching cart:", error);
        }
      );
    };
    fetchCart();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts
  
  return (
    <div className="content">
        <h1>Welcome {facade.getUsername()}</h1>
      <p>This is for Users only.</p>
      {cart && (
        <div>
          <h2>Your Cart:</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.cart_items.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserPage;