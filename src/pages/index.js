import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { cold } from 'react-hot-loader';
import * as R from 'ramda';

import { Nav, Menu, Cover, Intro, Booking, Contact } from '../components';

const matterPath = ['data', 'markdownRemark', 'frontmatter'];
const sections = [Nav, Cover, Intro, Menu, Booking, Contact];

const description = 'Här äter vi & delar på god mat i form av mellanrätter. '
  + 'Mestiza står för blandning. Mariuxi Ingber Robles har komponerat mellanrätter från...';

const gtag = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());
  gtag('config', 'UA-134942206-1');
`;

const App = (props) => {
  const matter = R.path(matterPath, props);
  const content = R.map(fn => fn(matter), sections);

  return (
    <>
      <Helmet>
        <title>Mestiza</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134942206-1" />
        <script>{gtag}</script>
      </Helmet>
      {content}
    </>
  );
};

export const Template = () => <div>Preview can not be enabled at this time</div>;
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
        number
        address
      }
    }
  }
`;
