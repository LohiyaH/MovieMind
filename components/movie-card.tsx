"use client"

import { Movie } from "@/types/tmdb"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(movie.id))
  }, [movie.id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    let newFavorites
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: number) => id !== movie.id)
    } else {
      newFavorites = [...favorites, movie.id]
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="overflow-hidden group">
      <Link href={`/movie/${movie.id}`}>
        <CardHeader className="p-0">
          <AspectRatio ratio={2/3}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold leading-tight">{movie.title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className="text-muted-foreground hover:text-primary"
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite && "fill-current text-red-500 hover:text-red-600"
              )}
            />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}