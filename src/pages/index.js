import { graphql } from 'gatsby';
import { compose, applyTo, map, path } from 'ramda';
import { cold } from 'react-hot-loader';

import { Nav, Menu, Cover, Intro, Booking } from '../components';

const frontmatterPath = ['data', 'markdownRemark', 'frontmatter'];

const toTemplate = sections => data => map(applyTo(data), sections);

export const Template = toTemplate([Cover, Intro, Menu, Booking]);
export const Site = toTemplate([Nav, Cover, Intro, Menu, Booking]);

export default cold(compose(Site, path(frontmatterPath)));

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
