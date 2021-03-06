import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

// Workaround to problem with icons being huge huge first load prior to resizing
// This ensures that the icon CSS is loaded immediately before attempting to render icons
// See https://github.com/FortAwesome/react-fontawesome/issues/134
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
fontAwesomeConfig.autoAddCss = false

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
                <title>{site.title} : {site.description}</title>
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <script src={`https://www.google.com/recaptcha/api.js?r=${Date.now()}`} async></script>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={{ backgroundImage: `url(${config.sitePublicationCoverUrl || site.cover_image})` }}>
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {
                                            config.sitePublicationLogoUrl ?
                                                <img className="site-logo" src={config.sitePublicationLogoUrl} alt={site.title} />
                                                : site.logo ?
                                                    <img className="site-logo" src={site.logo} alt={site.title} />
                                                    : <GatsbyImage src={data.file.childImageSharp.fixed} alt={site.title} />
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
                                    <p className="site-banner-gpg-fingerprint">
                                        <FontAwesomeIcon
                                            color="white"
                                            size="lg"
                                            icon={[`fas`, `key`]} />
                                        <span>
                                            <a aria-label="GPG Key Fingerprint" href="http://keys.gnupg.net/pks/lookup?op=get&search=0xECDF6F94927F2D25" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                                                <code>A09C 8072 0FF6 2823 466B  DA6E ECDF 6F94 927F 2D25</code>
                                            </a>
                                        </span></p>
                                </div> :
                                null}
                            <nav className="site-nav" aria-label="Navigation" >
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation aria-label="Home" data={site.navigation} navClass="site-nav-item" />
                                    <Link aria-label="Portfolio" className="site-nav-item" to="/portfolio" key="99_Nav_Portolio_Up">Portfolio</Link>
                                    <Link aria-label="Contact" className="site-nav-item" to="/contact" key="100_Nav_Contact_Up">Contact</Link>
                                </div>
                                <div className="site-nav-right">
                                    {/* About page disabled until a 'about.js' file is added to src/pages/ */}
                                    {/* <Link className="site-nav-button" to="/about">About</Link> */}
                                    <a className="site-nav-item" href="https://status.rm3l.org/" target="_blank" rel="noopener noreferrer">Status Dashboard</a>
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
                                <Link aria-label="Contact" className="site-foot-nav-item" to="/contact" key="100_Nav_Contact_Bottom">Contact</Link>
                                <a className="site-foot-nav-item" href="https://status.rm3l.org/" target="_blank" rel="noopener noreferrer">Status Dashboard</a>
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
