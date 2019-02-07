/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

export class SearchResult {
  title: string;
  summary: string;
  appIdentifier: string | null;
  href: string | null;
  type: MVDHosting.SearchType;

  constructor(title: string, summary: string,
    appIdentifier:string|null, href:string|null,
    type:MVDHosting.SearchType) {

    if (title !== null && summary !== null &&
      (appIdentifier != null || href !== null)) {
      this.title = title;
      this.summary = summary;
      this.appIdentifier = appIdentifier || null;
      this.href = href || null;
      this.type = type
    }
    else {
      throw new Error(`SearchResult types are not a valid!`);
    }
  }
  
  getType(): MVDHosting.SearchType {
    return this.type;
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
