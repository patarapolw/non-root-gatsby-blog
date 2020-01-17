/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import moment from 'moment'

const my1 = css`
  margin-top: 1em;
  margin-bottom: 1em;
`

const App = ({ nodes, tagName, pagination }: {
  nodes: any[]
  tagName?: string
  pagination: any
}) => (
  <div className="columns">
    <div className="column is-three-fifths-desktop is-offset-one-fifth-desktop">
      { tagName ? (
        <h1 className="title" css={my1}>{ tagName }</h1>
      ) : null }
      { nodes.map((el) => {
        const fm = el.frontmatter
        const title = fm.title || el.fields.slug

        return (
          <div key={ title } className="card" css={my1}>
            <div className="card-content">
              <h1 className="title">{ title }</h1>
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
      { pagination }
    </div>
  </div>
)

export default App