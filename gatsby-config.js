require(`dotenv`).config()

const path = require(`path`)

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        development: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        // noinspection ThrowInsideFinallyBlockJS
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

if (process.env.NODE_ENV === `production` && config.siteUrl === `http://localhost:8000` && !process.env.SITEURL) {
    throw new Error(`siteUrl can't be localhost in production and needs to be configured in siteConfig. Check the README.`) // eslint-disable-line
}

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    siteMetadata: {
        title: config.siteTitleMeta,
        siteUrl: config.siteUrl,
        description: config.siteDescriptionMeta,
        contactFormEndpoint: process.env.CONTACT_FORM_ENDPOINT,
        reCaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
        },
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [
                    generateRSSFeed(config),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    /\/author\/*/,
                    /\/tag\/*/,
                    /\/pages\/*/,
                    /\/projects-*/,
                    `/projects`,
                    /(\/)?portfolio-\S*/,
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // Here goes your tracking ID
                trackingId: `UA-103780308-1`,
                // Puts tracking script in the head instead of the body
                head: true,
                // IP anonymization for GDPR compliance
                anonymize: true,
                // Disable analytics for users with `Do Not Track` enabled
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                //   exclude: ['/preview/**'],
                // Specifies what percentage of users should be tracked
                sampleRate: 100,
                // Determines how often site speed tracking beacons will be sent
                siteSpeedSampleRate: 10,
            },
        },
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `rm3l`,
            },
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `tomato`,
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
        // {
        //     resolve: `gatsby-plugin-recaptcha`,
        //     options: {
        //        async: true,
        //        defer: true,
        //     },
        //  },
        `gatsby-theme-medium`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
	    {
          resolve: 'gatsby-plugin-theme-ui',
          options: {
            prismPreset: 'night-owl',
            preset: '@theme-ui/preset-funk',
          },
        },
        {
            resolve: 'gatsby-plugin-html-attributes',
            options: {
              lang: 'en'
            }
        }
    ],
}
