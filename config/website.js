module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/blog your pathPrefix should be "blog"
  siteTitle: "your friend Joel's digital garden", // Navigation and Site Title
  siteTitleAlt: 'Joel Hooks - Co-Founder of egghead.io', // Alternative Site title for SEO
  siteTitleShort: 'Blog of Joel Hooks', // short_name for manifest
  siteUrl: 'https://joelhooks.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteLogo: 'https://joelhooks.com/images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Articles and notes from the co-founder of egghead.io. Musings on software, business, and life.',
  author: {
    name: 'Joel Hooks',
    image: 'https://joelhooks.com/images/joel-hooks.png',
    minibio: `
      <strong>Joel Hooks</strong> is a principle developer and co-founder at egghead.io.
      He is a published author, international speaker, and has been building UIs for 
      20+ years. Joel lives in Vancouver WA with his partner and their 5 kids.
    `,
  }, // Author for schemaORGJSONLD
  organization: 'egghead.io LLC',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@jhooks', // Twitter Username
  ogSiteName: 'Joel Hooks - Video Blogger', // Facebook Site Name
  ogLanguage: 'en_US',
  googleAnalyticsID: 'UA-246705-7',

  // Manifest and Progress color
  themeColor: '#5348FF',
  backgroundColor: '#2b2e3c',

  // Social component
  twitter: 'https://twitter.com/jhooks',
  twitterHandle: '@jhooks',
  github: 'https://github.com/joelhooks/joelhooks-com/',
  linkedin: '',
}
