/* eslint-disable jsx-quotes */
import React, { useState } from 'react'
import axios from 'axios'
import { Box, Flex, Text } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { Layout } from '../components/common'

const ContactPage = () => {
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
            url: `https://getform.io/f/0a0c2baf-7222-4ef8-a852-d5bafe84642b`,
            data: new FormData(form),
        })
            .then(() => {
                handleServerResponse(true, `Thanks for reaching out! I will get back to you as soon as possible.`, form)
            })
            .catch((r) => {
                handleServerResponse(false, r.response.data.error, form)
            })
    }
    return (
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Contact me</h1>
                    <form onSubmit={handleOnSubmit}>
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
                                        required="required"
                                    />
                                </Box>
                            </Flex>
                        </Box>

                        <Box>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                required="required"
                            />
                        </Box>

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
                            fontSize={[3, 4]}
                            color={!serverState.status.ok ? `red` : `blue`}>
                            {serverState.status.msg}
                        </Text>
                    )}
                </article>
            </div>
        </Layout>
    )
}

export default ContactPage
