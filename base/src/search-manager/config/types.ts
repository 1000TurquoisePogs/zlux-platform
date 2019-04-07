export const config = {
  "searchNodes":
  [
    {
      "id": "org.zowe.zlux.search.ibmknowledge",
      "name": "ibmknow",      
      "description": "ibm knowledge center",
      "topics": ["ibm","doc"],
      "title": "topics.#.label",
      "summary": "topics.#.summary",
      "resultHrefPrefix": "https://www.ibm.com/support/knowledgecenter/",
      "resultHref":  "topics.#.href",
      "requestType": 0,
      "queryParm": "query",
      "limitParm": "limit",
      "queryHref": "https://www.ibm.com/support/knowledgecenter/v1/search?query=%q&offset=0&products=&tags=&lang=en&fallback=true&",
      "type": "web"
    },
    {
      "id": "org.zowe.zlux.search.ibmknowledge2",
      "name": "ibmknow2",      
      "description": "ibm knowledge center2",
      "topics": ["ibm","doc"],
      "title": "topics.#.label",
      "summary": "topics.#.summary",
      "resultHrefPrefix": "https://www.ibm.com/support/knowledgecenter/",
      "resultHref":  "topics.#.href",
      "requestType": 0,
      "queryParm": "query",
      "limitParm": "limit",
      "queryHref": "https://www.ibm.com/support/knowledgecenter/v1/search?query=%q&offset=0&products=&tags=&lang=en&fallback=true&",
      "type": "web"
    }
    
    /*,
      {
      "name": "app",
      "format": "app",
      "fileName": "searchmusicplaylist.js"
      }
    */
    /*
    ,{
      "id": "org.zowe.zlux.search.wikipedia",
      "name": "wiki",
      "description": "Wikipedia",
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
