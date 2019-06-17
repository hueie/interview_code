import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
export class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.setText = this.setText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setText(event) {
    this.setState({ text: event.target.value });
  }

  handleClick() {
    this.props.onSubmit(this.state.text);
  }

  render() {
    return 
    (
      <div>
      </div>
    );
  }
}

InputArea.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
*/

export class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
       btns: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSubmit(this.state.text);
  }
  render() {
    return this.props.btns ?
      (<div>
        {this.props.btns.map((btn, index) => (
          <button onClick={this.handleClick} key={index}>{btn}</button>
        ))}
      </div>)
      : null;
  }
}


export class SelectList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   opts: []
    // };
    this.selectBar = this.selectBar.bind(this);
  }

  selectBar() {
    //this.props.onSubmit(this.state.text);
  }
  render() {
    return this.props.opts ?
      (<select>
        {this.props.opts.map((opt, index) => (
          <option onChange={this.selectBar} key={index}>#progressBar{index}</option>
        ))}
      </select>)
      : null;
  }
}


export class ProgressBarList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.opts ?
      (<div>
        {this.props.opts.map((opt, index) => (
          <div key={index}>#progressBar{index}</div>
        ))}
      </div>)
      : null;
  }
}

ProgressBarList.propTypes = {
  buttons: PropTypes.array.isRequired,
  bars: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired
};

export class ProgressBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      bars: [],
      limit: 0
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(name) {
    this.setState({
      beers: [].concat(this.state.beers).concat([name])
    });
  }
  render() {
    return (
      <div>
        <span>Progress Bars Demo</span>
        <ProgressBarList items={this.state.bars} />
        <SelectList opts={this.state.bars} />
        <ButtonList btns={this.state.buttons} onSubmit={this.addItem} />
      </div>
    );
  }
}