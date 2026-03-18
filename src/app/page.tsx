'use client';
import { useMemo, useState } from 'react';
import styles from './page.module.css'

function BasketItem({ count, name }: { count: number, name: string }) {
  return <div data-testid={`item-count-${name}`}>{name} count: {count}</div>
};

const products = [
  { name: 'Item 1', description: 'Foo' },
  { name: 'Item 2', description: 'Bar' },
  { name: 'Item 3', description: 'Baz' },
  { name: 'Item 4', description: 'Qux' },
];
export default function Home() {
  const [cartItems, setCartItems] = useState<{ name: string, quantity: number }[]>([]);
  const totalItemsCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const addToCart = (product: string) => {
    const alreadyInCart = cartItems.find(item => item.name === product);
    if (alreadyInCart) {
      // @TODO need to find out how to update cart items
      setCartItems(prevItems => prevItems.map(item => item.name === product ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems(prevItems => [...prevItems, { name: product, quantity: 1 }]);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p className={styles.title}>
          Michael&apos;s Amazing Web Store
        </p>
        <div className={styles.cartSummary}>
          <button className={styles.basket}>Basket: {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</button>
          {cartItems.map(item => <BasketItem key={item.name} name={item.name} count={item.quantity} />)}
        </div>
      </div>

      <div className={styles.grid}>
        {products.map(product => <button key={product.name} className={styles.card} onClick={() => addToCart(product.name)} aria-label="Add to basket"><h2>{product.name} <span>-&gt;</span></h2><p>{product.description}</p></button>)}
      </div>
    </main>
  )
}
