import React from 'react';
import Entry from './entry';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = [];
    if (this.props.results) {
      data = this.props.results;
    }

    let entries = data.map(item =>
      <div key={item.name}>
        <Entry
          className='entry'
          gem={item}
          saved={this.props.saveTab}
          toggleSave={this.props.toggleSave}
        />
        <hr />
      </div>
    );

    if (data.length === 0) {
      if (this.props.saveTab)
        return <div>Save some Gems to view them here.</div>
      else if (this.props.noResults)
        return <div>No results found.</div>
      else
        return <div>Start searching to view results!</div>
    } else {
      return entries;
    }
  }
}
