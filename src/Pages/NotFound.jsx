import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1>404</h1>
        <p>The page you are looking for does not exist. <Link to='/'>Go back to home page</Link> </p>

    </div>
  )
}

export default NotFound