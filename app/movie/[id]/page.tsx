import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getMovieDetails, getMovieCredits, getSimilarMovies, getTrendingMovies } from "@/lib/tmdb"
import { MovieDetails } from "@/components/movie-details"
import { MovieGrid } from "@/components/movie-grid"
import Loading from "@/app/loading"

interface MoviePageProps {
  params: {
    id: string
  }
}

// Generate static params for all movie pages at build time
export async function generateStaticParams() {
  try {
    // Get trending movies to pre-render their pages
    const { results } = await getTrendingMovies()
    return results.map((movie) => ({
      id: movie.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const [movie, credits, similar] = await Promise.all([
      getMovieDetails(params.id),
      getMovieCredits(params.id),
      getSimilarMovies(params.id),
    ])

    if (!movie) {
      notFound()
    }

    return (
      <div className="space-y-8">
        <MovieDetails movie={movie} cast={credits.cast} />
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
          <Suspense fallback={<Loading />}>
            <MovieGrid movies={similar.results.slice(0, 4)} />
          </Suspense>
        </section>
      </div>
    )
  } catch (error) {
    notFound()
  }
}