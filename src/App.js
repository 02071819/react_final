import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './library/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Pages/Home';

const App = () => {
  const [products, setProducts] = useState([]); //商品hook
  const [cart, setCart] = useState({}); //購物車hook

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  } //抓取commerce.js的商品API

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  } //抓取commerce.js的購物車API

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }//抓取commerce.js的商品ID、數量API

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };//Cart的Update功能

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };//Cart的remove功能

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //hook, run at th start on the render


  //對應Products.jsx、Cart.jsx、CartItem.jsx、Checkout.jsx那邊的props
  //Navbar的totalItems={cart.total_items}為購物車上的數字
  //利用Router來判斷更換頁面，Switch內的為可更換的page，Route為可更換的page的路徑
  return (
    <>
      <Router>
        <Navbar totalItems={cart.total_items} />
        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart} />
          </Route>

          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>

        </Switch>
      </Router>
    </>
  );
}
export default App;
