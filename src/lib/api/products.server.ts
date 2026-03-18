import { Product } from '@/lib/api/typs';
import { apiConfig } from '@/lib/api/config';

const BASE_URL = apiConfig.baseUrl;

export async function getProducts(): Promise<{ products: Product[] }> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json() as Promise<{ products: Product[] }>;
}
