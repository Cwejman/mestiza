const R = require('ramda');
const $yaml = require('js-yaml');

const transfMenu = R.evolve({
  dishes: R.map(R.mergeRight({
    alternatives: [{ name: 'PLACEHOLDER', price: 0 }],
  })),
});

const transfRemark = R.evolve({
  menus: R.map(transfMenu),
  menusCatering: R.map(transfMenu),
});

const yaml = {
  parse: R.pipe($yaml.safeLoad.bind($yaml), transfRemark),
  stringify: $yaml.safeDump.bind($yaml),
};

module.exports = {
  siteMetadata: {
    title: 'Gatsby',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
        engines: {
          yaml,
        }
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify',
  ],
}
