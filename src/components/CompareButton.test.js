import CompareButton from './CompareButton';
import React from 'react';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
shallow(<CompareButton />);
});