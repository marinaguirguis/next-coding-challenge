class ApiConfig {
  get baseUrl(): string {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      'https://v0-api-endpoint-request.vercel.app/api'
    );
  }

  // Client-side requests always go through the Next.js rewrite proxy to avoid CORS.
  get clientBaseUrl(): string {
    return '/api-proxy';
  }
}

export const apiConfig = new ApiConfig();
