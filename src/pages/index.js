import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Layout from '../components/Layout';
import underConstruction from './uc.gif';

export default function Index({ data: { site } }) {
  return (
    <Layout site={site}>
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            max-width: 600px;
            margin-top: 75px;
          `}
        >
          This site is under construction.
          {'    '}
          <img
            css={css`
              padding-left: 15px;
            `}
            src={underConstruction}
            alt="stick man digging"
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`;
