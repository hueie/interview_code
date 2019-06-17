import React from 'react';
import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MyInputArea, BeerList, BeerListContainer } from '../src/components';
import { spy } from 'sinon';
configure({ adapter: new Adapter() });

describe('BeerListContainer', () => {
    it('should render InputArea and BeerList', () => {
        const wrapper = shallow(<BeerListContainer />);
        expect(wrapper.containsAllMatchingElements([
            <span>Bear!</span>,
            <MyInputArea />,
            <BeerList />
        ])).to.equal(true);
    });
    it('should start with an empty list', () => {
        const wrapper = shallow(<BeerListContainer />);
        expect(wrapper.state('beers')).to.eql([]);
    });
    it('adds items to the list', () => {
        const wrapper = shallow(<BeerListContainer />);
        wrapper.instance().addItem('Sam Adams');
        expect(wrapper.state('beers')).to.eql(['Sam Adams']);
    });
    it('passes addItem to InputArea', () => {
        const wrapper = shallow(<BeerListContainer />);
        const inputArea = wrapper.find(MyInputArea);
        const addItem = wrapper.instance().addItem;
        expect(inputArea.prop('onSubmit')).to.eql(addItem);
    });
    it('passes a bound addItem function to InputArea', () => {
        const wrapper = shallow(<BeerListContainer />);
        const inputArea = wrapper.find(MyInputArea);
        inputArea.prop('onSubmit')('Sam Adams');
        expect(wrapper.state('beers')).to.eql(['Sam Adams']);
    });


    it('should contain an ul', () => {
        const wrapper = shallow(<BeerList />);
        expect(wrapper.containsAllMatchingElements([
            <ul />
        ]))
    });


    it('renders the items', () => {
        const wrapper = mount(<BeerListContainer/>);
        wrapper.instance().addItem('Sam Adams');
        wrapper.instance().addItem('Resin');
        expect(wrapper.state('beers')).to.eql(['Sam Adams', 'Resin']);
        //You should Update after for rendering executing some function to test about rendering
        //for two new li tags
        wrapper.update();
        expect(wrapper.find('ul').children()).to.have.lengthOf(2);
        expect(wrapper.find('li')).to.have.length(2);
        expect(wrapper.find('li').length).to.equal(2);
      });
});

describe('MyInputArea', () => {
    it('should contain an input and a button', () => {
        const wrapper = shallow(<MyInputArea />);
        expect(wrapper.containsAllMatchingElements([
            <input />,
            <button>Add</button>
        ])).to.equal(true);
    });

    it('should accept input', () => {
        const wrapper = mount(<MyInputArea />);
        //const wrapper = shallow(<InputArea/>);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Resin' } });
        expect(wrapper.state('text')).to.equal('Resin');
        expect(input.instance().value).to.equal('Resin');
        // "input.prop('value')" does not work.: AssertionError: expected '' to equal 'Resin'
        //expect(input.prop('value')).to.equal('Resin');
    });
    
    it('should call onSubmit when Add is clicked', () => {
        const addItemSpy = spy();
        const wrapper = shallow(<MyInputArea onSubmit={addItemSpy} />);
        wrapper.setState({ text: 'Octoberfest' });
        const addButton = wrapper.find('button');

        addButton.simulate('click');

        expect(addItemSpy.calledOnce).to.equal(true);
        expect(addItemSpy.calledWith('Octoberfest')).to.equal(true);
    });

});

describe('BeerList', () => {
    it('should render zero items', () => {
        const wrapper = shallow(<BeerList items={[]} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render undefined items', () => {
        const wrapper = shallow(<BeerList items={undefined} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render some items', () => {
        // It does not need update(), 
        //becuase before shallow or mount, the items array is defined
        const items = ['Sam Adams', 'Resin', 'Octoberfest'];
        const wrapper = shallow(<BeerList items={items} />);
        expect(wrapper.find('li')).to.have.length(3);
    });
});