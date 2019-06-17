import React from 'react';
import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ButtonList, SelectList, ProgressBarList, ProgressBarContainer } from '../src/components';
import { spy } from 'sinon';
configure({ adapter: new Adapter() });

describe('ProgressBarContainer', () => {
    
    it('should render TitleArea, ProgressBarList and InputArea', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        expect(wrapper.containsAllMatchingElements([
            <span>Progress Bars Demo</span>,
            <ProgressBarList />,
            <SelectList />,
            <ButtonList />
        ])).to.equal(true);
    });

})


/*
describe('ProgressBarList', () => {
    it('should contain an input and a button', () => {
        const wrapper = shallow(<ProgressBarList />);
        expect(wrapper.containsAllMatchingElements([
        ])).to.equal(true);
    });
})
describe('ProgressBarContainer', () => {
    
    it('should render TitleArea, ProgressBarList and InputArea', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        expect(wrapper.containsAllMatchingElements([
            <span>Progress Bars Demo</span>,
            <ProgressBarList />,
            <InputArea />
        ])).to.equal(true);
    });

    it('should start with an empty list', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        expect(wrapper.state('beers')).to.eql([]);
    });
    it('adds items to the list', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        wrapper.instance().addItem('Sam Adams');
        expect(wrapper.state('beers')).to.eql(['Sam Adams']);
    });
    it('passes addItem to InputArea', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        const inputArea = wrapper.find(InputArea);
        const addItem = wrapper.instance().addItem;
        expect(inputArea.prop('onSubmit')).to.eql(addItem);
    });
    it('passes a bound addItem function to InputArea', () => {
        const wrapper = shallow(<ProgressBarContainer />);
        const inputArea = wrapper.find(InputArea);
        inputArea.prop('onSubmit')('Sam Adams');
        expect(wrapper.state('beers')).to.eql(['Sam Adams']);
    });


    it('should contain an ul', () => {
        const wrapper = shallow(<ProgressBarList />);
        expect(wrapper.containsAllMatchingElements([
            <ul />
        ]))
    });


    it('renders the items', () => {
        const wrapper = mount(<ProgressBarContainer/>);
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

describe('InputArea', () => {
    it('should contain an input and a button', () => {
        const wrapper = shallow(<InputArea />);
        expect(wrapper.containsAllMatchingElements([
            <input />,
            <button>Add</button>
        ])).to.equal(true);
    });

    it('should accept input', () => {
        const wrapper = mount(<InputArea />);
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
        const wrapper = shallow(<InputArea onSubmit={addItemSpy} />);
        wrapper.setState({ text: 'Octoberfest' });
        const addButton = wrapper.find('button');

        addButton.simulate('click');

        expect(addItemSpy.calledOnce).to.equal(true);
        expect(addItemSpy.calledWith('Octoberfest')).to.equal(true);
    });

});

describe('ProgressBarList', () => {
    it('should render zero items', () => {
        const wrapper = shallow(<ProgressBarList items={[]} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render undefined items', () => {
        const wrapper = shallow(<ProgressBarList items={undefined} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render some items', () => {
        // It does not need update(), 
        //becuase before shallow or mount, the items array is defined
        const items = ['Sam Adams', 'Resin', 'Octoberfest'];
        const wrapper = shallow(<ProgressBarList items={items} />);
        expect(wrapper.find('li')).to.have.length(3);
    });
});
*/