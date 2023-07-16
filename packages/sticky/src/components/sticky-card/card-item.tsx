import React, { useCallback } from 'react'
import './card_item.less'
import classNames from 'classnames'
interface CardStickyItemProps {
  /** 卡片头部 */
  title: React.ReactNode
  /** extra */
  extra?: React.ReactNode
  /** 当前父容器是否滚动到当前卡片， header 需要吸顶  */
  isActive?: boolean
  /** 容器的高宽，位置， getBoundingClientRect 获取 */
  containerClientRect?: DOMRect | null
  
  children: React.ReactNode
  /**
   * 渲染footer
   */
  renderFooter?: () => React.ReactNode
  /** 删除 */
  onDelete?: () => void
}

const CardStickyItem = (props: CardStickyItemProps) => {
  const {
    isActive,
    containerClientRect,
    children,
    title,
    extra,
    renderFooter,
  } = props

  const renderHeader = useCallback(
    (isActive: boolean) => {
      if (!containerClientRect && isActive) {
        return null
      }

      const style = isActive
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            border: '1px solid #ebebeb',
            /** 删除操作栏宽度 = 50，滚动条宽度 = 7 */
            width: `calc(${containerClientRect?.width}px - 50px - 9px)`,
            transform: `translate(${containerClientRect?.left}px, ${64}px)`,
          }
        : {}

      return (
        <div
          style={style as React.CSSProperties}
          className={classNames('card-item-header', {
            'card-item-header-active': isActive,
          })}
        >
          <div>
            {title}
          </div>
          {extra}
        </div>
      )
    },
    [containerClientRect, title, extra],
  )

  return (
    <div className='card-sticky-item-container-with-actions'>
      <div className={classNames('card-sticky-item-container')}>
        {/* 占位 */}
        {(isActive && renderHeader(isActive)) || null}
        {renderHeader(false)}
        <div className='card-item-content'>
          <div>{children}</div>
        </div>
        <div
          className={classNames('card-item-footer', {
            'empty-footer': !renderFooter,
          })}
        >
          {renderFooter?.()}
        </div>
      </div>
      {/* {canRemove && (
        <div className='actions' onClick={() => onDelete?.()}>
          删除
        </div>
      )} */}
    </div>
  )
}

CardStickyItem.displayName = 'CardStickyItem'

export default CardStickyItem
