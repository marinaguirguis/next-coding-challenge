import styles from './page.module.css';
import ProductList from '../product-list';
import { getProducts } from '@/lib/api/products.server';

export default async function Home() {
  const { products } = await getProducts();

  return (
    <main className={styles.main}>
      <ProductList initialProducts={products} />
    </main>
  );
}
