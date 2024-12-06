import React from 'react'
import Barechart from './component/BarEchart'

export default function Home() {
  return (
    <div>
      <Barechart title={'三大框架满意度'} />
      <Barechart title={'三大框架使用度'} />
    </div>
  )
}
