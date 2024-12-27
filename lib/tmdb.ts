const TMDB_API_KEY = ''; // put your api key here from the below website by making an account and going into settings
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  try {
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      ...params,
    });

    const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid TMDB API key');
      }
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
}

export async function getTrendingMovies() {
  return fetchTMDB<MovieResponse>('/trending/movie/week');
}

export async function getLatestMovies() {
  return fetchTMDB<MovieResponse>('/movie/now_playing');
}

export async function searchMovies(query: string) {
  return fetchTMDB<MovieResponse>('/search/movie', { query });
}

export async function getMovieDetails(id: string) {
  return fetchTMDB<MovieDetails>(`/movie/${id}`);
}

export async function getMovieCredits(id: string) {
  return fetchTMDB<{ cast: Cast[] }>(`/movie/${id}/credits`);
}

export async function getMovieReviews(id: string) {
  return fetchTMDB<{ results: Review[] }>(`/movie/${id}/reviews`);
}

export async function getSimilarMovies(id: string) {
  return fetchTMDB<MovieResponse>(`/movie/${id}/similar`);
}

export async function getGenres() {
  return fetchTMDB<{ genres: Genre[] }>('/genre/movie/list');
}