import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Button } from 'rebass'
import { Layout, PortfolioProjectCard } from '../components/common'
import Masonry from "react-masonry-component"

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectFilter: `ALL`,
        }
        this.onFilterChange = this.onFilterChange.bind(this)
    }

  onFilterChange = (newFilter) => {
      this.setState({
          projectFilter: newFilter,
      })

      //Update URL hash without keeping it in the history, just so reloading the page uses the right filter
      window.history.replaceState(null, null, `#${newFilter}`)
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
      return this.props.location.hash === nextProps.location.hash
  }

  componentDidMount() {
      //Pick the right filter right from the URL, if the hash is available, e.g.:  /portfolio#android
      this.onFilterChange(this.props.location.hash ? this.props.location.hash.slice(`#`.length) : `ALL`)
  }

  render() {
      const portfolioHomePage = this.props.data.ghostPage
      const pages = this.props.data.allGhostPage.edges

      const portfolioTagNames = new Set()
      portfolioTagNames.add(`ALL`)
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
          let filterButtonBgColor = null
          if (this.state.projectFilter) {
              if (this.state.projectFilter === portfolioTag) {
                  filterButtonBgColor = `tomato`
              }
          } else {
              if (portfolioTag === `ALL`) {
                  filterButtonBgColor = `tomato`
              }
          }
          portfolioTags.push(<Button color={`black`} bg={filterButtonBgColor} mr={10} mb={10} fontFamily={`monospace`} sx={{
              fontSize: 1,
              textTransform: `uppercase`,
              ':hover': {
                  backgroundColor: `lightgray`,
              },
              ':focus': {
                  backgroundColor: `tomato`,
              },
          }} data-filter={portfolioTag} onClick={() => {
              this.onFilterChange(portfolioTag)
          }}>{portfolioTag}</Button>)
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
                                      {portfolioTags}
                                  </div>
                              </div>

                              <Masonry className="showcase">
                                  {pages
                                      .filter(({ node }) => {
                                          if (this.state.projectFilter) {
                                              if (this.state.projectFilter === `ALL`) {
                                                  return true
                                              }
                                              const uniqueTags = new Set()
                                              node.tags.forEach(tag => uniqueTags.add((tag.name.startsWith(`portfolio-`) ?
                                                  tag.name.slice(`portfolio-`.length) : tag.name)))
                                              return uniqueTags.has(this.state.projectFilter)
                                          }
                                          return true
                                      })
                                      .map(({ node }) => (
                                          <PortfolioProjectCard key={node.id} page={node}/>
                                      ))}
                              </Masonry>
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
