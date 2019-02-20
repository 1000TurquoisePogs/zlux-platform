/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
jest.mock('./web-search-operator');
import {WebSearchOperator} from './web-search-operator'
describe('Test the WebSearchOperator functionality', () => {
  it('calling constructor behaves as expected', () => {
    const webSearch = new WebSearchOperator("blah","topics.#.label","topics.#.summary","topics.#.href",null, ["blah","blah"],"blah");
    expect(WebSearchOperator).toHaveBeenCalledTimes(1);
  });
});

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
