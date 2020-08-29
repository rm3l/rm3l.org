/* eslint-disable jsx-quotes */
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Box, Flex } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { Layout } from '../components/common'

export default function ContactPage({ data }) {
    return (
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Contact me</h1>
                    {/* <form name="contact" method="post" action="/contact_success" data-netlify="true" data-netlify-honeypot="bot-field">
                        <input aria-label="hidden-bot-field" type="hidden" name="bot-field" />
                        <input aria-label="hidden-form-name" type="hidden" name="form-name" value="contact" /> */}
                    <form name="contact" method="post" action={ data.site.siteMetadata.contactFormEndpoint }>
                        <Box>
                            <Flex mx={-2} mb={3}>
                                <Box width={1 / 2} px={2}>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Jane Doe"
                                    />
                                </Box>
                                <Box width={1 / 2} px={2}>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jane@doe.com"
                                    />
                                </Box>
                            </Flex>
                        </Box>

                        <Box>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                            />
                        </Box>

                        <p/>

                        <Box fontSize={4} >
                            <Input color={`black`}
                                bg={`lightgray`}
                                fontFamily={`monospace`}
                                type='submit'
                                value='Send Message'
                            />
                        </Box>
                    </form>
                </article>
            </div>
        </Layout>
    )
}

ContactPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                contactFormEndpoint: PropTypes.string.isRequired,
            }),
        }),
    }).isRequired,
    pageContext: PropTypes.object,
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        contactFormEndpoint
      }
    }
  }
`
