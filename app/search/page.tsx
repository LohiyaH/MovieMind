import { Suspense } from "react"
import { searchMovies } from "@/lib/tmdb"
import { MovieGrid } from "@/components/movie-grid"
import Loading from "@/app/loading"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please enter a search term</p>
      </div>
    )
  }

  const results = await searchMovies(query)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground mt-2">
          Found {results.total_results} results for &quot;{query}&quot;
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        {results.results.length > 0 ? (
          <MovieGrid movies={results.results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No movies found</p>
          </div>
        )}
      </Suspense>
    </div>
  )
}