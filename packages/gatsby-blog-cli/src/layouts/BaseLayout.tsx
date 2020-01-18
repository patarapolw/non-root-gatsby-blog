import React from 'react'

const BaseLayout = ({ children }: any) => (
  <div>
    <nav className="navbar is-primary is-fixed-top-desktop" role="navigation">
      <div className="navbar-end">
        <input className="input is-pulled-right" type="search" placeholder="Type and Enter to Search" style={{
          margin: '0.3em',
          marginRight: '1em',
          width: '300px',
        }}/>
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

export default BaseLayout
