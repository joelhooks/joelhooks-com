import React from 'react'
import { graphql } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import Layout from '../components/Layout'
import Container from '../components/Container'
import SubscribeForm from '../components/Forms/SubscribeForm'

export default ({ data: { site } }) => {
  const darkMode = useDarkMode()
  return (
    <Layout site={site} noFooter>
      <Container>
        <SubscribeForm darkMode={darkMode.value} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
