'use client';

import ProductGrid from './product-grid';
import { useMoreProducts } from '@/lib/api/products.client';
import { Product } from '../lib/api/types';

interface Props {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: Props) {
  const { products: moreProducts, isLoading, error } = useMoreProducts();

  return (
    <>
      <ProductGrid
        products={[
          ...initialProducts,
          ...moreProducts.filter(
            (p) => !initialProducts.some((ip) => ip.id === p.id)
          ),
        ]}
      />
      <p style={{ textAlign: 'center', padding: '1rem', opacity: error ? 1 : isLoading ? 0.6 : 0, color: error ? 'red' : 'inherit', visibility: isLoading || error ? 'visible' : 'hidden' }}>
        {error ? 'Could not load additional products.' : 'Loading more products…'}
      </p>
    </>
  );
}
