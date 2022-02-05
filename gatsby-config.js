const R = require('ramda');
const $yaml = require('js-yaml');

const replEmptyMenus = menu => (menu.length ? menu : [{
  dishes: [{ name: 'Här är det tomt just nu', price: '', alternatives: [] }],
}]);

const replEmptyPrice = R.merge({ price: '123456' });

const transfMenu = R.evolve({
  dishes: R.map(R.pipe(
    R.evolve({
      alternatives: R.ifElse(
        R.isEmpty,
        () => [{ name: 'PLACEHOLDER', price: '123456' }],
        R.map(replEmptyPrice),
      ),
    }),
    replEmptyPrice,
  )),
});


const transfMenuList = R.pipe(
  // Empty menus crash the build as well
  replEmptyMenus,
  // Empty object are created in CMS Admin, reject them because they crash the build process
  R.reject(R.isEmpty),
  R.map(transfMenu),
);

const transfYaml = R.evolve({
  menus: transfMenuList,
  menusCatering: transfMenuList,
});

const yaml = {
  parse: R.pipe($yaml.safeLoad.bind($yaml), transfYaml),
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
        },
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
};
