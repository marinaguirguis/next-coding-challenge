'use client';
import styles from './page.module.css'
import Link from 'next/link';
import { useCart } from './cart-context';
import { Product } from '../lib/api/typs';

function BasketItem({ count, name }: { count: number, name: string }) {
  return <div data-testid={`item-count-${name}`}>{name} count: {count}</div>
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const { cartItems, totalItemsCount, addToCart } = useCart();

  return (
    <>
      <div className={styles.description}>
        <p className={styles.title}>
          Michael&apos;s Amazing Web Store
        </p>
        <div className={styles.cartSummary}>
          <button className={styles.basket}>Basket: {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</button>
          {cartItems.map(item => <BasketItem key={item.name} name={item.name} count={item.quantity} />)}
          {totalItemsCount > 0 && (
            <Link href="/checkout" className={styles.checkoutLink}>Checkout →</Link>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {products.map(product => (
          <button key={product.name?.uk} className={styles.card} onClick={() => addToCart(product.name?.uk, product.price?.gbp ?? 0)} aria-label="Add to basket">
            <h2>{product.name?.uk} <span>-&gt;</span></h2>
            <p>£{product.price?.gbp}</p>
          </button>
        ))}
      </div>
      </>
  )
}
