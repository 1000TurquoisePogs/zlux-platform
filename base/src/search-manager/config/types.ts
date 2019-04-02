export const config = {
  "searchNodes":
  [
    {
      "type": "ibm knowledge center",
      "format": "web",
      "title": "topics.#.label",
      "summary": "topics.#.summary",
      "href":  "topics.#.href",
      "count": "limit",
      "query": ["query"],
      "queryHref": "https://www.ibm.com/support/knowledgecenter/v1/search?offset=0&products=&tags=&lang=en&fallback=true&",
      "appIdentifier": null
    },
    {
      "type": "app",
      "format": "app",
      "filename": "searchmusicplaylist.js"
    }
    /* ,{
      "type": "google",
      "format": "web",
      "title": "results.#.title",
      "summary": "results.#.content",
      "href":  "results.#.url",
      "count": "num",
      "query": ["q", "oq"],
      "queryHref": "https://cse.google.com/cse/element/v1?rsz=filtered_cse&hl=en&source=gcsc&gss=.com&cx=017643444788069204610:4gvhea_mvga&safe=off&cse_tok=AKaTTZgOLgL-I5YDcjsmpXEa06OE:1549380799068&sort=&exp=csqr&gs_l=partner-generic.3...2595626.2596194.2.2596384.6.6.0.0.0.0.144.656.3j3.6.0.gsnos%2Cn%3D13...0.504j76534j6...1.34.partner-generic..21.10.987.PxUZn0k4pZk&callback=google.search.cse.api8521&",
      "appIdentifier": null
    } */
  ]
};
