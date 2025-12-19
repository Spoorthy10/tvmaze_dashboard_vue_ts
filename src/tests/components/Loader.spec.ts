import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from '../../components/Loader.vue'

describe('Loader.vue', () => {
  it('uses default title and subtitle when not provided', () => {
    const wrapper = mount(Loader, {
      props: {
        show: true
      }
    })

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.text()).toContain(
      'This may take a few seconds, please wait.'
    )
  })

  it('renders loader spinner element', () => {
    const wrapper = mount(Loader, {
      props: {
        show: true
      }
    })

    const spinner = wrapper.find('.loader')
    expect(spinner.exists()).toBe(true)
  })
})
