/* eslint-disable jsx-quotes */
import React from 'react'
import { Box, Flex } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { Layout } from '../components/common'

const ContactPage = () => (
    <>
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Contact me</h1>
                    <form name="contact" method="post" action="/contact_success" data-netlify="true" data-netlify-honeypot="bot-field">
                        <input type="hidden" name="bot-field" />
                        <input type="hidden" name="form-name" value="contact" />


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
                                        placeholder="jane@example.com"
                                    />
                                </Box>
                            </Flex>
                        </Box>

                        <Box>
                            <Label htmlFor='comment'>Message</Label>
                            <Textarea
                                id='message'
                                name='message'
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
    </>
)

export default ContactPage
