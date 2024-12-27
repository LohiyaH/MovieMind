import Image from "next/image"
import { MovieDetails as MovieDetailsType, Cast } from "@/types/tmdb"
import { Clock, Calendar, Star, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface MovieDetailsProps {
  movie: MovieDetailsType
  cast: Cast[]
}

export function MovieDetails({ movie, cast }: MovieDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-muted-foreground">{movie.overview}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{movie.runtime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>{movie.vote_average.toFixed(1)}/10</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{movie.vote_count.toLocaleString()} votes</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Cast</h2>
          <ScrollArea className="h-[120px]">
            <div className="flex flex-wrap gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="flex items-center gap-2">
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                      alt={actor.name}
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-[45px] h-[45px] rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl">{actor.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{actor.name}</p>
                    <p className="text-sm text-muted-foreground">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}