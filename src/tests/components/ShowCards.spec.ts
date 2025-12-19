import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCards from '../../components/ShowCards.vue'

const mockShow = {
  name: 'Breaking Bad',
  image: {
    medium: 'https://example.com/breakingbad.jpg'
  },
  rating: {
    average: 9.5
  }
}

describe('ShowCards.vue', () => {
  it('renders show name', () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    expect(wrapper.text()).toContain('Breaking Bad')
  })

  it('renders show image with correct src and alt', () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    const img = wrapper.find('img')

    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(mockShow.image.medium)
    expect(img.attributes('alt')).toBe(mockShow.name)
  })

  it('renders rating when available', () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    expect(wrapper.text()).toContain('9.5')
  })

  it('renders "No Rating" when rating is missing', () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: {
          ...mockShow,
          rating: null
        }
      }
    })

    expect(wrapper.text()).toContain('No Rating')
  })

  it('emits click event on keyboard enter', async () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    await wrapper.trigger('keydown.enter')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('emits click event on keyboard space', async () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    await wrapper.trigger('keydown.space')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('has button role and tabindex for accessibility', () => {
    const wrapper = mount(ShowCards, {
      props: {
        show: mockShow
      }
    })

    const root = wrapper.find('[role="button"]')

    expect(root.exists()).toBe(true)
    expect(root.attributes('tabindex')).toBe('0')
  })
})
