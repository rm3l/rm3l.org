import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

import { Disqus } from "gatsby-plugin-disqus";

import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

const config = require(`../utils/siteConfig`);

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    render() {
        const data = this.props.data;
        const location = this.props.location;

        const post = data.ghostPost;

        let disqusConfig = {
            url: `${config.siteUrl + location.pathname}`,
            identifier: post.id,
            title: post.title,
        };

        post.html = post.html.replace(
            new RegExp("<pre><code", "g"),
            '<pre class="line-numbers"><code'
        );

        return (
            <>
                <MetaData data={data} location={location} type="article" />
                <Helmet>
                    <style type="text/css">{`${post.codeinjection_styles}`}</style>
                </Helmet>
                <Layout>
                    <div className="container">
                        <article className="content">
                            {post.feature_image ? (
                                <figure className="post-feature-image">
                                    <img
                                        src={post.feature_image}
                                        alt={post.title}
                                    />
                                </figure>
                            ) : null}
                            <section className="post-full-content">
                                <h1 className="content-title">{post.title}</h1>

                                {/* The main post content */}
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{
                                        __html: post.html,
                                    }}
                                />
                                <Disqus config={disqusConfig} />
                            </section>
                        </article>
                    </div>
                </Layout>
            </>
        );
    }
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
