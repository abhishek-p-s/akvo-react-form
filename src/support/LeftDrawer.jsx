import React, { useState } from 'react'
import { Drawer } from 'antd'
import GlobalStore from '../lib/store'

const DrawerToggle = () => {
  const isLeftDrawerVisible = GlobalStore.useState((s) => s.isLeftDrawerVisible)

  return (
    <div
      className={`arf-submissions-drawer-toggle${
        isLeftDrawerVisible ? '-close' : ''
      }`}
      onClick={() =>
        GlobalStore.update((s) => {
          s.isLeftDrawerVisible = !isLeftDrawerVisible
        })
      }
    ></div>
  )
}

const LeftDrawer = ({ title, content }) => {
  const isLeftDrawerVisible = GlobalStore.useState((s) => s.isLeftDrawerVisible)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // check screen size or mobile browser
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth)
  })

  return (
    <div>
      <DrawerToggle />
      <Drawer
        className='arf-submissions-drawer-container'
        title={title || 'Submissions'}
        placement='left'
        width={windowWidth > 700 ? '450' : '75%'}
        visible={isLeftDrawerVisible}
        zIndex='1002'
        onClose={() =>
          GlobalStore.update((s) => {
            s.isLeftDrawerVisible = false
          })
        }
        destroyOnClose
      >
        <DrawerToggle />
        {content}
      </Drawer>
    </div>
  )
}

export default LeftDrawer