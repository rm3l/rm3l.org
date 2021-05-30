/* eslint-disable jsx-quotes */
import React, { useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { Layout } from '../components/common'

const ContactPage = ({ data }) => {
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    })
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        })
        if (ok) {
            form.reset()
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        setServerState({ submitting: true })
        axios({
            method: `post`,
            url: data.site.siteMetadata.contactFormEndpoint,
            data: new FormData(form),
        })
            .then(() => {
                handleServerResponse(true, `Thanks for reaching out! I will get back to you as soon as possible.`, form)
            })
            .catch((r) => {
                let errorMessage = r.response.data.error
                if (errorMessage === `reCAPTCHA failed`) {
                    errorMessage += `. Please make sure you are a human by clicking on the "I'm not a robot" checkbox !`
                }
                handleServerResponse(false, errorMessage, form)
            })
    }
    return (
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Contact me</h1>
                    <p>
                    You will find my <a aria-label="GPG Documentation" href="http://en.wikipedia.org/wiki/GNU_Privacy_Guard" target="_blank" rel="noopener noreferrer">GPG</a> public key at the <a aria-label="Anchor to my GPG Public Key" href="#gpg-pubkey">bottom of this page</a>.
                    For privacy purposes, I do encourage you to use GPG strong encryption mechanisms with this key when reaching out.
                        <br/>
                    Fingerprint is: <code>86DD A4D3 F3B5 8546 CC49 1BE3 921B 0A87 C13C FD83</code>
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <Input type="text" name="_gotcha" sx={{
                            display: `none`,
                        }} />
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
                                    <Label className="form-required" htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="_replyto"
                                        type="email"
                                        placeholder="jane@doe.com"
                                        required="required"
                                    />
                                </Box>
                            </Flex>
                        </Box>

                        <Box>
                            <Label className="form-required" htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                required="required"
                            />
                        </Box>

                        <p/>

                        {data.site.siteMetadata.reCaptchaSiteKey !== undefined && (
                            <div className="g-recaptcha" data-sitekey={data.site.siteMetadata.reCaptchaSiteKey}></div>
                        )}

                        <p/>

                        <Box fontSize={4} >
                            <Input color={`black`}
                                bg={`lightgray`}
                                type='submit'
                                value='Send Message'
                                disabled={serverState.submitting}
                            />
                        </Box>
                    </form>
                    <p/>
                    {serverState.status && (
                        <Text
                            className="info-msg"
                            fontSize={[3, 4]}
                            color={!serverState.status.ok ? `red` : `blue`}>
                            {serverState.status.msg}
                        </Text>
                    )}
                </article>
                <p>
                    <pre className="contact-gpg-pubkey" id="gpg-pubkey">
                        <code>{`
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=yG2U
-----END PGP PUBLIC KEY BLOCK-----
                            `}</code>
                    </pre>
                </p>
            </div>
        </Layout>
    )
}

export default ContactPage

ContactPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                contactFormEndpoint: PropTypes.string,
                reCaptchaSiteKey: PropTypes.string,
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
        reCaptchaSiteKey
      }
    }
  }
`
