import CMS from 'netlify-cms';
import React from 'react';
import { Template } from '../pages';

const MainPagePreview = ({ entry }) => {
  const entryMenus = entry.getIn(['data', 'menus', 'dishes']);
  const menus = entryMenus ? entryMenus.toJS() : [];

  return (
    <Template
      intro={entry.getIn(['data', 'intro'])}
      menus={menus}
    />
  );
};

CMS.registerPreviewTemplate('main', MainPagePreview);
