import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

export default function Index({ data: { site } }) {
  return (
    <Layout site={site}>This site is under construction. 🔥</Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`;
