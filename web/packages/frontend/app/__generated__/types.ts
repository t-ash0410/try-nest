export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateTicketInput = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteTicketInput = {
  ticketId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: TicketModel;
  delete: TicketModel;
  deleteSession: SessionModel;
  update: TicketModel;
};


export type MutationCreateArgs = {
  input: CreateTicketInput;
};


export type MutationDeleteArgs = {
  input: DeleteTicketInput;
};


export type MutationUpdateArgs = {
  input: UpdateTicketInput;
};

export type Query = {
  __typename?: 'Query';
  getTickets?: Maybe<Array<TicketModel>>;
  session?: Maybe<SessionModel>;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  userId: Scalars['Int']['output'];
};

export type TicketModel = {
  __typename?: 'TicketModel';
  createdAt: Scalars['DateTime']['output'];
  deadline?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  ticketId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateTicketInput = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ticketId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', session?: { __typename?: 'SessionModel', userId: number } | null };

export type GetTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsQuery = { __typename?: 'Query', getTickets?: Array<{ __typename?: 'TicketModel', ticketId: number, title: string, description?: string | null, deadline?: any | null, createdAt: any, updatedAt: any }> | null };

export type CreateTicketMutationVariables = Exact<{
  title: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', create: { __typename?: 'TicketModel', ticketId: number, title: string, description?: string | null, deadline?: any | null, createdAt: any, updatedAt: any } };

export type UpdateTicketMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', update: { __typename?: 'TicketModel', ticketId: number, title: string, description?: string | null, deadline?: any | null, createdAt: any, updatedAt: any } };

export type DeleteTicketMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', delete: { __typename?: 'TicketModel', ticketId: number, title: string, description?: string | null, deadline?: any | null, createdAt: any, updatedAt: any } };
