import { graphql } from 'gatsby';
import { cold } from 'react-hot-loader';
import * as R from 'ramda';

import { Nav, Menu, Cover, Intro, Booking, Contact } from '../components';

const frontmatterPath = ['data', 'markdownRemark', 'frontmatter'];

const toTemplate = sections => data => R.map(R.applyTo(data), sections);

export const Template = () => <div>Preview can not be enabled at this time</div>
export const Site = toTemplate([Nav, Cover, Intro, Menu, Booking, Contact]);

export default cold(R.compose(Site, R.path(frontmatterPath)));

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
        menusCatering {
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
