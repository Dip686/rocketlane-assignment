import React from 'react';
import DropDown from './drop-down';
import SeachBox from './searchbox';
import {STORAGEKEY} from '../utils/constant';
/**
 * @class Container, this class holds the entire implementation of search box,
 * it consists of searchbox and dropdown compoment
 */
export default class Container extends React.Component {
  constructor(props) {
    super();
    this.state = {
      config: Object.assign({},props.config),
      searchText: '',
      searchSuggestion:'',
      showDropDown: false,
      cachedData : JSON.parse(localStorage.getItem(STORAGEKEY)),
      searchHistory: []
    };
  }
  componentDidMount(){
    let smartSearch = this;
    document.addEventListener('storageUpdated', function updateCacheData () {
      let countryDetails = JSON.parse(localStorage.getItem(STORAGEKEY));
      smartSearch.setState({cachedData: countryDetails});
      console.log('a');
    });
  }
  /**
   * @description This function is solely responsible to display typed text
   * @param {Srting} text value to be updated in searchbox
   */
  updateSearchText(text){
    let firstNameRegex = new RegExp('^'+text, 'i'),
    showDropDown = text.length > 0,
    searchHistory = text ? this.state.cachedData.filter((val)=> firstNameRegex.test(val['name'])): [];
    // if search suggestion can provided, update the suggestion text
    if(searchHistory.length > 0){
      this.updateFirstSuggestion(searchHistory[0].name);
    }else {
      this.updateFirstSuggestion('');
    }
    this.setState({
      searchText: text,
      searchHistory,
      showDropDown
    });
  }
  /**
   * @description This function updates the suggestion string to be shown in searchbox
   * @param {string} val 
   */
  updateFirstSuggestion(val){
    this.setState({
      searchSuggestion: val
    });
  }
  /**
   * @description hides the drop down when required
   */
  hideDropDown() {
    this.setState({
      showDropDown: false
    });
  }
  render() {
    return (
      <div className="searchbox-container" style={{'width': '350px', 'height':'30px', 'border': '1px solid #00b7ef', 'fontFamily': 'serif', 'display':'inline-block'}}>
        <SeachBox dataurl ={this.state.config.dataurl} hideDropDown={this.hideDropDown.bind(this)} searchText ={this.state.searchText} searchSuggestion ={this.state.searchSuggestion} updateSearchText={this.updateSearchText.bind(this)}/>
        <DropDown hideDropDown={this.hideDropDown.bind(this)} showDropDown = {this.state.showDropDown} searchHistory={this.state.searchHistory} updateSearchText={this.updateSearchText.bind(this)}/>
      </div>
    );
  }
}