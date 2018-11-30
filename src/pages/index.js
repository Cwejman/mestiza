import { graphql } from 'gatsby';
import { compose, applyTo, map, path } from 'ramda';
import { cold } from 'react-hot-loader';

import { Nav, Menu, Cover, Intro, Booking } from '../components';

// Constants

const sections = [Nav, Cover, Intro, Menu, Booking];
const frontmatterPath = ['data', 'markdownRemark', 'frontmatter'];

// Composition: Main Page

const toTemplate = sections => data => map(applyTo(data), sections);

export const Template = toTemplate(sections);

export default cold(compose(Template, path(frontmatterPath)));

// Gatsby AST GQL

export const query = graphql`
  query MainPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        intro
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
`;
