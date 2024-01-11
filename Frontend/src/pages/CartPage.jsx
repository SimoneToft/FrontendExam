import { useEffect, useState, useContext } from 'react';
import facade from '../util/apiFacade';

function CartPage() {
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

    if (!cart || !cart.cart_items || cart === null) {
        return <div>Loading...</div>; // or handle this case in a way that makes sense for your application
      }
    const total = cart.cart_items.reduce((acc, item) => acc + item.productPrice, 0);

    return (
      <div className="content">
        <h1>Your cart:</h1>
        <div className='cart-page'>   
        {cart && (
          <div className='cart-container'>
            <table className="cart-table">
              <thead>
                <tr className="cart-table_row">
                  <th className="cart-table_header">Product Name:</th>
                  <th className="cart-table_header">Product Price:</th>
                  <th className="cart-table_header">Total Price: ${total.toFixed(2)}</th>
                </tr>
              </thead>
              <tbody className="cart-table_section">
                {cart.cart_items.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-table_products_name">
                      {item.productName}
                    </td>
                    <td className="cart-table_products_price">
                      {'$'+item.productPrice}
                    </td>
                    <td className="cart-table_products_image">
                      <img src={item.productImage} alt="Product" height={"58"} width={"58"}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    );
}

export default CartPage;