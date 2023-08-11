import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  handleInputChange = event => {
    const keyword = event.target.value;
    this.setState({ keyword });
    this.props.onSearch(keyword);
  };

  render() {
    const { keyword } = this.state;

    return (
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a location..."
          value={keyword}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Input;
