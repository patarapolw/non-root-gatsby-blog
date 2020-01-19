import React, { useState } from 'react'
import { navigate } from '@reach/router'

const BaseLayout = ({ children }: any) => {
  const [q, setQ] = useState(() => {
    return typeof location !== 'undefined' ? new URL(location.href).searchParams.get('q') || '' : ''
  })

  return (
    <div>
      <nav className="navbar is-primary is-fixed-top-desktop" role="navigation">
        <div className="navbar-end">
          <form className="control" onSubmit={(evt) => {
            evt.preventDefault()
            navigate(`/?q=${encodeURIComponent(q)}`)
          }}>
            <input className="input is-pulled-right" type="search" placeholder="Type and Enter to Search" style={{
              margin: '0.3em',
              marginRight: '1em',
              width: '300px',
            }} value={q} onChange={(evt) => setQ(evt.target.value)}/>
          </form>
        </div>
      </nav>
      <div className="columns" style={{
        marginTop: '40px',
      }}>
        <div className="column is-three-fifths-desktop is-offset-one-fifth-desktop">
          { children }
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
