import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../pages/Home.vue'

const mockedStore = {
  get_tvShows: vi.fn(() => Promise.resolve([
    { id: 1, name: 'Breaking Bad', genre: 'Drama' },
    { id: 2, name: 'Friends', genre: 'Comedy' },
  ])),
  get_tvShow_onSearch: vi.fn(() => Promise.resolve([])),
  searched_tvshow: [],
  showsByGenre: {
    Drama: [{ id: 1, name: 'Breaking Bad', genre: 'Drama' }],
    Comedy: [{ id: 2, name: 'Friends', genre: 'Comedy' }],
  },
}

vi.mock('../../stores/tvmaze', () => ({
  useTvMazeStore: () => mockedStore,
}))

describe('Home.vue', () => {
  let router: any

  beforeEach(() => {
    // Pinia setup
    setActivePinia(createPinia())

    // Router setup
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/show/:id', component: { template: '<div>Show Page</div>' } },
      ],
    })
  })

  const factory = async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        stubs: ['ShowCards', 'Loader']
      }
    })
    await flushPromises() // resolves all async store calls
    return wrapper
  }

  it('calls get_tvShows on mount', async () => {
    await factory()
    expect(mockedStore.get_tvShows).toHaveBeenCalled()
  })

  it('shows Loader while loading', async () => {
    const wrapper = await factory()
    wrapper.vm.isloading = true
    await flushPromises()
    expect(wrapper.findComponent({ name: 'Loader' }).exists()).toBe(true)
  })

  it('renders shows grouped by genre', async () => {
    const wrapper = await factory()
    const genreTitles = wrapper.findAll('h2')
    expect(genreTitles.map(g => g.text())).toContain('Drama')
    expect(genreTitles.map(g => g.text())).toContain('Comedy')
  })

  it('searches shows when search button clicked', async () => {
    const wrapper = await factory()
    const input = wrapper.find('input')
    await input.setValue('Friends')
    const searchButton = wrapper.findAll('button').at(0)
    await searchButton?.trigger('click')
    expect(mockedStore.get_tvShow_onSearch).toHaveBeenCalledWith('q=Friends')
  })

  it('navigates to show page when goToShow is called', async () => {
    const wrapper = await factory()
    await router.push('/') 
    await router.isReady()
    wrapper.vm.goToShow(1)
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/show/1')
  })
})
