import React from 'react'
import { Row, Col, Button, Drawer, Space } from 'antd'
import { FiMenu } from 'react-icons/fi'
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr'
import Sidebar from './Sidebar'
import take from 'lodash/take'
import takeRight from 'lodash/takeRight'

const MobileFooter = ({
  isMobile,
  isMobileMenuVisible,
  setIsMobileMenuVisible,
  sidebarProps,
  form,
  isSaveFeatureEnabled,
  loadingInitial,
  submitButtonSetting
}) => {
  const { sidebar, activeGroup, setActiveGroup, showGroup } = sidebarProps
  const firstGroup = take(showGroup)
  const lastGroup = takeRight(showGroup)

  return (
    <Col span={24} className='arf-mobile-footer-container'>
      <Row justify='space-between' align='middle'>
        {sidebar && (
          <Col span={10} align='start'>
            <Space size={5}>
              <Button
                type='link'
                icon={<FiMenu className='arf-icon' />}
                onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
              />
              {sidebar && (
                <div style={{ marginRight: 5 }}>
                  <Button
                    className='arf-btn-previous'
                    type='link'
                    disabled={firstGroup?.includes(activeGroup)}
                    onClick={() => {
                      const prevIndex = showGroup.indexOf(activeGroup)
                      setActiveGroup(showGroup[prevIndex - 1])
                    }}
                    icon={<GrLinkPrevious style={{ marginTop: 4 }} />}
                    shape='circle'
                    size='small'
                  />
                  <Button
                    className='arf-btn-next'
                    type='link'
                    disabled={lastGroup?.includes(activeGroup)}
                    onClick={() => {
                      setIsMobileMenuVisible(false)
                      const nextIndex = showGroup.indexOf(activeGroup)
                      setActiveGroup(showGroup[nextIndex + 1])
                    }}
                    icon={<GrLinkNext style={{ marginTop: 4 }} />}
                    shape='circle'
                    size='small'
                  />
                </div>
              )}
              <div>
                {activeGroup + 1} / {showGroup.length}
              </div>
            </Space>
          </Col>
        )}
        <Col span={sidebar ? 14 : 24} align='end'>
          <Space style={{ float: 'right' }}>
            {/* {isSaveFeatureEnabled && (
              <Button className='arf-btn-next'>Save</Button>
            )} */}
            {loadingInitial ? (
              <Button type='secondary' loading disabled>
                Loading Initial Data
              </Button>
            ) : (
              <Button
                type='primary'
                htmlType='submit'
                onClick={() => form.submit()}
                {...submitButtonSetting}
              >
                Submit
              </Button>
            )}
          </Space>
        </Col>
      </Row>
      {/* Drawer menu */}
      <Drawer
        title={null}
        placement='bottom'
        closable={false}
        onClose={() => setIsMobileMenuVisible(false)}
        visible={isMobileMenuVisible}
        className='arf-sidebar arf-mobile'
        height='100%'
        width='100%'
        zIndex='1001'
        bodyStyle={{ padding: 0 }}
      >
        <Sidebar
          {...sidebarProps}
          isMobile={isMobile}
          setIsMobileMenuVisible={setIsMobileMenuVisible}
        />
      </Drawer>
    </Col>
  )
}

export default MobileFooter
