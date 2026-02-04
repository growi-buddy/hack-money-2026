
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model PayoutRate
 * 
 */
export type PayoutRate = $Result.DefaultSelection<Prisma.$PayoutRatePayload>
/**
 * Model Participation
 * 
 */
export type Participation = $Result.DefaultSelection<Prisma.$ParticipationPayload>
/**
 * Model TrackingLink
 * 
 */
export type TrackingLink = $Result.DefaultSelection<Prisma.$TrackingLinkPayload>
/**
 * Model AnalyticsEvent
 * 
 */
export type AnalyticsEvent = $Result.DefaultSelection<Prisma.$AnalyticsEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EventType: {
  VISIT_PAGE: 'VISIT_PAGE',
  ADD_CART: 'ADD_CART',
  BUY_PRODUCT: 'BUY_PRODUCT',
  SIGNUP: 'SIGNUP'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const CampaignStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DEPLETED: 'DEPLETED',
  DELETED: 'DELETED'
};

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]

}

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type CampaignStatus = $Enums.CampaignStatus

export const CampaignStatus: typeof $Enums.CampaignStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payoutRate`: Exposes CRUD operations for the **PayoutRate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayoutRates
    * const payoutRates = await prisma.payoutRate.findMany()
    * ```
    */
  get payoutRate(): Prisma.PayoutRateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participation`: Exposes CRUD operations for the **Participation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participations
    * const participations = await prisma.participation.findMany()
    * ```
    */
  get participation(): Prisma.ParticipationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trackingLink`: Exposes CRUD operations for the **TrackingLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackingLinks
    * const trackingLinks = await prisma.trackingLink.findMany()
    * ```
    */
  get trackingLink(): Prisma.TrackingLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analyticsEvent`: Exposes CRUD operations for the **AnalyticsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsEvents
    * const analyticsEvents = await prisma.analyticsEvent.findMany()
    * ```
    */
  get analyticsEvent(): Prisma.AnalyticsEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Campaign: 'Campaign',
    PayoutRate: 'PayoutRate',
    Participation: 'Participation',
    TrackingLink: 'TrackingLink',
    AnalyticsEvent: 'AnalyticsEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "campaign" | "payoutRate" | "participation" | "trackingLink" | "analyticsEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      PayoutRate: {
        payload: Prisma.$PayoutRatePayload<ExtArgs>
        fields: Prisma.PayoutRateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutRateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutRateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          findFirst: {
            args: Prisma.PayoutRateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutRateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          findMany: {
            args: Prisma.PayoutRateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>[]
          }
          create: {
            args: Prisma.PayoutRateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          createMany: {
            args: Prisma.PayoutRateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayoutRateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>[]
          }
          delete: {
            args: Prisma.PayoutRateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          update: {
            args: Prisma.PayoutRateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          deleteMany: {
            args: Prisma.PayoutRateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutRateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayoutRateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>[]
          }
          upsert: {
            args: Prisma.PayoutRateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutRatePayload>
          }
          aggregate: {
            args: Prisma.PayoutRateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayoutRate>
          }
          groupBy: {
            args: Prisma.PayoutRateGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutRateGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutRateCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutRateCountAggregateOutputType> | number
          }
        }
      }
      Participation: {
        payload: Prisma.$ParticipationPayload<ExtArgs>
        fields: Prisma.ParticipationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          findFirst: {
            args: Prisma.ParticipationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          findMany: {
            args: Prisma.ParticipationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>[]
          }
          create: {
            args: Prisma.ParticipationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          createMany: {
            args: Prisma.ParticipationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParticipationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>[]
          }
          delete: {
            args: Prisma.ParticipationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          update: {
            args: Prisma.ParticipationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          deleteMany: {
            args: Prisma.ParticipationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParticipationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>[]
          }
          upsert: {
            args: Prisma.ParticipationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          aggregate: {
            args: Prisma.ParticipationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipation>
          }
          groupBy: {
            args: Prisma.ParticipationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipationCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipationCountAggregateOutputType> | number
          }
        }
      }
      TrackingLink: {
        payload: Prisma.$TrackingLinkPayload<ExtArgs>
        fields: Prisma.TrackingLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          findFirst: {
            args: Prisma.TrackingLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          findMany: {
            args: Prisma.TrackingLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>[]
          }
          create: {
            args: Prisma.TrackingLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          createMany: {
            args: Prisma.TrackingLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackingLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>[]
          }
          delete: {
            args: Prisma.TrackingLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          update: {
            args: Prisma.TrackingLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          deleteMany: {
            args: Prisma.TrackingLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackingLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>[]
          }
          upsert: {
            args: Prisma.TrackingLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingLinkPayload>
          }
          aggregate: {
            args: Prisma.TrackingLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackingLink>
          }
          groupBy: {
            args: Prisma.TrackingLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingLinkCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingLinkCountAggregateOutputType> | number
          }
        }
      }
      AnalyticsEvent: {
        payload: Prisma.$AnalyticsEventPayload<ExtArgs>
        fields: Prisma.AnalyticsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findMany: {
            args: Prisma.AnalyticsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          create: {
            args: Prisma.AnalyticsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          createMany: {
            args: Prisma.AnalyticsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          update: {
            args: Prisma.AnalyticsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsEvent>
          }
          groupBy: {
            args: Prisma.AnalyticsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsEventCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    campaign?: CampaignOmit
    payoutRate?: PayoutRateOmit
    participation?: ParticipationOmit
    trackingLink?: TrackingLinkOmit
    analyticsEvent?: AnalyticsEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    campaignsCreated: number
    participations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignsCreated?: boolean | UserCountOutputTypeCountCampaignsCreatedArgs
    participations?: boolean | UserCountOutputTypeCountParticipationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampaignsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    payoutRates: number
    participations: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payoutRates?: boolean | CampaignCountOutputTypeCountPayoutRatesArgs
    participations?: boolean | CampaignCountOutputTypeCountParticipationsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountPayoutRatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutRateWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
  }


  /**
   * Count Type ParticipationCountOutputType
   */

  export type ParticipationCountOutputType = {
    links: number
    events: number
  }

  export type ParticipationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | ParticipationCountOutputTypeCountLinksArgs
    events?: boolean | ParticipationCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * ParticipationCountOutputType without action
   */
  export type ParticipationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipationCountOutputType
     */
    select?: ParticipationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParticipationCountOutputType without action
   */
  export type ParticipationCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingLinkWhereInput
  }

  /**
   * ParticipationCountOutputType without action
   */
  export type ParticipationCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    walletAddress: number
    name: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    walletAddress?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    walletAddress?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    walletAddress: string
    name: string | null
    email: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaignsCreated?: boolean | User$campaignsCreatedArgs<ExtArgs>
    participations?: boolean | User$participationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "name" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignsCreated?: boolean | User$campaignsCreatedArgs<ExtArgs>
    participations?: boolean | User$participationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      campaignsCreated: Prisma.$CampaignPayload<ExtArgs>[]
      participations: Prisma.$ParticipationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      name: string | null
      email: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaignsCreated<T extends User$campaignsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$campaignsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    participations<T extends User$participationsArgs<ExtArgs> = {}>(args?: Subset<T, User$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.campaignsCreated
   */
  export type User$campaignsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * User.participations
   */
  export type User$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    cursor?: ParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    budgetTotal: Decimal | null
  }

  export type CampaignSumAggregateOutputType = {
    budgetTotal: Decimal | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    brandId: string | null
    title: string | null
    escrowAddress: string | null
    budgetTotal: Decimal | null
    yellowChannelId: string | null
    status: $Enums.CampaignStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    brandId: string | null
    title: string | null
    escrowAddress: string | null
    budgetTotal: Decimal | null
    yellowChannelId: string | null
    status: $Enums.CampaignStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    brandId: number
    title: number
    escrowAddress: number
    budgetTotal: number
    yellowChannelId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    budgetTotal?: true
  }

  export type CampaignSumAggregateInputType = {
    budgetTotal?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    brandId?: true
    title?: true
    escrowAddress?: true
    budgetTotal?: true
    yellowChannelId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    brandId?: true
    title?: true
    escrowAddress?: true
    budgetTotal?: true
    yellowChannelId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    brandId?: true
    title?: true
    escrowAddress?: true
    budgetTotal?: true
    yellowChannelId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    brandId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal
    yellowChannelId: string | null
    status: $Enums.CampaignStatus
    createdAt: Date
    updatedAt: Date
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | UserDefaultArgs<ExtArgs>
    payoutRates?: boolean | Campaign$payoutRatesArgs<ExtArgs>
    participations?: boolean | Campaign$participationsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    brandId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brandId" | "title" | "escrowAddress" | "budgetTotal" | "yellowChannelId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | UserDefaultArgs<ExtArgs>
    payoutRates?: boolean | Campaign$payoutRatesArgs<ExtArgs>
    participations?: boolean | Campaign$participationsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      brand: Prisma.$UserPayload<ExtArgs>
      payoutRates: Prisma.$PayoutRatePayload<ExtArgs>[]
      participations: Prisma.$ParticipationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      brandId: string
      title: string
      escrowAddress: string
      budgetTotal: Prisma.Decimal
      yellowChannelId: string | null
      status: $Enums.CampaignStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payoutRates<T extends Campaign$payoutRatesArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$payoutRatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    participations<T extends Campaign$participationsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly brandId: FieldRef<"Campaign", 'String'>
    readonly title: FieldRef<"Campaign", 'String'>
    readonly escrowAddress: FieldRef<"Campaign", 'String'>
    readonly budgetTotal: FieldRef<"Campaign", 'Decimal'>
    readonly yellowChannelId: FieldRef<"Campaign", 'String'>
    readonly status: FieldRef<"Campaign", 'CampaignStatus'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.payoutRates
   */
  export type Campaign$payoutRatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    where?: PayoutRateWhereInput
    orderBy?: PayoutRateOrderByWithRelationInput | PayoutRateOrderByWithRelationInput[]
    cursor?: PayoutRateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutRateScalarFieldEnum | PayoutRateScalarFieldEnum[]
  }

  /**
   * Campaign.participations
   */
  export type Campaign$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    cursor?: ParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model PayoutRate
   */

  export type AggregatePayoutRate = {
    _count: PayoutRateCountAggregateOutputType | null
    _avg: PayoutRateAvgAggregateOutputType | null
    _sum: PayoutRateSumAggregateOutputType | null
    _min: PayoutRateMinAggregateOutputType | null
    _max: PayoutRateMaxAggregateOutputType | null
  }

  export type PayoutRateAvgAggregateOutputType = {
    amount: Decimal | null
    volumeStep: number | null
  }

  export type PayoutRateSumAggregateOutputType = {
    amount: Decimal | null
    volumeStep: number | null
  }

  export type PayoutRateMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    eventType: $Enums.EventType | null
    amount: Decimal | null
    volumeStep: number | null
    createdAt: Date | null
  }

  export type PayoutRateMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    eventType: $Enums.EventType | null
    amount: Decimal | null
    volumeStep: number | null
    createdAt: Date | null
  }

  export type PayoutRateCountAggregateOutputType = {
    id: number
    campaignId: number
    eventType: number
    amount: number
    volumeStep: number
    createdAt: number
    _all: number
  }


  export type PayoutRateAvgAggregateInputType = {
    amount?: true
    volumeStep?: true
  }

  export type PayoutRateSumAggregateInputType = {
    amount?: true
    volumeStep?: true
  }

  export type PayoutRateMinAggregateInputType = {
    id?: true
    campaignId?: true
    eventType?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
  }

  export type PayoutRateMaxAggregateInputType = {
    id?: true
    campaignId?: true
    eventType?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
  }

  export type PayoutRateCountAggregateInputType = {
    id?: true
    campaignId?: true
    eventType?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
    _all?: true
  }

  export type PayoutRateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutRate to aggregate.
     */
    where?: PayoutRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutRates to fetch.
     */
    orderBy?: PayoutRateOrderByWithRelationInput | PayoutRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayoutRates
    **/
    _count?: true | PayoutRateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutRateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutRateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutRateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutRateMaxAggregateInputType
  }

  export type GetPayoutRateAggregateType<T extends PayoutRateAggregateArgs> = {
        [P in keyof T & keyof AggregatePayoutRate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayoutRate[P]>
      : GetScalarType<T[P], AggregatePayoutRate[P]>
  }




  export type PayoutRateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutRateWhereInput
    orderBy?: PayoutRateOrderByWithAggregationInput | PayoutRateOrderByWithAggregationInput[]
    by: PayoutRateScalarFieldEnum[] | PayoutRateScalarFieldEnum
    having?: PayoutRateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutRateCountAggregateInputType | true
    _avg?: PayoutRateAvgAggregateInputType
    _sum?: PayoutRateSumAggregateInputType
    _min?: PayoutRateMinAggregateInputType
    _max?: PayoutRateMaxAggregateInputType
  }

  export type PayoutRateGroupByOutputType = {
    id: string
    campaignId: string
    eventType: $Enums.EventType
    amount: Decimal
    volumeStep: number
    createdAt: Date
    _count: PayoutRateCountAggregateOutputType | null
    _avg: PayoutRateAvgAggregateOutputType | null
    _sum: PayoutRateSumAggregateOutputType | null
    _min: PayoutRateMinAggregateOutputType | null
    _max: PayoutRateMaxAggregateOutputType | null
  }

  type GetPayoutRateGroupByPayload<T extends PayoutRateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutRateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutRateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutRateGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutRateGroupByOutputType[P]>
        }
      >
    >


  export type PayoutRateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    eventType?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payoutRate"]>

  export type PayoutRateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    eventType?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payoutRate"]>

  export type PayoutRateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    eventType?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payoutRate"]>

  export type PayoutRateSelectScalar = {
    id?: boolean
    campaignId?: boolean
    eventType?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
  }

  export type PayoutRateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "eventType" | "amount" | "volumeStep" | "createdAt", ExtArgs["result"]["payoutRate"]>
  export type PayoutRateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type PayoutRateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type PayoutRateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $PayoutRatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayoutRate"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      eventType: $Enums.EventType
      amount: Prisma.Decimal
      volumeStep: number
      createdAt: Date
    }, ExtArgs["result"]["payoutRate"]>
    composites: {}
  }

  type PayoutRateGetPayload<S extends boolean | null | undefined | PayoutRateDefaultArgs> = $Result.GetResult<Prisma.$PayoutRatePayload, S>

  type PayoutRateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutRateCountAggregateInputType | true
    }

  export interface PayoutRateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayoutRate'], meta: { name: 'PayoutRate' } }
    /**
     * Find zero or one PayoutRate that matches the filter.
     * @param {PayoutRateFindUniqueArgs} args - Arguments to find a PayoutRate
     * @example
     * // Get one PayoutRate
     * const payoutRate = await prisma.payoutRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutRateFindUniqueArgs>(args: SelectSubset<T, PayoutRateFindUniqueArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PayoutRate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutRateFindUniqueOrThrowArgs} args - Arguments to find a PayoutRate
     * @example
     * // Get one PayoutRate
     * const payoutRate = await prisma.payoutRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutRateFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayoutRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateFindFirstArgs} args - Arguments to find a PayoutRate
     * @example
     * // Get one PayoutRate
     * const payoutRate = await prisma.payoutRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutRateFindFirstArgs>(args?: SelectSubset<T, PayoutRateFindFirstArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayoutRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateFindFirstOrThrowArgs} args - Arguments to find a PayoutRate
     * @example
     * // Get one PayoutRate
     * const payoutRate = await prisma.payoutRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutRateFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutRateFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PayoutRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoutRates
     * const payoutRates = await prisma.payoutRate.findMany()
     * 
     * // Get first 10 PayoutRates
     * const payoutRates = await prisma.payoutRate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutRateWithIdOnly = await prisma.payoutRate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutRateFindManyArgs>(args?: SelectSubset<T, PayoutRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PayoutRate.
     * @param {PayoutRateCreateArgs} args - Arguments to create a PayoutRate.
     * @example
     * // Create one PayoutRate
     * const PayoutRate = await prisma.payoutRate.create({
     *   data: {
     *     // ... data to create a PayoutRate
     *   }
     * })
     * 
     */
    create<T extends PayoutRateCreateArgs>(args: SelectSubset<T, PayoutRateCreateArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PayoutRates.
     * @param {PayoutRateCreateManyArgs} args - Arguments to create many PayoutRates.
     * @example
     * // Create many PayoutRates
     * const payoutRate = await prisma.payoutRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutRateCreateManyArgs>(args?: SelectSubset<T, PayoutRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PayoutRates and returns the data saved in the database.
     * @param {PayoutRateCreateManyAndReturnArgs} args - Arguments to create many PayoutRates.
     * @example
     * // Create many PayoutRates
     * const payoutRate = await prisma.payoutRate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PayoutRates and only return the `id`
     * const payoutRateWithIdOnly = await prisma.payoutRate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayoutRateCreateManyAndReturnArgs>(args?: SelectSubset<T, PayoutRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PayoutRate.
     * @param {PayoutRateDeleteArgs} args - Arguments to delete one PayoutRate.
     * @example
     * // Delete one PayoutRate
     * const PayoutRate = await prisma.payoutRate.delete({
     *   where: {
     *     // ... filter to delete one PayoutRate
     *   }
     * })
     * 
     */
    delete<T extends PayoutRateDeleteArgs>(args: SelectSubset<T, PayoutRateDeleteArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PayoutRate.
     * @param {PayoutRateUpdateArgs} args - Arguments to update one PayoutRate.
     * @example
     * // Update one PayoutRate
     * const payoutRate = await prisma.payoutRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutRateUpdateArgs>(args: SelectSubset<T, PayoutRateUpdateArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PayoutRates.
     * @param {PayoutRateDeleteManyArgs} args - Arguments to filter PayoutRates to delete.
     * @example
     * // Delete a few PayoutRates
     * const { count } = await prisma.payoutRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutRateDeleteManyArgs>(args?: SelectSubset<T, PayoutRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayoutRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoutRates
     * const payoutRate = await prisma.payoutRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutRateUpdateManyArgs>(args: SelectSubset<T, PayoutRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayoutRates and returns the data updated in the database.
     * @param {PayoutRateUpdateManyAndReturnArgs} args - Arguments to update many PayoutRates.
     * @example
     * // Update many PayoutRates
     * const payoutRate = await prisma.payoutRate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PayoutRates and only return the `id`
     * const payoutRateWithIdOnly = await prisma.payoutRate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PayoutRateUpdateManyAndReturnArgs>(args: SelectSubset<T, PayoutRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PayoutRate.
     * @param {PayoutRateUpsertArgs} args - Arguments to update or create a PayoutRate.
     * @example
     * // Update or create a PayoutRate
     * const payoutRate = await prisma.payoutRate.upsert({
     *   create: {
     *     // ... data to create a PayoutRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoutRate we want to update
     *   }
     * })
     */
    upsert<T extends PayoutRateUpsertArgs>(args: SelectSubset<T, PayoutRateUpsertArgs<ExtArgs>>): Prisma__PayoutRateClient<$Result.GetResult<Prisma.$PayoutRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PayoutRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateCountArgs} args - Arguments to filter PayoutRates to count.
     * @example
     * // Count the number of PayoutRates
     * const count = await prisma.payoutRate.count({
     *   where: {
     *     // ... the filter for the PayoutRates we want to count
     *   }
     * })
    **/
    count<T extends PayoutRateCountArgs>(
      args?: Subset<T, PayoutRateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutRateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayoutRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayoutRateAggregateArgs>(args: Subset<T, PayoutRateAggregateArgs>): Prisma.PrismaPromise<GetPayoutRateAggregateType<T>>

    /**
     * Group by PayoutRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutRateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayoutRateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutRateGroupByArgs['orderBy'] }
        : { orderBy?: PayoutRateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayoutRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayoutRate model
   */
  readonly fields: PayoutRateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayoutRate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutRateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PayoutRate model
   */
  interface PayoutRateFieldRefs {
    readonly id: FieldRef<"PayoutRate", 'String'>
    readonly campaignId: FieldRef<"PayoutRate", 'String'>
    readonly eventType: FieldRef<"PayoutRate", 'EventType'>
    readonly amount: FieldRef<"PayoutRate", 'Decimal'>
    readonly volumeStep: FieldRef<"PayoutRate", 'Int'>
    readonly createdAt: FieldRef<"PayoutRate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PayoutRate findUnique
   */
  export type PayoutRateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter, which PayoutRate to fetch.
     */
    where: PayoutRateWhereUniqueInput
  }

  /**
   * PayoutRate findUniqueOrThrow
   */
  export type PayoutRateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter, which PayoutRate to fetch.
     */
    where: PayoutRateWhereUniqueInput
  }

  /**
   * PayoutRate findFirst
   */
  export type PayoutRateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter, which PayoutRate to fetch.
     */
    where?: PayoutRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutRates to fetch.
     */
    orderBy?: PayoutRateOrderByWithRelationInput | PayoutRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutRates.
     */
    cursor?: PayoutRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutRates.
     */
    distinct?: PayoutRateScalarFieldEnum | PayoutRateScalarFieldEnum[]
  }

  /**
   * PayoutRate findFirstOrThrow
   */
  export type PayoutRateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter, which PayoutRate to fetch.
     */
    where?: PayoutRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutRates to fetch.
     */
    orderBy?: PayoutRateOrderByWithRelationInput | PayoutRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutRates.
     */
    cursor?: PayoutRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutRates.
     */
    distinct?: PayoutRateScalarFieldEnum | PayoutRateScalarFieldEnum[]
  }

  /**
   * PayoutRate findMany
   */
  export type PayoutRateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter, which PayoutRates to fetch.
     */
    where?: PayoutRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutRates to fetch.
     */
    orderBy?: PayoutRateOrderByWithRelationInput | PayoutRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayoutRates.
     */
    cursor?: PayoutRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutRates.
     */
    skip?: number
    distinct?: PayoutRateScalarFieldEnum | PayoutRateScalarFieldEnum[]
  }

  /**
   * PayoutRate create
   */
  export type PayoutRateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * The data needed to create a PayoutRate.
     */
    data: XOR<PayoutRateCreateInput, PayoutRateUncheckedCreateInput>
  }

  /**
   * PayoutRate createMany
   */
  export type PayoutRateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoutRates.
     */
    data: PayoutRateCreateManyInput | PayoutRateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayoutRate createManyAndReturn
   */
  export type PayoutRateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * The data used to create many PayoutRates.
     */
    data: PayoutRateCreateManyInput | PayoutRateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PayoutRate update
   */
  export type PayoutRateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * The data needed to update a PayoutRate.
     */
    data: XOR<PayoutRateUpdateInput, PayoutRateUncheckedUpdateInput>
    /**
     * Choose, which PayoutRate to update.
     */
    where: PayoutRateWhereUniqueInput
  }

  /**
   * PayoutRate updateMany
   */
  export type PayoutRateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoutRates.
     */
    data: XOR<PayoutRateUpdateManyMutationInput, PayoutRateUncheckedUpdateManyInput>
    /**
     * Filter which PayoutRates to update
     */
    where?: PayoutRateWhereInput
    /**
     * Limit how many PayoutRates to update.
     */
    limit?: number
  }

  /**
   * PayoutRate updateManyAndReturn
   */
  export type PayoutRateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * The data used to update PayoutRates.
     */
    data: XOR<PayoutRateUpdateManyMutationInput, PayoutRateUncheckedUpdateManyInput>
    /**
     * Filter which PayoutRates to update
     */
    where?: PayoutRateWhereInput
    /**
     * Limit how many PayoutRates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PayoutRate upsert
   */
  export type PayoutRateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * The filter to search for the PayoutRate to update in case it exists.
     */
    where: PayoutRateWhereUniqueInput
    /**
     * In case the PayoutRate found by the `where` argument doesn't exist, create a new PayoutRate with this data.
     */
    create: XOR<PayoutRateCreateInput, PayoutRateUncheckedCreateInput>
    /**
     * In case the PayoutRate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutRateUpdateInput, PayoutRateUncheckedUpdateInput>
  }

  /**
   * PayoutRate delete
   */
  export type PayoutRateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
    /**
     * Filter which PayoutRate to delete.
     */
    where: PayoutRateWhereUniqueInput
  }

  /**
   * PayoutRate deleteMany
   */
  export type PayoutRateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutRates to delete
     */
    where?: PayoutRateWhereInput
    /**
     * Limit how many PayoutRates to delete.
     */
    limit?: number
  }

  /**
   * PayoutRate without action
   */
  export type PayoutRateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutRate
     */
    select?: PayoutRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutRate
     */
    omit?: PayoutRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutRateInclude<ExtArgs> | null
  }


  /**
   * Model Participation
   */

  export type AggregateParticipation = {
    _count: ParticipationCountAggregateOutputType | null
    _avg: ParticipationAvgAggregateOutputType | null
    _sum: ParticipationSumAggregateOutputType | null
    _min: ParticipationMinAggregateOutputType | null
    _max: ParticipationMaxAggregateOutputType | null
  }

  export type ParticipationAvgAggregateOutputType = {
    currentBalance: Decimal | null
  }

  export type ParticipationSumAggregateOutputType = {
    currentBalance: Decimal | null
  }

  export type ParticipationMinAggregateOutputType = {
    id: string | null
    influencerId: string | null
    campaignId: string | null
    currentBalance: Decimal | null
  }

  export type ParticipationMaxAggregateOutputType = {
    id: string | null
    influencerId: string | null
    campaignId: string | null
    currentBalance: Decimal | null
  }

  export type ParticipationCountAggregateOutputType = {
    id: number
    influencerId: number
    campaignId: number
    currentBalance: number
    _all: number
  }


  export type ParticipationAvgAggregateInputType = {
    currentBalance?: true
  }

  export type ParticipationSumAggregateInputType = {
    currentBalance?: true
  }

  export type ParticipationMinAggregateInputType = {
    id?: true
    influencerId?: true
    campaignId?: true
    currentBalance?: true
  }

  export type ParticipationMaxAggregateInputType = {
    id?: true
    influencerId?: true
    campaignId?: true
    currentBalance?: true
  }

  export type ParticipationCountAggregateInputType = {
    id?: true
    influencerId?: true
    campaignId?: true
    currentBalance?: true
    _all?: true
  }

  export type ParticipationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participation to aggregate.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Participations
    **/
    _count?: true | ParticipationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParticipationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParticipationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipationMaxAggregateInputType
  }

  export type GetParticipationAggregateType<T extends ParticipationAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipation[P]>
      : GetScalarType<T[P], AggregateParticipation[P]>
  }




  export type ParticipationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithAggregationInput | ParticipationOrderByWithAggregationInput[]
    by: ParticipationScalarFieldEnum[] | ParticipationScalarFieldEnum
    having?: ParticipationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipationCountAggregateInputType | true
    _avg?: ParticipationAvgAggregateInputType
    _sum?: ParticipationSumAggregateInputType
    _min?: ParticipationMinAggregateInputType
    _max?: ParticipationMaxAggregateInputType
  }

  export type ParticipationGroupByOutputType = {
    id: string
    influencerId: string
    campaignId: string
    currentBalance: Decimal
    _count: ParticipationCountAggregateOutputType | null
    _avg: ParticipationAvgAggregateOutputType | null
    _sum: ParticipationSumAggregateOutputType | null
    _min: ParticipationMinAggregateOutputType | null
    _max: ParticipationMaxAggregateOutputType | null
  }

  type GetParticipationGroupByPayload<T extends ParticipationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipationGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipationGroupByOutputType[P]>
        }
      >
    >


  export type ParticipationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    links?: boolean | Participation$linksArgs<ExtArgs>
    events?: boolean | Participation$eventsArgs<ExtArgs>
    _count?: boolean | ParticipationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectScalar = {
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
  }

  export type ParticipationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "influencerId" | "campaignId" | "currentBalance", ExtArgs["result"]["participation"]>
  export type ParticipationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    links?: boolean | Participation$linksArgs<ExtArgs>
    events?: boolean | Participation$eventsArgs<ExtArgs>
    _count?: boolean | ParticipationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParticipationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type ParticipationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $ParticipationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Participation"
    objects: {
      influencer: Prisma.$UserPayload<ExtArgs>
      campaign: Prisma.$CampaignPayload<ExtArgs>
      links: Prisma.$TrackingLinkPayload<ExtArgs>[]
      events: Prisma.$AnalyticsEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      influencerId: string
      campaignId: string
      currentBalance: Prisma.Decimal
    }, ExtArgs["result"]["participation"]>
    composites: {}
  }

  type ParticipationGetPayload<S extends boolean | null | undefined | ParticipationDefaultArgs> = $Result.GetResult<Prisma.$ParticipationPayload, S>

  type ParticipationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParticipationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParticipationCountAggregateInputType | true
    }

  export interface ParticipationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Participation'], meta: { name: 'Participation' } }
    /**
     * Find zero or one Participation that matches the filter.
     * @param {ParticipationFindUniqueArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParticipationFindUniqueArgs>(args: SelectSubset<T, ParticipationFindUniqueArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParticipationFindUniqueOrThrowArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParticipationFindUniqueOrThrowArgs>(args: SelectSubset<T, ParticipationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindFirstArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParticipationFindFirstArgs>(args?: SelectSubset<T, ParticipationFindFirstArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindFirstOrThrowArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParticipationFindFirstOrThrowArgs>(args?: SelectSubset<T, ParticipationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participations
     * const participations = await prisma.participation.findMany()
     * 
     * // Get first 10 Participations
     * const participations = await prisma.participation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participationWithIdOnly = await prisma.participation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParticipationFindManyArgs>(args?: SelectSubset<T, ParticipationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participation.
     * @param {ParticipationCreateArgs} args - Arguments to create a Participation.
     * @example
     * // Create one Participation
     * const Participation = await prisma.participation.create({
     *   data: {
     *     // ... data to create a Participation
     *   }
     * })
     * 
     */
    create<T extends ParticipationCreateArgs>(args: SelectSubset<T, ParticipationCreateArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participations.
     * @param {ParticipationCreateManyArgs} args - Arguments to create many Participations.
     * @example
     * // Create many Participations
     * const participation = await prisma.participation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParticipationCreateManyArgs>(args?: SelectSubset<T, ParticipationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participations and returns the data saved in the database.
     * @param {ParticipationCreateManyAndReturnArgs} args - Arguments to create many Participations.
     * @example
     * // Create many Participations
     * const participation = await prisma.participation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participations and only return the `id`
     * const participationWithIdOnly = await prisma.participation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParticipationCreateManyAndReturnArgs>(args?: SelectSubset<T, ParticipationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participation.
     * @param {ParticipationDeleteArgs} args - Arguments to delete one Participation.
     * @example
     * // Delete one Participation
     * const Participation = await prisma.participation.delete({
     *   where: {
     *     // ... filter to delete one Participation
     *   }
     * })
     * 
     */
    delete<T extends ParticipationDeleteArgs>(args: SelectSubset<T, ParticipationDeleteArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participation.
     * @param {ParticipationUpdateArgs} args - Arguments to update one Participation.
     * @example
     * // Update one Participation
     * const participation = await prisma.participation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParticipationUpdateArgs>(args: SelectSubset<T, ParticipationUpdateArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participations.
     * @param {ParticipationDeleteManyArgs} args - Arguments to filter Participations to delete.
     * @example
     * // Delete a few Participations
     * const { count } = await prisma.participation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParticipationDeleteManyArgs>(args?: SelectSubset<T, ParticipationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participations
     * const participation = await prisma.participation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParticipationUpdateManyArgs>(args: SelectSubset<T, ParticipationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participations and returns the data updated in the database.
     * @param {ParticipationUpdateManyAndReturnArgs} args - Arguments to update many Participations.
     * @example
     * // Update many Participations
     * const participation = await prisma.participation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participations and only return the `id`
     * const participationWithIdOnly = await prisma.participation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParticipationUpdateManyAndReturnArgs>(args: SelectSubset<T, ParticipationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participation.
     * @param {ParticipationUpsertArgs} args - Arguments to update or create a Participation.
     * @example
     * // Update or create a Participation
     * const participation = await prisma.participation.upsert({
     *   create: {
     *     // ... data to create a Participation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participation we want to update
     *   }
     * })
     */
    upsert<T extends ParticipationUpsertArgs>(args: SelectSubset<T, ParticipationUpsertArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationCountArgs} args - Arguments to filter Participations to count.
     * @example
     * // Count the number of Participations
     * const count = await prisma.participation.count({
     *   where: {
     *     // ... the filter for the Participations we want to count
     *   }
     * })
    **/
    count<T extends ParticipationCountArgs>(
      args?: Subset<T, ParticipationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipationAggregateArgs>(args: Subset<T, ParticipationAggregateArgs>): Prisma.PrismaPromise<GetParticipationAggregateType<T>>

    /**
     * Group by Participation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipationGroupByArgs['orderBy'] }
        : { orderBy?: ParticipationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Participation model
   */
  readonly fields: ParticipationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Participation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    influencer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    links<T extends Participation$linksArgs<ExtArgs> = {}>(args?: Subset<T, Participation$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Participation$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Participation$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Participation model
   */
  interface ParticipationFieldRefs {
    readonly id: FieldRef<"Participation", 'String'>
    readonly influencerId: FieldRef<"Participation", 'String'>
    readonly campaignId: FieldRef<"Participation", 'String'>
    readonly currentBalance: FieldRef<"Participation", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * Participation findUnique
   */
  export type ParticipationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation findUniqueOrThrow
   */
  export type ParticipationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation findFirst
   */
  export type ParticipationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participations.
     */
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation findFirstOrThrow
   */
  export type ParticipationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participations.
     */
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation findMany
   */
  export type ParticipationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participations to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation create
   */
  export type ParticipationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The data needed to create a Participation.
     */
    data: XOR<ParticipationCreateInput, ParticipationUncheckedCreateInput>
  }

  /**
   * Participation createMany
   */
  export type ParticipationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Participations.
     */
    data: ParticipationCreateManyInput | ParticipationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Participation createManyAndReturn
   */
  export type ParticipationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * The data used to create many Participations.
     */
    data: ParticipationCreateManyInput | ParticipationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participation update
   */
  export type ParticipationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The data needed to update a Participation.
     */
    data: XOR<ParticipationUpdateInput, ParticipationUncheckedUpdateInput>
    /**
     * Choose, which Participation to update.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation updateMany
   */
  export type ParticipationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Participations.
     */
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyInput>
    /**
     * Filter which Participations to update
     */
    where?: ParticipationWhereInput
    /**
     * Limit how many Participations to update.
     */
    limit?: number
  }

  /**
   * Participation updateManyAndReturn
   */
  export type ParticipationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * The data used to update Participations.
     */
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyInput>
    /**
     * Filter which Participations to update
     */
    where?: ParticipationWhereInput
    /**
     * Limit how many Participations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participation upsert
   */
  export type ParticipationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The filter to search for the Participation to update in case it exists.
     */
    where: ParticipationWhereUniqueInput
    /**
     * In case the Participation found by the `where` argument doesn't exist, create a new Participation with this data.
     */
    create: XOR<ParticipationCreateInput, ParticipationUncheckedCreateInput>
    /**
     * In case the Participation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipationUpdateInput, ParticipationUncheckedUpdateInput>
  }

  /**
   * Participation delete
   */
  export type ParticipationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter which Participation to delete.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation deleteMany
   */
  export type ParticipationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participations to delete
     */
    where?: ParticipationWhereInput
    /**
     * Limit how many Participations to delete.
     */
    limit?: number
  }

  /**
   * Participation.links
   */
  export type Participation$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    where?: TrackingLinkWhereInput
    orderBy?: TrackingLinkOrderByWithRelationInput | TrackingLinkOrderByWithRelationInput[]
    cursor?: TrackingLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackingLinkScalarFieldEnum | TrackingLinkScalarFieldEnum[]
  }

  /**
   * Participation.events
   */
  export type Participation$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    cursor?: AnalyticsEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * Participation without action
   */
  export type ParticipationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participation
     */
    omit?: ParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
  }


  /**
   * Model TrackingLink
   */

  export type AggregateTrackingLink = {
    _count: TrackingLinkCountAggregateOutputType | null
    _min: TrackingLinkMinAggregateOutputType | null
    _max: TrackingLinkMaxAggregateOutputType | null
  }

  export type TrackingLinkMinAggregateOutputType = {
    id: string | null
    url: string | null
    participationId: string | null
    isActive: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackingLinkMaxAggregateOutputType = {
    id: string | null
    url: string | null
    participationId: string | null
    isActive: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackingLinkCountAggregateOutputType = {
    id: number
    url: number
    participationId: number
    isActive: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackingLinkMinAggregateInputType = {
    id?: true
    url?: true
    participationId?: true
    isActive?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackingLinkMaxAggregateInputType = {
    id?: true
    url?: true
    participationId?: true
    isActive?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackingLinkCountAggregateInputType = {
    id?: true
    url?: true
    participationId?: true
    isActive?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackingLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingLink to aggregate.
     */
    where?: TrackingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingLinks to fetch.
     */
    orderBy?: TrackingLinkOrderByWithRelationInput | TrackingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackingLinks
    **/
    _count?: true | TrackingLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingLinkMaxAggregateInputType
  }

  export type GetTrackingLinkAggregateType<T extends TrackingLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackingLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackingLink[P]>
      : GetScalarType<T[P], AggregateTrackingLink[P]>
  }




  export type TrackingLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingLinkWhereInput
    orderBy?: TrackingLinkOrderByWithAggregationInput | TrackingLinkOrderByWithAggregationInput[]
    by: TrackingLinkScalarFieldEnum[] | TrackingLinkScalarFieldEnum
    having?: TrackingLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingLinkCountAggregateInputType | true
    _min?: TrackingLinkMinAggregateInputType
    _max?: TrackingLinkMaxAggregateInputType
  }

  export type TrackingLinkGroupByOutputType = {
    id: string
    url: string
    participationId: string
    isActive: boolean
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TrackingLinkCountAggregateOutputType | null
    _min: TrackingLinkMinAggregateOutputType | null
    _max: TrackingLinkMaxAggregateOutputType | null
  }

  type GetTrackingLinkGroupByPayload<T extends TrackingLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingLinkGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingLinkGroupByOutputType[P]>
        }
      >
    >


  export type TrackingLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    participationId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingLink"]>

  export type TrackingLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    participationId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingLink"]>

  export type TrackingLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    participationId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingLink"]>

  export type TrackingLinkSelectScalar = {
    id?: boolean
    url?: boolean
    participationId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackingLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "participationId" | "isActive" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["trackingLink"]>
  export type TrackingLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }
  export type TrackingLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }
  export type TrackingLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }

  export type $TrackingLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackingLink"
    objects: {
      participation: Prisma.$ParticipationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      participationId: string
      isActive: boolean
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trackingLink"]>
    composites: {}
  }

  type TrackingLinkGetPayload<S extends boolean | null | undefined | TrackingLinkDefaultArgs> = $Result.GetResult<Prisma.$TrackingLinkPayload, S>

  type TrackingLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackingLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackingLinkCountAggregateInputType | true
    }

  export interface TrackingLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackingLink'], meta: { name: 'TrackingLink' } }
    /**
     * Find zero or one TrackingLink that matches the filter.
     * @param {TrackingLinkFindUniqueArgs} args - Arguments to find a TrackingLink
     * @example
     * // Get one TrackingLink
     * const trackingLink = await prisma.trackingLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingLinkFindUniqueArgs>(args: SelectSubset<T, TrackingLinkFindUniqueArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackingLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackingLinkFindUniqueOrThrowArgs} args - Arguments to find a TrackingLink
     * @example
     * // Get one TrackingLink
     * const trackingLink = await prisma.trackingLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkFindFirstArgs} args - Arguments to find a TrackingLink
     * @example
     * // Get one TrackingLink
     * const trackingLink = await prisma.trackingLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingLinkFindFirstArgs>(args?: SelectSubset<T, TrackingLinkFindFirstArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkFindFirstOrThrowArgs} args - Arguments to find a TrackingLink
     * @example
     * // Get one TrackingLink
     * const trackingLink = await prisma.trackingLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackingLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackingLinks
     * const trackingLinks = await prisma.trackingLink.findMany()
     * 
     * // Get first 10 TrackingLinks
     * const trackingLinks = await prisma.trackingLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingLinkWithIdOnly = await prisma.trackingLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingLinkFindManyArgs>(args?: SelectSubset<T, TrackingLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackingLink.
     * @param {TrackingLinkCreateArgs} args - Arguments to create a TrackingLink.
     * @example
     * // Create one TrackingLink
     * const TrackingLink = await prisma.trackingLink.create({
     *   data: {
     *     // ... data to create a TrackingLink
     *   }
     * })
     * 
     */
    create<T extends TrackingLinkCreateArgs>(args: SelectSubset<T, TrackingLinkCreateArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackingLinks.
     * @param {TrackingLinkCreateManyArgs} args - Arguments to create many TrackingLinks.
     * @example
     * // Create many TrackingLinks
     * const trackingLink = await prisma.trackingLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingLinkCreateManyArgs>(args?: SelectSubset<T, TrackingLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrackingLinks and returns the data saved in the database.
     * @param {TrackingLinkCreateManyAndReturnArgs} args - Arguments to create many TrackingLinks.
     * @example
     * // Create many TrackingLinks
     * const trackingLink = await prisma.trackingLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrackingLinks and only return the `id`
     * const trackingLinkWithIdOnly = await prisma.trackingLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackingLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackingLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrackingLink.
     * @param {TrackingLinkDeleteArgs} args - Arguments to delete one TrackingLink.
     * @example
     * // Delete one TrackingLink
     * const TrackingLink = await prisma.trackingLink.delete({
     *   where: {
     *     // ... filter to delete one TrackingLink
     *   }
     * })
     * 
     */
    delete<T extends TrackingLinkDeleteArgs>(args: SelectSubset<T, TrackingLinkDeleteArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackingLink.
     * @param {TrackingLinkUpdateArgs} args - Arguments to update one TrackingLink.
     * @example
     * // Update one TrackingLink
     * const trackingLink = await prisma.trackingLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingLinkUpdateArgs>(args: SelectSubset<T, TrackingLinkUpdateArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackingLinks.
     * @param {TrackingLinkDeleteManyArgs} args - Arguments to filter TrackingLinks to delete.
     * @example
     * // Delete a few TrackingLinks
     * const { count } = await prisma.trackingLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingLinkDeleteManyArgs>(args?: SelectSubset<T, TrackingLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackingLinks
     * const trackingLink = await prisma.trackingLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingLinkUpdateManyArgs>(args: SelectSubset<T, TrackingLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingLinks and returns the data updated in the database.
     * @param {TrackingLinkUpdateManyAndReturnArgs} args - Arguments to update many TrackingLinks.
     * @example
     * // Update many TrackingLinks
     * const trackingLink = await prisma.trackingLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrackingLinks and only return the `id`
     * const trackingLinkWithIdOnly = await prisma.trackingLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrackingLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackingLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrackingLink.
     * @param {TrackingLinkUpsertArgs} args - Arguments to update or create a TrackingLink.
     * @example
     * // Update or create a TrackingLink
     * const trackingLink = await prisma.trackingLink.upsert({
     *   create: {
     *     // ... data to create a TrackingLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackingLink we want to update
     *   }
     * })
     */
    upsert<T extends TrackingLinkUpsertArgs>(args: SelectSubset<T, TrackingLinkUpsertArgs<ExtArgs>>): Prisma__TrackingLinkClient<$Result.GetResult<Prisma.$TrackingLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrackingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkCountArgs} args - Arguments to filter TrackingLinks to count.
     * @example
     * // Count the number of TrackingLinks
     * const count = await prisma.trackingLink.count({
     *   where: {
     *     // ... the filter for the TrackingLinks we want to count
     *   }
     * })
    **/
    count<T extends TrackingLinkCountArgs>(
      args?: Subset<T, TrackingLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackingLinkAggregateArgs>(args: Subset<T, TrackingLinkAggregateArgs>): Prisma.PrismaPromise<GetTrackingLinkAggregateType<T>>

    /**
     * Group by TrackingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackingLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingLinkGroupByArgs['orderBy'] }
        : { orderBy?: TrackingLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackingLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackingLink model
   */
  readonly fields: TrackingLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackingLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participation<T extends ParticipationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParticipationDefaultArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrackingLink model
   */
  interface TrackingLinkFieldRefs {
    readonly id: FieldRef<"TrackingLink", 'String'>
    readonly url: FieldRef<"TrackingLink", 'String'>
    readonly participationId: FieldRef<"TrackingLink", 'String'>
    readonly isActive: FieldRef<"TrackingLink", 'Boolean'>
    readonly expiresAt: FieldRef<"TrackingLink", 'DateTime'>
    readonly createdAt: FieldRef<"TrackingLink", 'DateTime'>
    readonly updatedAt: FieldRef<"TrackingLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrackingLink findUnique
   */
  export type TrackingLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter, which TrackingLink to fetch.
     */
    where: TrackingLinkWhereUniqueInput
  }

  /**
   * TrackingLink findUniqueOrThrow
   */
  export type TrackingLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter, which TrackingLink to fetch.
     */
    where: TrackingLinkWhereUniqueInput
  }

  /**
   * TrackingLink findFirst
   */
  export type TrackingLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter, which TrackingLink to fetch.
     */
    where?: TrackingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingLinks to fetch.
     */
    orderBy?: TrackingLinkOrderByWithRelationInput | TrackingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingLinks.
     */
    cursor?: TrackingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingLinks.
     */
    distinct?: TrackingLinkScalarFieldEnum | TrackingLinkScalarFieldEnum[]
  }

  /**
   * TrackingLink findFirstOrThrow
   */
  export type TrackingLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter, which TrackingLink to fetch.
     */
    where?: TrackingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingLinks to fetch.
     */
    orderBy?: TrackingLinkOrderByWithRelationInput | TrackingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingLinks.
     */
    cursor?: TrackingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingLinks.
     */
    distinct?: TrackingLinkScalarFieldEnum | TrackingLinkScalarFieldEnum[]
  }

  /**
   * TrackingLink findMany
   */
  export type TrackingLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter, which TrackingLinks to fetch.
     */
    where?: TrackingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingLinks to fetch.
     */
    orderBy?: TrackingLinkOrderByWithRelationInput | TrackingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackingLinks.
     */
    cursor?: TrackingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingLinks.
     */
    skip?: number
    distinct?: TrackingLinkScalarFieldEnum | TrackingLinkScalarFieldEnum[]
  }

  /**
   * TrackingLink create
   */
  export type TrackingLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a TrackingLink.
     */
    data: XOR<TrackingLinkCreateInput, TrackingLinkUncheckedCreateInput>
  }

  /**
   * TrackingLink createMany
   */
  export type TrackingLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackingLinks.
     */
    data: TrackingLinkCreateManyInput | TrackingLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackingLink createManyAndReturn
   */
  export type TrackingLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * The data used to create many TrackingLinks.
     */
    data: TrackingLinkCreateManyInput | TrackingLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrackingLink update
   */
  export type TrackingLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a TrackingLink.
     */
    data: XOR<TrackingLinkUpdateInput, TrackingLinkUncheckedUpdateInput>
    /**
     * Choose, which TrackingLink to update.
     */
    where: TrackingLinkWhereUniqueInput
  }

  /**
   * TrackingLink updateMany
   */
  export type TrackingLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackingLinks.
     */
    data: XOR<TrackingLinkUpdateManyMutationInput, TrackingLinkUncheckedUpdateManyInput>
    /**
     * Filter which TrackingLinks to update
     */
    where?: TrackingLinkWhereInput
    /**
     * Limit how many TrackingLinks to update.
     */
    limit?: number
  }

  /**
   * TrackingLink updateManyAndReturn
   */
  export type TrackingLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * The data used to update TrackingLinks.
     */
    data: XOR<TrackingLinkUpdateManyMutationInput, TrackingLinkUncheckedUpdateManyInput>
    /**
     * Filter which TrackingLinks to update
     */
    where?: TrackingLinkWhereInput
    /**
     * Limit how many TrackingLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrackingLink upsert
   */
  export type TrackingLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the TrackingLink to update in case it exists.
     */
    where: TrackingLinkWhereUniqueInput
    /**
     * In case the TrackingLink found by the `where` argument doesn't exist, create a new TrackingLink with this data.
     */
    create: XOR<TrackingLinkCreateInput, TrackingLinkUncheckedCreateInput>
    /**
     * In case the TrackingLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingLinkUpdateInput, TrackingLinkUncheckedUpdateInput>
  }

  /**
   * TrackingLink delete
   */
  export type TrackingLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
    /**
     * Filter which TrackingLink to delete.
     */
    where: TrackingLinkWhereUniqueInput
  }

  /**
   * TrackingLink deleteMany
   */
  export type TrackingLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingLinks to delete
     */
    where?: TrackingLinkWhereInput
    /**
     * Limit how many TrackingLinks to delete.
     */
    limit?: number
  }

  /**
   * TrackingLink without action
   */
  export type TrackingLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingLink
     */
    select?: TrackingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingLink
     */
    omit?: TrackingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingLinkInclude<ExtArgs> | null
  }


  /**
   * Model AnalyticsEvent
   */

  export type AggregateAnalyticsEvent = {
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  export type AnalyticsEventAvgAggregateOutputType = {
    payoutGenerated: Decimal | null
  }

  export type AnalyticsEventSumAggregateOutputType = {
    payoutGenerated: Decimal | null
  }

  export type AnalyticsEventMinAggregateOutputType = {
    id: string | null
    type: $Enums.EventType | null
    participationId: string | null
    externalTxId: string | null
    payoutGenerated: Decimal | null
    createdAt: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: string | null
    type: $Enums.EventType | null
    participationId: string | null
    externalTxId: string | null
    payoutGenerated: Decimal | null
    createdAt: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    type: number
    participationId: number
    externalTxId: number
    metadata: number
    payoutGenerated: number
    createdAt: number
    _all: number
  }


  export type AnalyticsEventAvgAggregateInputType = {
    payoutGenerated?: true
  }

  export type AnalyticsEventSumAggregateInputType = {
    payoutGenerated?: true
  }

  export type AnalyticsEventMinAggregateInputType = {
    id?: true
    type?: true
    participationId?: true
    externalTxId?: true
    payoutGenerated?: true
    createdAt?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    type?: true
    participationId?: true
    externalTxId?: true
    payoutGenerated?: true
    createdAt?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    type?: true
    participationId?: true
    externalTxId?: true
    metadata?: true
    payoutGenerated?: true
    createdAt?: true
    _all?: true
  }

  export type AnalyticsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvent to aggregate.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsEvents
    **/
    _count?: true | AnalyticsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type GetAnalyticsEventAggregateType<T extends AnalyticsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
      : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
  }




  export type AnalyticsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithAggregationInput | AnalyticsEventOrderByWithAggregationInput[]
    by: AnalyticsEventScalarFieldEnum[] | AnalyticsEventScalarFieldEnum
    having?: AnalyticsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsEventCountAggregateInputType | true
    _avg?: AnalyticsEventAvgAggregateInputType
    _sum?: AnalyticsEventSumAggregateInputType
    _min?: AnalyticsEventMinAggregateInputType
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type AnalyticsEventGroupByOutputType = {
    id: string
    type: $Enums.EventType
    participationId: string
    externalTxId: string | null
    metadata: JsonValue | null
    payoutGenerated: Decimal
    createdAt: Date
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  type GetAnalyticsEventGroupByPayload<T extends AnalyticsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    participationId?: boolean
    externalTxId?: boolean
    metadata?: boolean
    payoutGenerated?: boolean
    createdAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    participationId?: boolean
    externalTxId?: boolean
    metadata?: boolean
    payoutGenerated?: boolean
    createdAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    participationId?: boolean
    externalTxId?: boolean
    metadata?: boolean
    payoutGenerated?: boolean
    createdAt?: boolean
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectScalar = {
    id?: boolean
    type?: boolean
    participationId?: boolean
    externalTxId?: boolean
    metadata?: boolean
    payoutGenerated?: boolean
    createdAt?: boolean
  }

  export type AnalyticsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "participationId" | "externalTxId" | "metadata" | "payoutGenerated" | "createdAt", ExtArgs["result"]["analyticsEvent"]>
  export type AnalyticsEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participation?: boolean | ParticipationDefaultArgs<ExtArgs>
  }

  export type $AnalyticsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsEvent"
    objects: {
      participation: Prisma.$ParticipationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.EventType
      participationId: string
      externalTxId: string | null
      metadata: Prisma.JsonValue | null
      payoutGenerated: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["analyticsEvent"]>
    composites: {}
  }

  type AnalyticsEventGetPayload<S extends boolean | null | undefined | AnalyticsEventDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsEventPayload, S>

  type AnalyticsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsEventCountAggregateInputType | true
    }

  export interface AnalyticsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsEvent'], meta: { name: 'AnalyticsEvent' } }
    /**
     * Find zero or one AnalyticsEvent that matches the filter.
     * @param {AnalyticsEventFindUniqueArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsEventFindUniqueArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticsEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsEventFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsEventFindFirstArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany()
     * 
     * // Get first 10 AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsEventFindManyArgs>(args?: SelectSubset<T, AnalyticsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticsEvent.
     * @param {AnalyticsEventCreateArgs} args - Arguments to create a AnalyticsEvent.
     * @example
     * // Create one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.create({
     *   data: {
     *     // ... data to create a AnalyticsEvent
     *   }
     * })
     * 
     */
    create<T extends AnalyticsEventCreateArgs>(args: SelectSubset<T, AnalyticsEventCreateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticsEvents.
     * @param {AnalyticsEventCreateManyArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsEventCreateManyArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsEvents and returns the data saved in the database.
     * @param {AnalyticsEventCreateManyAndReturnArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticsEvent.
     * @param {AnalyticsEventDeleteArgs} args - Arguments to delete one AnalyticsEvent.
     * @example
     * // Delete one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsEvent
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsEventDeleteArgs>(args: SelectSubset<T, AnalyticsEventDeleteArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticsEvent.
     * @param {AnalyticsEventUpdateArgs} args - Arguments to update one AnalyticsEvent.
     * @example
     * // Update one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsEventUpdateArgs>(args: SelectSubset<T, AnalyticsEventUpdateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticsEvents.
     * @param {AnalyticsEventDeleteManyArgs} args - Arguments to filter AnalyticsEvents to delete.
     * @example
     * // Delete a few AnalyticsEvents
     * const { count } = await prisma.analyticsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsEventDeleteManyArgs>(args?: SelectSubset<T, AnalyticsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsEventUpdateManyArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents and returns the data updated in the database.
     * @param {AnalyticsEventUpdateManyAndReturnArgs} args - Arguments to update many AnalyticsEvents.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticsEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticsEvent.
     * @param {AnalyticsEventUpsertArgs} args - Arguments to update or create a AnalyticsEvent.
     * @example
     * // Update or create a AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.upsert({
     *   create: {
     *     // ... data to create a AnalyticsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsEvent we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsEventUpsertArgs>(args: SelectSubset<T, AnalyticsEventUpsertArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventCountArgs} args - Arguments to filter AnalyticsEvents to count.
     * @example
     * // Count the number of AnalyticsEvents
     * const count = await prisma.analyticsEvent.count({
     *   where: {
     *     // ... the filter for the AnalyticsEvents we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsEventCountArgs>(
      args?: Subset<T, AnalyticsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsEventAggregateArgs>(args: Subset<T, AnalyticsEventAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsEventAggregateType<T>>

    /**
     * Group by AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsEventGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsEvent model
   */
  readonly fields: AnalyticsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participation<T extends ParticipationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParticipationDefaultArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalyticsEvent model
   */
  interface AnalyticsEventFieldRefs {
    readonly id: FieldRef<"AnalyticsEvent", 'String'>
    readonly type: FieldRef<"AnalyticsEvent", 'EventType'>
    readonly participationId: FieldRef<"AnalyticsEvent", 'String'>
    readonly externalTxId: FieldRef<"AnalyticsEvent", 'String'>
    readonly metadata: FieldRef<"AnalyticsEvent", 'Json'>
    readonly payoutGenerated: FieldRef<"AnalyticsEvent", 'Decimal'>
    readonly createdAt: FieldRef<"AnalyticsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsEvent findUnique
   */
  export type AnalyticsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findUniqueOrThrow
   */
  export type AnalyticsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findFirst
   */
  export type AnalyticsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findFirstOrThrow
   */
  export type AnalyticsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findMany
   */
  export type AnalyticsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvents to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent create
   */
  export type AnalyticsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
  }

  /**
   * AnalyticsEvent createMany
   */
  export type AnalyticsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent createManyAndReturn
   */
  export type AnalyticsEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent update
   */
  export type AnalyticsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsEvent to update.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent updateMany
   */
  export type AnalyticsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent updateManyAndReturn
   */
  export type AnalyticsEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent upsert
   */
  export type AnalyticsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsEvent to update in case it exists.
     */
    where: AnalyticsEventWhereUniqueInput
    /**
     * In case the AnalyticsEvent found by the `where` argument doesn't exist, create a new AnalyticsEvent with this data.
     */
    create: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
    /**
     * In case the AnalyticsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
  }

  /**
   * AnalyticsEvent delete
   */
  export type AnalyticsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter which AnalyticsEvent to delete.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent deleteMany
   */
  export type AnalyticsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvents to delete
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to delete.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent without action
   */
  export type AnalyticsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    brandId: 'brandId',
    title: 'title',
    escrowAddress: 'escrowAddress',
    budgetTotal: 'budgetTotal',
    yellowChannelId: 'yellowChannelId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const PayoutRateScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    eventType: 'eventType',
    amount: 'amount',
    volumeStep: 'volumeStep',
    createdAt: 'createdAt'
  };

  export type PayoutRateScalarFieldEnum = (typeof PayoutRateScalarFieldEnum)[keyof typeof PayoutRateScalarFieldEnum]


  export const ParticipationScalarFieldEnum: {
    id: 'id',
    influencerId: 'influencerId',
    campaignId: 'campaignId',
    currentBalance: 'currentBalance'
  };

  export type ParticipationScalarFieldEnum = (typeof ParticipationScalarFieldEnum)[keyof typeof ParticipationScalarFieldEnum]


  export const TrackingLinkScalarFieldEnum: {
    id: 'id',
    url: 'url',
    participationId: 'participationId',
    isActive: 'isActive',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackingLinkScalarFieldEnum = (typeof TrackingLinkScalarFieldEnum)[keyof typeof TrackingLinkScalarFieldEnum]


  export const AnalyticsEventScalarFieldEnum: {
    id: 'id',
    type: 'type',
    participationId: 'participationId',
    externalTxId: 'externalTxId',
    metadata: 'metadata',
    payoutGenerated: 'payoutGenerated',
    createdAt: 'createdAt'
  };

  export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'CampaignStatus'
   */
  export type EnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus'>
    


  /**
   * Reference to a field of type 'CampaignStatus[]'
   */
  export type ListEnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    walletAddress?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    campaignsCreated?: CampaignListRelationFilter
    participations?: ParticipationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaignsCreated?: CampaignOrderByRelationAggregateInput
    participations?: ParticipationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletAddress?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    campaignsCreated?: CampaignListRelationFilter
    participations?: ParticipationListRelationFilter
  }, "id" | "walletAddress" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    brandId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    brand?: XOR<UserScalarRelationFilter, UserWhereInput>
    payoutRates?: PayoutRateListRelationFilter
    participations?: ParticipationListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    brandId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brand?: UserOrderByWithRelationInput
    payoutRates?: PayoutRateOrderByRelationAggregateInput
    participations?: ParticipationOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    brandId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    brand?: XOR<UserScalarRelationFilter, UserWhereInput>
    payoutRates?: PayoutRateListRelationFilter
    participations?: ParticipationListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    brandId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    brandId?: StringWithAggregatesFilter<"Campaign"> | string
    title?: StringWithAggregatesFilter<"Campaign"> | string
    escrowAddress?: StringWithAggregatesFilter<"Campaign"> | string
    budgetTotal?: DecimalWithAggregatesFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusWithAggregatesFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type PayoutRateWhereInput = {
    AND?: PayoutRateWhereInput | PayoutRateWhereInput[]
    OR?: PayoutRateWhereInput[]
    NOT?: PayoutRateWhereInput | PayoutRateWhereInput[]
    id?: StringFilter<"PayoutRate"> | string
    campaignId?: StringFilter<"PayoutRate"> | string
    eventType?: EnumEventTypeFilter<"PayoutRate"> | $Enums.EventType
    amount?: DecimalFilter<"PayoutRate"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"PayoutRate"> | number
    createdAt?: DateTimeFilter<"PayoutRate"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }

  export type PayoutRateOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    eventType?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
  }

  export type PayoutRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayoutRateWhereInput | PayoutRateWhereInput[]
    OR?: PayoutRateWhereInput[]
    NOT?: PayoutRateWhereInput | PayoutRateWhereInput[]
    campaignId?: StringFilter<"PayoutRate"> | string
    eventType?: EnumEventTypeFilter<"PayoutRate"> | $Enums.EventType
    amount?: DecimalFilter<"PayoutRate"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"PayoutRate"> | number
    createdAt?: DateTimeFilter<"PayoutRate"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }, "id">

  export type PayoutRateOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    eventType?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    _count?: PayoutRateCountOrderByAggregateInput
    _avg?: PayoutRateAvgOrderByAggregateInput
    _max?: PayoutRateMaxOrderByAggregateInput
    _min?: PayoutRateMinOrderByAggregateInput
    _sum?: PayoutRateSumOrderByAggregateInput
  }

  export type PayoutRateScalarWhereWithAggregatesInput = {
    AND?: PayoutRateScalarWhereWithAggregatesInput | PayoutRateScalarWhereWithAggregatesInput[]
    OR?: PayoutRateScalarWhereWithAggregatesInput[]
    NOT?: PayoutRateScalarWhereWithAggregatesInput | PayoutRateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayoutRate"> | string
    campaignId?: StringWithAggregatesFilter<"PayoutRate"> | string
    eventType?: EnumEventTypeWithAggregatesFilter<"PayoutRate"> | $Enums.EventType
    amount?: DecimalWithAggregatesFilter<"PayoutRate"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntWithAggregatesFilter<"PayoutRate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PayoutRate"> | Date | string
  }

  export type ParticipationWhereInput = {
    AND?: ParticipationWhereInput | ParticipationWhereInput[]
    OR?: ParticipationWhereInput[]
    NOT?: ParticipationWhereInput | ParticipationWhereInput[]
    id?: StringFilter<"Participation"> | string
    influencerId?: StringFilter<"Participation"> | string
    campaignId?: StringFilter<"Participation"> | string
    currentBalance?: DecimalFilter<"Participation"> | Decimal | DecimalJsLike | number | string
    influencer?: XOR<UserScalarRelationFilter, UserWhereInput>
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    links?: TrackingLinkListRelationFilter
    events?: AnalyticsEventListRelationFilter
  }

  export type ParticipationOrderByWithRelationInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
    influencer?: UserOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
    links?: TrackingLinkOrderByRelationAggregateInput
    events?: AnalyticsEventOrderByRelationAggregateInput
  }

  export type ParticipationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    influencerId_campaignId?: ParticipationInfluencerIdCampaignIdCompoundUniqueInput
    AND?: ParticipationWhereInput | ParticipationWhereInput[]
    OR?: ParticipationWhereInput[]
    NOT?: ParticipationWhereInput | ParticipationWhereInput[]
    influencerId?: StringFilter<"Participation"> | string
    campaignId?: StringFilter<"Participation"> | string
    currentBalance?: DecimalFilter<"Participation"> | Decimal | DecimalJsLike | number | string
    influencer?: XOR<UserScalarRelationFilter, UserWhereInput>
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    links?: TrackingLinkListRelationFilter
    events?: AnalyticsEventListRelationFilter
  }, "id" | "influencerId_campaignId">

  export type ParticipationOrderByWithAggregationInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
    _count?: ParticipationCountOrderByAggregateInput
    _avg?: ParticipationAvgOrderByAggregateInput
    _max?: ParticipationMaxOrderByAggregateInput
    _min?: ParticipationMinOrderByAggregateInput
    _sum?: ParticipationSumOrderByAggregateInput
  }

  export type ParticipationScalarWhereWithAggregatesInput = {
    AND?: ParticipationScalarWhereWithAggregatesInput | ParticipationScalarWhereWithAggregatesInput[]
    OR?: ParticipationScalarWhereWithAggregatesInput[]
    NOT?: ParticipationScalarWhereWithAggregatesInput | ParticipationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Participation"> | string
    influencerId?: StringWithAggregatesFilter<"Participation"> | string
    campaignId?: StringWithAggregatesFilter<"Participation"> | string
    currentBalance?: DecimalWithAggregatesFilter<"Participation"> | Decimal | DecimalJsLike | number | string
  }

  export type TrackingLinkWhereInput = {
    AND?: TrackingLinkWhereInput | TrackingLinkWhereInput[]
    OR?: TrackingLinkWhereInput[]
    NOT?: TrackingLinkWhereInput | TrackingLinkWhereInput[]
    id?: StringFilter<"TrackingLink"> | string
    url?: StringFilter<"TrackingLink"> | string
    participationId?: StringFilter<"TrackingLink"> | string
    isActive?: BoolFilter<"TrackingLink"> | boolean
    expiresAt?: DateTimeNullableFilter<"TrackingLink"> | Date | string | null
    createdAt?: DateTimeFilter<"TrackingLink"> | Date | string
    updatedAt?: DateTimeFilter<"TrackingLink"> | Date | string
    participation?: XOR<ParticipationScalarRelationFilter, ParticipationWhereInput>
  }

  export type TrackingLinkOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    participationId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    participation?: ParticipationOrderByWithRelationInput
  }

  export type TrackingLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: TrackingLinkWhereInput | TrackingLinkWhereInput[]
    OR?: TrackingLinkWhereInput[]
    NOT?: TrackingLinkWhereInput | TrackingLinkWhereInput[]
    participationId?: StringFilter<"TrackingLink"> | string
    isActive?: BoolFilter<"TrackingLink"> | boolean
    expiresAt?: DateTimeNullableFilter<"TrackingLink"> | Date | string | null
    createdAt?: DateTimeFilter<"TrackingLink"> | Date | string
    updatedAt?: DateTimeFilter<"TrackingLink"> | Date | string
    participation?: XOR<ParticipationScalarRelationFilter, ParticipationWhereInput>
  }, "id" | "url">

  export type TrackingLinkOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    participationId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackingLinkCountOrderByAggregateInput
    _max?: TrackingLinkMaxOrderByAggregateInput
    _min?: TrackingLinkMinOrderByAggregateInput
  }

  export type TrackingLinkScalarWhereWithAggregatesInput = {
    AND?: TrackingLinkScalarWhereWithAggregatesInput | TrackingLinkScalarWhereWithAggregatesInput[]
    OR?: TrackingLinkScalarWhereWithAggregatesInput[]
    NOT?: TrackingLinkScalarWhereWithAggregatesInput | TrackingLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackingLink"> | string
    url?: StringWithAggregatesFilter<"TrackingLink"> | string
    participationId?: StringWithAggregatesFilter<"TrackingLink"> | string
    isActive?: BoolWithAggregatesFilter<"TrackingLink"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"TrackingLink"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrackingLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrackingLink"> | Date | string
  }

  export type AnalyticsEventWhereInput = {
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    type?: EnumEventTypeFilter<"AnalyticsEvent"> | $Enums.EventType
    participationId?: StringFilter<"AnalyticsEvent"> | string
    externalTxId?: StringNullableFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    payoutGenerated?: DecimalFilter<"AnalyticsEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    participation?: XOR<ParticipationScalarRelationFilter, ParticipationWhereInput>
  }

  export type AnalyticsEventOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
    participation?: ParticipationOrderByWithRelationInput
  }

  export type AnalyticsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalTxId?: string
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    type?: EnumEventTypeFilter<"AnalyticsEvent"> | $Enums.EventType
    participationId?: StringFilter<"AnalyticsEvent"> | string
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    payoutGenerated?: DecimalFilter<"AnalyticsEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    participation?: XOR<ParticipationScalarRelationFilter, ParticipationWhereInput>
  }, "id" | "externalTxId">

  export type AnalyticsEventOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
    _count?: AnalyticsEventCountOrderByAggregateInput
    _avg?: AnalyticsEventAvgOrderByAggregateInput
    _max?: AnalyticsEventMaxOrderByAggregateInput
    _min?: AnalyticsEventMinOrderByAggregateInput
    _sum?: AnalyticsEventSumOrderByAggregateInput
  }

  export type AnalyticsEventScalarWhereWithAggregatesInput = {
    AND?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    OR?: AnalyticsEventScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    type?: EnumEventTypeWithAggregatesFilter<"AnalyticsEvent"> | $Enums.EventType
    participationId?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    externalTxId?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AnalyticsEvent">
    payoutGenerated?: DecimalWithAggregatesFilter<"AnalyticsEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignCreateNestedManyWithoutBrandInput
    participations?: ParticipationCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutBrandInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUpdateManyWithoutBrandNestedInput
    participations?: ParticipationUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutBrandNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: UserCreateNestedOneWithoutCampaignsCreatedInput
    payoutRates?: PayoutRateCreateNestedManyWithoutCampaignInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    brandId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payoutRates?: PayoutRateUncheckedCreateNestedManyWithoutCampaignInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    payoutRates?: PayoutRateUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutRates?: PayoutRateUncheckedUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    brandId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutRateCreateInput = {
    id?: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutPayoutRatesInput
  }

  export type PayoutRateUncheckedCreateInput = {
    id?: string
    campaignId: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
  }

  export type PayoutRateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutPayoutRatesNestedInput
  }

  export type PayoutRateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutRateCreateManyInput = {
    id?: string
    campaignId: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
  }

  export type PayoutRateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutRateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationCreateInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationCreateManyInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
  }

  export type ParticipationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ParticipationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TrackingLinkCreateInput = {
    id?: string
    url: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participation: ParticipationCreateNestedOneWithoutLinksInput
  }

  export type TrackingLinkUncheckedCreateInput = {
    id?: string
    url: string
    participationId: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participation?: ParticipationUpdateOneRequiredWithoutLinksNestedInput
  }

  export type TrackingLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingLinkCreateManyInput = {
    id?: string
    url: string
    participationId: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateInput = {
    id?: string
    type: $Enums.EventType
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    participation: ParticipationCreateNestedOneWithoutEventsInput
  }

  export type AnalyticsEventUncheckedCreateInput = {
    id?: string
    type: $Enums.EventType
    participationId: string
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participation?: ParticipationUpdateOneRequiredWithoutEventsNestedInput
  }

  export type AnalyticsEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    participationId?: StringFieldUpdateOperationsInput | string
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id?: string
    type: $Enums.EventType
    participationId: string
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    participationId?: StringFieldUpdateOperationsInput | string
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type ParticipationListRelationFilter = {
    every?: ParticipationWhereInput
    some?: ParticipationWhereInput
    none?: ParticipationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParticipationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PayoutRateListRelationFilter = {
    every?: PayoutRateWhereInput
    some?: PayoutRateWhereInput
    none?: PayoutRateWhereInput
  }

  export type PayoutRateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    budgetTotal?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    budgetTotal?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type PayoutRateCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    eventType?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutRateAvgOrderByAggregateInput = {
    amount?: SortOrder
    volumeStep?: SortOrder
  }

  export type PayoutRateMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    eventType?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutRateMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    eventType?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutRateSumOrderByAggregateInput = {
    amount?: SortOrder
    volumeStep?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TrackingLinkListRelationFilter = {
    every?: TrackingLinkWhereInput
    some?: TrackingLinkWhereInput
    none?: TrackingLinkWhereInput
  }

  export type AnalyticsEventListRelationFilter = {
    every?: AnalyticsEventWhereInput
    some?: AnalyticsEventWhereInput
    none?: AnalyticsEventWhereInput
  }

  export type TrackingLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalyticsEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParticipationInfluencerIdCampaignIdCompoundUniqueInput = {
    influencerId: string
    campaignId: string
  }

  export type ParticipationCountOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
  }

  export type ParticipationAvgOrderByAggregateInput = {
    currentBalance?: SortOrder
  }

  export type ParticipationMaxOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
  }

  export type ParticipationMinOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
  }

  export type ParticipationSumOrderByAggregateInput = {
    currentBalance?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ParticipationScalarRelationFilter = {
    is?: ParticipationWhereInput
    isNot?: ParticipationWhereInput
  }

  export type TrackingLinkCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    participationId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackingLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    participationId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackingLinkMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    participationId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrder
    metadata?: SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventAvgOrderByAggregateInput = {
    payoutGenerated?: SortOrder
  }

  export type AnalyticsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventSumOrderByAggregateInput = {
    payoutGenerated?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CampaignCreateNestedManyWithoutBrandInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type ParticipationCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput> | ParticipationCreateWithoutInfluencerInput[] | ParticipationUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutInfluencerInput | ParticipationCreateOrConnectWithoutInfluencerInput[]
    createMany?: ParticipationCreateManyInfluencerInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type ParticipationUncheckedCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput> | ParticipationCreateWithoutInfluencerInput[] | ParticipationUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutInfluencerInput | ParticipationCreateOrConnectWithoutInfluencerInput[]
    createMany?: ParticipationCreateManyInfluencerInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CampaignUpdateManyWithoutBrandNestedInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutBrandInput | CampaignUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutBrandInput | CampaignUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutBrandInput | CampaignUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type ParticipationUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput> | ParticipationCreateWithoutInfluencerInput[] | ParticipationUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutInfluencerInput | ParticipationCreateOrConnectWithoutInfluencerInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutInfluencerInput | ParticipationUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: ParticipationCreateManyInfluencerInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutInfluencerInput | ParticipationUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutInfluencerInput | ParticipationUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput> | CampaignCreateWithoutBrandInput[] | CampaignUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutBrandInput | CampaignCreateOrConnectWithoutBrandInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutBrandInput | CampaignUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: CampaignCreateManyBrandInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutBrandInput | CampaignUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutBrandInput | CampaignUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type ParticipationUncheckedUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput> | ParticipationCreateWithoutInfluencerInput[] | ParticipationUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutInfluencerInput | ParticipationCreateOrConnectWithoutInfluencerInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutInfluencerInput | ParticipationUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: ParticipationCreateManyInfluencerInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutInfluencerInput | ParticipationUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutInfluencerInput | ParticipationUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCampaignsCreatedInput = {
    create?: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type PayoutRateCreateNestedManyWithoutCampaignInput = {
    create?: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput> | PayoutRateCreateWithoutCampaignInput[] | PayoutRateUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: PayoutRateCreateOrConnectWithoutCampaignInput | PayoutRateCreateOrConnectWithoutCampaignInput[]
    createMany?: PayoutRateCreateManyCampaignInputEnvelope
    connect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
  }

  export type ParticipationCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput> | ParticipationCreateWithoutCampaignInput[] | ParticipationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutCampaignInput | ParticipationCreateOrConnectWithoutCampaignInput[]
    createMany?: ParticipationCreateManyCampaignInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type PayoutRateUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput> | PayoutRateCreateWithoutCampaignInput[] | PayoutRateUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: PayoutRateCreateOrConnectWithoutCampaignInput | PayoutRateCreateOrConnectWithoutCampaignInput[]
    createMany?: PayoutRateCreateManyCampaignInputEnvelope
    connect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
  }

  export type ParticipationUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput> | ParticipationCreateWithoutCampaignInput[] | ParticipationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutCampaignInput | ParticipationCreateOrConnectWithoutCampaignInput[]
    createMany?: ParticipationCreateManyCampaignInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumCampaignStatusFieldUpdateOperationsInput = {
    set?: $Enums.CampaignStatus
  }

  export type UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsCreatedInput
    upsert?: UserUpsertWithoutCampaignsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampaignsCreatedInput, UserUpdateWithoutCampaignsCreatedInput>, UserUncheckedUpdateWithoutCampaignsCreatedInput>
  }

  export type PayoutRateUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput> | PayoutRateCreateWithoutCampaignInput[] | PayoutRateUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: PayoutRateCreateOrConnectWithoutCampaignInput | PayoutRateCreateOrConnectWithoutCampaignInput[]
    upsert?: PayoutRateUpsertWithWhereUniqueWithoutCampaignInput | PayoutRateUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: PayoutRateCreateManyCampaignInputEnvelope
    set?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    disconnect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    delete?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    connect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    update?: PayoutRateUpdateWithWhereUniqueWithoutCampaignInput | PayoutRateUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: PayoutRateUpdateManyWithWhereWithoutCampaignInput | PayoutRateUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: PayoutRateScalarWhereInput | PayoutRateScalarWhereInput[]
  }

  export type ParticipationUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput> | ParticipationCreateWithoutCampaignInput[] | ParticipationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutCampaignInput | ParticipationCreateOrConnectWithoutCampaignInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutCampaignInput | ParticipationUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ParticipationCreateManyCampaignInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutCampaignInput | ParticipationUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutCampaignInput | ParticipationUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type PayoutRateUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput> | PayoutRateCreateWithoutCampaignInput[] | PayoutRateUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: PayoutRateCreateOrConnectWithoutCampaignInput | PayoutRateCreateOrConnectWithoutCampaignInput[]
    upsert?: PayoutRateUpsertWithWhereUniqueWithoutCampaignInput | PayoutRateUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: PayoutRateCreateManyCampaignInputEnvelope
    set?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    disconnect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    delete?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    connect?: PayoutRateWhereUniqueInput | PayoutRateWhereUniqueInput[]
    update?: PayoutRateUpdateWithWhereUniqueWithoutCampaignInput | PayoutRateUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: PayoutRateUpdateManyWithWhereWithoutCampaignInput | PayoutRateUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: PayoutRateScalarWhereInput | PayoutRateScalarWhereInput[]
  }

  export type ParticipationUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput> | ParticipationCreateWithoutCampaignInput[] | ParticipationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutCampaignInput | ParticipationCreateOrConnectWithoutCampaignInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutCampaignInput | ParticipationUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ParticipationCreateManyCampaignInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutCampaignInput | ParticipationUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutCampaignInput | ParticipationUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutPayoutRatesInput = {
    create?: XOR<CampaignCreateWithoutPayoutRatesInput, CampaignUncheckedCreateWithoutPayoutRatesInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutPayoutRatesInput
    connect?: CampaignWhereUniqueInput
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CampaignUpdateOneRequiredWithoutPayoutRatesNestedInput = {
    create?: XOR<CampaignCreateWithoutPayoutRatesInput, CampaignUncheckedCreateWithoutPayoutRatesInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutPayoutRatesInput
    upsert?: CampaignUpsertWithoutPayoutRatesInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutPayoutRatesInput, CampaignUpdateWithoutPayoutRatesInput>, CampaignUncheckedUpdateWithoutPayoutRatesInput>
  }

  export type UserCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<CampaignCreateWithoutParticipationsInput, CampaignUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutParticipationsInput
    connect?: CampaignWhereUniqueInput
  }

  export type TrackingLinkCreateNestedManyWithoutParticipationInput = {
    create?: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput> | TrackingLinkCreateWithoutParticipationInput[] | TrackingLinkUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: TrackingLinkCreateOrConnectWithoutParticipationInput | TrackingLinkCreateOrConnectWithoutParticipationInput[]
    createMany?: TrackingLinkCreateManyParticipationInputEnvelope
    connect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
  }

  export type AnalyticsEventCreateNestedManyWithoutParticipationInput = {
    create?: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput> | AnalyticsEventCreateWithoutParticipationInput[] | AnalyticsEventUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutParticipationInput | AnalyticsEventCreateOrConnectWithoutParticipationInput[]
    createMany?: AnalyticsEventCreateManyParticipationInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput = {
    create?: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput> | TrackingLinkCreateWithoutParticipationInput[] | TrackingLinkUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: TrackingLinkCreateOrConnectWithoutParticipationInput | TrackingLinkCreateOrConnectWithoutParticipationInput[]
    createMany?: TrackingLinkCreateManyParticipationInputEnvelope
    connect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
  }

  export type AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput = {
    create?: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput> | AnalyticsEventCreateWithoutParticipationInput[] | AnalyticsEventUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutParticipationInput | AnalyticsEventCreateOrConnectWithoutParticipationInput[]
    createMany?: AnalyticsEventCreateManyParticipationInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipationsInput
    upsert?: UserUpsertWithoutParticipationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParticipationsInput, UserUpdateWithoutParticipationsInput>, UserUncheckedUpdateWithoutParticipationsInput>
  }

  export type CampaignUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<CampaignCreateWithoutParticipationsInput, CampaignUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutParticipationsInput
    upsert?: CampaignUpsertWithoutParticipationsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutParticipationsInput, CampaignUpdateWithoutParticipationsInput>, CampaignUncheckedUpdateWithoutParticipationsInput>
  }

  export type TrackingLinkUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput> | TrackingLinkCreateWithoutParticipationInput[] | TrackingLinkUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: TrackingLinkCreateOrConnectWithoutParticipationInput | TrackingLinkCreateOrConnectWithoutParticipationInput[]
    upsert?: TrackingLinkUpsertWithWhereUniqueWithoutParticipationInput | TrackingLinkUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: TrackingLinkCreateManyParticipationInputEnvelope
    set?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    disconnect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    delete?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    connect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    update?: TrackingLinkUpdateWithWhereUniqueWithoutParticipationInput | TrackingLinkUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: TrackingLinkUpdateManyWithWhereWithoutParticipationInput | TrackingLinkUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: TrackingLinkScalarWhereInput | TrackingLinkScalarWhereInput[]
  }

  export type AnalyticsEventUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput> | AnalyticsEventCreateWithoutParticipationInput[] | AnalyticsEventUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutParticipationInput | AnalyticsEventCreateOrConnectWithoutParticipationInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutParticipationInput | AnalyticsEventUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: AnalyticsEventCreateManyParticipationInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutParticipationInput | AnalyticsEventUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutParticipationInput | AnalyticsEventUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput> | TrackingLinkCreateWithoutParticipationInput[] | TrackingLinkUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: TrackingLinkCreateOrConnectWithoutParticipationInput | TrackingLinkCreateOrConnectWithoutParticipationInput[]
    upsert?: TrackingLinkUpsertWithWhereUniqueWithoutParticipationInput | TrackingLinkUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: TrackingLinkCreateManyParticipationInputEnvelope
    set?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    disconnect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    delete?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    connect?: TrackingLinkWhereUniqueInput | TrackingLinkWhereUniqueInput[]
    update?: TrackingLinkUpdateWithWhereUniqueWithoutParticipationInput | TrackingLinkUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: TrackingLinkUpdateManyWithWhereWithoutParticipationInput | TrackingLinkUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: TrackingLinkScalarWhereInput | TrackingLinkScalarWhereInput[]
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput> | AnalyticsEventCreateWithoutParticipationInput[] | AnalyticsEventUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutParticipationInput | AnalyticsEventCreateOrConnectWithoutParticipationInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutParticipationInput | AnalyticsEventUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: AnalyticsEventCreateManyParticipationInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutParticipationInput | AnalyticsEventUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutParticipationInput | AnalyticsEventUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type ParticipationCreateNestedOneWithoutLinksInput = {
    create?: XOR<ParticipationCreateWithoutLinksInput, ParticipationUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ParticipationCreateOrConnectWithoutLinksInput
    connect?: ParticipationWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ParticipationUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<ParticipationCreateWithoutLinksInput, ParticipationUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ParticipationCreateOrConnectWithoutLinksInput
    upsert?: ParticipationUpsertWithoutLinksInput
    connect?: ParticipationWhereUniqueInput
    update?: XOR<XOR<ParticipationUpdateToOneWithWhereWithoutLinksInput, ParticipationUpdateWithoutLinksInput>, ParticipationUncheckedUpdateWithoutLinksInput>
  }

  export type ParticipationCreateNestedOneWithoutEventsInput = {
    create?: XOR<ParticipationCreateWithoutEventsInput, ParticipationUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ParticipationCreateOrConnectWithoutEventsInput
    connect?: ParticipationWhereUniqueInput
  }

  export type ParticipationUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<ParticipationCreateWithoutEventsInput, ParticipationUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ParticipationCreateOrConnectWithoutEventsInput
    upsert?: ParticipationUpsertWithoutEventsInput
    connect?: ParticipationWhereUniqueInput
    update?: XOR<XOR<ParticipationUpdateToOneWithWhereWithoutEventsInput, ParticipationUpdateWithoutEventsInput>, ParticipationUncheckedUpdateWithoutEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CampaignCreateWithoutBrandInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payoutRates?: PayoutRateCreateNestedManyWithoutCampaignInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutBrandInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payoutRates?: PayoutRateUncheckedCreateNestedManyWithoutCampaignInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput>
  }

  export type CampaignCreateManyBrandInputEnvelope = {
    data: CampaignCreateManyBrandInput | CampaignCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ParticipationCreateWithoutInfluencerInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutInfluencerInput = {
    id?: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationCreateOrConnectWithoutInfluencerInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput>
  }

  export type ParticipationCreateManyInfluencerInputEnvelope = {
    data: ParticipationCreateManyInfluencerInput | ParticipationCreateManyInfluencerInput[]
    skipDuplicates?: boolean
  }

  export type CampaignUpsertWithWhereUniqueWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutBrandInput, CampaignUncheckedUpdateWithoutBrandInput>
    create: XOR<CampaignCreateWithoutBrandInput, CampaignUncheckedCreateWithoutBrandInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutBrandInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutBrandInput, CampaignUncheckedUpdateWithoutBrandInput>
  }

  export type CampaignUpdateManyWithWhereWithoutBrandInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutBrandInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    brandId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type ParticipationUpsertWithWhereUniqueWithoutInfluencerInput = {
    where: ParticipationWhereUniqueInput
    update: XOR<ParticipationUpdateWithoutInfluencerInput, ParticipationUncheckedUpdateWithoutInfluencerInput>
    create: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput>
  }

  export type ParticipationUpdateWithWhereUniqueWithoutInfluencerInput = {
    where: ParticipationWhereUniqueInput
    data: XOR<ParticipationUpdateWithoutInfluencerInput, ParticipationUncheckedUpdateWithoutInfluencerInput>
  }

  export type ParticipationUpdateManyWithWhereWithoutInfluencerInput = {
    where: ParticipationScalarWhereInput
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyWithoutInfluencerInput>
  }

  export type ParticipationScalarWhereInput = {
    AND?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
    OR?: ParticipationScalarWhereInput[]
    NOT?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
    id?: StringFilter<"Participation"> | string
    influencerId?: StringFilter<"Participation"> | string
    campaignId?: StringFilter<"Participation"> | string
    currentBalance?: DecimalFilter<"Participation"> | Decimal | DecimalJsLike | number | string
  }

  export type UserCreateWithoutCampaignsCreatedInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ParticipationCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateWithoutCampaignsCreatedInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ParticipationUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserCreateOrConnectWithoutCampaignsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
  }

  export type PayoutRateCreateWithoutCampaignInput = {
    id?: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
  }

  export type PayoutRateUncheckedCreateWithoutCampaignInput = {
    id?: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
  }

  export type PayoutRateCreateOrConnectWithoutCampaignInput = {
    where: PayoutRateWhereUniqueInput
    create: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput>
  }

  export type PayoutRateCreateManyCampaignInputEnvelope = {
    data: PayoutRateCreateManyCampaignInput | PayoutRateCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type ParticipationCreateWithoutCampaignInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutCampaignInput = {
    id?: string
    influencerId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationCreateOrConnectWithoutCampaignInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput>
  }

  export type ParticipationCreateManyCampaignInputEnvelope = {
    data: ParticipationCreateManyCampaignInput | ParticipationCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCampaignsCreatedInput = {
    update: XOR<UserUpdateWithoutCampaignsCreatedInput, UserUncheckedUpdateWithoutCampaignsCreatedInput>
    create: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampaignsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampaignsCreatedInput, UserUncheckedUpdateWithoutCampaignsCreatedInput>
  }

  export type UserUpdateWithoutCampaignsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type PayoutRateUpsertWithWhereUniqueWithoutCampaignInput = {
    where: PayoutRateWhereUniqueInput
    update: XOR<PayoutRateUpdateWithoutCampaignInput, PayoutRateUncheckedUpdateWithoutCampaignInput>
    create: XOR<PayoutRateCreateWithoutCampaignInput, PayoutRateUncheckedCreateWithoutCampaignInput>
  }

  export type PayoutRateUpdateWithWhereUniqueWithoutCampaignInput = {
    where: PayoutRateWhereUniqueInput
    data: XOR<PayoutRateUpdateWithoutCampaignInput, PayoutRateUncheckedUpdateWithoutCampaignInput>
  }

  export type PayoutRateUpdateManyWithWhereWithoutCampaignInput = {
    where: PayoutRateScalarWhereInput
    data: XOR<PayoutRateUpdateManyMutationInput, PayoutRateUncheckedUpdateManyWithoutCampaignInput>
  }

  export type PayoutRateScalarWhereInput = {
    AND?: PayoutRateScalarWhereInput | PayoutRateScalarWhereInput[]
    OR?: PayoutRateScalarWhereInput[]
    NOT?: PayoutRateScalarWhereInput | PayoutRateScalarWhereInput[]
    id?: StringFilter<"PayoutRate"> | string
    campaignId?: StringFilter<"PayoutRate"> | string
    eventType?: EnumEventTypeFilter<"PayoutRate"> | $Enums.EventType
    amount?: DecimalFilter<"PayoutRate"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"PayoutRate"> | number
    createdAt?: DateTimeFilter<"PayoutRate"> | Date | string
  }

  export type ParticipationUpsertWithWhereUniqueWithoutCampaignInput = {
    where: ParticipationWhereUniqueInput
    update: XOR<ParticipationUpdateWithoutCampaignInput, ParticipationUncheckedUpdateWithoutCampaignInput>
    create: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput>
  }

  export type ParticipationUpdateWithWhereUniqueWithoutCampaignInput = {
    where: ParticipationWhereUniqueInput
    data: XOR<ParticipationUpdateWithoutCampaignInput, ParticipationUncheckedUpdateWithoutCampaignInput>
  }

  export type ParticipationUpdateManyWithWhereWithoutCampaignInput = {
    where: ParticipationScalarWhereInput
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignCreateWithoutPayoutRatesInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: UserCreateNestedOneWithoutCampaignsCreatedInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutPayoutRatesInput = {
    id?: string
    brandId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ParticipationUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutPayoutRatesInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutPayoutRatesInput, CampaignUncheckedCreateWithoutPayoutRatesInput>
  }

  export type CampaignUpsertWithoutPayoutRatesInput = {
    update: XOR<CampaignUpdateWithoutPayoutRatesInput, CampaignUncheckedUpdateWithoutPayoutRatesInput>
    create: XOR<CampaignCreateWithoutPayoutRatesInput, CampaignUncheckedCreateWithoutPayoutRatesInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutPayoutRatesInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutPayoutRatesInput, CampaignUncheckedUpdateWithoutPayoutRatesInput>
  }

  export type CampaignUpdateWithoutPayoutRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutPayoutRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type UserCreateWithoutParticipationsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignCreateNestedManyWithoutBrandInput
  }

  export type UserUncheckedCreateWithoutParticipationsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutBrandInput
  }

  export type UserCreateOrConnectWithoutParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
  }

  export type CampaignCreateWithoutParticipationsInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: UserCreateNestedOneWithoutCampaignsCreatedInput
    payoutRates?: PayoutRateCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutParticipationsInput = {
    id?: string
    brandId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payoutRates?: PayoutRateUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutParticipationsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutParticipationsInput, CampaignUncheckedCreateWithoutParticipationsInput>
  }

  export type TrackingLinkCreateWithoutParticipationInput = {
    id?: string
    url: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingLinkUncheckedCreateWithoutParticipationInput = {
    id?: string
    url: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingLinkCreateOrConnectWithoutParticipationInput = {
    where: TrackingLinkWhereUniqueInput
    create: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput>
  }

  export type TrackingLinkCreateManyParticipationInputEnvelope = {
    data: TrackingLinkCreateManyParticipationInput | TrackingLinkCreateManyParticipationInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsEventCreateWithoutParticipationInput = {
    id?: string
    type: $Enums.EventType
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AnalyticsEventUncheckedCreateWithoutParticipationInput = {
    id?: string
    type: $Enums.EventType
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type AnalyticsEventCreateOrConnectWithoutParticipationInput = {
    where: AnalyticsEventWhereUniqueInput
    create: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput>
  }

  export type AnalyticsEventCreateManyParticipationInputEnvelope = {
    data: AnalyticsEventCreateManyParticipationInput | AnalyticsEventCreateManyParticipationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutParticipationsInput = {
    update: XOR<UserUpdateWithoutParticipationsInput, UserUncheckedUpdateWithoutParticipationsInput>
    create: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParticipationsInput, UserUncheckedUpdateWithoutParticipationsInput>
  }

  export type UserUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUpdateManyWithoutBrandNestedInput
  }

  export type UserUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type CampaignUpsertWithoutParticipationsInput = {
    update: XOR<CampaignUpdateWithoutParticipationsInput, CampaignUncheckedUpdateWithoutParticipationsInput>
    create: XOR<CampaignCreateWithoutParticipationsInput, CampaignUncheckedCreateWithoutParticipationsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutParticipationsInput, CampaignUncheckedUpdateWithoutParticipationsInput>
  }

  export type CampaignUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    payoutRates?: PayoutRateUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutRates?: PayoutRateUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type TrackingLinkUpsertWithWhereUniqueWithoutParticipationInput = {
    where: TrackingLinkWhereUniqueInput
    update: XOR<TrackingLinkUpdateWithoutParticipationInput, TrackingLinkUncheckedUpdateWithoutParticipationInput>
    create: XOR<TrackingLinkCreateWithoutParticipationInput, TrackingLinkUncheckedCreateWithoutParticipationInput>
  }

  export type TrackingLinkUpdateWithWhereUniqueWithoutParticipationInput = {
    where: TrackingLinkWhereUniqueInput
    data: XOR<TrackingLinkUpdateWithoutParticipationInput, TrackingLinkUncheckedUpdateWithoutParticipationInput>
  }

  export type TrackingLinkUpdateManyWithWhereWithoutParticipationInput = {
    where: TrackingLinkScalarWhereInput
    data: XOR<TrackingLinkUpdateManyMutationInput, TrackingLinkUncheckedUpdateManyWithoutParticipationInput>
  }

  export type TrackingLinkScalarWhereInput = {
    AND?: TrackingLinkScalarWhereInput | TrackingLinkScalarWhereInput[]
    OR?: TrackingLinkScalarWhereInput[]
    NOT?: TrackingLinkScalarWhereInput | TrackingLinkScalarWhereInput[]
    id?: StringFilter<"TrackingLink"> | string
    url?: StringFilter<"TrackingLink"> | string
    participationId?: StringFilter<"TrackingLink"> | string
    isActive?: BoolFilter<"TrackingLink"> | boolean
    expiresAt?: DateTimeNullableFilter<"TrackingLink"> | Date | string | null
    createdAt?: DateTimeFilter<"TrackingLink"> | Date | string
    updatedAt?: DateTimeFilter<"TrackingLink"> | Date | string
  }

  export type AnalyticsEventUpsertWithWhereUniqueWithoutParticipationInput = {
    where: AnalyticsEventWhereUniqueInput
    update: XOR<AnalyticsEventUpdateWithoutParticipationInput, AnalyticsEventUncheckedUpdateWithoutParticipationInput>
    create: XOR<AnalyticsEventCreateWithoutParticipationInput, AnalyticsEventUncheckedCreateWithoutParticipationInput>
  }

  export type AnalyticsEventUpdateWithWhereUniqueWithoutParticipationInput = {
    where: AnalyticsEventWhereUniqueInput
    data: XOR<AnalyticsEventUpdateWithoutParticipationInput, AnalyticsEventUncheckedUpdateWithoutParticipationInput>
  }

  export type AnalyticsEventUpdateManyWithWhereWithoutParticipationInput = {
    where: AnalyticsEventScalarWhereInput
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyWithoutParticipationInput>
  }

  export type AnalyticsEventScalarWhereInput = {
    AND?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    OR?: AnalyticsEventScalarWhereInput[]
    NOT?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    type?: EnumEventTypeFilter<"AnalyticsEvent"> | $Enums.EventType
    participationId?: StringFilter<"AnalyticsEvent"> | string
    externalTxId?: StringNullableFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    payoutGenerated?: DecimalFilter<"AnalyticsEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type ParticipationCreateWithoutLinksInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutLinksInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationCreateOrConnectWithoutLinksInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutLinksInput, ParticipationUncheckedCreateWithoutLinksInput>
  }

  export type ParticipationUpsertWithoutLinksInput = {
    update: XOR<ParticipationUpdateWithoutLinksInput, ParticipationUncheckedUpdateWithoutLinksInput>
    create: XOR<ParticipationCreateWithoutLinksInput, ParticipationUncheckedCreateWithoutLinksInput>
    where?: ParticipationWhereInput
  }

  export type ParticipationUpdateToOneWithWhereWithoutLinksInput = {
    where?: ParticipationWhereInput
    data: XOR<ParticipationUpdateWithoutLinksInput, ParticipationUncheckedUpdateWithoutLinksInput>
  }

  export type ParticipationUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationCreateWithoutEventsInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutEventsInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationCreateOrConnectWithoutEventsInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutEventsInput, ParticipationUncheckedCreateWithoutEventsInput>
  }

  export type ParticipationUpsertWithoutEventsInput = {
    update: XOR<ParticipationUpdateWithoutEventsInput, ParticipationUncheckedUpdateWithoutEventsInput>
    create: XOR<ParticipationCreateWithoutEventsInput, ParticipationUncheckedCreateWithoutEventsInput>
    where?: ParticipationWhereInput
  }

  export type ParticipationUpdateToOneWithWhereWithoutEventsInput = {
    where?: ParticipationWhereInput
    data: XOR<ParticipationUpdateWithoutEventsInput, ParticipationUncheckedUpdateWithoutEventsInput>
  }

  export type ParticipationUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type CampaignCreateManyBrandInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParticipationCreateManyInfluencerInput = {
    id?: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
  }

  export type CampaignUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutRates?: PayoutRateUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutRates?: PayoutRateUncheckedUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateManyWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PayoutRateCreateManyCampaignInput = {
    id?: string
    eventType: $Enums.EventType
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
  }

  export type ParticipationCreateManyCampaignInput = {
    id?: string
    influencerId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
  }

  export type PayoutRateUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutRateUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutRateUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TrackingLinkCreateManyParticipationInput = {
    id?: string
    url: string
    isActive?: boolean
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnalyticsEventCreateManyParticipationInput = {
    id?: string
    type: $Enums.EventType
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type TrackingLinkUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingLinkUncheckedUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingLinkUncheckedUpdateManyWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}