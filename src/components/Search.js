import React, { useState } from 'react'
import styled from '@emotion/styled'
import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  connectHits,
  connectSearchBox,
  InstantSearch,
  Highlight,
} from 'react-instantsearch-dom'
import theme from '../../config/theme'
import { FaSearch } from 'react-icons/fa'
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
  color: ${theme.colors.black};
`

const Result = styled('li')`
  margin-top: 2rem;
  color: ${theme.colors.black};
`

const Heading = styled('h2')`
  font-size: 1.25rem;
  font-weight: 600;
  a {
    color: ${theme.colors.link_color};
    text-decoration: none;
    :active,
    :focus,
    :hover {
      color: ${theme.colors.link_color_hover};
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
  color: ${theme.colors.black} !important;
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

const OpenSearch = styled('a')`
  align-self: center;
  border: 2px solid transparent;
  color: ${theme.colors.black};
  height: 100%;
  margin: 0;
  padding: 0 0.625rem;
  width: 2.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  :active,
  :focus,
  :hover {
    background-color: transparent;
    color: ${theme.colors.primaryDark};
  }
  :focus {
    border: 2px solid ${theme.colors.darkest};
    border-radius: 0;
  }
  @media (max-width: ${theme.breakpoints.s}) {
    width: 2.5rem;
  }
`

const Icon = styled(FaSearch)`
  height: 100%;
  margin: 0;
  position: relative;
  top: -0.125em;
`

const Label = styled('label')`
  display: block;
  margin: 0 auto;
  max-width: 650px;
`

const Input = styled('input')`
  border: 2px solid ${theme.colors.textLight};
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
  color: ${theme.colors.black};
`

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
