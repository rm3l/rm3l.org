module.exports = {
    siteUrl: `https://rm3l.org`, // Site domain. Do not include a trailing slash!

    postsPerPage: 6, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `Armel Soro's Blog`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `Thoughts, stories and ideas on Technology`, // This allows an alternative site description for meta data for pages.

    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `Armel Soro's Blog`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest

    rssFeedTitle: `Armel Soro's Blog RSS Feed`,

    socialLinks: {
        linkedin: {
            fontAwesomeFamily: `fab`,
            // color: '#0077B5',
            url: `https://www.linkedin.com/in/armelsoro`,
            displayName: `LinkedIn://armelsoro`,
        },
        gitlab: {
            fontAwesomeFamily: `fab`,
            // color: '#fca326',
            url: `https://gitlab.com/rm3l`,
            displayName: `GitLab://rm3l`,
        },
        github: {
            fontAwesomeFamily: `fab`,
            // color: '#f5f5f5',
            url: `https://github.com/rm3l`,
            displayName: `GitHub://rm3l`,
        },
        'stack-overflow': {
            fontAwesomeFamily: `fab`,
            // color: '#f48024',
            url: `https://stackoverflow.com/users/story/1877067`,
            displayName: `StackOverflow://rm3l`,
        },
        keybase: {
            fontAwesomeFamily: `fab`,
            // color: '#FF6F24',
            url: `https://keybase.io/rm3l`,
            displayName: `Keybase://rm3l`,
        },
        twitter: {
            fontAwesomeFamily: `fab`,
            // color: '#1da1f2',
            url: `https://twitter.com/rm3l`,
            displayName: `Twitter://rm3l`,
        },
        telegram: {
            fontAwesomeFamily: `fab`,
            // color: '#0088cc',
            url: `https://t.me/rm3l_s`,
            displayName: `Telegram://rm3l_s`,
        },
        rss: {
            fontAwesomeFamily: `fas`,
            // color: '#f26522',
            url: `https://feedly.com/i/subscription/feed/https://rm3l.org/rss/`,
            displayName: `RSS Feed`,
        },
    },

    sitePublicationLogoUrl: `https://rm3l-org.s3-us-west-1.amazonaws.com/assets/publication_logo.jpg`,
    sitePublicationCoverUrl: `https://rm3l-org.s3-us-west-1.amazonaws.com/assets/publication_cover.jpg`,
}
