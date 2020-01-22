import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Image, Heading, Text } from 'rebass'

const PortfolioProjectCard = ({ page }) => {
    const uniqueTags = new Set()
    page.tags.forEach(tag => uniqueTags.add((tag.name.startsWith(`portfolio-`) ? tag.name.slice(`portfolio-`.length) : tag.name)))
    const className = `showcase__item ` + Array.from(uniqueTags).join(` `)
    const publicationYear = new Date(page.published_at).getFullYear()
    return (
        <div className={className}>
            <figure className="card">
                <Link href={page.meta_title} className="card__image">
                    <Image alt={page.title}
                        src={page.feature_image ? page.feature_image : `https://upload.wikimedia.org/wikipedia/commons/9/93/No-logo.svg`}
                        sx={{
                            width: [`60%`, `35%`],
                        }}
                    />
                </Link>
                <figcaption className="card__caption">
                    <Text className="card__title">
                        {page.title}
                    </Text>
                    <Text className="card__description">
                        {page.excerpt}
                    </Text>
                    <div className="card__links_and_tags">
                        {page.meta_title ? <Link href={page.meta_title}>Website</Link> : <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        <Box className="card__publication_date"
                            sx={{
                                display: `inline-block`,
                                bg: `lightgray`,
                                px: 2,
                                borderRadius: 10,
                            }}>
                            {publicationYear}
                        </Box>
                        {page.meta_description ? <Link href={page.meta_description}>Source</Link> : <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                    </div>
                </figcaption>
            </figure>
        </div>
    )
}

PortfolioProjectCard.propTypes = {
    page: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        excerpt: PropTypes.string.isRequired,
        published_at: PropTypes.string.isRequired,
        meta_title: PropTypes.string.isRequired,
        meta_description: PropTypes.string.isRequired,
    }).isRequired,
}

export default PortfolioProjectCard
