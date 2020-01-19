/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import { useState } from 'react'
import { globalHistory } from '@reach/router'
import { Search } from 'js-search'

import ListingLayout from '../layouts/ListingLayout'

let documents: any[] | null = null
const jsSearch = new Search(['fields', 'slug'])
jsSearch.addIndex('excerpt')
jsSearch.addIndex(['frontmatter', 'title'])
jsSearch.addIndex(['frontmatter', 'tag'])
jsSearch.addIndex(['fields', 'slug'])

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
        fields {
          slug
        }
        correctedDateEpoch
      }
      totalCount
    }
  }
`

const Listing = ({ data, pageContext }: any) => {
  const pageNumber = pageContext.currentPage

  const loadQ = async (q: string) => {
    if (!documents) {
      documents = await fetch(`${globalHistory.location.origin}/search.json`).then((r) => r.json())
      jsSearch.addDocuments(documents as any[])
    }
    const r = q ? jsSearch.search(q) : documents as any[]

    setState({
      q,
      nodes: r.slice((pageNumber - 1) * 5, pageNumber * 5),
      totalCount: r.length,
    })
  }

  const appendQ = (url: string) => {
    return s.q ? `${url}?q=${s.q}` : url
  }

  const [s, setState] = useState(() => {
    const q = new URL(location.href).searchParams.get('q') || ''
    const s = {
      q,
      nodes: q ? [] : data.allMarkdownRemark.nodes,
      totalCount: q ? 0 : data.allMarkdownRemark.totalCount,
    }

    setTimeout(() => {
      loadQ(q)
    }, 10)

    return s
  })

  globalHistory.listen(() => {
    const q = new URL(location.href).searchParams.get('q') || ''
    console.log(q)

    if (q !== s.q) {
      loadQ(q)
    }
  })

  const getPageCount = () => Math.ceil(s.totalCount / 5)

  return (
    <ListingLayout
      nodes={ s.nodes }
      pagination={ (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          { pageNumber > 1 ? (
            <Link
              className="pagination-previous"
              to={ appendQ(pageNumber > 2 ? `/page/${pageNumber - 1}` : '/') }
            >&lt;</Link>
          ) : (
            <button disabled className="pagination-previous">&lt;</button>
          ) }
          <span className="pagination-list" css={css`width: 60vw;`}>
            Page { pageNumber.toLocaleString() } of { getPageCount().toLocaleString() }
          </span>
          { pageNumber < getPageCount() ? (
            <Link
              className="pagination-next"
              to={ appendQ(`/page/${pageNumber + 1}`) }
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
