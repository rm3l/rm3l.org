import React from 'react'
import PropTypes from 'prop-types'
import { Image, Heading, Text } from 'rebass'
import { Link } from 'gatsby'

const PortfolioProjectCard = ({ page }) => {
    const uniqueTags = new Set()
    page.tags.forEach(tag => uniqueTags.add((tag.name.startsWith(`portfolio-`) ? tag.name.slice(`portfolio-`.length) : tag.name)))
    const className = `showcase__item ` + Array.from(uniqueTags).join(` `)
    return (
        <div className={className}>
            <figure className="card">
                <Link to={`/projects/${page.slug}`} className="card__image">
                    <Image src={page.feature_image ? page.feature_image : null}
                        sx={{
                            width: [`60%`, `35%`],
                        }}
                    />
                </Link>
                <figcaption className="card__caption">
                    <Heading as="h4" className="card__title">
                        {page.title}
                    </Heading>
                    <Text className="card__description">
                        {page.excerpt}
                    </Text>
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
    }).isRequired,
}

export default PortfolioProjectCard
