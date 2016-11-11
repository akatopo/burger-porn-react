import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import BurgerApp from '../src/BurgerApp';
import Layout from '../src/layout';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<Layout />', () => {
  it('renders main and BurgerApp element', () => {
    const wrapper = shallow(<Layout />);

    expect(wrapper.find(BurgerApp)).to.have.length(1);
  });
});
