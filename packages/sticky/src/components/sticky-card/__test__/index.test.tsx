import { fireEvent, render, screen } from '@testing-library/react'
import StickyCard from '../sticky-card'
import { StickyCardItem } from '..'
import CardStickyItem from '../card-item'
// import cy from 'cypress'
// import '@testing-library/cypress/add-commands'

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 3000)
  })
}
// https://github.com/testing-library/react-testing-library/issues/671
// https://testing-library.com/docs/cypress-testing-library/intro/
// https://github.com/thenewboston-blockchain/Website/pull/1409/files/d0675533121eb386eecf15e34562a19128a047bf#diff-11c1a5590136936f91b8e8f51f0ad5ddef82af5337417d1f94f2fd6d24544237
describe('StickyCard', () => {
  // beforeAll(() => {
  //   window.scrollTo(0, 0)
  // })

  const renderStickyCard = (props: any) => {
    return render(
      <div style={{height: '2000px'}} id='element'>
        <StickyCard offset={0}>
          {
            [1, 2, 3, 4].map((_item) => {
              return (
                <StickyCardItem key={_item} title={`卡片${_item}`}>
                  {
                    Array.from({ length: _item }).map((item, index) => {
                      return (
                        <div style={{height: 32}} key={index}>
                          卡片内容-{index}
                        </div>
                      )
                    })
                  }
                </StickyCardItem>
              )
            })
          }
        </StickyCard>
      </div>
    )
  }

  it('sticky card', () => {
    const { container } = renderStickyCard({})
    expect(container).toMatchSnapshot()
  })

  it('sticky card scroll and Change active', async () => {
    const { container } = renderStickyCard({})
    let header = container.querySelectorAll('.card-item-header')
    expect(header).toHaveLength(4)

    fireEvent.scroll(window, { target: { scrollY: 300 } })
    let active = container.querySelector('.card-item-header-active')
    await wait()
    expect(active).toHaveLength(1)
    /** scroll 有问题 */
    console.log(active)
    // expect(header[0].classList.contains('active')).toBeTruthy()
  })

  it('only Card item', () => {
    const { container } = render(
      <CardStickyItem title='普通卡片'>
        <div>
          卡片内容
        </div>
      </CardStickyItem>
    )

    expect(screen.getByText('普通卡片')).toBeInTheDocument()
    expect(screen.getByText('卡片内容')).toBeInTheDocument()
    let active = container.querySelector('.card-item-header-active')
  })
})