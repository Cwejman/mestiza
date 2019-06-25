import CMS from 'netlify-cms-app';
import React from 'react';
import { Template } from '../pages';

CMS.init();

const MainPagePreview = ({ entry }) => <Template {...entry.toJS().data} />;

CMS.registerPreviewTemplate('main', () => 'disabled');
