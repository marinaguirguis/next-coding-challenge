class ApiConfig {
  get baseUrl(): string {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      'https://v0-api-endpoint-request.vercel.app/api'
    );
  }

  // In dev, requests go through the Next.js rewrite proxy to avoid CORS.
  // In production the API is on the same domain so we hit it directly.
  get clientBaseUrl(): string {
    return process.env.NODE_ENV === 'development' ? '/api-proxy' : this.baseUrl;
  }
}

export const apiConfig = new ApiConfig();
