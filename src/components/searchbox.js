import React from 'react';
import { placeCaretAtEnd, fetchAndUpdateData } from '../utils/utils';
import { STORAGEKEY } from '../utils/constant';
/**
 * @class SearchBox class takes care of the entire implementation of searchbox
 */
export default class SearchBox extends React.Component {
  render() {
    let regexToreplace = new RegExp(this.props.searchText, 'i'),
      searchSuggestion = this.props.searchText ? this.props.searchSuggestion.replace(regexToreplace, '') : '';
    return (
      <div className="searchbox" style={{'height': '100%'}}>
        <span style={{'display':'inline-block', 'textOverflow':'ellipsis', 'padding': '1px', 'outline': 'none', 'marginTop': '5px', width:'80%', 'paddingLeft': '10px'}} className="search-box-input" suppressContentEditableWarning={true} contentEditable="true" onKeyUp={(e) => { this.props.updateSearchText(e.target.innerText); placeCaretAtEnd(e.target); e.target.style.width="auto";
          // this function is executing considering the data in server may get updated
          // As the API fetch call is limited, in stead fetching data after every interval only fetching when searching is taking place
            fetchAndUpdateData(this.props.dataurl, STORAGEKEY);
          }}
          onBlur = {(e)=>{this.props.updateSearchText(this.props.searchSuggestion); e.target.style.width="80%"; this.props.hideDropDown()}}
        >{this.props.searchText}</span>
        <span style={{'display':'inline-block','color': 'white', 'backgroundColor': '#0091bf'}} className="search-box-suggestion">{searchSuggestion}</span>
        <span onClick = {()=>this.props.updateSearchText('')} style={{'display':'inline-block', 'textOverflow':'ellipsis'}} className="search-box-cross" style={{ 'float': 'right', 'marginTop': '6px', 'marginRight':'5px', 'cursor': 'pointer' }}>&#10005;</span>
      </div>
    );
  }
}