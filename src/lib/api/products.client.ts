import useSWR from 'swr';
import { Product } from '@/lib/api/typs';
import { apiConfig } from '@/lib/api/config';

const BASE_URL = apiConfig.clientBaseUrl;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
    return res.json();
  });

export function useMoreProducts() {
  const { data, error, isLoading } = useSWR<{ products: Product[] }>(
    `${BASE_URL}/more-products`,
    fetcher
  );

  return {
    products: data?.products ?? [],
    isLoading,
    error,
  };
}
