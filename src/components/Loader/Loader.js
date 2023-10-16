import React from 'react'
import "./style.css"
import { Space, Spin } from 'antd'

const Loader = () => {
  return (
    <div className='loader-container'>
      <Space>
        <Spin size='large' className='spin'/>
      </Space>
    </div>
  )
}

export default Loader
