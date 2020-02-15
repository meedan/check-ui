/**
 * @flow
 * @relayHash 1cf7ad7da16c5b8ec44f41430ff9477e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DestroyTagInput = {|
  clientMutationId?: ?string,
  id?: ?string,
  ids?: ?$ReadOnlyArray<?string>,
|};
export type EntitiesContainerDestroyMutationVariables = {|
  input: DestroyTagInput
|};
export type EntitiesContainerDestroyMutationResponse = {|
  +destroyTag: ?{|
    +deletedId: ?string
  |}
|};
export type EntitiesContainerDestroyMutation = {|
  variables: EntitiesContainerDestroyMutationVariables,
  response: EntitiesContainerDestroyMutationResponse,
|};
*/

/*
mutation EntitiesContainerDestroyMutation(
  $input: DestroyTagInput!
) {
  destroyTag(input: $input) {
    deletedId
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'DestroyTagInput!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'destroyTag',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'DestroyTagPayload',
        plural: false,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'deletedId',
            args: null,
            storageKey: null,
          },
        ],
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'EntitiesContainerDestroyMutation',
      type: 'MutationType',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'EntitiesContainerDestroyMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'mutation',
      name: 'EntitiesContainerDestroyMutation',
      id: null,
      text:
        'mutation EntitiesContainerDestroyMutation(\n  $input: DestroyTagInput!\n) {\n  destroyTag(input: $input) {\n    deletedId\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'b11db06cab415a10fae58b3b670bf58e';
module.exports = node;
