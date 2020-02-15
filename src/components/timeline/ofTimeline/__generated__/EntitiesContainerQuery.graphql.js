/**
 * @flow
 * @relayHash fb78cbe931c068c5e890f4a04847ca04
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EntitiesContainerQueryVariables = {|
  ids: string
|};
export type EntitiesContainerQueryResponse = {|
  +project_media: ?{|
    +tags: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +fragment: ?string,
          +tag_text_object: ?{|
            +id: string,
            +text: ?string,
          |},
        |}
      |}>
    |}
  |}
|};
export type EntitiesContainerQuery = {|
  variables: EntitiesContainerQueryVariables,
  response: EntitiesContainerQueryResponse,
|};
*/

/*
query EntitiesContainerQuery(
  $ids: String!
) {
  project_media(ids: $ids) {
    tags(first: 10000) {
      edges {
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
    id
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'ids',
        type: 'String!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'ids',
        variableName: 'ids',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: 'LinkedField',
      alias: null,
      name: 'tags',
      storageKey: 'tags(first:10000)',
      args: [
        {
          kind: 'Literal',
          name: 'first',
          value: 10000,
        },
      ],
      concreteType: 'TagConnection',
      plural: false,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'edges',
          storageKey: null,
          args: null,
          concreteType: 'TagEdge',
          plural: true,
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
                (v2 /*: any*/),
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
                    (v2 /*: any*/),
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
    };
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'EntitiesContainerQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'project_media',
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: 'ProjectMedia',
          plural: false,
          selections: [(v3 /*: any*/)],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'EntitiesContainerQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'project_media',
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: 'ProjectMedia',
          plural: false,
          selections: [(v3 /*: any*/), (v2 /*: any*/)],
        },
      ],
    },
    params: {
      operationKind: 'query',
      name: 'EntitiesContainerQuery',
      id: null,
      text:
        'query EntitiesContainerQuery(\n  $ids: String!\n) {\n  project_media(ids: $ids) {\n    tags(first: 10000) {\n      edges {\n        node {\n          id\n          fragment\n          tag_text_object {\n            id\n            text\n          }\n        }\n      }\n    }\n    id\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'ebd37d34a6c1f5e15087b30b8dc1c0b5';
module.exports = node;
