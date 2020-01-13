import React from 'react'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'
import Isotope from "isotope-layout/js/isotope"
import PropTypes from 'prop-types'
import { Layout, PortfolioProjectCard } from '../components/common'
import { Button } from 'rebass'

import styles from '../styles/app.css'

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

  // Click Function
  onFilterChange = (newFilter) => {
      if (this.iso === undefined) {
          this.iso = new Isotope(`#grid-container`, {
              itemSelector: `.grid-item`,
              layoutMode: `fitRows`,
              percentPosition: true,
              fitRows: {
                  gutter: `.gutter-sizer`,
              },
          })
      }
      if (newFilter === `*`) {
          this.iso.arrange({ filter: `*` })
      } else {
          this.iso.arrange({ filter: `.${newFilter}` })
      }
  }

  render() {
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
          portfolioTags.push(<span><Button sx={{
              fontSize: 1,
              textTransform: `uppercase`,
          }} data-filter={portfolioTag} onClick={() => {
              this.onFilterChange(portfolioTag)
          }}>{(portfolioTag === `*`) ? `ALL` : portfolioTag}</Button>{` `}</span>)
      })

      return (
          <>
              <Layout>
                  <div className="container">
                      <article className="content" style={{ textAlign: `center` }}>
                          <h1 className="content-title">Projects</h1>
                          <section className="content-body">
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
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default PortfolioPage

export const pageQuery = graphql`
  query PortfolioPageQuery {
    allGhostPage(
        sort: { order: DESC, fields: [published_at] },
        filter: {tags: {elemMatch: {name: {in: ["work"]}}}}
    ) {
        edges {
            node {
                ...GhostPageFields
            }
        }
    }
  }
`
