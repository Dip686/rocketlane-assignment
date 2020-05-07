import React from 'react';
/**
 * @class DropDown renders the dropdown view of list of searched result
 */
export default class DropDown extends React.Component {
  render() {
    //showDropDown
    let dropDownStyle = {'backgroundColor': '#f9f9f9', 'boxShadow': '0px 8px 16px 0px rgba(0,0,0,0.2)', 'marginTop': '2px', 'maxHeight': '30vh', 'overflowY':'scroll'};
    if(this.props.showDropDown){
      dropDownStyle.display= 'block';
    } else {
      dropDownStyle.display= 'none';
    }
    return (
      <div className="autosuggestion-dropdown" style={dropDownStyle}>
        {
          this.props.searchHistory.map((val, index)=>{
            return <div key={index} onMouseDown={(e)=>{this.props.updateSearchText(e.target.innerText);this.props.hideDropDown();}} className="autocomplete-option" style={{'padding': '12px 16px', 'cursor': 'pointer'}}>{val[this.props.field]}</div>
          })
        }
      </div>
    );
  }
}