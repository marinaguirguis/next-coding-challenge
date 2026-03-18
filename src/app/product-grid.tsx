'use client';
import styles from './[locale]/page.module.css';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCart } from './cart-context';
import { Product } from '../lib/api/types';
import { getProductName, getProductPrice, formatPrice } from '@/lib/locale-utils';

function BasketItem({ count, name }: { count: number, name: string }) {
  return <div data-testid={`item-count-${name}`}>{name} count: {count}</div>
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const locale = useLocale();
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
        {products.map(product => {
          const name = getProductName(product, locale);
          const price = getProductPrice(product, locale);
          return (
            <button key={name} className={styles.card} onClick={() => addToCart(name, price)} aria-label="Add to basket">
              <h2>{name} <span>-&gt;</span></h2>
              <p>{formatPrice(price, locale)}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}
