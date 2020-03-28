import React, { useState } from 'react'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  connectHits,
  connectSearchBox,
  InstantSearch,
  Highlight,
} from 'react-instantsearch-dom'
import { MdSearch } from 'react-icons/md'

import colors from '../lib/colors'
import Overlay from './Overlay'

const client = algoliasearch('DSQGVIFOX3', '29ed94b0481df0099a928e5d4229b5e9')

const SearchArea = styled('div')`
  height: 100vh;
  margin-top: 0;
  overflow-y: scroll;
  padding: 3rem 5%;
  width: 100%;
`

const List = styled('ul')`
  list-style: none;
  margin: 0 auto;
  max-width: 650px;
  padding: 0;
  color: ${colors.black};
`

const Result = styled('li')`
  margin-top: 2rem;
  color: ${colors.black};
`

const Heading = styled('h2')`
  font-size: 1.25rem;
  font-weight: 600;
  a {
    color: ${colors.pink};
    text-decoration: none;
    :active,
    :focus,
    :hover {
      color: ${colors.violet};
    }
  }
`

const Link = styled('a')`
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
  color: black !important;
`

const Hits = connectHits(({ hits }) => (
  <List>
    {hits.map(hit => (
      <Result key={hit.objectID}>
        <Heading>
          <a href={`/${hit.slug}`}>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </a>
        </Heading>
        <p>
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </p>
        <Link href={`/${hit.slug}`}>Read this post &rsaquo;</Link>
      </Result>
    ))}
  </List>
))

const OpenSearch = styled('a')({
  borderRadius: '50%',
  alignSelf: 'center',
  border: '2px solid transparent',
  color: 'black',
  margin: '0',
  marginRight: '10px',
  padding: '0 0.525rem',
  width: '2.375rem',
  height: '2.375rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Icon = styled(MdSearch)`
  height: 100%;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Label = styled('label')`
  display: block;
  margin: 0 auto;
  max-width: 650px;
`

const Input = styled('input')`
  border: 2px solid gray;
  border-radius: 4px;
  display: block;
  font-size: 1.25rem;
  margin-top: 0;
  padding: 0.5rem 0.75rem;
  width: 100%;
`

const Search = connectSearchBox(({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <Label htmlFor="search">
      <span>Search the Blog</span>
      <Input
        type="search"
        id="search"
        value={currentRefinement}
        onBlur={() => {
          if (currentRefinement === '') {
            setActive(false)
          }
        }}
        onChange={event => {
          setActive(true)
          refine(event.currentTarget.value)
        }}
      />
    </Label>
  </form>
))

const SearchContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  /* margin-left: auto;
  margin-top: 0; */
  color: ${colors.black};
`

// eslint-disable-next-line react/display-name
export default () => {
  const [active, setActive] = useState(false)
  return (
    <InstantSearch
      searchClient={client}
      indexName="articles"
      root={{ Root: SearchContainer }}
    >
      <Configure distinct={1} />
      <OpenSearch
        id="open-search"
        css={{
          '@media (hover: hover)': {
            ':hover': {
              background: colors.primary,
              color: colors.white,
            },
          },
        }}
        href="/search"
        onClick={event => {
          event.preventDefault()
          setActive(true)
        }}
      >
        <Icon title="Search the blog" />
      </OpenSearch>
      <Overlay
        hidePopover={() => {
          setActive(false)
        }}
        visible={active}
      >
        <SearchArea>
          <Search setActive={setActive} />
          <Hits />
        </SearchArea>
      </Overlay>
    </InstantSearch>
  )
}
