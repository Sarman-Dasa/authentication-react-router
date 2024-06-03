import React from 'react'
import { useSelector } from 'react-redux';
export default function Dashboard() {
  const use  = useSelector((state)=>state.app.user);
  return (
    <div>
      <h1>Welcome ,{use.name} </h1>
    </div>
  )
}
