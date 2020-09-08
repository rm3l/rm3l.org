import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

library.add(fab, fas)

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node

    const socialLinkItems = []
    Object.entries(config.socialLinks).map(([network, profileLinkData]) => {
        socialLinkItems.push(
            <Tippy content={<span>{profileLinkData.displayName}</span>}>
                <a aria-label={profileLinkData.displayName} href={profileLinkData.url} className="site-nav-item" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                        color={profileLinkData.color}
                        size="lg"
                        icon={[
                            profileLinkData.fontAwesomeFamily ? profileLinkData.fontAwesomeFamily : `fas`,
                            network]} />
                    {` `}
                </a>
            </Tippy>)
    }
    )

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        }
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    {socialLinkItems}
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">{site.title}</h1>
                                    <p className="site-banner-desc">{site.description}</p>
                                </div> :
                                null}
                            <nav className="site-nav" aria-label="Navigation" >
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation aria-label="Home" data={site.navigation} navClass="site-nav-item" />
                                    <Link aria-label="Portfolio" className="site-nav-item" to="/portfolio" key="99_Nav_Portolio_Up">Portfolio</Link>
                                </div>
                                <div className="site-nav-right">
                                    {/* About page disabled until a 'about.js' file is added to src/pages/ */}
                                    {/* <Link className="site-nav-button" to="/about">About</Link> */}
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                © 2018 - {new Date().getFullYear()} &mdash;
                                Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                                &nbsp; and <a className="site-foot-nav-item" href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation aria-label="Home" data={site.navigation} navClass="site-foot-nav-item" />
                                <Link aria-label="Portfolio" className="site-foot-nav-item" to="/portfolio" key="99_Nav_Portolio_Bottom">Portfolio</Link>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
