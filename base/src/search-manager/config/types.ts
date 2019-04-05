export const config = {
  "searchNodes":
  [
    {
      "id": "org.zowe.zlux.search.ibmknowledge",
      "shortName": "ibmknow",      
      "longName": "ibm knowledge center",
      "topics": ["ibm","doc"],
      "title": "topics.#.label",
      "summary": "topics.#.summary",
      "resultHrefPrefix": "https://www.ibm.com/support/knowledgecenter/",
      "resultHref":  "topics.#.href",
      "requestType": 0,
      "queryParm": "query",
      "limitParm": "limit",
      "queryHref": "https://www.ibm.com/support/knowledgecenter/v1/search?query=%q&offset=0&products=&tags=&lang=en&fallback=true&",
      "appIdentifier": null
    },
    {
      "id": "org.zowe.zlux.search.ibmknowledge2",
      "shortName": "ibmknow2",      
      "longName": "ibm knowledge center2",
      "topics": ["ibm","doc"],
      "title": "topics.#.label",
      "summary": "topics.#.summary",
      "resultHrefPrefix": "https://www.ibm.com/support/knowledgecenter/",
      "resultHref":  "topics.#.href",
      "requestType": 0,
      "queryParm": "query",
      "limitParm": "limit",
      "queryHref": "https://www.ibm.com/support/knowledgecenter/v1/search?query=%q&offset=0&products=&tags=&lang=en&fallback=true&",
      "appIdentifier": null
    }
    
    /*,
      {
      "shortName": "app",
      "format": "app",
      "fileName": "searchmusicplaylist.js"
      }
    */
    /*
    ,{
      "id": "org.zowe.zlux.search.wikipedia",
      "shortName": "wiki",
      "longName": "Wikipedia",
      "topics": ["any"],
      "title": "query.search.#.title",
      "summary": "query.search.#.snippet",
      "resultHrefPrefix": "https://wikipedia.org/wiki/",
      "resultHref":  "query.search.#.title",
      "requestType": 0,
      "limitParm": "limit",
      "queryParm": "srsearch",
      "queryHref": "https://wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=%q&origin=*",
      "appIdentifier": null
    } 
*/
  ]
};
