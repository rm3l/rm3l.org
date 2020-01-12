import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Card,
    Image,
    Heading,
    Text,
} from 'rebass'

const PortfolioProjectCard = ({ page }) => {
    const className = `grid-item ` + page.tags.map(tag => tag.name).join(` `)
    return (
        <Box className={className} width={256}>
            <Card
                sx={{
                    p: 1,
                    borderRadius: 2,
                    boxShadow: `0 0 16px rgba(0, 0, 0, .25)`,
                }}>
                {/* <Image src={page.feature_image} /> */}
                <Box px={3}>
                    <Heading as="h3">
                        {page.title}
                    </Heading>
                    <Text fontSize={1}>
                        {page.excerpt}
                    </Text>
                </Box>
            </Card>
        </Box>
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
