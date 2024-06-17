import { useEffect, useState } from 'react';
import { IProduct } from "./typings/IProduct"
import Product from "./components/Product"
import React from 'react';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  function addToWishlist(id: string) {
    const product = products.find(product => product.id === id);
    if (product) {
      setWishlist(prevWishlist => {
        if (prevWishlist.some(item => item.id === id)) {
          return prevWishlist.filter(item => item.id !== id);
        } else {
          return [...prevWishlist, product];
        }
      });
    }
  };

  function addToCart(id: string) {
    const product = products.find(product => product.id === id);
    if (product) {
      setCart(prevCart => {
        if (prevCart.some(item => item.id === id)) {
          return prevCart.filter(item => item.id !== id);
        } else {
          return [...prevCart, product];
        }
      });
    }
  };

  return (
    <div className="shelf">
      {products.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          name={item.name}
          listPrice={item.listPrice}
          sellingPrice={item.sellingPrice}
          parcelamento={item.parcelamento}
          image={item.image}
          addToWishlist={addToWishlist}
          addToCart={addToCart}
          wishlist={wishlist}
          cart={cart}
        />
      ))}
    </div>
  )
}

export default App
