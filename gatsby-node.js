const { resolve, join } = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const query = `{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          path
        }
      }
    }
  }
}`;

const createPages = actions => result => {
  if (result.error) {
    throw result.error;
  } else {
    result.data.allMarkdownRemark.edges.forEach(edge => {
      const path = edge.node.frontmatter.path;
      const id = edge.node.id;

      actions.createPage({
        component: join(resolve('src/pages'), path, 'index.js'),
        context: {
          id,
        },
        path,
      });
    });
  }
};

exports.createPages = ({ actions, graphql }) => graphql(query).then(createPages(actions));

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
