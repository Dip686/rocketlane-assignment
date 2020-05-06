# rocketlane-assignment
To view implementation open public/demo.html
The library produces a JS code that can be used to create auto-suggestive, auto-complete search box.
usage:
  - call the function smartSearch
  - I have made fata fetch URL configurable
  - Also provide id of an html element within which you want to display the searchbox
  - provide which filed fetched from data to be mapped as a content of the dropdown

```    
    smartSearch({
      dataurl: 'https://restcountries.eu/rest/v2/all',
      nodeid: 'smartsearch-id1',
      field: 'name'
    });
```
To look into the implementation please visit src/index.js