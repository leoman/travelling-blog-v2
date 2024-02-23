import React, { useState, useEffect, forwardRef } from 'react'
import throttle from 'lodash.throttle'
import { Wrapper, Icon  } from './index.styled'

interface Props {
  $light?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ScrollTop = forwardRef(({ $light = false }: Props, ref: any)=> {

  const [shown, setShown] = useState<boolean>(false)
  const [component, setComponent] = useState(window)

  useEffect(() => {
    setComponent(ref && ref.current ? ref.current : window)
  }, [])

  const handleScroll = () => {
    const documentTop = document.body.getBoundingClientRect()
    component.scroll(0, documentTop.top)
  }

  const getWindowOffset = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
        ).scrollTop
  }

  const getComponentOffset = (component: HTMLElement) => component.scrollTop

  const checkScroll = () => {
    try {
      const threshold = 200
      const scrollTop = ref && ref.current ? getComponentOffset(ref.current) : getWindowOffset();

      if (scrollTop > threshold && !shown) {
        setShown(true)
      }

      if (scrollTop <= threshold && shown) {
        setShown(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const throttledCheckScroll = throttle(checkScroll, 50)

  useEffect(() => {
    component.addEventListener('scroll', throttledCheckScroll)
    return function cleanup() {
      component.removeEventListener('scroll', throttledCheckScroll)
    }
  }, [component])
  
  if (!shown) return null;

  return (
    <Wrapper $light={$light} onClick={() => handleScroll()}>
      <Icon $light={$light} />
    </Wrapper>
  )
})

ScrollTop.displayName = "ScrollTop";

export default ScrollTop