import { useEvent } from '../../hooks/useEvent'
import lodash, { throttle } from 'lodash'
import React, { useEffect, useRef } from 'react'

export type ElementNodeType = React.ReactNode & {
  index: string | number
  title: string
}

interface StickyCardProps {
  children: React.ReactNode
  /** 指定offset */
  offset?: number
}

type PosInfoType = {
  _originElement: HTMLDivElement
  offsetTop: number
  offsetHeight: number
}
/** 头部导航栏高度 */
const NAV_HEIGHT = 64

const StickyCard = (props: StickyCardProps) => {
  const { children, offset = 0 } = props
  const ref = useRef<null | HTMLDivElement>(null)
  /** 记录每个children 的起始距离与高度， */
  const [posInfo, setPosInfo] = React.useState<PosInfoType[]>([])
  /** 滚动距离，激活的index */
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)
  /**
   * 容器元素位置，高宽等信息
   */
  const [containerClientRect, setContainerClientRect] =
    React.useState<DOMRect | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }
    const domRect = element.getBoundingClientRect()
    setContainerClientRect(domRect)
  }, [])

  /**
   * 拿到ref 下children 的offsetTop, offsetHeight
   * 滚动时判断当前滚动距离，判断哪一个节点应该被激活，激活的节点进行吸顶
   */
  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }
    if (containerClientRect === null) {
      return
    }
    // const domRect = element.getBoundingClientRect()
    let offsetTop = containerClientRect!.top - NAV_HEIGHT
    const childrenData = lodash.map(element.children, (item) => item)
    const res = (childrenData as unknown as HTMLDivElement[])?.map((_item) => {
      const result = {
        _originElement: _item,
        offsetTop: offsetTop,
        offsetHeight: _item.offsetHeight,
      }
      offsetTop += _item.offsetHeight + 16
      return result
    })
    setPosInfo(res)
  }, [children, containerClientRect])

  const handleScroll = useEvent(
    throttle((e) => {
      const scrollTop = e.srcElement
        ? e.srcElement.documentElement.scrollTop || e.srcElement.body.scrollTop
        : document.documentElement.scrollTop

      const finalOffsetTop = scrollTop

      const index = lodash.findIndex(posInfo, (item) => {
        return (
          finalOffsetTop >= item.offsetTop &&
          finalOffsetTop <= item.offsetTop + item.offsetHeight
        )
      })

      const topOver =
        (containerClientRect?.top
          ? containerClientRect?.top - NAV_HEIGHT
          : 0) || 0
      // /** 到顶了 */
      if (scrollTop <= topOver) {
        setActiveIndex(-1)
        return
      }

      if (index > -1) {
        setActiveIndex(index)
      }
    }, 16.7),
  )

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll)
    return () => {
      window?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child as any, {
          isActive: index === activeIndex,
          index: index,
          containerClientRect,
        })
      })}
    </div>
  )
}

export default StickyCard
