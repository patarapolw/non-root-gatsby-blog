import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {isPast: {eq: true}},
      limit: 5
    ) {
      nodes {
        excerpt(truncate: true)
        frontmatter {
          title
          tag
          image
        }
        correctedDateEpoch
      }
      totalCount
    }
  }
`

const App = ({ data }) => (
  <div>
    { data.allMarkdownRemark.nodes.map((el) => {
      const fm = el.frontmatter

      return (
        <div key={ fm.title }>
          <h1>{ fm.title }</h1>
          <small>{ moment(el.correctedDateEpoch).format('LL') }</small>
          { fm.image ? <img alt={ fm.title } src={ fm.image } /> : null }
          <div dangerouslySetInnerHTML={{ __html: el.excerpt }} />
        </div>
      )
    }) }
    <nav>
      <button disabled>&lt;</button>
      <span>
        Page 1 of { Math.ceil(data.allMarkdownRemark.totalCount / 5).toLocaleString() }
      </span>
      <button>&gt;</button>
    </nav>
  </div>
)

export default App
