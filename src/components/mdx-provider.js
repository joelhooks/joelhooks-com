import React from "react"
import { MDXProvider } from "@mdx-js/react"
import ResponsiveEmbed from "react-responsive-embed";
import { TwitterTweetEmbed } from "react-twitter-embed";

const shortcodes = { ResponsiveEmbed, TwitterTweetEmbed }

const CustomMDXProvider = ({ children }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
)

export default CustomMDXProvider
