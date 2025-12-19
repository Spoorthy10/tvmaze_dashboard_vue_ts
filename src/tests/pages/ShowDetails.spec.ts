import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ShowDetails from '../../pages/ShowDetails.vue'
import { useTvMazeStore } from '../../stores/tvmaze'
import { createRouter, createWebHistory } from 'vue-router'

// mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/show/:id',
      component: ShowDetails,
    },
  ],
})

const mockShow = {
  name: 'Breaking Bad',
  language: 'English',
  status: 'Ended',
  genres: ['Drama'],
  summary: '<p>Best TV show ever</p>',
  rating: { average: 9.5 },
  image: {
    original: 'https://image.test/bb.jpg',
  },
}

describe('ShowDetails.vue', () => {
  let store: ReturnType<typeof useTvMazeStore>

  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useTvMazeStore()

    // mock action
    store.get_tvShows = vi.fn(async () => {
      store.showbyID = mockShow
    })

    // push route with id
    router.push('/show/123')
    await router.isReady()
  })

  const factory = async () => {
    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
        stubs: {
          Loader: true,
        },
      },
    })

    await flushPromises()
    return wrapper
  }

  it('calls API on mount with route id', async () => {
    await factory()
    expect(store.get_tvShows).toHaveBeenCalledWith('123')
  })

  it('shows Loader while loading', async () => {
    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
        stubs: {
          Loader: true,
        },
      },
    })

    expect(wrapper.findComponent({ name: 'Loader' }).exists()).toBe(true)
  })

  it('renders show details after loading', async () => {
    const wrapper = await factory()

    expect(wrapper.text()).toContain('Breaking Bad')
    expect(wrapper.text()).toContain('English')
    expect(wrapper.text()).toContain('Ended')
  })

  it('renders show image when available', async () => {
    const wrapper = await factory()

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(mockShow.image.original)
    expect(img.attributes('alt')).toBe(mockShow.name)
  })

  it('renders summary using v-html', async () => {
    const wrapper = await factory()
    expect(wrapper.html()).toContain('<p>Best TV show ever</p>')
  })

  it('navigates back when Back button is clicked', async () => {
    const backSpy = vi.spyOn(router, 'back')
    const wrapper = await factory()

    await wrapper.find('button').trigger('click')
    expect(backSpy).toHaveBeenCalled()
  })
})
