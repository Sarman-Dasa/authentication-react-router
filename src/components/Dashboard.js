import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const user  = useSelector((state)=>state.app.user);
  const isloggedin = useSelector((state) => state.app.isloggedin);
  const navigate = useNavigate()
  useEffect(() => {
      if(!isloggedin) {
        navigate('/sign-in');
      }
  },[])
  return (
    <div>
      <h1>Welcome ,{user && user.name} </h1>
    </div>
  )
}
