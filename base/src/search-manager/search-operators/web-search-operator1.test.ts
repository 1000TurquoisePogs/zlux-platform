/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {WebSearchOperator} from './web-search-operator'
describe('Test the WebSearchOperator functionality', () => {
  let webSearch;
  beforeEach(() => {webSearch = new WebSearchOperator("blah","topics.#.label","topics.#.summary","topics.#.href",null, ["blah","blah"],"blah");});

  it('null object returns []', () => {
    expect(webSearch.processResults({}, "2")).toEqual([]);
  });

  it('object with only a label returns []', () => {
    expect(webSearch.processResults({"topics":[{"label": "testing123"}]}, "2")).toEqual([]);
  });

  it('object without an href returns []', () => {
    expect(webSearch.processResults({"topics":[{"label": "testing123", "summary":"hello"}]}, "2")).toEqual([]);
  });

  it('object returns length of 1', () => {
    expect(webSearch.processResults({"topics":[{"label": "testing123", "summary":"hello", "href": "https://www.cnn.com"}]}, "webSearch").length === 1).toBeTruthy();
  });

  it('inequal length of title/summary/href =>[]', () => {
    expect(webSearch.processResults({"topics":[{"label": "testing123", "summary":"hello", "href": "https://www.cnn.com"},{"label": "fail"}]}, "webSearch")).toEqual([]);
  });

});

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
