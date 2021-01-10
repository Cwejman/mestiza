import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { cold } from 'react-hot-loader';
import * as R from 'ramda';

import { Nav, Menu, Cover, Intro, Booking, Info } from '../components';

// Template

const sections = [Nav, Cover, Intro, Menu, Booking, Info];
const SectionsComponent = props => sections.map(fn => fn(props));

// True for empty menu (CMS admin crashes on creation of menu) and
// True for empty dishes (all dishes removed, don't want to render double seperators in component)
const forbiddenMenu = list => R.isEmpty(list) || R.isEmpty(list.dishes);

const evolveProps = R.evolve({
  menus: R.reject(forbiddenMenu),
  menusCatering: R.reject(forbiddenMenu),
});

export const Template = R.pipe(evolveProps, SectionsComponent);

// App

const matterPath = ['data', 'markdownRemark', 'frontmatter'];

const description = 'Här äter vi & delar på god mat i form av mellanrätter. '
  + 'Mestiza står för blandning. Mariuxi Ingber Robles har komponerat mellanrätter från...';

const gtag = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());
  gtag('config', 'UA-134942206-1');
`;

const App = (props) => (
  <>
    <Helmet>
      <title>Mestiza</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134942206-1" />
      <script>{gtag}</script>
    </Helmet>
    <Template {...R.path(matterPath, props)}/>
  </>
);

export default cold(App);

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
        info
      }
    }
  }
`;
