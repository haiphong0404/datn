import React from 'react'


const NotFoundPage = () => {
  return (
    <div className="container mt-10 mb-10">
  <section className="error-wrapper align-center">
    <i className="icon-404" />
    <h1>404</h1>
    <h2>page not found</h2>
    <p className="page-404">Something went wrong or that page doesn’t exist yet. 
        <a href="/" >Return Home</a></p>
  </section>
</div>

  )
}

export default NotFoundPage