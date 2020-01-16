/** @jsx jsx */
import { graphql } from 'gatsby'
import moment from 'moment'
import { jsx, css } from '@emotion/core'

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {isPast: {eq: true}},
      limit: 5
    ) {
      nodes {
        excerpt(truncate: true, format: HTML)
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
  <div className="columns">
    <div className="column is-three-fifths-desktop is-offset-one-fifth-desktop">
      { data.allMarkdownRemark.nodes.map((el) => {
        const fm = el.frontmatter

        return (
          <div key={ fm.title } className="card" css={css`
            margin-top: 1em;
            margin-bottom: 1em;
          `}>
            <div className="card-content">
              <h1 className="title">{ fm.title }</h1>
              <div css={css`height: 1.5em; margin-bottom: 2em;`}>
                <small className="is-pulled-right">{ moment(el.correctedDateEpoch).format('LL') }</small>
              </div>

              { fm.image ? (
                <div className="columns" css={css`flex-direction: row-reverse;`}>
                  <div className="column is-two-fifths">
                    <figure className="image">
                      <img alt={ fm.title } src={ fm.image } />
                    </figure>
                  </div>
                  <div className="column">
                    <div className="content" dangerouslySetInnerHTML={{ __html: el.excerpt }} />
                  </div>
                </div>
              ) : (
                <div className="content" dangerouslySetInnerHTML={{ __html: el.excerpt }} />
              ) }
            </div>
          </div>
        )
      }) }
      <nav className="pagination is-centered" role="navigation" ariaLabel="pagination">
        <button className="pagination-previous" disabled>&lt;</button>
        <span className="pagination-list" css={css`width: 60vw;`}>
          Page 1 of { Math.ceil(data.allMarkdownRemark.totalCount / 5).toLocaleString() }
        </span>
        <button className="pagination-next">&gt;</button>
      </nav>
    </div>
  </div>
)

export default App
