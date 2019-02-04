import React from 'react';
import Button from 'react-bootstrap/Button';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onSave(this.props.gem);
  }

  render() {
    let iconClass;
    let btnVariant;
    if (this.props.saved || this.props.gem.saved) {
      iconClass = 'fas fa-heart';
      btnVariant = 'danger';
    } else {
      iconClass = 'far fa-heart';
      btnVariant = 'primary';
    }

    return (
      <Button variant={btnVariant} className='save-button' onClick={this.onClick}>
        <i className={iconClass}></i>
      </Button>
    );
  }
}

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.props.toggleSave(this.props.gem);
  }

  render() {
    let gem = this.props.gem;
    return (
      <div className='entry' style={{width: '100%'}}>
        <div style={{width: '95%'}}>
          <a href={gem.project_uri} target='_blank' className='entry-name'>{gem.name}</a>
          <div className='entry-info'>{gem.info}</div>
        </div>
        <SaveButton gem={gem} onSave={this.onSave} />
      </div>
    );
  }
}
