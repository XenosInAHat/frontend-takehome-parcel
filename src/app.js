import React from 'react';
import ReactDOM from 'react-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import SearchBar from './components/searchBar';
import Results from './components/results';

/*
 * Get the index of a given Gem in a list (returns -1 if not found)
 */
function gemIndex(gemName, gemList) {
  return findIndex(gemList, gem => {return gem.name === gemName});
}

/*
 * Do some really basic validation on the search term. The actual API
 * probably does some more robust validation, but this makes sure the
 * provided server code doesn't break.
 */
function validateQuery(query, lastQuery) {
  // Arbitrary, but seems reasonable. I couldn't find a spec with a definite
  // limit for length of Gem names.
  let queryMaxLength = 100;

  // The allowable characters are just from a quick browse through some gems;
  // I couldn't find a list of valid/invalid characters
  return query && query !== lastQuery && query.length < 100
    && /^[a-zA-Z0-9\-_\.]+$/.test(query);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      savedGems: [],
      activeTab: 'results',
      noResults: false
    };

    this.lastQuery = '';
    this.fetchResults = this.fetchResults.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  componentDidMount() {
    try {
      let str = window.localStorage.getItem('savedGems');
      if (str) this.setState({savedGems: JSON.parse(str)});
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /*
   * Update the saved status of the gems in both our saved list and the
   * search results.
   */
  toggleSave(gem) {
    let stateChange = {};
    let gems = this.state.savedGems;

    // Update saved gems
    let idx = gemIndex(gem.name, gems);
    if (idx > -1) {
      let name = gems[idx].name;
      gems.splice(idx, 1);
    } else {
      gem.saved = true;
      gems.push(gem);
    }

    stateChange.savedGems = gems;

    // Update search results
    let i = gemIndex(gem.name, this.state.searchResults);
    if (i > -1) {
      let newGems = this.state.searchResults;
      newGems[i].saved = idx > -1 ? false : true;
      stateChange.searchResults = newGems;
    }

    // Actually fire off change
    this.setState(stateChange);
    try {
      window.localStorage.setItem('savedGems', JSON.stringify(gems));
    } catch (error) {
      console.error(error);
    }
  }

  /*
   * Take the large JSON blobs for search results and filter down to the
   * values we actually care about.
   */
  parseResults(results) {
    let data = [];
    results.forEach(res => {
      let item = pick(res, ['name', 'info', 'project_uri']);
      item.saved =
        gemIndex(item.name, this.state.savedGems) > -1 ? true : false;
      data.push(item);
    });

    return data;
  }

  /*
   * Request data from the RubyGems api (via the provided server code)
   */
  fetchResults(e) {
    e.preventDefault();

    let val = document.getElementById('searchbar');
    if (!val) return;

    let query = val.value.toLowerCase();
    if (!validateQuery(query, this.lastQuery)) return;

    this.lastQuery = query;
    fetch('http://localhost:3000/api/v1/search.json?query=' + query)
      .then(response => response.json())
      .then(data => {
        this.setState({
          searchResults: this.parseResults(data),
          activeTab: 'results',
          noResults: data.length === 0
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <SearchBar submit={this.fetchResults}></SearchBar>
        <div className='results'>
          <Tabs activeKey={this.state.activeTab} onSelect={key => this.setState({activeTab: key})} transition={false}>
            <Tab eventKey='results' title='Results'>
              <Results
                results={this.state.searchResults}
                toggleSave={this.toggleSave}
                noResults={this.state.noResults}
              />
            </Tab>
            <Tab eventKey='saved' title='Saved'>
              <Results
                results={this.state.savedGems}
                saveTab={true}
                toggleSave={this.toggleSave}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

let app = document.getElementById('app');
ReactDOM.render(<App />, app);
