'use client';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <main style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>Something went wrong</h2>
      <p style={{ opacity: 0.6, marginBottom: '1.5rem' }}>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
