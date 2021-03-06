import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Answer = {
  __typename?: 'Answer';
  answer?: Maybe<Scalars['String']>;
  option?: Maybe<AnswerOption>;
  question: Scalars['String'];
  questionId: Scalars['String'];
  type: QuestionType;
};

export type AnswerInput = {
  answer?: Maybe<Scalars['String']>;
  option?: Maybe<QuestionOptionInput>;
  question: Scalars['String'];
  questionId: Scalars['String'];
  type: QuestionType;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  label: Scalars['String'];
  optionId: Scalars['String'];
  value: Scalars['String'];
};

export type AnswerQuestionInput = {
  answers: Array<AnswerInput>;
};

export type AnswerQuestionResponse = {
  __typename?: 'AnswerQuestionResponse';
  answers: Array<Maybe<Answer>>;
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  profileUrl?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Error = {
  code: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  AuthenticationError = 'AUTHENTICATION_ERROR',
  NetworkError = 'NETWORK_ERROR',
  ServerError = 'SERVER_ERROR',
  UnknownError = 'UNKNOWN_ERROR'
}

export type MultipleChoiceAnswer = {
  label: Scalars['String'];
  optionId: Scalars['String'];
  value: Scalars['String'];
};

export type MultipleChoiceInput = {
  answer: MultipleChoiceAnswer;
  question: Scalars['String'];
  questionId: Scalars['String'];
  type?: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  answerQuestions: AnswerQuestionResponse;
  createUser: User;
  updateMe: User;
};


export type MutationAnswerQuestionsArgs = {
  data: AnswerQuestionInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
};

export type PublicUser = {
  __typename?: 'PublicUser';
  answers: Array<Answer>;
  createdAt: Scalars['Date'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  profileUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  activeQuestions: Array<Maybe<Question>>;
  getByUsername: PublicUser;
  me: User;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['String'];
  options?: Maybe<Array<Maybe<QuestionOption>>>;
  required: Scalars['Boolean'];
  title: Scalars['String'];
  type: QuestionType;
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  id: Scalars['String'];
  label: Scalars['String'];
  value: Scalars['String'];
};

export type QuestionOptionInput = {
  id: Scalars['String'];
  label: Scalars['String'];
  value: Scalars['String'];
};

export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  ShortAnswer = 'ShortAnswer'
}

export type UpdateUserInput = {
  profileUrl?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  answers?: Maybe<Array<Maybe<Answer>>>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

export enum UserAuthProvider {
  Firebase = 'Firebase'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  AnswerInput: AnswerInput;
  AnswerOption: ResolverTypeWrapper<AnswerOption>;
  AnswerQuestionInput: AnswerQuestionInput;
  AnswerQuestionResponse: ResolverTypeWrapper<AnswerQuestionResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Error: never;
  ErrorCode: ErrorCode;
  MultipleChoiceAnswer: MultipleChoiceAnswer;
  MultipleChoiceInput: MultipleChoiceInput;
  Mutation: ResolverTypeWrapper<{}>;
  PublicUser: ResolverTypeWrapper<PublicUser>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionOption: ResolverTypeWrapper<QuestionOption>;
  QuestionOptionInput: QuestionOptionInput;
  QuestionType: QuestionType;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserAuthProvider: UserAuthProvider;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  AnswerInput: AnswerInput;
  AnswerOption: AnswerOption;
  AnswerQuestionInput: AnswerQuestionInput;
  AnswerQuestionResponse: AnswerQuestionResponse;
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  Error: never;
  MultipleChoiceAnswer: MultipleChoiceAnswer;
  MultipleChoiceInput: MultipleChoiceInput;
  Mutation: {};
  PublicUser: PublicUser;
  Query: {};
  Question: Question;
  QuestionOption: QuestionOption;
  QuestionOptionInput: QuestionOptionInput;
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  answer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  option?: Resolver<Maybe<ResolversTypes['AnswerOption']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['QuestionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerOption'] = ResolversParentTypes['AnswerOption']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  optionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerQuestionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerQuestionResponse'] = ResolversParentTypes['AnswerQuestionResponse']> = {
  answers?: Resolver<Array<Maybe<ResolversTypes['Answer']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['ErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answerQuestions?: Resolver<ResolversTypes['AnswerQuestionResponse'], ParentType, ContextType, RequireFields<MutationAnswerQuestionsArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  updateMe?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateMeArgs, 'data'>>;
};

export type PublicUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicUser'] = ResolversParentTypes['PublicUser']> = {
  answers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activeQuestions?: Resolver<Array<Maybe<ResolversTypes['Question']>>, ParentType, ContextType>;
  getByUsername?: Resolver<ResolversTypes['PublicUser'], ParentType, ContextType, RequireFields<QueryGetByUsernameArgs, 'username'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['QuestionOption']>>>, ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['QuestionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuestionOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuestionOption'] = ResolversParentTypes['QuestionOption']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Answer']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  AnswerOption?: AnswerOptionResolvers<ContextType>;
  AnswerQuestionResponse?: AnswerQuestionResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PublicUser?: PublicUserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  QuestionOption?: QuestionOptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

