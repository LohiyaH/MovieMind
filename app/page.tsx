import { getTrendingMovies, getLatestMovies } from "@/lib/tmdb"
import { MovieGrid } from "@/components/movie-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Home() {
  const [trendingMovies, latestMovies] = await Promise.all([
    getTrendingMovies(),
    getLatestMovies(),
  ])

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to MovieMind</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover your next favorite movie with our personalized recommendations
        </p>
      </section>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trending">Trending Movies</TabsTrigger>
          <TabsTrigger value="latest">Latest Releases</TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <MovieGrid movies={trendingMovies.results} />
        </TabsContent>
        <TabsContent value="latest">
          <MovieGrid movies={latestMovies.results} />
        </TabsContent>
      </Tabs>
    </div>
  )
}