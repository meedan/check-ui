/**
 * @flow
 * @relayHash 9c379b9783b33711ec48ca45b457c071
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateTagInput = {|
  clientMutationId?: ?string,
  id?: ?string,
  ids?: ?$ReadOnlyArray<?string>,
  no_freeze?: ?boolean,
  tag: string,
  fragment?: ?string,
  annotated_id?: ?string,
  annotated_type?: ?string,
|};
export type EntitiesContainerCreateInstanceMutationVariables = {|
  input: CreateTagInput
|};
export type EntitiesContainerCreateInstanceMutationResponse = {|
  +createTag: ?{|
    +tagEdge: ?{|
      +node: ?{|
        +id: string,
        +fragment: ?string,
        +tag_text_object: ?{|
          +id: string,
          +text: ?string,
        |},
      |}
    |}
  |}
|};
export type EntitiesContainerCreateInstanceMutation = {|
  variables: EntitiesContainerCreateInstanceMutationVariables,
  response: EntitiesContainerCreateInstanceMutationResponse,
|};
*/

/*
mutation EntitiesContainerCreateInstanceMutation(
  $input: CreateTagInput!
) {
  createTag(input: $input) {
    tagEdge {
      node {
        id
        fragment
        tag_text_object {
          id
          text
        }
      }
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'CreateTagInput!',
        defaultValue: null,
      },
    ],
    v1 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    },
    v2 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'createTag',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'CreateTagPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'tagEdge',
            storageKey: null,
            args: null,
            concreteType: 'TagEdge',
            plural: false,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                name: 'node',
                storageKey: null,
                args: null,
                concreteType: 'Tag',
                plural: false,
                selections: [
                  (v1 /*: any*/),
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: 'fragment',
                    args: null,
                    storageKey: null,
                  },
                  {
                    kind: 'LinkedField',
                    alias: null,
                    name: 'tag_text_object',
                    storageKey: null,
                    args: null,
                    concreteType: 'TagText',
                    plural: false,
                    selections: [
                      (v1 /*: any*/),
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
            ],
          },
        ],
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'EntitiesContainerCreateInstanceMutation',
      type: 'MutationType',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v2 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'EntitiesContainerCreateInstanceMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v2 /*: any*/),
    },
    params: {
      operationKind: 'mutation',
      name: 'EntitiesContainerCreateInstanceMutation',
      id: null,
      text:
        'mutation EntitiesContainerCreateInstanceMutation(\n  $input: CreateTagInput!\n) {\n  createTag(input: $input) {\n    tagEdge {\n      node {\n        id\n        fragment\n        tag_text_object {\n          id\n          text\n        }\n      }\n    }\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '95820320512a9a287280c5a053f08abe';
module.exports = node;
