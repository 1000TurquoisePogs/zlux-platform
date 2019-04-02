/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
jest.mock('./app-search-operator');
import {AppSearchOperator} from './app-search-operator'

describe('Test the AppSearchOperator.getHttp call flow', () => {
  it('constructor call reacts as expected', () => {
    const appSearch = new AppSearchOperator("blah");
    appSearch.getHttp("hello");
    expect(AppSearchOperator).toHaveBeenCalledTimes(1);
    expect(appSearch.getHttp).toHaveBeenCalledTimes(1);
  });

});
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
