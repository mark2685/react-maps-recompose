import { default as React } from 'react'

export default ({ scriptLoaded, googleMapURL:url }) => {
  const scriptjs = require('scriptjs')

  scriptjs(url, scriptLoaded)

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
