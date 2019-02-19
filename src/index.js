import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select'
import './index.css';

class TimezoneDropDown extends React.Component {

  state = {
    selectedOption: null,
    result: null
  }

  handleChange = (selectedOption) => {
    var result = `The time in ` + selectedOption.label + " is: " + offsetDate(selectedOption.value);
    this.setState({ selectedOption, result });
    
    console.log(result);
  }

  render() {
    const { selectedOption, result } = this.state;

    var timezones = require('./timezones.json');

    timezones.sort(function(a, b){
      if(a.label < b.label) { return -1; }
      if(a.label > b.label) { return 1; }
      return 0;
    })

    return (
      <div>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={timezones}
      />
      <div>{result}</div>
      </div>
    );
  }
}

function offsetDate(offset){
  var d = new Date(new Date().getTime() + (offset * 1000 * 60 * 60));
  var hours = d.getUTCHours();
  var mins = d.getUTCMinutes();
  var secs = d.getUTCSeconds();
  return pad(unMilitarizeTime(hours), 2) + ":" + pad(mins,2) + ":" + pad(secs,2) + (isPM(hours) ? " PM" : " AM")
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function isPM(hours){
  return hours > 12 ? true: false;
}

function unMilitarizeTime(hours){
  return isPM(hours) ? hours - 12 : hours;
}

// ========================================
ReactDOM.render(<TimezoneDropDown />, document.getElementById("root"));
