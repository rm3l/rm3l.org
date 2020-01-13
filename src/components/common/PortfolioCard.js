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
    const uniqueTags = new Set()
    page.tags.forEach(tag => uniqueTags.add((tag.name.startsWith(`portfolio-`) ? tag.name.slice(`portfolio-`.length) : tag.name)))
    const className = `grid-item ` + Array.from(uniqueTags).join(` `)
    return (
        <Card className={className} width={256}
            sx={{
                p: 1,
                borderRadius: 5,
                boxShadow: `0 0 16px rgba(0, 0, 0, .25)`,
            }}>
            {/* <Image src={page.feature_image} /> */}
            <Heading as="h3">
                {page.title}
            </Heading>
            <Text>
                {page.excerpt}
            </Text>
        </Card>
        // <Box className={className} width={256}>
        //     <Card width={256}
        //         sx={{
        //             p: 1,
        //             borderRadius: 8,
        //             boxShadow: `0 0 16px rgba(0, 0, 0, .25)`,
        //         }}>
        //         {/* <Image src={page.feature_image} /> */}
        //         <Box px={3}>
        //             <Heading as="h3">
        //                 {page.title}
        //             </Heading>
        //             <Text fontSize={1}>
        //                 {page.excerpt}
        //             </Text>
        //         </Box>
        //     </Card>
        // </Box>
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
