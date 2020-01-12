import React from 'react'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'
import Isotope from "isotope-layout/js/isotope"
import PropTypes from 'prop-types'
import { Layout, PortfolioProjectCard } from '../components/common'
import { Button } from 'rebass'

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

      return (
          <>
              <Layout>
                  <div className="container">
                      <article className="content" style={{ textAlign: `center` }}>
                          <h1 className="content-title">Projects</h1>
                          <section className="content-body">
                              <div className="button-group filter-button-group grid-filters">
                                  <div className="tabs is-centered is-toggle">
                                      <ul id="portfolio-flters">
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="*" onClick={() => {
                                              this.onFilterChange(`*`)
                                          }}>ALL</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="android" onClick={() => {
                                              this.onFilterChange(`android`)
                                          }}>Android</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="docker" onClick={() => {
                                              this.onFilterChange(`docker`)
                                          }}>Docker</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="flutter" onClick={() => {
                                              this.onFilterChange(`flutter`)
                                          }}>Flutter</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="go" onClick={() => {
                                              this.onFilterChange(`go`)
                                          }}>Go</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="java" onClick={() => {
                                              this.onFilterChange(`java`)
                                          }}>Java</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="kotlin" onClick={() => {
                                              this.onFilterChange(`kotlin`)
                                          }}>Kotlin</Button>&nbsp;
                                          <Button sx={{
                                              fontSize: 1,
                                              textTransform: `uppercase`,
                                          }} data-filter="other" onClick={() => {
                                              this.onFilterChange(`other`)
                                          }}>Other</Button>
                                      </ul>
                                  </div>
                              </div>

                              <div className="grid" id="grid-container">
                                  <div className="grid-sizer"></div>
                                  <div className="gutter-sizer"></div>
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
