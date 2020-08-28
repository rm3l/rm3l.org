import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const ContactSuccessPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">Thanks for reaching out!</h1>
                <section className="content-body">
                    I will get back to you as soon as possible. <Link to="/">Return home</Link>.
                </section>
            </article>
        </div>
    </Layout>
)

export default ContactSuccessPage
