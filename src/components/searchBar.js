import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.keyCode === 13)
      this.props.submit(e);
  }

  render() {
    return (
      <div className='search-bar'>
        <InputGroup className='mb-3'>
          <FormControl id='searchbar' placeholder='Search...' onKeyDown={this.handleChange}/>
          <InputGroup.Append>
            <Button onClick={this.props.submit}>
              <i className='fas fa-search'></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
