const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const slugify = require('slug');

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;

    createPage({
      path: node.fields.slug,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/post.js`),
        node.code.scope,
        __dirname,
      ),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              categories
              date
            }
            code {
              scope
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const { edges } = data.allMdx;
    // edges.forEach(({ node }) => {
    //   console.log(node.parent.sourceInstanceName, node.parent.name);
    // });
    createPosts(actions.createPage, edges);
  });

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const slug =
      parent.sourceInstanceName === 'legacy'
        ? `${node.frontmatter.date
            .split(' ')[0]
            .replace(/-/g, '/')}/${slugify(node.frontmatter.title)}`
        : node.frontmatter.slug || slugify(node.frontmatter.title);

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    });

    createNodeField({
      name: 'banner',
      node,
      banner: node.frontmatter.banner,
    });

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    });

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    });
  }
};
