const pageQuery = `{
    pages: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/pages/" },
        frontmatter: {purpose: {eq: "page"}}
      }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title
            slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`
  
  const postQuery = `{
    posts: allGhostPost {
        edges {
            node {
                # Main fields
                id
                title
                slug

                published_at(formatString: "MMM D, YYYY")

                excerpt

                tags {
                    name
                    visibility
                }
            }
        }
    }
  }
  `
  
  const flatten = arr =>
    arr.map(({ node: { frontmatter, tags, ...rest } }) => ({
      ...frontmatter,
      ...tags,
      ...rest,
    }))
  const settings = { attributesToSnippet: [`excerpt:20`] }
  
  const queries = [
    // {
    //   query: pageQuery,
    //   transformer: ({ data }) => flatten(data.pages.edges),
    //   indexName: `Pages`,
    //   settings,
    // },
    {
      query: postQuery,
      transformer: ({ data }) => flatten(data.posts.edges),
      indexName: `Posts`,
      settings,
    },
  ]
  
  module.exports = queries
