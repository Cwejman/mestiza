import { graphql } from 'gatsby'
import { compose, applyTo, map, path } from 'ramda';

import { Menu, Cover } from '../components';

// Constants

const sections = [Cover, Menu];
const frontmatterPath = ['data', 'markdownRemark', 'frontmatter'];

// Composition: Main Page

const toTemplate = sections => data => map(applyTo(data), sections);

export const Template = toTemplate(sections)

export default compose(Template, path(frontmatterPath));

// Gatsby AST GQL

export const query = graphql`
  query MainPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        introduction
        menus {
          dishes {
            price
            name
            alternatives {
              price
              name
            }
          }
        }
      }
    }
  }
`
