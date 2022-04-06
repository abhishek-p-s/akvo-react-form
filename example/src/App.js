import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Button } from 'antd'
import { Webform } from 'akvo-react-form'
import * as forms from './example.json'
import * as cascade from './example-cascade.json'
import * as tree_option from './example-tree-select.json'
// import CustomComponents from './CustomComponents'
import 'akvo-react-form/dist/index.css'

const formData = {
  ...forms.default,
  cascade: { administration: cascade.default },
  tree: { administration: tree_option.default }
}

const App = () => {
  const [source, setSource] = useState(formData)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [extraButton, setExtraButton] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [showJson, setShowJson] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sticky, setSticky] = useState(false)

  const onChange = (value) => {
    console.log(value)
  }

  const onFinish = (values) => {
    const data = Object.keys(values).map((v) => {
      if (values[v]) {
        return { question: parseInt(v), value: values[v] }
      }
      return false
    })
    console.log(data.filter((x) => x))
  }

  const onJsonEdit = ({ updated_src }) => {
    setSource(updated_src)
  }

  const onJsonAdd = (value) => {
    console.log(value)
  }

  const onCompleteFailed = (values, errorFields) => {
    console.log(values, errorFields)
  }

  return (
    <div className='display-container'>
      <div className={showJson ? 'half-width' : 'half-width full'}>
        <div className='btn-group-toggle'>
          <img
            alt='github'
            src='https://img.shields.io/badge/Github-Akvo React Form-009688?logo=github&style=flat-square'
          />
          <img
            alt='npm'
            src='https://img.shields.io/npm/v/akvo-react-form?style=flat-square'
          />
          <button onClick={() => setShowJson(!showJson)}>
            {showJson ? '☑ JSON' : '☒ JSON'}
          </button>
          <button onClick={() => setSticky(!sticky)}>
            {sticky ? '☑ Sticky (px)' : '☒ Sticky (px)'}
          </button>
          <button onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? '☑ Sidebar' : '☒ Sidebar'}
          </button>
          <button onClick={() => setSubmitDisabled(!submitDisabled)}>
            {submitDisabled ? '☑ Submit Disabled' : '☒ Submit Disabled'}
          </button>
          <button onClick={() => setSubmitLoading(!submitLoading)}>
            {submitLoading ? '☑ Submit Loading' : '☒ Submit Loading'}
          </button>
          <button onClick={() => setExtraButton(!extraButton)}>
            {extraButton ? '☑ Extra Button' : '☒ Extra Button'}
          </button>
        </div>
        <Webform
          forms={source}
          onChange={onChange}
          onFinish={onFinish}
          onCompleteFailed={onCompleteFailed}
          style={{ fontSize: '30px' }}
          sidebar={showSidebar}
          sticky={sticky}
          submitButtonSetting={{
            loading: submitLoading,
            disabled: submitDisabled
          }}
          extraButton={
            extraButton ? <Button type='primary'>Extra Button</Button> : ''
          }
          // customComponent={CustomComponents}
        />
      </div>
      <div className={'half-width json-source' + (!showJson ? ' shrink' : '')}>
        <ReactJson
          src={formData}
          theme='monokai'
          displayDataTypes={false}
          onEdit={onJsonEdit}
          onAdd={onJsonAdd}
          indentWidth={2}
        />
      </div>
    </div>
  )
}
export default App
