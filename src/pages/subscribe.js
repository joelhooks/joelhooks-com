import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import SubscribeForm from '../components/Forms/SubscribeForm'

export default ({ data: { site } }) => (
  <Layout site={site} noFooter>
    <Container>
      <SubscribeForm />
    </Container>
  </Layout>
)

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
