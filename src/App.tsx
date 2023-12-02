import { useState } from 'react'
import UpdateElectron from '@/components/update'
import { helloWorld } from '@/native/node-api'

function App() {
  return (
   <div onClick={helloWorld} className='text-2xl text-red'>hello world</div>
  )
}

export default App
