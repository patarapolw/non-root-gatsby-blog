/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { graphql, Link } from 'gatsby'

import ListingLayout from '../layouts/ListingLayout'

export const query = graphql`
  query PagedListing($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {isPast: {eq: true}},
      limit: $limit,
      skip: $skip
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

const Listing = ({ data, pageContext }: { data: any; pageContext: any }) => {
  const pageNumber = pageContext.currentPage
  const totalCount = data.allMarkdownRemark.totalCount
  const pageCount = Math.ceil(totalCount / 5)

  return (
    <ListingLayout
      nodes={ data.allMarkdownRemark.nodes }
      pagination={ (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          { pageNumber > 1 ? (
            <Link
              className="pagination-previous"
              to={ pageNumber > 2 ? `/blog/${pageNumber - 1}` : '/' }
            >&lt;</Link>
          ) : (
            <button disabled className="pagination-previous">&lt;</button>
          ) }
          <span className="pagination-list" css={css`width: 60vw;`}>
            Page { pageNumber.toLocaleString() } of { pageCount.toLocaleString() }
          </span>
          { pageNumber < pageCount ? (
            <Link
              className="pagination-next"
              to={ `/blog/${pageNumber + 1}` }
            >&gt;</Link>
          ) : (
            <button disabled className="pagination-next">&gt;</button>
          ) }
        </nav>
      ) }
    />
  )
}

export default Listing
