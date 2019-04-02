/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {AppSearchOperator} from './app-search-operator'
import {Promise} from 'es6-promise'

// TODO: figure out why the following json import won't work (resolveJsonModule is set in tesconfig.json):
// TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
//     base/src/search-manager/search-operators/app-search-operator.test.ts:11:28 - error TS2732: Cannot find module './app-test.json'. Consider using '--resolveJsonModule' to import module with '.json' extension
//
//     11 import * as legitJson from './app-test.json';
// import * as legitJson from './app-test.json';
const legitJson:any = {
  "pluginDefinitions": [
    {
      "identifier": "org.zowe.zosmf.workflows",
      "pluginVersion": "0.9.4",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "Workflows",
          "pluginShortNameDefault": "User Tasks/Workflows",
          "imageSrc": "images/Workflow.png"
        },
        "descriptionKey": "WorkflowsDescription",
        "descriptionDefault": "Execute and manage end user tasks for administering the system",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 1320,
          "height": 880,
          "x": 0,
          "y": 0
        }
      },
      "configurationData": {
        "resources": {
          "zosmf": {
            "aggregationPolicy": "none"
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "nodeService",
          "name": "zosmf",
          "serviceLookupMethod": "external",
          "fileName": "zosmf-service.js",
          "handlerInstaller": "zosmfServiceInstaller",
          "dependenciesIncluded": true,
          "methods": [
            "POST",
            "GET",
            "PUT",
            "OPTIONS",
            "HEAD",
            "DELETE"
          ],
          "version": "1.0.0",
          "nodeModule": {

          }
        },
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "nodeService",
          "name": "zosmftracker",
          "serviceLookupMethod": "external",
          "fileName": "zosmf-tracker-service.js",
          "handlerInstaller": "zosmfTrackerServiceInstaller",
          "dependenciesIncluded": true,
          "methods": [
            "GET"
          ],
          "version": "1.0.0",
          "nodeModule": {

          }
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.sample.angular",
      "pluginVersion": "1.0.0",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "sampleangular",
          "pluginShortNameDefault": "Angular Sample",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "sampleangulardescription",
        "descriptionDefault": "Sample App Showcasing Angular Adapter",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 850,
          "height": 450,
          "x": 200,
          "y": 50
        }
      },
      "configurationData": {
        "resources": {
          "requests": {
            "aggregationPolicy": "override",
            "subResources": {
              "app": {
                "aggregationPolicy": "override"
              }
            }
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "hello",
          "filename": "helloWorld.js",
          "routerFactory": "helloWorldRouter",
          "dependenciesIncluded": true,
          "initializerLookupMethod": "external",
          "version": "1.0.0",
          "nodeModule": {
            "__esModule": true
          }
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.sample.react",
      "pluginVersion": "1.0.0",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "react",
        "launchDefinition": {
          "pluginShortNameKey": "samplereact",
          "pluginShortNameDefault": "React Sample",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "SampleReactPluginDescription",
        "descriptionDefault": "Sample App Showcasing React Adapter",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 800,
          "height": 450,
          "x": 200,
          "y": 50
        }
      },
      "configurationData": {
        "resources": {
          "requests": {
            "aggregationPolicy": "override",
            "subResources": {
              "app": {
                "aggregationPolicy": "override"
              }
            }
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "import",
          "sourceName": "hello",
          "localName": "hello",
          "sourcePlugin": "org.zowe.zlux.sample.angular",
          "versionRange": "^1.0.0",
          "version": "1.0.0"
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.sample.iframe",
      "pluginVersion": "1.0.0",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "iframe",
        "launchDefinition": {
          "pluginShortNameKey": "sampleiframe",
          "pluginShortNameDefault": "IFrame Sample",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "Sample App Showcasing IFrame Adapter",
        "descriptionDefault": "Sample App Showcasing IFrame Adapter",
        "startingPage": "html/index.html",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 800,
          "height": 450,
          "x": 200,
          "y": 50
        }
      },
      "configurationData": {
        "resources": {
          "requests": {
            "aggregationPolicy": "override",
            "subResources": {
              "app": {
                "aggregationPolicy": "override"
              }
            }
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "import",
          "sourcePlugin": "org.zowe.zlux.sample.angular",
          "sourceName": "hello",
          "localName": "hello",
          "versionRange": "^1.0.0",
          "version": "1.0.0"
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.ng2desktop",
      "pluginVersion": "0.0.0-zlux.version.replacement",
      "apiVersion": "1.0.0",
      "pluginType": "desktop",
      "copyright": null,
      "webContent": {
        "framework": "angular2"
      },
      "configurationData": {
        "resources": {
          "recognizers": {
            "locationType": "relative",
            "aggregationPolicy": "none"
          },
          "actions": {
            "locationType": "relative",
            "aggregationPolicy": "none"
          },
          "ui": {
            "subResources": {
              "launchbar": {
                "subResources": {
                  "plugins": {
                    "aggregationPolicy": "override",
                    "variable": false,
                    "locationType": "relative"
                  }
                }
              }
            }
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "browser-preferences",
          "filename": "browserPreferences.js",
          "routerFactory": "browserPreferencesRouter",
          "dependenciesIncluded": true,
          "initializerLookupMethod": "external",
          "version": "1.0.0",
          "nodeModule": {
            "__esModule": true
          }
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.logger",
      "pluginVersion": "0.9.0",
      "apiVersion": "1.0.0",
      "pluginType": "library",
      "copyright": null,
      "webContent": null,
      "configurationData": {
        "resources": {
          "logging": {
            "aggregationPolicy": "override"
          }
        }
      },
      "dataServices": null
    },
    {
      "identifier": "org.zowe.zlux.bootstrap",
      "pluginVersion": "0.0.0-zlux.version.replacement",
      "apiVersion": "1.0.0",
      "pluginType": "bootstrap",
      "copyright": null,
      "webContent": {

      },
      "dataServices": [

      ]
    },
    {
      "identifier": "org.zowe.zlux.auth.zss",
      "pluginVersion": "0.9.0",
      "apiVersion": "1.0.0",
      "pluginType": "nodeAuthentication",
      "copyright": null,
      "webContent": null,
      "dataServices": null,
      "filename": "zssAuth.js",
      "authenticationCategory": "zss"
    },
    {
      "identifier": "org.zowe.zlux.proxy.zosmf",
      "pluginVersion": "0.9.0",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": null,
      "dataServices": [
        {
          "configuration": {
            "contents": {
              "authentication.json": {
                "_objectType": "org.zowe.configjs.internal.file",
                "contents": {
                  "authType": "zosmf"
                }
              },
              "remote.json": {
                "_objectType": "org.zowe.configjs.internal.file",
                "contents": {
                  "host": "localhost",
                  "port": "11443"
                }
              }
            }
          },
          "type": "external",
          "name": "data",
          "urlPrefix": "",
          "isHttps": true,
          "version": "1.0.0",
          "host": "localhost",
          "port": "11443"
        }
      ]
    },
    {
      "identifier": "org.zowe.zlux.appmanager.app.propview",
      "pluginVersion": "1.0.0",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "Zowe Viewer",
          "pluginShortNameDefault": "Zowe Viewer",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "Zowe Viewer",
        "descriptionDefault": "Zowe Viewer",
        "defaultWindowStyle": {
          "width": 350,
          "height": 450,
          "x": 0,
          "y": 0
        }
      },
      "dataServices": null
    },
    {
      "identifier": "org.zowe.zossystem.subsystems",
      "pluginVersion": "0.9.4",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "ZOS Subsystems",
          "pluginShortNameDefault": "ZOS Subsystems",
          "imageSrc": "assets/subsystems.png"
        },
        "descriptionKey": "ZOSSubystemsDescription",
        "descriptionDefault": "ZOS Subsystems Plugin",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 950,
          "height": 700,
          "x": 200,
          "y": 50
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "service",
          "name": "data",
          "initializerLookupMethod": "internal",
          "initializerName": "zosDiscoveryServiceInstaller",
          "methods": [
            "GET"
          ],
          "safProfiles": [
            {
              "method": "GET",
              "safClass": "XFACILIT",
              "profile": "MVD.MXI",
              "access": "READ"
            }
          ],
          "version": "1.0.0"
        }
      ]
    },
    {
      "identifier": "org.zowe.terminal.proxy",
      "pluginVersion": "0.0.0-zlux.version.replacement",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": null,
      "configurationData": {
        "resources": {
          "preferences": {
            "locationType": "relative",
            "aggregationPolicy": "override"
          },
          "sessions": {
            "aggregationPolicy": "none",
            "subResources": {
              "sessionName": {
                "variable": true,
                "aggregationPolicy": "none"
              }
            }
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "tn3270data",
          "initializerLookupMethod": "external",
          "fileName": "terminalProxy.js",
          "routerFactory": "tn3270WebsocketRouter",
          "dependenciesIncluded": true,
          "version": "1.0.0",
          "httpCaching": false,
          "nodeModule": {

          }
        },
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "tn5250data",
          "initializerLookupMethod": "external",
          "fileName": "terminalProxy.js",
          "routerFactory": "tn5250WebsocketRouter",
          "dependenciesIncluded": true,
          "version": "1.0.0",
          "httpCaching": false,
          "nodeModule": {

          }
        },
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "vtdata",
          "initializerLookupMethod": "external",
          "fileName": "terminalProxy.js",
          "routerFactory": "vtWebsocketRouter",
          "dependenciesIncluded": true,
          "version": "1.0.0",
          "httpCaching": false,
          "nodeModule": {

          }
        }
      ]
    },
    {
      "identifier": "org.zowe.terminal.vt",
      "pluginVersion": "0.9.4",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "VT Terminal",
          "pluginShortNameDefault": "VT Terminal",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "VT Description",
        "descriptionDefault": "VT Description",
        "defaultWindowStyle": {
          "width": 800,
          "height": 600,
          "x": 200,
          "y": 50
        }
      },
      "configurationData": {
        "resources": {
          "sessions": {
            "locationType": "relative",
            "aggregationPolicy": "override"
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "import",
          "localName": "terminalstream",
          "sourceName": "vtdata",
          "sourcePlugin": "org.zowe.terminal.proxy",
          "versionRange": "^1.0.0",
          "version": "1.0.0"
        }
      ]
    },
    {
      "identifier": "org.zowe.terminal.tn3270",
      "pluginVersion": "0.9.4",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "TN3270",
          "pluginShortNameDefault": "TN3270",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "TN3270 Description",
        "descriptionDefault": "TN3270 Description",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 800,
          "height": 600,
          "x": 200,
          "y": 50
        }
      },
      "configurationData": {
        "resources": {
          "sessions": {
            "locationType": "relative",
            "aggregationPolicy": "override"
          }
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "import",
          "localName": "terminalstream",
          "sourceName": "tn3270data",
          "sourcePlugin": "org.zowe.terminal.proxy",
          "versionRange": "^1.0.0",
          "version": "1.0.0"
        },
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "import",
          "localName": "statediscovery",
          "sourceName": "data",
          "sourcePlugin": "org.zowe.zossystem.subsystems",
          "versionRange": "^1.0.0",
          "version": "1.0.0"
        }
      ]
    },
    {
      "identifier": "org.zowe.editor",
      "pluginVersion": "1.0.1",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": {
        "framework": "angular2",
        "launchDefinition": {
          "pluginShortNameKey": "editorTitle",
          "pluginShortNameDefault": "Editor",
          "imageSrc": "assets/icon.png"
        },
        "descriptionKey": "MyPluginDescription",
        "descriptionDefault": "Zowe Editor",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 1600,
          "height": 800
        }
      },
      "dataServices": null
    },
    {
      "identifier": "org.zowe.configjs",
      "pluginVersion": "0.0.0-zlux.version.replacement",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": null,
      "webContent": null,
      "dataServices": [
        {
          "configuration": {
            "contents": {

            }
          },
          "type": "router",
          "name": "data",
          "initializerLookupMethod": "external",
          "fileName": "configService.js",
          "routerFactory": "configRouter",
          "dependenciesIncluded": true,
          "version": "1.0.0",
          "httpCaching": false,
          "nodeModule": {

          }
        }
      ]
    },
    {
      "identifier": "com.rs.newton.devops",
      "pluginVersion": "v 1.1 PH05068",
      "apiVersion": "1.0.0",
      "pluginType": "application",
      "copyright": "© Copyright IBM Corporation 1996, 2018; Copyright Rocket Software Inc., 1996, 2018",
      "webContent": {
        "framework": "iframe",
        "launchDefinition": {
          "pluginShortNameKey": "Db2DevOpsExperience",
          "pluginShortNameDefault": "Db2 DevOps Experience",
          "imageSrc": "icon-devops.png"
        },
        "descriptionKey": "Db2 DevOps Experience Written in React",
        "descriptionDefault": "Db2 DevOps Experience Written in React",
        "startingPage": "index.html",
        "isSingleWindowApp": true,
        "defaultWindowStyle": {
          "width": 1500,
          "height": 800,
          "x": 200,
          "y": 50
        }
      },
      "dataServices": [
        {
          "configuration": {
            "contents": {
              "authentication.json": {
                "_objectType": "org.zowe.configjs.internal.file",
                "contents": {
                  "authType": "db2",
                  "enabled": true
                }
              },
              "remote.json": {
                "_objectType": "org.zowe.configjs.internal.file",
                "contents": {
                  "host": "localhost",
                  "port": "9876"
                }
              }
            }
          },
          "type": "external",
          "name": "leibniz",
          "version": "1.0.0",
          "urlPrefix": "",
          "isHttps": false,
          "host": "localhost",
          "port": "9876"
        }
      ]
    },
    {
      "identifier": "com.rs.auth.db2Auth",
      "pluginVersion": "1.0",
      "apiVersion": "1.0",
      "pluginType": "nodeAuthentication",
      "copyright": null,
      "webContent": null,
      "dataServices": null,
      "filename": "db2Auth.js",
      "authenticationCategory": "db2"
    }
  ]
}
describe('Test the AppSearchOperator.processResults functionality', () => {
  let appSearch;
  beforeEach(() => {appSearch = new AppSearchOperator("blah");
  // appSearch.getHttp("")= jest.fn();
});
  it('null object returns []', () => {
    expect(appSearch.processResults({}, "2")).toEqual([]);
  });

  it('null input returns []', () => {
    expect(appSearch.processResults(null, "2")).toEqual([]);
  });

  it('undefined input returns []', () => {
    expect(appSearch.processResults(undefined, "2")).toEqual([]);
  });

  it('number input returns []', () => {
    expect(appSearch.processResults(2, "2")).toEqual([]);
  });

  it('string input returns []', () => {
    expect(appSearch.processResults("schnauzer", "2")).toEqual([]);
  });

  it('object.pluginDefinitions of [] input returns []', () => {
    expect(appSearch.processResults({pluginDefinitions:[]}, "2")).toEqual([]);
  });

  it('able to find one application containing the title of editor', () => {
    const result = appSearch.processResults(legitJson, "editor");
    expect(result.length === 1).toBeTruthy();
  });

  it('able to find one application containging the case insensitive title of EdItOr', () => {
    const result = appSearch.processResults(legitJson, "EdItOr");
    expect(result.length === 1).toBeTruthy();
  });

  it('able to find more than one react application', () => {
    const result = appSearch.processResults(legitJson, "reacT");
    expect(result.length > 0).toBeTruthy();
  });

  it('object with only a title returns []', () => {
    const result = appSearch.processResults({"pluginDefinitions":[{"webContent":{"framework":"angular2","launchDefinition":{"pluginShortNameKey":"editorTitle","pluginShortNameDefault":"Editor","imageSrc":"assets/icon.png"},"isSingleWindowApp":true,"defaultWindowStyle":{"width":1600,"height":800}},"dataServices":null}]}, "editor");
    expect(result).toEqual([]);
  });

  it('object without an title returns []', () => {
    const result = appSearch.processResults({"pluginDefinitions":[{"webContent":{"framework":"angular2","launchDefinition":{"pluginShortNameKey":"editorTitle","pluginShortNameDefault":"Editor","imageSrc":"assets/icon.png"},"descriptionKey":"MyPluginDescription","descriptionDefault":"Zowe Editor","isSingleWindowApp":true,"defaultWindowStyle":{"width":1600,"height":800}},"dataServices":null}]}, "editor");
    expect(result).toEqual([]);
  });

  it('object returns length of 1', () => {
    const result = appSearch.processResults({"pluginDefinitions":[{"identifier":"org.zowe.editor","pluginVersion":"1.0.1","apiVersion":"1.0.0","pluginType":"application","copyright":null,"webContent":{"framework":"angular2","launchDefinition":{"pluginShortNameKey":"editorTitle","pluginShortNameDefault":"Editor","imageSrc":"assets/icon.png"},"descriptionKey":"MyPluginDescription","descriptionDefault":"Zowe Editor","isSingleWindowApp":true,"defaultWindowStyle":{"width":1600,"height":800}},"dataServices":null}]}, "editor");
    expect(result.length === 1).toBeTruthy();
  });

});
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
