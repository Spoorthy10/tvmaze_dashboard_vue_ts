import { defineStore } from 'pinia'
import axios from 'axios'

export interface Rating {
  average: number | null
}

export interface TvShow {
  id: number
  name: string
  genres: string[]
  rating: Rating
  image?: {
    medium?: string
    original?: string
  }
  summary?: string
}

export interface SearchResult {
  score: number
  show: TvShow
}

export type ShowsByGenre = Record<string, TvShow[]>

export const useTvMazeStore = defineStore('tvmazestore', {
  state: () => ({
    allShows: [] as TvShow[],
    showsByGenre: {} as ShowsByGenre,
    allGenres: [] as string[],
    showbyID: {} as TvShow | Record<string, never>,
    searched_tvshow: [] as SearchResult[],
    error: '' as string
  }),

  actions: {
    // get all tv shows OR single show by ID
    async get_tvShows(id: number = 0) {
      try {
        if (id === 0) {
          const response = await axios.get<TvShow[]>('https://api.tvmaze.com/shows')
          this.allShows = response.data

          // group shows by genre
          const genreMap:any = this.allShows.reduce<ShowsByGenre>((acc, show) => {
            show.genres.forEach((genre) => {
              if (!acc[genre]) {
                acc[genre] = []
              }
              acc[genre].push(show)
            })
            return acc
          }, {})

          // sort by rating
          Object.keys(genreMap).forEach((genre) => {
            genreMap[genre].sort(
              (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)
            )
          })

          this.showsByGenre = genreMap
          this.allGenres = Object.keys(genreMap)
        } else {
          const response = await axios.get<TvShow>(`https://api.tvmaze.com/shows/${id}`)
          this.showbyID = response.data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Something went wrong'
        console.error(err)
      }
    },

    // search tv shows
    async get_tvShow_onSearch(filters: string = '') {
      try {
        const response = await axios.get<SearchResult[]>(
          `https://api.tvmaze.com/search/shows?${filters}`
        )
        this.searched_tvshow = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Something went wrong'
        console.error(err)
      }
    }
  }
})
