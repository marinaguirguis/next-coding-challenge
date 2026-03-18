'use client';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCart } from '../../cart-context';
import { formatPrice } from '@/lib/locale-utils';
import styles from './checkout.module.css';

export default function Checkout() {
  const locale = useLocale();
  const { cartItems, totalItemsCount } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to shopping</Link>
        <h1 className={styles.heading}>Order Summary</h1>
      </header>

      <main className={styles.main}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Your basket is empty.</p>
            <Link href="/" className={styles.browseBtn}>Browse products →</Link>
          </div>
        ) : (
          <div className={styles.summaryCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thItem}>Item</th>
                  <th className={styles.thNum}>Qty</th>
                  <th className={styles.thNum}>Unit price</th>
                  <th className={styles.thNum}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.name} className={styles.row}>
                    <td className={styles.tdItem}>{item.name}</td>
                    <td className={styles.tdNum}>{item.quantity}</td>
                    <td className={styles.tdNum}>
                      {item.price != null ? formatPrice(item.price, locale) : '—'}
                    </td>
                    <td className={styles.tdNum}>
                      {item.price != null ? formatPrice(item.price * item.quantity, locale) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Total items</span>
                <span className={styles.totalValue}>{totalItemsCount}</span>
              </div>
              {totalPrice > 0 && (
                <div className={`${styles.totalRow} ${styles.totalPriceRow}`}>
                  <span>Total price</span>
                  <span className={styles.totalValue}>{formatPrice(totalPrice, locale)}</span>
                </div>
              )}
            </div>

            <button className={styles.placeOrderBtn}>Place order</button>
          </div>
        )}
      </main>
    </div>
  );
}
