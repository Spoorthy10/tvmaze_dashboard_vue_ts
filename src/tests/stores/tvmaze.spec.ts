import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useTvMazeStore } from '../../stores/tvmaze'

vi.mock('axios')
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

const mockShows = [
  {
    id: 1,
    name: 'Show A',
    genres: ['Drama', 'Action'],
    rating: { average: 8.5 }
  },
  {
    id: 2,
    name: 'Show B',
    genres: ['Drama'],
    rating: { average: 9.2 }
  },
  {
    id: 3,
    name: 'Show C',
    genres: ['Action'],
    rating: { average: 7.1 }
  }
]

const mockSearchResponse = [
  {
    score: 1,
    show: { id: 1, name: 'Breaking Bad' }
  }
]

// Test: Fetch All Shows & Genre Grouping
describe('TvMaze Store - get_tvShows (all shows)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockedAxios.get.mockReset()
  })

  it('fetches shows and groups by genre', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockShows })

    const store = useTvMazeStore()
    await store.get_tvShows()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows')
    expect(store.allShows.length).toBe(3)

    // Genre grouping
    expect(store.allGenres).toContain('Drama')
    expect(store.allGenres).toContain('Action')

    expect(store.showsByGenre.Drama.length).toBe(2)
    expect(store.showsByGenre.Action.length).toBe(2)
  })
})

// Test: Sorting by Rating
describe('TvMaze Store - sorting', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockedAxios.get.mockReset()
  })

  it('sorts shows by rating in descending order', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockShows })

    const store = useTvMazeStore()
    await store.get_tvShows()

    const dramaShows = store.showsByGenre.Drama

    expect(dramaShows[0].rating.average).toBe(9.2)
    expect(dramaShows[1].rating.average).toBe(8.5)
  })
})

// Test: Fetch Show by ID
describe('TvMaze Store - get_tvShows (by ID)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockedAxios.get.mockReset()
  })

  it('fetches show by id', async () => {
    const mockShow = { id: 10, name: 'Single Show' }

    mockedAxios.get.mockResolvedValue({ data: mockShow })

    const store = useTvMazeStore()
    await store.get_tvShows(10)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.tvmaze.com/shows/10'
    )

    expect(store.showbyID.name).toBe('Single Show')
  })
})

// Test: Search API
describe('TvMaze Store - Search API', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockedAxios.get.mockReset()
  })

  it('fetches search results', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockSearchResponse })

    const store = useTvMazeStore()
    await store.get_tvShow_onSearch('q=breaking')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.tvmaze.com/search/shows?q=breaking'
    )

    expect(store.searched_tvshow.length).toBe(1)
    expect(store.searched_tvshow[0].show.name).toBe('Breaking Bad')
  })
})
