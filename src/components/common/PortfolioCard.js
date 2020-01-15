import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Card,
    Image,
    Heading,
    Text,
} from 'rebass'
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
                    {/*{page.feature_image ? <img src={page.feature_image} alt={page.feature_image} /> : <br/>}*/}
                    {/*<Img fluid={page.feature_image ? page.feature_image : null} />*/}
                </Link>
                {/*{page.feature_image ? <Img className="card__image" fluid={page.feature_image} /> : <br/>}*/}
                <figcaption className="card__caption">
                    <Heading as="h4" className="card__title">
                        {/*<Link to={`/projects/${page.slug}`}>{page.title}</Link>*/}
                        {page.title}
                    </Heading>
                    <Text className="card__description">
                        {page.excerpt}
                    </Text>
                </figcaption>
            </figure>
        </div>
        //
        // <Card className={className} width={256}
        //     sx={{
        //         p: 1,
        //         borderRadius: 5,
        //         boxShadow: `0 0 16px rgba(0, 0, 0, .25)`,
        //     }}>
        //     <Image src={page.feature_image ? page.feature_image : null}
        //         sx={{
        //             width: [`60%`, `35%`],
        //         }}
        //     />
        //     <Heading as="h3">
        //         {page.title}
        //     </Heading>
        //     <Text>
        //         {page.excerpt}
        //     </Text>
        // </Card>
        // // <Box className={className} width={256}>
        // //     <Card width={256}
        // //         sx={{
        // //             p: 1,
        // //             borderRadius: 8,
        // //             boxShadow: `0 0 16px rgba(0, 0, 0, .25)`,
        // //         }}>
        // //         {/* <Image src={page.feature_image} /> */}
        // //         <Box px={3}>
        // //             <Heading as="h3">
        // //                 {page.title}
        // //             </Heading>
        // //             <Text fontSize={1}>
        // //                 {page.excerpt}
        // //             </Text>
        // //         </Box>
        // //     </Card>
        // // </Box>
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
