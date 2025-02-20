/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetSession {\n    session {\n      userId\n    }\n  }\n": typeof types.GetSessionDocument,
    "\n  query GetTickets {\n    getTickets {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetTicketsDocument,
    "\n  mutation CreateTicket($title: String! $deadline: DateTime $description: String) {\n    create(input: {\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateTicketDocument,
    "\n  mutation UpdateTicket($ticketId: Int! $title: String $deadline: DateTime $description: String) {\n    update(input: {\n      ticketId: $ticketId\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateTicketDocument,
    "\n  mutation DeleteTicket($ticketId: Int!) {\n    delete(input: {\n      ticketId: $ticketId\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.DeleteTicketDocument,
};
const documents: Documents = {
    "\n  query GetSession {\n    session {\n      userId\n    }\n  }\n": types.GetSessionDocument,
    "\n  query GetTickets {\n    getTickets {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetTicketsDocument,
    "\n  mutation CreateTicket($title: String! $deadline: DateTime $description: String) {\n    create(input: {\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateTicketDocument,
    "\n  mutation UpdateTicket($ticketId: Int! $title: String $deadline: DateTime $description: String) {\n    update(input: {\n      ticketId: $ticketId\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateTicketDocument,
    "\n  mutation DeleteTicket($ticketId: Int!) {\n    delete(input: {\n      ticketId: $ticketId\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n": types.DeleteTicketDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSession {\n    session {\n      userId\n    }\n  }\n"): (typeof documents)["\n  query GetSession {\n    session {\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTickets {\n    getTickets {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetTickets {\n    getTickets {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTicket($title: String! $deadline: DateTime $description: String) {\n    create(input: {\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTicket($title: String! $deadline: DateTime $description: String) {\n    create(input: {\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTicket($ticketId: Int! $title: String $deadline: DateTime $description: String) {\n    update(input: {\n      ticketId: $ticketId\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTicket($ticketId: Int! $title: String $deadline: DateTime $description: String) {\n    update(input: {\n      ticketId: $ticketId\n      title: $title\n      description: $description\n      deadline: $deadline\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTicket($ticketId: Int!) {\n    delete(input: {\n      ticketId: $ticketId\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTicket($ticketId: Int!) {\n    delete(input: {\n      ticketId: $ticketId\n    }) {\n      ticketId\n      title\n      description\n      deadline\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
