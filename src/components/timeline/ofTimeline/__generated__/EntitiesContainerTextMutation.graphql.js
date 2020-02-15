/**
 * @flow
 * @relayHash 85cb254e89edb7264bc5c06afff88026
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateTagTextInput = {|
  clientMutationId?: ?string,
  id?: ?string,
  ids?: ?$ReadOnlyArray<?string>,
  no_freeze?: ?boolean,
  teamwide?: ?boolean,
  text?: ?string,
|};
export type EntitiesContainerTextMutationVariables = {|
  input: UpdateTagTextInput
|};
export type EntitiesContainerTextMutationResponse = {|
  +updateTagText: ?{|
    +tag_text: ?{|
      +id: string,
      +text: ?string,
    |}
  |}
|};
export type EntitiesContainerTextMutation = {|
  variables: EntitiesContainerTextMutationVariables,
  response: EntitiesContainerTextMutationResponse,
|};
*/

/*
mutation EntitiesContainerTextMutation(
  $input: UpdateTagTextInput!
) {
  updateTagText(input: $input) {
    tag_text {
      id
      text
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'UpdateTagTextInput!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'updateTagText',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'UpdateTagTextPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'tag_text',
            storageKey: null,
            args: null,
            concreteType: 'TagText',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'id',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'text',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'EntitiesContainerTextMutation',
      type: 'MutationType',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'EntitiesContainerTextMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'mutation',
      name: 'EntitiesContainerTextMutation',
      id: null,
      text:
        'mutation EntitiesContainerTextMutation(\n  $input: UpdateTagTextInput!\n) {\n  updateTagText(input: $input) {\n    tag_text {\n      id\n      text\n    }\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '9b14c75233c39b0fd9141a63c985628d';
module.exports = node;
