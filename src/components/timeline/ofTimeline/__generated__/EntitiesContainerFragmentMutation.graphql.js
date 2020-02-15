/**
 * @flow
 * @relayHash 7d24fc00858453188b1a61fbe9d04ac9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateTagInput = {|
  clientMutationId?: ?string,
  id?: ?string,
  ids?: ?$ReadOnlyArray<?string>,
  no_freeze?: ?boolean,
  tag?: ?string,
  fragment?: ?string,
  annotated_id?: ?string,
  annotated_type?: ?string,
|};
export type EntitiesContainerFragmentMutationVariables = {|
  input: UpdateTagInput
|};
export type EntitiesContainerFragmentMutationResponse = {|
  +updateTag: ?{|
    +tag: ?{|
      +id: string,
      +fragment: ?string,
    |}
  |}
|};
export type EntitiesContainerFragmentMutation = {|
  variables: EntitiesContainerFragmentMutationVariables,
  response: EntitiesContainerFragmentMutationResponse,
|};
*/

/*
mutation EntitiesContainerFragmentMutation(
  $input: UpdateTagInput!
) {
  updateTag(input: $input) {
    tag {
      id
      fragment
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'UpdateTagInput!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'updateTag',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'UpdateTagPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'tag',
            storageKey: null,
            args: null,
            concreteType: 'Tag',
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
                name: 'fragment',
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
      name: 'EntitiesContainerFragmentMutation',
      type: 'MutationType',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'EntitiesContainerFragmentMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'mutation',
      name: 'EntitiesContainerFragmentMutation',
      id: null,
      text:
        'mutation EntitiesContainerFragmentMutation(\n  $input: UpdateTagInput!\n) {\n  updateTag(input: $input) {\n    tag {\n      id\n      fragment\n    }\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'fed19e758bb9641c741c647711ff2d68';
module.exports = node;
