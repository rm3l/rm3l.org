import React from 'react'
import hasher from 'hasher'
import { graphql } from 'gatsby'
import Isotope from "isotope-layout/js/isotope"
import PropTypes from 'prop-types'
import { Layout, PortfolioProjectCard } from '../components/common'
import { Button } from 'rebass'

import styles from '../styles/app.css'

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
        hasher.init()
        this.onFilterChange = this.onFilterChange.bind(this)
    }

  onFilterChange = (newFilter) => {
      if (this.iso === undefined) {
          this.iso = new Isotope(`#grid-container`, {
              itemSelector: `.grid-item`,
              layoutMode: `masonry`,
              masonry: {
                  columnWidth: 100,
                  fitWidth: true,
                  isFitWidth: true,
              },
          })
      }
      if (newFilter === `*`) {
          this.iso.arrange({ filter: `*` })
      } else {
          this.iso.arrange({ filter: `.${newFilter}` })

          //Update URL hash without keeping it in the history, just so reloading the page uses the right filter
          hasher.prependHash = ``
          hasher.changed.active = false
          hasher.replaceHash(`${newFilter}`)
          hasher.changed.active = true
      }
  }

  componentDidMount() {
      //Pick the right filter right from the URL, if the hash is available, e.g.:  /portfolio#android
      this.onFilterChange(this.props.location.hash ? this.props.location.hash.slice(`#`.length) : `*`)
  }

  render() {
      const portfolioHomePage = this.props.data.ghostPage
      const pages = this.props.data.allGhostPage.edges

      const portfolioTagNames = new Set()
      portfolioTagNames.add(`*`)
      pages.forEach((node) => {
          const page = node.node
          if (page.tags) {
              page.tags.forEach((pageTag) => {
                  if (pageTag.name && pageTag.name.startsWith(`portfolio-`)) {
                      portfolioTagNames.add(pageTag.name.slice(`portfolio-`.length))
                  }
              })
          }
      })
      const portfolioTags = []
      Array.from(portfolioTagNames).sort().forEach((portfolioTag) => {
          portfolioTags.push(<span><Button mr={10} fontFamily={`monospace`} sx={{
              fontSize: 1,
              textTransform: `uppercase`,
              ':hover': {
                  backgroundColor: `tomato`,
              },
              ':focus': {
                  backgroundColor: `tomato`,
              },
          }} data-filter={portfolioTag} onClick={() => {
              this.onFilterChange(portfolioTag)
          }}>{(portfolioTag === `*`) ? `ALL` : portfolioTag}</Button></span>)
      })

      return (
          <>
              <Layout>
                  <div className="container">
                      <article className="content" style={{ textAlign: `center` }}>
                          <h1 className="content-title">{portfolioHomePage.title}</h1>
                          <section className="content-body">
                              <div dangerouslySetInnerHTML={{ __html: portfolioHomePage.html }}/>
                              <div className="button-group filter-button-group grid-filters">
                                  <div className="tabs is-centered is-toggle">
                                      <ul id="portfolio-filters">
                                          {portfolioTags}
                                      </ul>
                                  </div>
                              </div>

                              <div className="grid" id="grid-container">
                                  <div className="grid-sizer"></div>
                                  <div className="gutter-sizer"></div>
                                  <div className={styles[`card-container`]}>
                                      {pages.map(({ node }) => (
                                          <PortfolioProjectCard key={node.id} page={node}/>
                                          /* <div className="grid-item {page.tags}">
                                                <Link to={page.slug}>
                                                    <figure className="image">
                                                        <Img fluid={page.feature_image} />
                                                        <figcaption>
                                                            <h4 className="title is-4">{page.title}</h4>
                                                            <p className="grid-item-blurb">{page.excerpt}</p>
                                                        </figcaption>
                                                    </figure>
                                                </Link>
                                            </div> */
                                      ))}
                                  </div>
                              </div>
                          </section>
                      </article>
                  </div>
              </Layout>
          </>
      )
  }
}

PortfolioPage.propTypes = {
    data: PropTypes.shape({
        allGhostPage: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        hash: PropTypes.string,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default PortfolioPage

export const pageRootQuery = graphql`
  query PortfolioPageQuery {
    allGhostPage(
        sort: {
            order: DESC,
            fields: [ published_at ]
        },
        filter: {
            tags: {
                elemMatch: {
                    name: {
                        in: [ "work" ]
                    }
                }
            }
        }
    ) {
        edges {
            node {
                ...GhostPageFields
            }
        }
    }

    ghostPage(
        tags: {
            elemMatch: {
                name: {
                    in: [ "page-portfolio-home" ]
                }
            }
        }
    ) {
        id
        uuid
        title
        html
    }
  }
`
