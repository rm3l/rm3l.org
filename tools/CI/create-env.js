const fs = require('fs')
fs.writeFileSync('./.env', 
    `
GATSBY_ALGOLIA_APP_ID=${process.env.GATSBY_ALGOLIA_APP_ID}\n
GATSBY_ALGOLIA_SEARCH_KEY=${process.env.GATSBY_ALGOLIA_SEARCH_KEY}\n
ALGOLIA_ADMIN_KEY=${process.env.ALGOLIA_ADMIN_KEY}\n
    `)
