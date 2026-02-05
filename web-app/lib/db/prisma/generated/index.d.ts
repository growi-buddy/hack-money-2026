
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
 * Model RewardEvent
 * 
 */
export type RewardEvent = $Result.DefaultSelection<Prisma.$RewardEventPayload>
/**
 * Model CampaignRewardEvent
 * 
 */
export type CampaignRewardEvent = $Result.DefaultSelection<Prisma.$CampaignRewardEventPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model TrackedEvent
 * 
 */
export type TrackedEvent = $Result.DefaultSelection<Prisma.$TrackedEventPayload>
/**
 * Model Selector
 * 
 */
export type Selector = $Result.DefaultSelection<Prisma.$SelectorPayload>
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
  LANDING_PAGE_VIEW: 'LANDING_PAGE_VIEW',
  VIEW_ITEM: 'VIEW_ITEM',
  ADD_TO_CART: 'ADD_TO_CART',
  CHECKOUT: 'CHECKOUT',
  PURCHASE_SUCCESS: 'PURCHASE_SUCCESS'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const SelectorEventType: {
  ONCLICK: 'ONCLICK',
  HOVER: 'HOVER',
  DOUBLE_CLICK: 'DOUBLE_CLICK'
};

export type SelectorEventType = (typeof SelectorEventType)[keyof typeof SelectorEventType]


export const CampaignStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DEPLETED: 'DEPLETED',
  DELETED: 'DELETED'
};

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]

}

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type SelectorEventType = $Enums.SelectorEventType

export const SelectorEventType: typeof $Enums.SelectorEventType

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
   * `prisma.rewardEvent`: Exposes CRUD operations for the **RewardEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RewardEvents
    * const rewardEvents = await prisma.rewardEvent.findMany()
    * ```
    */
  get rewardEvent(): Prisma.RewardEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignRewardEvent`: Exposes CRUD operations for the **CampaignRewardEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignRewardEvents
    * const campaignRewardEvents = await prisma.campaignRewardEvent.findMany()
    * ```
    */
  get campaignRewardEvent(): Prisma.CampaignRewardEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trackedEvent`: Exposes CRUD operations for the **TrackedEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackedEvents
    * const trackedEvents = await prisma.trackedEvent.findMany()
    * ```
    */
  get trackedEvent(): Prisma.TrackedEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.selector`: Exposes CRUD operations for the **Selector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Selectors
    * const selectors = await prisma.selector.findMany()
    * ```
    */
  get selector(): Prisma.SelectorDelegate<ExtArgs, ClientOptions>;

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
    RewardEvent: 'RewardEvent',
    CampaignRewardEvent: 'CampaignRewardEvent',
    Client: 'Client',
    TrackedEvent: 'TrackedEvent',
    Selector: 'Selector',
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
      modelProps: "user" | "campaign" | "rewardEvent" | "campaignRewardEvent" | "client" | "trackedEvent" | "selector" | "participation" | "trackingLink" | "analyticsEvent"
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
      RewardEvent: {
        payload: Prisma.$RewardEventPayload<ExtArgs>
        fields: Prisma.RewardEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewardEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewardEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          findFirst: {
            args: Prisma.RewardEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewardEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          findMany: {
            args: Prisma.RewardEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>[]
          }
          create: {
            args: Prisma.RewardEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          createMany: {
            args: Prisma.RewardEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewardEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>[]
          }
          delete: {
            args: Prisma.RewardEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          update: {
            args: Prisma.RewardEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          deleteMany: {
            args: Prisma.RewardEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewardEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RewardEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>[]
          }
          upsert: {
            args: Prisma.RewardEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardEventPayload>
          }
          aggregate: {
            args: Prisma.RewardEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRewardEvent>
          }
          groupBy: {
            args: Prisma.RewardEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewardEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewardEventCountArgs<ExtArgs>
            result: $Utils.Optional<RewardEventCountAggregateOutputType> | number
          }
        }
      }
      CampaignRewardEvent: {
        payload: Prisma.$CampaignRewardEventPayload<ExtArgs>
        fields: Prisma.CampaignRewardEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignRewardEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignRewardEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          findFirst: {
            args: Prisma.CampaignRewardEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignRewardEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          findMany: {
            args: Prisma.CampaignRewardEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>[]
          }
          create: {
            args: Prisma.CampaignRewardEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          createMany: {
            args: Prisma.CampaignRewardEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignRewardEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>[]
          }
          delete: {
            args: Prisma.CampaignRewardEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          update: {
            args: Prisma.CampaignRewardEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          deleteMany: {
            args: Prisma.CampaignRewardEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignRewardEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignRewardEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>[]
          }
          upsert: {
            args: Prisma.CampaignRewardEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignRewardEventPayload>
          }
          aggregate: {
            args: Prisma.CampaignRewardEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignRewardEvent>
          }
          groupBy: {
            args: Prisma.CampaignRewardEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignRewardEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignRewardEventCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignRewardEventCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      TrackedEvent: {
        payload: Prisma.$TrackedEventPayload<ExtArgs>
        fields: Prisma.TrackedEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackedEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackedEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          findFirst: {
            args: Prisma.TrackedEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackedEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          findMany: {
            args: Prisma.TrackedEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>[]
          }
          create: {
            args: Prisma.TrackedEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          createMany: {
            args: Prisma.TrackedEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackedEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>[]
          }
          delete: {
            args: Prisma.TrackedEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          update: {
            args: Prisma.TrackedEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          deleteMany: {
            args: Prisma.TrackedEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackedEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackedEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>[]
          }
          upsert: {
            args: Prisma.TrackedEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackedEventPayload>
          }
          aggregate: {
            args: Prisma.TrackedEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackedEvent>
          }
          groupBy: {
            args: Prisma.TrackedEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackedEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackedEventCountArgs<ExtArgs>
            result: $Utils.Optional<TrackedEventCountAggregateOutputType> | number
          }
        }
      }
      Selector: {
        payload: Prisma.$SelectorPayload<ExtArgs>
        fields: Prisma.SelectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SelectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SelectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          findFirst: {
            args: Prisma.SelectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SelectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          findMany: {
            args: Prisma.SelectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>[]
          }
          create: {
            args: Prisma.SelectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          createMany: {
            args: Prisma.SelectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SelectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>[]
          }
          delete: {
            args: Prisma.SelectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          update: {
            args: Prisma.SelectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          deleteMany: {
            args: Prisma.SelectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SelectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SelectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>[]
          }
          upsert: {
            args: Prisma.SelectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SelectorPayload>
          }
          aggregate: {
            args: Prisma.SelectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSelector>
          }
          groupBy: {
            args: Prisma.SelectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SelectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SelectorCountArgs<ExtArgs>
            result: $Utils.Optional<SelectorCountAggregateOutputType> | number
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
    rewardEvent?: RewardEventOmit
    campaignRewardEvent?: CampaignRewardEventOmit
    client?: ClientOmit
    trackedEvent?: TrackedEventOmit
    selector?: SelectorOmit
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
    rewardEvents: number
    participations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignsCreated?: boolean | UserCountOutputTypeCountCampaignsCreatedArgs
    rewardEvents?: boolean | UserCountOutputTypeCountRewardEventsArgs
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
  export type UserCountOutputTypeCountRewardEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardEventWhereInput
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
    rewardEvents: number
    participations: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewardEvents?: boolean | CampaignCountOutputTypeCountRewardEventsArgs
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
  export type CampaignCountOutputTypeCountRewardEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignRewardEventWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
  }


  /**
   * Count Type RewardEventCountOutputType
   */

  export type RewardEventCountOutputType = {
    selectors: number
    campaigns: number
  }

  export type RewardEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectors?: boolean | RewardEventCountOutputTypeCountSelectorsArgs
    campaigns?: boolean | RewardEventCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * RewardEventCountOutputType without action
   */
  export type RewardEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEventCountOutputType
     */
    select?: RewardEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RewardEventCountOutputType without action
   */
  export type RewardEventCountOutputTypeCountSelectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SelectorWhereInput
  }

  /**
   * RewardEventCountOutputType without action
   */
  export type RewardEventCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignRewardEventWhereInput
  }


  /**
   * Count Type CampaignRewardEventCountOutputType
   */

  export type CampaignRewardEventCountOutputType = {
    trackedEvents: number
  }

  export type CampaignRewardEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trackedEvents?: boolean | CampaignRewardEventCountOutputTypeCountTrackedEventsArgs
  }

  // Custom InputTypes
  /**
   * CampaignRewardEventCountOutputType without action
   */
  export type CampaignRewardEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEventCountOutputType
     */
    select?: CampaignRewardEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignRewardEventCountOutputType without action
   */
  export type CampaignRewardEventCountOutputTypeCountTrackedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackedEventWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    trackedEvents: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trackedEvents?: boolean | ClientCountOutputTypeCountTrackedEventsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountTrackedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackedEventWhereInput
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
    rewardEvents?: boolean | User$rewardEventsArgs<ExtArgs>
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
    rewardEvents?: boolean | User$rewardEventsArgs<ExtArgs>
    participations?: boolean | User$participationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      campaignsCreated: Prisma.$CampaignPayload<ExtArgs>[]
      rewardEvents: Prisma.$RewardEventPayload<ExtArgs>[]
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
    rewardEvents<T extends User$rewardEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$rewardEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.rewardEvents
   */
  export type User$rewardEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    where?: RewardEventWhereInput
    orderBy?: RewardEventOrderByWithRelationInput | RewardEventOrderByWithRelationInput[]
    cursor?: RewardEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewardEventScalarFieldEnum | RewardEventScalarFieldEnum[]
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
    ownerId: string | null
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
    ownerId: string | null
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
    ownerId: number
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
    ownerId?: true
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
    ownerId?: true
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
    ownerId?: true
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
    ownerId: string
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
    ownerId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    rewardEvents?: boolean | Campaign$rewardEventsArgs<ExtArgs>
    participations?: boolean | Campaign$participationsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    ownerId?: boolean
    title?: boolean
    escrowAddress?: boolean
    budgetTotal?: boolean
    yellowChannelId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "title" | "escrowAddress" | "budgetTotal" | "yellowChannelId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    rewardEvents?: boolean | Campaign$rewardEventsArgs<ExtArgs>
    participations?: boolean | Campaign$participationsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      rewardEvents: Prisma.$CampaignRewardEventPayload<ExtArgs>[]
      participations: Prisma.$ParticipationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
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
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rewardEvents<T extends Campaign$rewardEventsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$rewardEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly ownerId: FieldRef<"Campaign", 'String'>
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
   * Campaign.rewardEvents
   */
  export type Campaign$rewardEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    where?: CampaignRewardEventWhereInput
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    cursor?: CampaignRewardEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignRewardEventScalarFieldEnum | CampaignRewardEventScalarFieldEnum[]
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
   * Model RewardEvent
   */

  export type AggregateRewardEvent = {
    _count: RewardEventCountAggregateOutputType | null
    _min: RewardEventMinAggregateOutputType | null
    _max: RewardEventMaxAggregateOutputType | null
  }

  export type RewardEventMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    eventType: $Enums.EventType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardEventMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    eventType: $Enums.EventType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardEventCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    eventType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RewardEventMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardEventMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardEventCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    eventType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RewardEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewardEvent to aggregate.
     */
    where?: RewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardEvents to fetch.
     */
    orderBy?: RewardEventOrderByWithRelationInput | RewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RewardEvents
    **/
    _count?: true | RewardEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewardEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewardEventMaxAggregateInputType
  }

  export type GetRewardEventAggregateType<T extends RewardEventAggregateArgs> = {
        [P in keyof T & keyof AggregateRewardEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRewardEvent[P]>
      : GetScalarType<T[P], AggregateRewardEvent[P]>
  }




  export type RewardEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardEventWhereInput
    orderBy?: RewardEventOrderByWithAggregationInput | RewardEventOrderByWithAggregationInput[]
    by: RewardEventScalarFieldEnum[] | RewardEventScalarFieldEnum
    having?: RewardEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewardEventCountAggregateInputType | true
    _min?: RewardEventMinAggregateInputType
    _max?: RewardEventMaxAggregateInputType
  }

  export type RewardEventGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    eventType: $Enums.EventType
    createdAt: Date
    updatedAt: Date
    _count: RewardEventCountAggregateOutputType | null
    _min: RewardEventMinAggregateOutputType | null
    _max: RewardEventMaxAggregateOutputType | null
  }

  type GetRewardEventGroupByPayload<T extends RewardEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewardEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewardEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewardEventGroupByOutputType[P]>
            : GetScalarType<T[P], RewardEventGroupByOutputType[P]>
        }
      >
    >


  export type RewardEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    selectors?: boolean | RewardEvent$selectorsArgs<ExtArgs>
    campaigns?: boolean | RewardEvent$campaignsArgs<ExtArgs>
    _count?: boolean | RewardEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewardEvent"]>

  export type RewardEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewardEvent"]>

  export type RewardEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewardEvent"]>

  export type RewardEventSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    eventType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RewardEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "eventType" | "createdAt" | "updatedAt", ExtArgs["result"]["rewardEvent"]>
  export type RewardEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    selectors?: boolean | RewardEvent$selectorsArgs<ExtArgs>
    campaigns?: boolean | RewardEvent$campaignsArgs<ExtArgs>
    _count?: boolean | RewardEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RewardEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RewardEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RewardEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RewardEvent"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      selectors: Prisma.$SelectorPayload<ExtArgs>[]
      campaigns: Prisma.$CampaignRewardEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      name: string
      eventType: $Enums.EventType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rewardEvent"]>
    composites: {}
  }

  type RewardEventGetPayload<S extends boolean | null | undefined | RewardEventDefaultArgs> = $Result.GetResult<Prisma.$RewardEventPayload, S>

  type RewardEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RewardEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RewardEventCountAggregateInputType | true
    }

  export interface RewardEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RewardEvent'], meta: { name: 'RewardEvent' } }
    /**
     * Find zero or one RewardEvent that matches the filter.
     * @param {RewardEventFindUniqueArgs} args - Arguments to find a RewardEvent
     * @example
     * // Get one RewardEvent
     * const rewardEvent = await prisma.rewardEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewardEventFindUniqueArgs>(args: SelectSubset<T, RewardEventFindUniqueArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RewardEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RewardEventFindUniqueOrThrowArgs} args - Arguments to find a RewardEvent
     * @example
     * // Get one RewardEvent
     * const rewardEvent = await prisma.rewardEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewardEventFindUniqueOrThrowArgs>(args: SelectSubset<T, RewardEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewardEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventFindFirstArgs} args - Arguments to find a RewardEvent
     * @example
     * // Get one RewardEvent
     * const rewardEvent = await prisma.rewardEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewardEventFindFirstArgs>(args?: SelectSubset<T, RewardEventFindFirstArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewardEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventFindFirstOrThrowArgs} args - Arguments to find a RewardEvent
     * @example
     * // Get one RewardEvent
     * const rewardEvent = await prisma.rewardEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewardEventFindFirstOrThrowArgs>(args?: SelectSubset<T, RewardEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RewardEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RewardEvents
     * const rewardEvents = await prisma.rewardEvent.findMany()
     * 
     * // Get first 10 RewardEvents
     * const rewardEvents = await prisma.rewardEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewardEventWithIdOnly = await prisma.rewardEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewardEventFindManyArgs>(args?: SelectSubset<T, RewardEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RewardEvent.
     * @param {RewardEventCreateArgs} args - Arguments to create a RewardEvent.
     * @example
     * // Create one RewardEvent
     * const RewardEvent = await prisma.rewardEvent.create({
     *   data: {
     *     // ... data to create a RewardEvent
     *   }
     * })
     * 
     */
    create<T extends RewardEventCreateArgs>(args: SelectSubset<T, RewardEventCreateArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RewardEvents.
     * @param {RewardEventCreateManyArgs} args - Arguments to create many RewardEvents.
     * @example
     * // Create many RewardEvents
     * const rewardEvent = await prisma.rewardEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewardEventCreateManyArgs>(args?: SelectSubset<T, RewardEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RewardEvents and returns the data saved in the database.
     * @param {RewardEventCreateManyAndReturnArgs} args - Arguments to create many RewardEvents.
     * @example
     * // Create many RewardEvents
     * const rewardEvent = await prisma.rewardEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RewardEvents and only return the `id`
     * const rewardEventWithIdOnly = await prisma.rewardEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewardEventCreateManyAndReturnArgs>(args?: SelectSubset<T, RewardEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RewardEvent.
     * @param {RewardEventDeleteArgs} args - Arguments to delete one RewardEvent.
     * @example
     * // Delete one RewardEvent
     * const RewardEvent = await prisma.rewardEvent.delete({
     *   where: {
     *     // ... filter to delete one RewardEvent
     *   }
     * })
     * 
     */
    delete<T extends RewardEventDeleteArgs>(args: SelectSubset<T, RewardEventDeleteArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RewardEvent.
     * @param {RewardEventUpdateArgs} args - Arguments to update one RewardEvent.
     * @example
     * // Update one RewardEvent
     * const rewardEvent = await prisma.rewardEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewardEventUpdateArgs>(args: SelectSubset<T, RewardEventUpdateArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RewardEvents.
     * @param {RewardEventDeleteManyArgs} args - Arguments to filter RewardEvents to delete.
     * @example
     * // Delete a few RewardEvents
     * const { count } = await prisma.rewardEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewardEventDeleteManyArgs>(args?: SelectSubset<T, RewardEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RewardEvents
     * const rewardEvent = await prisma.rewardEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewardEventUpdateManyArgs>(args: SelectSubset<T, RewardEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewardEvents and returns the data updated in the database.
     * @param {RewardEventUpdateManyAndReturnArgs} args - Arguments to update many RewardEvents.
     * @example
     * // Update many RewardEvents
     * const rewardEvent = await prisma.rewardEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RewardEvents and only return the `id`
     * const rewardEventWithIdOnly = await prisma.rewardEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends RewardEventUpdateManyAndReturnArgs>(args: SelectSubset<T, RewardEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RewardEvent.
     * @param {RewardEventUpsertArgs} args - Arguments to update or create a RewardEvent.
     * @example
     * // Update or create a RewardEvent
     * const rewardEvent = await prisma.rewardEvent.upsert({
     *   create: {
     *     // ... data to create a RewardEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RewardEvent we want to update
     *   }
     * })
     */
    upsert<T extends RewardEventUpsertArgs>(args: SelectSubset<T, RewardEventUpsertArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RewardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventCountArgs} args - Arguments to filter RewardEvents to count.
     * @example
     * // Count the number of RewardEvents
     * const count = await prisma.rewardEvent.count({
     *   where: {
     *     // ... the filter for the RewardEvents we want to count
     *   }
     * })
    **/
    count<T extends RewardEventCountArgs>(
      args?: Subset<T, RewardEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewardEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RewardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RewardEventAggregateArgs>(args: Subset<T, RewardEventAggregateArgs>): Prisma.PrismaPromise<GetRewardEventAggregateType<T>>

    /**
     * Group by RewardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardEventGroupByArgs} args - Group by arguments.
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
      T extends RewardEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewardEventGroupByArgs['orderBy'] }
        : { orderBy?: RewardEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RewardEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewardEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RewardEvent model
   */
  readonly fields: RewardEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RewardEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewardEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    selectors<T extends RewardEvent$selectorsArgs<ExtArgs> = {}>(args?: Subset<T, RewardEvent$selectorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaigns<T extends RewardEvent$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, RewardEvent$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the RewardEvent model
   */
  interface RewardEventFieldRefs {
    readonly id: FieldRef<"RewardEvent", 'String'>
    readonly ownerId: FieldRef<"RewardEvent", 'String'>
    readonly name: FieldRef<"RewardEvent", 'String'>
    readonly eventType: FieldRef<"RewardEvent", 'EventType'>
    readonly createdAt: FieldRef<"RewardEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"RewardEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RewardEvent findUnique
   */
  export type RewardEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter, which RewardEvent to fetch.
     */
    where: RewardEventWhereUniqueInput
  }

  /**
   * RewardEvent findUniqueOrThrow
   */
  export type RewardEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter, which RewardEvent to fetch.
     */
    where: RewardEventWhereUniqueInput
  }

  /**
   * RewardEvent findFirst
   */
  export type RewardEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter, which RewardEvent to fetch.
     */
    where?: RewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardEvents to fetch.
     */
    orderBy?: RewardEventOrderByWithRelationInput | RewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewardEvents.
     */
    cursor?: RewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewardEvents.
     */
    distinct?: RewardEventScalarFieldEnum | RewardEventScalarFieldEnum[]
  }

  /**
   * RewardEvent findFirstOrThrow
   */
  export type RewardEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter, which RewardEvent to fetch.
     */
    where?: RewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardEvents to fetch.
     */
    orderBy?: RewardEventOrderByWithRelationInput | RewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewardEvents.
     */
    cursor?: RewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewardEvents.
     */
    distinct?: RewardEventScalarFieldEnum | RewardEventScalarFieldEnum[]
  }

  /**
   * RewardEvent findMany
   */
  export type RewardEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter, which RewardEvents to fetch.
     */
    where?: RewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardEvents to fetch.
     */
    orderBy?: RewardEventOrderByWithRelationInput | RewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RewardEvents.
     */
    cursor?: RewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardEvents.
     */
    skip?: number
    distinct?: RewardEventScalarFieldEnum | RewardEventScalarFieldEnum[]
  }

  /**
   * RewardEvent create
   */
  export type RewardEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * The data needed to create a RewardEvent.
     */
    data: XOR<RewardEventCreateInput, RewardEventUncheckedCreateInput>
  }

  /**
   * RewardEvent createMany
   */
  export type RewardEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RewardEvents.
     */
    data: RewardEventCreateManyInput | RewardEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RewardEvent createManyAndReturn
   */
  export type RewardEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * The data used to create many RewardEvents.
     */
    data: RewardEventCreateManyInput | RewardEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RewardEvent update
   */
  export type RewardEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * The data needed to update a RewardEvent.
     */
    data: XOR<RewardEventUpdateInput, RewardEventUncheckedUpdateInput>
    /**
     * Choose, which RewardEvent to update.
     */
    where: RewardEventWhereUniqueInput
  }

  /**
   * RewardEvent updateMany
   */
  export type RewardEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RewardEvents.
     */
    data: XOR<RewardEventUpdateManyMutationInput, RewardEventUncheckedUpdateManyInput>
    /**
     * Filter which RewardEvents to update
     */
    where?: RewardEventWhereInput
    /**
     * Limit how many RewardEvents to update.
     */
    limit?: number
  }

  /**
   * RewardEvent updateManyAndReturn
   */
  export type RewardEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * The data used to update RewardEvents.
     */
    data: XOR<RewardEventUpdateManyMutationInput, RewardEventUncheckedUpdateManyInput>
    /**
     * Filter which RewardEvents to update
     */
    where?: RewardEventWhereInput
    /**
     * Limit how many RewardEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RewardEvent upsert
   */
  export type RewardEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * The filter to search for the RewardEvent to update in case it exists.
     */
    where: RewardEventWhereUniqueInput
    /**
     * In case the RewardEvent found by the `where` argument doesn't exist, create a new RewardEvent with this data.
     */
    create: XOR<RewardEventCreateInput, RewardEventUncheckedCreateInput>
    /**
     * In case the RewardEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewardEventUpdateInput, RewardEventUncheckedUpdateInput>
  }

  /**
   * RewardEvent delete
   */
  export type RewardEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
    /**
     * Filter which RewardEvent to delete.
     */
    where: RewardEventWhereUniqueInput
  }

  /**
   * RewardEvent deleteMany
   */
  export type RewardEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewardEvents to delete
     */
    where?: RewardEventWhereInput
    /**
     * Limit how many RewardEvents to delete.
     */
    limit?: number
  }

  /**
   * RewardEvent.selectors
   */
  export type RewardEvent$selectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    where?: SelectorWhereInput
    orderBy?: SelectorOrderByWithRelationInput | SelectorOrderByWithRelationInput[]
    cursor?: SelectorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SelectorScalarFieldEnum | SelectorScalarFieldEnum[]
  }

  /**
   * RewardEvent.campaigns
   */
  export type RewardEvent$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    where?: CampaignRewardEventWhereInput
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    cursor?: CampaignRewardEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignRewardEventScalarFieldEnum | CampaignRewardEventScalarFieldEnum[]
  }

  /**
   * RewardEvent without action
   */
  export type RewardEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardEvent
     */
    select?: RewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewardEvent
     */
    omit?: RewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardEventInclude<ExtArgs> | null
  }


  /**
   * Model CampaignRewardEvent
   */

  export type AggregateCampaignRewardEvent = {
    _count: CampaignRewardEventCountAggregateOutputType | null
    _avg: CampaignRewardEventAvgAggregateOutputType | null
    _sum: CampaignRewardEventSumAggregateOutputType | null
    _min: CampaignRewardEventMinAggregateOutputType | null
    _max: CampaignRewardEventMaxAggregateOutputType | null
  }

  export type CampaignRewardEventAvgAggregateOutputType = {
    amount: Decimal | null
    volumeStep: number | null
  }

  export type CampaignRewardEventSumAggregateOutputType = {
    amount: Decimal | null
    volumeStep: number | null
  }

  export type CampaignRewardEventMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    rewardEventId: string | null
    amount: Decimal | null
    volumeStep: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignRewardEventMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    rewardEventId: string | null
    amount: Decimal | null
    volumeStep: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignRewardEventCountAggregateOutputType = {
    id: number
    campaignId: number
    rewardEventId: number
    amount: number
    volumeStep: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignRewardEventAvgAggregateInputType = {
    amount?: true
    volumeStep?: true
  }

  export type CampaignRewardEventSumAggregateInputType = {
    amount?: true
    volumeStep?: true
  }

  export type CampaignRewardEventMinAggregateInputType = {
    id?: true
    campaignId?: true
    rewardEventId?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignRewardEventMaxAggregateInputType = {
    id?: true
    campaignId?: true
    rewardEventId?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignRewardEventCountAggregateInputType = {
    id?: true
    campaignId?: true
    rewardEventId?: true
    amount?: true
    volumeStep?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignRewardEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignRewardEvent to aggregate.
     */
    where?: CampaignRewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignRewardEvents to fetch.
     */
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignRewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignRewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignRewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignRewardEvents
    **/
    _count?: true | CampaignRewardEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignRewardEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignRewardEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignRewardEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignRewardEventMaxAggregateInputType
  }

  export type GetCampaignRewardEventAggregateType<T extends CampaignRewardEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignRewardEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignRewardEvent[P]>
      : GetScalarType<T[P], AggregateCampaignRewardEvent[P]>
  }




  export type CampaignRewardEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignRewardEventWhereInput
    orderBy?: CampaignRewardEventOrderByWithAggregationInput | CampaignRewardEventOrderByWithAggregationInput[]
    by: CampaignRewardEventScalarFieldEnum[] | CampaignRewardEventScalarFieldEnum
    having?: CampaignRewardEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignRewardEventCountAggregateInputType | true
    _avg?: CampaignRewardEventAvgAggregateInputType
    _sum?: CampaignRewardEventSumAggregateInputType
    _min?: CampaignRewardEventMinAggregateInputType
    _max?: CampaignRewardEventMaxAggregateInputType
  }

  export type CampaignRewardEventGroupByOutputType = {
    id: string
    campaignId: string
    rewardEventId: string
    amount: Decimal
    volumeStep: number
    createdAt: Date
    updatedAt: Date
    _count: CampaignRewardEventCountAggregateOutputType | null
    _avg: CampaignRewardEventAvgAggregateOutputType | null
    _sum: CampaignRewardEventSumAggregateOutputType | null
    _min: CampaignRewardEventMinAggregateOutputType | null
    _max: CampaignRewardEventMaxAggregateOutputType | null
  }

  type GetCampaignRewardEventGroupByPayload<T extends CampaignRewardEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignRewardEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignRewardEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignRewardEventGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignRewardEventGroupByOutputType[P]>
        }
      >
    >


  export type CampaignRewardEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    rewardEventId?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
    trackedEvents?: boolean | CampaignRewardEvent$trackedEventsArgs<ExtArgs>
    _count?: boolean | CampaignRewardEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignRewardEvent"]>

  export type CampaignRewardEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    rewardEventId?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignRewardEvent"]>

  export type CampaignRewardEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    rewardEventId?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignRewardEvent"]>

  export type CampaignRewardEventSelectScalar = {
    id?: boolean
    campaignId?: boolean
    rewardEventId?: boolean
    amount?: boolean
    volumeStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignRewardEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "rewardEventId" | "amount" | "volumeStep" | "createdAt" | "updatedAt", ExtArgs["result"]["campaignRewardEvent"]>
  export type CampaignRewardEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
    trackedEvents?: boolean | CampaignRewardEvent$trackedEventsArgs<ExtArgs>
    _count?: boolean | CampaignRewardEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignRewardEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }
  export type CampaignRewardEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }

  export type $CampaignRewardEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignRewardEvent"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      rewardEvent: Prisma.$RewardEventPayload<ExtArgs>
      trackedEvents: Prisma.$TrackedEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      rewardEventId: string
      amount: Prisma.Decimal
      volumeStep: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaignRewardEvent"]>
    composites: {}
  }

  type CampaignRewardEventGetPayload<S extends boolean | null | undefined | CampaignRewardEventDefaultArgs> = $Result.GetResult<Prisma.$CampaignRewardEventPayload, S>

  type CampaignRewardEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignRewardEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignRewardEventCountAggregateInputType | true
    }

  export interface CampaignRewardEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignRewardEvent'], meta: { name: 'CampaignRewardEvent' } }
    /**
     * Find zero or one CampaignRewardEvent that matches the filter.
     * @param {CampaignRewardEventFindUniqueArgs} args - Arguments to find a CampaignRewardEvent
     * @example
     * // Get one CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignRewardEventFindUniqueArgs>(args: SelectSubset<T, CampaignRewardEventFindUniqueArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignRewardEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignRewardEventFindUniqueOrThrowArgs} args - Arguments to find a CampaignRewardEvent
     * @example
     * // Get one CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignRewardEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignRewardEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignRewardEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventFindFirstArgs} args - Arguments to find a CampaignRewardEvent
     * @example
     * // Get one CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignRewardEventFindFirstArgs>(args?: SelectSubset<T, CampaignRewardEventFindFirstArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignRewardEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventFindFirstOrThrowArgs} args - Arguments to find a CampaignRewardEvent
     * @example
     * // Get one CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignRewardEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignRewardEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignRewardEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignRewardEvents
     * const campaignRewardEvents = await prisma.campaignRewardEvent.findMany()
     * 
     * // Get first 10 CampaignRewardEvents
     * const campaignRewardEvents = await prisma.campaignRewardEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignRewardEventWithIdOnly = await prisma.campaignRewardEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignRewardEventFindManyArgs>(args?: SelectSubset<T, CampaignRewardEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignRewardEvent.
     * @param {CampaignRewardEventCreateArgs} args - Arguments to create a CampaignRewardEvent.
     * @example
     * // Create one CampaignRewardEvent
     * const CampaignRewardEvent = await prisma.campaignRewardEvent.create({
     *   data: {
     *     // ... data to create a CampaignRewardEvent
     *   }
     * })
     * 
     */
    create<T extends CampaignRewardEventCreateArgs>(args: SelectSubset<T, CampaignRewardEventCreateArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignRewardEvents.
     * @param {CampaignRewardEventCreateManyArgs} args - Arguments to create many CampaignRewardEvents.
     * @example
     * // Create many CampaignRewardEvents
     * const campaignRewardEvent = await prisma.campaignRewardEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignRewardEventCreateManyArgs>(args?: SelectSubset<T, CampaignRewardEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignRewardEvents and returns the data saved in the database.
     * @param {CampaignRewardEventCreateManyAndReturnArgs} args - Arguments to create many CampaignRewardEvents.
     * @example
     * // Create many CampaignRewardEvents
     * const campaignRewardEvent = await prisma.campaignRewardEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignRewardEvents and only return the `id`
     * const campaignRewardEventWithIdOnly = await prisma.campaignRewardEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignRewardEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignRewardEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignRewardEvent.
     * @param {CampaignRewardEventDeleteArgs} args - Arguments to delete one CampaignRewardEvent.
     * @example
     * // Delete one CampaignRewardEvent
     * const CampaignRewardEvent = await prisma.campaignRewardEvent.delete({
     *   where: {
     *     // ... filter to delete one CampaignRewardEvent
     *   }
     * })
     * 
     */
    delete<T extends CampaignRewardEventDeleteArgs>(args: SelectSubset<T, CampaignRewardEventDeleteArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignRewardEvent.
     * @param {CampaignRewardEventUpdateArgs} args - Arguments to update one CampaignRewardEvent.
     * @example
     * // Update one CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignRewardEventUpdateArgs>(args: SelectSubset<T, CampaignRewardEventUpdateArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignRewardEvents.
     * @param {CampaignRewardEventDeleteManyArgs} args - Arguments to filter CampaignRewardEvents to delete.
     * @example
     * // Delete a few CampaignRewardEvents
     * const { count } = await prisma.campaignRewardEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignRewardEventDeleteManyArgs>(args?: SelectSubset<T, CampaignRewardEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignRewardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignRewardEvents
     * const campaignRewardEvent = await prisma.campaignRewardEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignRewardEventUpdateManyArgs>(args: SelectSubset<T, CampaignRewardEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignRewardEvents and returns the data updated in the database.
     * @param {CampaignRewardEventUpdateManyAndReturnArgs} args - Arguments to update many CampaignRewardEvents.
     * @example
     * // Update many CampaignRewardEvents
     * const campaignRewardEvent = await prisma.campaignRewardEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignRewardEvents and only return the `id`
     * const campaignRewardEventWithIdOnly = await prisma.campaignRewardEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignRewardEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignRewardEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignRewardEvent.
     * @param {CampaignRewardEventUpsertArgs} args - Arguments to update or create a CampaignRewardEvent.
     * @example
     * // Update or create a CampaignRewardEvent
     * const campaignRewardEvent = await prisma.campaignRewardEvent.upsert({
     *   create: {
     *     // ... data to create a CampaignRewardEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignRewardEvent we want to update
     *   }
     * })
     */
    upsert<T extends CampaignRewardEventUpsertArgs>(args: SelectSubset<T, CampaignRewardEventUpsertArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignRewardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventCountArgs} args - Arguments to filter CampaignRewardEvents to count.
     * @example
     * // Count the number of CampaignRewardEvents
     * const count = await prisma.campaignRewardEvent.count({
     *   where: {
     *     // ... the filter for the CampaignRewardEvents we want to count
     *   }
     * })
    **/
    count<T extends CampaignRewardEventCountArgs>(
      args?: Subset<T, CampaignRewardEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignRewardEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignRewardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignRewardEventAggregateArgs>(args: Subset<T, CampaignRewardEventAggregateArgs>): Prisma.PrismaPromise<GetCampaignRewardEventAggregateType<T>>

    /**
     * Group by CampaignRewardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignRewardEventGroupByArgs} args - Group by arguments.
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
      T extends CampaignRewardEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignRewardEventGroupByArgs['orderBy'] }
        : { orderBy?: CampaignRewardEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignRewardEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignRewardEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignRewardEvent model
   */
  readonly fields: CampaignRewardEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignRewardEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignRewardEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rewardEvent<T extends RewardEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RewardEventDefaultArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trackedEvents<T extends CampaignRewardEvent$trackedEventsArgs<ExtArgs> = {}>(args?: Subset<T, CampaignRewardEvent$trackedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CampaignRewardEvent model
   */
  interface CampaignRewardEventFieldRefs {
    readonly id: FieldRef<"CampaignRewardEvent", 'String'>
    readonly campaignId: FieldRef<"CampaignRewardEvent", 'String'>
    readonly rewardEventId: FieldRef<"CampaignRewardEvent", 'String'>
    readonly amount: FieldRef<"CampaignRewardEvent", 'Decimal'>
    readonly volumeStep: FieldRef<"CampaignRewardEvent", 'Int'>
    readonly createdAt: FieldRef<"CampaignRewardEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CampaignRewardEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignRewardEvent findUnique
   */
  export type CampaignRewardEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter, which CampaignRewardEvent to fetch.
     */
    where: CampaignRewardEventWhereUniqueInput
  }

  /**
   * CampaignRewardEvent findUniqueOrThrow
   */
  export type CampaignRewardEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter, which CampaignRewardEvent to fetch.
     */
    where: CampaignRewardEventWhereUniqueInput
  }

  /**
   * CampaignRewardEvent findFirst
   */
  export type CampaignRewardEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter, which CampaignRewardEvent to fetch.
     */
    where?: CampaignRewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignRewardEvents to fetch.
     */
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignRewardEvents.
     */
    cursor?: CampaignRewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignRewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignRewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignRewardEvents.
     */
    distinct?: CampaignRewardEventScalarFieldEnum | CampaignRewardEventScalarFieldEnum[]
  }

  /**
   * CampaignRewardEvent findFirstOrThrow
   */
  export type CampaignRewardEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter, which CampaignRewardEvent to fetch.
     */
    where?: CampaignRewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignRewardEvents to fetch.
     */
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignRewardEvents.
     */
    cursor?: CampaignRewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignRewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignRewardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignRewardEvents.
     */
    distinct?: CampaignRewardEventScalarFieldEnum | CampaignRewardEventScalarFieldEnum[]
  }

  /**
   * CampaignRewardEvent findMany
   */
  export type CampaignRewardEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter, which CampaignRewardEvents to fetch.
     */
    where?: CampaignRewardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignRewardEvents to fetch.
     */
    orderBy?: CampaignRewardEventOrderByWithRelationInput | CampaignRewardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignRewardEvents.
     */
    cursor?: CampaignRewardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignRewardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignRewardEvents.
     */
    skip?: number
    distinct?: CampaignRewardEventScalarFieldEnum | CampaignRewardEventScalarFieldEnum[]
  }

  /**
   * CampaignRewardEvent create
   */
  export type CampaignRewardEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignRewardEvent.
     */
    data: XOR<CampaignRewardEventCreateInput, CampaignRewardEventUncheckedCreateInput>
  }

  /**
   * CampaignRewardEvent createMany
   */
  export type CampaignRewardEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignRewardEvents.
     */
    data: CampaignRewardEventCreateManyInput | CampaignRewardEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignRewardEvent createManyAndReturn
   */
  export type CampaignRewardEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignRewardEvents.
     */
    data: CampaignRewardEventCreateManyInput | CampaignRewardEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignRewardEvent update
   */
  export type CampaignRewardEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignRewardEvent.
     */
    data: XOR<CampaignRewardEventUpdateInput, CampaignRewardEventUncheckedUpdateInput>
    /**
     * Choose, which CampaignRewardEvent to update.
     */
    where: CampaignRewardEventWhereUniqueInput
  }

  /**
   * CampaignRewardEvent updateMany
   */
  export type CampaignRewardEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignRewardEvents.
     */
    data: XOR<CampaignRewardEventUpdateManyMutationInput, CampaignRewardEventUncheckedUpdateManyInput>
    /**
     * Filter which CampaignRewardEvents to update
     */
    where?: CampaignRewardEventWhereInput
    /**
     * Limit how many CampaignRewardEvents to update.
     */
    limit?: number
  }

  /**
   * CampaignRewardEvent updateManyAndReturn
   */
  export type CampaignRewardEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * The data used to update CampaignRewardEvents.
     */
    data: XOR<CampaignRewardEventUpdateManyMutationInput, CampaignRewardEventUncheckedUpdateManyInput>
    /**
     * Filter which CampaignRewardEvents to update
     */
    where?: CampaignRewardEventWhereInput
    /**
     * Limit how many CampaignRewardEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignRewardEvent upsert
   */
  export type CampaignRewardEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignRewardEvent to update in case it exists.
     */
    where: CampaignRewardEventWhereUniqueInput
    /**
     * In case the CampaignRewardEvent found by the `where` argument doesn't exist, create a new CampaignRewardEvent with this data.
     */
    create: XOR<CampaignRewardEventCreateInput, CampaignRewardEventUncheckedCreateInput>
    /**
     * In case the CampaignRewardEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignRewardEventUpdateInput, CampaignRewardEventUncheckedUpdateInput>
  }

  /**
   * CampaignRewardEvent delete
   */
  export type CampaignRewardEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
    /**
     * Filter which CampaignRewardEvent to delete.
     */
    where: CampaignRewardEventWhereUniqueInput
  }

  /**
   * CampaignRewardEvent deleteMany
   */
  export type CampaignRewardEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignRewardEvents to delete
     */
    where?: CampaignRewardEventWhereInput
    /**
     * Limit how many CampaignRewardEvents to delete.
     */
    limit?: number
  }

  /**
   * CampaignRewardEvent.trackedEvents
   */
  export type CampaignRewardEvent$trackedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    where?: TrackedEventWhereInput
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    cursor?: TrackedEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackedEventScalarFieldEnum | TrackedEventScalarFieldEnum[]
  }

  /**
   * CampaignRewardEvent without action
   */
  export type CampaignRewardEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignRewardEvent
     */
    select?: CampaignRewardEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignRewardEvent
     */
    omit?: CampaignRewardEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignRewardEventInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    sessionId: number
    userAgent: number
    ipAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    sessionId?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    sessionId?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    sessionId: string
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trackedEvents?: boolean | Client$trackedEventsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "userAgent" | "ipAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trackedEvents?: boolean | Client$trackedEventsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      trackedEvents: Prisma.$TrackedEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      userAgent: string | null
      ipAddress: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
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
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trackedEvents<T extends Client$trackedEventsArgs<ExtArgs> = {}>(args?: Subset<T, Client$trackedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly sessionId: FieldRef<"Client", 'String'>
    readonly userAgent: FieldRef<"Client", 'String'>
    readonly ipAddress: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.trackedEvents
   */
  export type Client$trackedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    where?: TrackedEventWhereInput
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    cursor?: TrackedEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackedEventScalarFieldEnum | TrackedEventScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model TrackedEvent
   */

  export type AggregateTrackedEvent = {
    _count: TrackedEventCountAggregateOutputType | null
    _min: TrackedEventMinAggregateOutputType | null
    _max: TrackedEventMaxAggregateOutputType | null
  }

  export type TrackedEventMinAggregateOutputType = {
    id: string | null
    campaignRewardEventId: string | null
    clientId: string | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackedEventMaxAggregateOutputType = {
    id: string | null
    campaignRewardEventId: string | null
    clientId: string | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackedEventCountAggregateOutputType = {
    id: number
    campaignRewardEventId: number
    clientId: number
    data: number
    timestamp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackedEventMinAggregateInputType = {
    id?: true
    campaignRewardEventId?: true
    clientId?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackedEventMaxAggregateInputType = {
    id?: true
    campaignRewardEventId?: true
    clientId?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackedEventCountAggregateInputType = {
    id?: true
    campaignRewardEventId?: true
    clientId?: true
    data?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackedEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackedEvent to aggregate.
     */
    where?: TrackedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedEvents to fetch.
     */
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackedEvents
    **/
    _count?: true | TrackedEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackedEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackedEventMaxAggregateInputType
  }

  export type GetTrackedEventAggregateType<T extends TrackedEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackedEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackedEvent[P]>
      : GetScalarType<T[P], AggregateTrackedEvent[P]>
  }




  export type TrackedEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackedEventWhereInput
    orderBy?: TrackedEventOrderByWithAggregationInput | TrackedEventOrderByWithAggregationInput[]
    by: TrackedEventScalarFieldEnum[] | TrackedEventScalarFieldEnum
    having?: TrackedEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackedEventCountAggregateInputType | true
    _min?: TrackedEventMinAggregateInputType
    _max?: TrackedEventMaxAggregateInputType
  }

  export type TrackedEventGroupByOutputType = {
    id: string
    campaignRewardEventId: string
    clientId: string
    data: JsonValue | null
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    _count: TrackedEventCountAggregateOutputType | null
    _min: TrackedEventMinAggregateOutputType | null
    _max: TrackedEventMaxAggregateOutputType | null
  }

  type GetTrackedEventGroupByPayload<T extends TrackedEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackedEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackedEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackedEventGroupByOutputType[P]>
            : GetScalarType<T[P], TrackedEventGroupByOutputType[P]>
        }
      >
    >


  export type TrackedEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignRewardEventId?: boolean
    clientId?: boolean
    data?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackedEvent"]>

  export type TrackedEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignRewardEventId?: boolean
    clientId?: boolean
    data?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackedEvent"]>

  export type TrackedEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignRewardEventId?: boolean
    clientId?: boolean
    data?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackedEvent"]>

  export type TrackedEventSelectScalar = {
    id?: boolean
    campaignRewardEventId?: boolean
    clientId?: boolean
    data?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackedEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignRewardEventId" | "clientId" | "data" | "timestamp" | "createdAt" | "updatedAt", ExtArgs["result"]["trackedEvent"]>
  export type TrackedEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type TrackedEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type TrackedEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaignRewardEvent?: boolean | CampaignRewardEventDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $TrackedEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackedEvent"
    objects: {
      campaignRewardEvent: Prisma.$CampaignRewardEventPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignRewardEventId: string
      clientId: string
      data: Prisma.JsonValue | null
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trackedEvent"]>
    composites: {}
  }

  type TrackedEventGetPayload<S extends boolean | null | undefined | TrackedEventDefaultArgs> = $Result.GetResult<Prisma.$TrackedEventPayload, S>

  type TrackedEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackedEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackedEventCountAggregateInputType | true
    }

  export interface TrackedEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackedEvent'], meta: { name: 'TrackedEvent' } }
    /**
     * Find zero or one TrackedEvent that matches the filter.
     * @param {TrackedEventFindUniqueArgs} args - Arguments to find a TrackedEvent
     * @example
     * // Get one TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackedEventFindUniqueArgs>(args: SelectSubset<T, TrackedEventFindUniqueArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackedEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackedEventFindUniqueOrThrowArgs} args - Arguments to find a TrackedEvent
     * @example
     * // Get one TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackedEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackedEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackedEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventFindFirstArgs} args - Arguments to find a TrackedEvent
     * @example
     * // Get one TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackedEventFindFirstArgs>(args?: SelectSubset<T, TrackedEventFindFirstArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackedEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventFindFirstOrThrowArgs} args - Arguments to find a TrackedEvent
     * @example
     * // Get one TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackedEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackedEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackedEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackedEvents
     * const trackedEvents = await prisma.trackedEvent.findMany()
     * 
     * // Get first 10 TrackedEvents
     * const trackedEvents = await prisma.trackedEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackedEventWithIdOnly = await prisma.trackedEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackedEventFindManyArgs>(args?: SelectSubset<T, TrackedEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackedEvent.
     * @param {TrackedEventCreateArgs} args - Arguments to create a TrackedEvent.
     * @example
     * // Create one TrackedEvent
     * const TrackedEvent = await prisma.trackedEvent.create({
     *   data: {
     *     // ... data to create a TrackedEvent
     *   }
     * })
     * 
     */
    create<T extends TrackedEventCreateArgs>(args: SelectSubset<T, TrackedEventCreateArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackedEvents.
     * @param {TrackedEventCreateManyArgs} args - Arguments to create many TrackedEvents.
     * @example
     * // Create many TrackedEvents
     * const trackedEvent = await prisma.trackedEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackedEventCreateManyArgs>(args?: SelectSubset<T, TrackedEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrackedEvents and returns the data saved in the database.
     * @param {TrackedEventCreateManyAndReturnArgs} args - Arguments to create many TrackedEvents.
     * @example
     * // Create many TrackedEvents
     * const trackedEvent = await prisma.trackedEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrackedEvents and only return the `id`
     * const trackedEventWithIdOnly = await prisma.trackedEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackedEventCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackedEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrackedEvent.
     * @param {TrackedEventDeleteArgs} args - Arguments to delete one TrackedEvent.
     * @example
     * // Delete one TrackedEvent
     * const TrackedEvent = await prisma.trackedEvent.delete({
     *   where: {
     *     // ... filter to delete one TrackedEvent
     *   }
     * })
     * 
     */
    delete<T extends TrackedEventDeleteArgs>(args: SelectSubset<T, TrackedEventDeleteArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackedEvent.
     * @param {TrackedEventUpdateArgs} args - Arguments to update one TrackedEvent.
     * @example
     * // Update one TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackedEventUpdateArgs>(args: SelectSubset<T, TrackedEventUpdateArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackedEvents.
     * @param {TrackedEventDeleteManyArgs} args - Arguments to filter TrackedEvents to delete.
     * @example
     * // Delete a few TrackedEvents
     * const { count } = await prisma.trackedEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackedEventDeleteManyArgs>(args?: SelectSubset<T, TrackedEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackedEvents
     * const trackedEvent = await prisma.trackedEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackedEventUpdateManyArgs>(args: SelectSubset<T, TrackedEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackedEvents and returns the data updated in the database.
     * @param {TrackedEventUpdateManyAndReturnArgs} args - Arguments to update many TrackedEvents.
     * @example
     * // Update many TrackedEvents
     * const trackedEvent = await prisma.trackedEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrackedEvents and only return the `id`
     * const trackedEventWithIdOnly = await prisma.trackedEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends TrackedEventUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackedEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrackedEvent.
     * @param {TrackedEventUpsertArgs} args - Arguments to update or create a TrackedEvent.
     * @example
     * // Update or create a TrackedEvent
     * const trackedEvent = await prisma.trackedEvent.upsert({
     *   create: {
     *     // ... data to create a TrackedEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackedEvent we want to update
     *   }
     * })
     */
    upsert<T extends TrackedEventUpsertArgs>(args: SelectSubset<T, TrackedEventUpsertArgs<ExtArgs>>): Prisma__TrackedEventClient<$Result.GetResult<Prisma.$TrackedEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrackedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventCountArgs} args - Arguments to filter TrackedEvents to count.
     * @example
     * // Count the number of TrackedEvents
     * const count = await prisma.trackedEvent.count({
     *   where: {
     *     // ... the filter for the TrackedEvents we want to count
     *   }
     * })
    **/
    count<T extends TrackedEventCountArgs>(
      args?: Subset<T, TrackedEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackedEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackedEventAggregateArgs>(args: Subset<T, TrackedEventAggregateArgs>): Prisma.PrismaPromise<GetTrackedEventAggregateType<T>>

    /**
     * Group by TrackedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackedEventGroupByArgs} args - Group by arguments.
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
      T extends TrackedEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackedEventGroupByArgs['orderBy'] }
        : { orderBy?: TrackedEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackedEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackedEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackedEvent model
   */
  readonly fields: TrackedEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackedEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackedEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaignRewardEvent<T extends CampaignRewardEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignRewardEventDefaultArgs<ExtArgs>>): Prisma__CampaignRewardEventClient<$Result.GetResult<Prisma.$CampaignRewardEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TrackedEvent model
   */
  interface TrackedEventFieldRefs {
    readonly id: FieldRef<"TrackedEvent", 'String'>
    readonly campaignRewardEventId: FieldRef<"TrackedEvent", 'String'>
    readonly clientId: FieldRef<"TrackedEvent", 'String'>
    readonly data: FieldRef<"TrackedEvent", 'Json'>
    readonly timestamp: FieldRef<"TrackedEvent", 'DateTime'>
    readonly createdAt: FieldRef<"TrackedEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"TrackedEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrackedEvent findUnique
   */
  export type TrackedEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackedEvent to fetch.
     */
    where: TrackedEventWhereUniqueInput
  }

  /**
   * TrackedEvent findUniqueOrThrow
   */
  export type TrackedEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackedEvent to fetch.
     */
    where: TrackedEventWhereUniqueInput
  }

  /**
   * TrackedEvent findFirst
   */
  export type TrackedEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackedEvent to fetch.
     */
    where?: TrackedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedEvents to fetch.
     */
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackedEvents.
     */
    cursor?: TrackedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackedEvents.
     */
    distinct?: TrackedEventScalarFieldEnum | TrackedEventScalarFieldEnum[]
  }

  /**
   * TrackedEvent findFirstOrThrow
   */
  export type TrackedEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackedEvent to fetch.
     */
    where?: TrackedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedEvents to fetch.
     */
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackedEvents.
     */
    cursor?: TrackedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackedEvents.
     */
    distinct?: TrackedEventScalarFieldEnum | TrackedEventScalarFieldEnum[]
  }

  /**
   * TrackedEvent findMany
   */
  export type TrackedEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackedEvents to fetch.
     */
    where?: TrackedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackedEvents to fetch.
     */
    orderBy?: TrackedEventOrderByWithRelationInput | TrackedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackedEvents.
     */
    cursor?: TrackedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackedEvents.
     */
    skip?: number
    distinct?: TrackedEventScalarFieldEnum | TrackedEventScalarFieldEnum[]
  }

  /**
   * TrackedEvent create
   */
  export type TrackedEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * The data needed to create a TrackedEvent.
     */
    data: XOR<TrackedEventCreateInput, TrackedEventUncheckedCreateInput>
  }

  /**
   * TrackedEvent createMany
   */
  export type TrackedEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackedEvents.
     */
    data: TrackedEventCreateManyInput | TrackedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackedEvent createManyAndReturn
   */
  export type TrackedEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * The data used to create many TrackedEvents.
     */
    data: TrackedEventCreateManyInput | TrackedEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrackedEvent update
   */
  export type TrackedEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * The data needed to update a TrackedEvent.
     */
    data: XOR<TrackedEventUpdateInput, TrackedEventUncheckedUpdateInput>
    /**
     * Choose, which TrackedEvent to update.
     */
    where: TrackedEventWhereUniqueInput
  }

  /**
   * TrackedEvent updateMany
   */
  export type TrackedEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackedEvents.
     */
    data: XOR<TrackedEventUpdateManyMutationInput, TrackedEventUncheckedUpdateManyInput>
    /**
     * Filter which TrackedEvents to update
     */
    where?: TrackedEventWhereInput
    /**
     * Limit how many TrackedEvents to update.
     */
    limit?: number
  }

  /**
   * TrackedEvent updateManyAndReturn
   */
  export type TrackedEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * The data used to update TrackedEvents.
     */
    data: XOR<TrackedEventUpdateManyMutationInput, TrackedEventUncheckedUpdateManyInput>
    /**
     * Filter which TrackedEvents to update
     */
    where?: TrackedEventWhereInput
    /**
     * Limit how many TrackedEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrackedEvent upsert
   */
  export type TrackedEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * The filter to search for the TrackedEvent to update in case it exists.
     */
    where: TrackedEventWhereUniqueInput
    /**
     * In case the TrackedEvent found by the `where` argument doesn't exist, create a new TrackedEvent with this data.
     */
    create: XOR<TrackedEventCreateInput, TrackedEventUncheckedCreateInput>
    /**
     * In case the TrackedEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackedEventUpdateInput, TrackedEventUncheckedUpdateInput>
  }

  /**
   * TrackedEvent delete
   */
  export type TrackedEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
    /**
     * Filter which TrackedEvent to delete.
     */
    where: TrackedEventWhereUniqueInput
  }

  /**
   * TrackedEvent deleteMany
   */
  export type TrackedEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackedEvents to delete
     */
    where?: TrackedEventWhereInput
    /**
     * Limit how many TrackedEvents to delete.
     */
    limit?: number
  }

  /**
   * TrackedEvent without action
   */
  export type TrackedEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackedEvent
     */
    select?: TrackedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackedEvent
     */
    omit?: TrackedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackedEventInclude<ExtArgs> | null
  }


  /**
   * Model Selector
   */

  export type AggregateSelector = {
    _count: SelectorCountAggregateOutputType | null
    _min: SelectorMinAggregateOutputType | null
    _max: SelectorMaxAggregateOutputType | null
  }

  export type SelectorMinAggregateOutputType = {
    id: string | null
    rewardEventId: string | null
    selector: string | null
    eventType: $Enums.SelectorEventType | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SelectorMaxAggregateOutputType = {
    id: string | null
    rewardEventId: string | null
    selector: string | null
    eventType: $Enums.SelectorEventType | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SelectorCountAggregateOutputType = {
    id: number
    rewardEventId: number
    selector: number
    eventType: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SelectorMinAggregateInputType = {
    id?: true
    rewardEventId?: true
    selector?: true
    eventType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SelectorMaxAggregateInputType = {
    id?: true
    rewardEventId?: true
    selector?: true
    eventType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SelectorCountAggregateInputType = {
    id?: true
    rewardEventId?: true
    selector?: true
    eventType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SelectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Selector to aggregate.
     */
    where?: SelectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Selectors to fetch.
     */
    orderBy?: SelectorOrderByWithRelationInput | SelectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SelectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Selectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Selectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Selectors
    **/
    _count?: true | SelectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SelectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SelectorMaxAggregateInputType
  }

  export type GetSelectorAggregateType<T extends SelectorAggregateArgs> = {
        [P in keyof T & keyof AggregateSelector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSelector[P]>
      : GetScalarType<T[P], AggregateSelector[P]>
  }




  export type SelectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SelectorWhereInput
    orderBy?: SelectorOrderByWithAggregationInput | SelectorOrderByWithAggregationInput[]
    by: SelectorScalarFieldEnum[] | SelectorScalarFieldEnum
    having?: SelectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SelectorCountAggregateInputType | true
    _min?: SelectorMinAggregateInputType
    _max?: SelectorMaxAggregateInputType
  }

  export type SelectorGroupByOutputType = {
    id: string
    rewardEventId: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SelectorCountAggregateOutputType | null
    _min: SelectorMinAggregateOutputType | null
    _max: SelectorMaxAggregateOutputType | null
  }

  type GetSelectorGroupByPayload<T extends SelectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SelectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SelectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SelectorGroupByOutputType[P]>
            : GetScalarType<T[P], SelectorGroupByOutputType[P]>
        }
      >
    >


  export type SelectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rewardEventId?: boolean
    selector?: boolean
    eventType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["selector"]>

  export type SelectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rewardEventId?: boolean
    selector?: boolean
    eventType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["selector"]>

  export type SelectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rewardEventId?: boolean
    selector?: boolean
    eventType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["selector"]>

  export type SelectorSelectScalar = {
    id?: boolean
    rewardEventId?: boolean
    selector?: boolean
    eventType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SelectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rewardEventId" | "selector" | "eventType" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["selector"]>
  export type SelectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }
  export type SelectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }
  export type SelectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewardEvent?: boolean | RewardEventDefaultArgs<ExtArgs>
  }

  export type $SelectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Selector"
    objects: {
      rewardEvent: Prisma.$RewardEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rewardEventId: string
      selector: string
      eventType: $Enums.SelectorEventType
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["selector"]>
    composites: {}
  }

  type SelectorGetPayload<S extends boolean | null | undefined | SelectorDefaultArgs> = $Result.GetResult<Prisma.$SelectorPayload, S>

  type SelectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SelectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SelectorCountAggregateInputType | true
    }

  export interface SelectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Selector'], meta: { name: 'Selector' } }
    /**
     * Find zero or one Selector that matches the filter.
     * @param {SelectorFindUniqueArgs} args - Arguments to find a Selector
     * @example
     * // Get one Selector
     * const selector = await prisma.selector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SelectorFindUniqueArgs>(args: SelectSubset<T, SelectorFindUniqueArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Selector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SelectorFindUniqueOrThrowArgs} args - Arguments to find a Selector
     * @example
     * // Get one Selector
     * const selector = await prisma.selector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SelectorFindUniqueOrThrowArgs>(args: SelectSubset<T, SelectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Selector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorFindFirstArgs} args - Arguments to find a Selector
     * @example
     * // Get one Selector
     * const selector = await prisma.selector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SelectorFindFirstArgs>(args?: SelectSubset<T, SelectorFindFirstArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Selector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorFindFirstOrThrowArgs} args - Arguments to find a Selector
     * @example
     * // Get one Selector
     * const selector = await prisma.selector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SelectorFindFirstOrThrowArgs>(args?: SelectSubset<T, SelectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Selectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Selectors
     * const selectors = await prisma.selector.findMany()
     * 
     * // Get first 10 Selectors
     * const selectors = await prisma.selector.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const selectorWithIdOnly = await prisma.selector.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SelectorFindManyArgs>(args?: SelectSubset<T, SelectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Selector.
     * @param {SelectorCreateArgs} args - Arguments to create a Selector.
     * @example
     * // Create one Selector
     * const Selector = await prisma.selector.create({
     *   data: {
     *     // ... data to create a Selector
     *   }
     * })
     * 
     */
    create<T extends SelectorCreateArgs>(args: SelectSubset<T, SelectorCreateArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Selectors.
     * @param {SelectorCreateManyArgs} args - Arguments to create many Selectors.
     * @example
     * // Create many Selectors
     * const selector = await prisma.selector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SelectorCreateManyArgs>(args?: SelectSubset<T, SelectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Selectors and returns the data saved in the database.
     * @param {SelectorCreateManyAndReturnArgs} args - Arguments to create many Selectors.
     * @example
     * // Create many Selectors
     * const selector = await prisma.selector.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Selectors and only return the `id`
     * const selectorWithIdOnly = await prisma.selector.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SelectorCreateManyAndReturnArgs>(args?: SelectSubset<T, SelectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Selector.
     * @param {SelectorDeleteArgs} args - Arguments to delete one Selector.
     * @example
     * // Delete one Selector
     * const Selector = await prisma.selector.delete({
     *   where: {
     *     // ... filter to delete one Selector
     *   }
     * })
     * 
     */
    delete<T extends SelectorDeleteArgs>(args: SelectSubset<T, SelectorDeleteArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Selector.
     * @param {SelectorUpdateArgs} args - Arguments to update one Selector.
     * @example
     * // Update one Selector
     * const selector = await prisma.selector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SelectorUpdateArgs>(args: SelectSubset<T, SelectorUpdateArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Selectors.
     * @param {SelectorDeleteManyArgs} args - Arguments to filter Selectors to delete.
     * @example
     * // Delete a few Selectors
     * const { count } = await prisma.selector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SelectorDeleteManyArgs>(args?: SelectSubset<T, SelectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Selectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Selectors
     * const selector = await prisma.selector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SelectorUpdateManyArgs>(args: SelectSubset<T, SelectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Selectors and returns the data updated in the database.
     * @param {SelectorUpdateManyAndReturnArgs} args - Arguments to update many Selectors.
     * @example
     * // Update many Selectors
     * const selector = await prisma.selector.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Selectors and only return the `id`
     * const selectorWithIdOnly = await prisma.selector.updateManyAndReturn({
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
    updateManyAndReturn<T extends SelectorUpdateManyAndReturnArgs>(args: SelectSubset<T, SelectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Selector.
     * @param {SelectorUpsertArgs} args - Arguments to update or create a Selector.
     * @example
     * // Update or create a Selector
     * const selector = await prisma.selector.upsert({
     *   create: {
     *     // ... data to create a Selector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Selector we want to update
     *   }
     * })
     */
    upsert<T extends SelectorUpsertArgs>(args: SelectSubset<T, SelectorUpsertArgs<ExtArgs>>): Prisma__SelectorClient<$Result.GetResult<Prisma.$SelectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Selectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorCountArgs} args - Arguments to filter Selectors to count.
     * @example
     * // Count the number of Selectors
     * const count = await prisma.selector.count({
     *   where: {
     *     // ... the filter for the Selectors we want to count
     *   }
     * })
    **/
    count<T extends SelectorCountArgs>(
      args?: Subset<T, SelectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SelectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Selector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SelectorAggregateArgs>(args: Subset<T, SelectorAggregateArgs>): Prisma.PrismaPromise<GetSelectorAggregateType<T>>

    /**
     * Group by Selector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectorGroupByArgs} args - Group by arguments.
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
      T extends SelectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SelectorGroupByArgs['orderBy'] }
        : { orderBy?: SelectorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SelectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSelectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Selector model
   */
  readonly fields: SelectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Selector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SelectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rewardEvent<T extends RewardEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RewardEventDefaultArgs<ExtArgs>>): Prisma__RewardEventClient<$Result.GetResult<Prisma.$RewardEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Selector model
   */
  interface SelectorFieldRefs {
    readonly id: FieldRef<"Selector", 'String'>
    readonly rewardEventId: FieldRef<"Selector", 'String'>
    readonly selector: FieldRef<"Selector", 'String'>
    readonly eventType: FieldRef<"Selector", 'SelectorEventType'>
    readonly isActive: FieldRef<"Selector", 'Boolean'>
    readonly createdAt: FieldRef<"Selector", 'DateTime'>
    readonly updatedAt: FieldRef<"Selector", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Selector findUnique
   */
  export type SelectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter, which Selector to fetch.
     */
    where: SelectorWhereUniqueInput
  }

  /**
   * Selector findUniqueOrThrow
   */
  export type SelectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter, which Selector to fetch.
     */
    where: SelectorWhereUniqueInput
  }

  /**
   * Selector findFirst
   */
  export type SelectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter, which Selector to fetch.
     */
    where?: SelectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Selectors to fetch.
     */
    orderBy?: SelectorOrderByWithRelationInput | SelectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Selectors.
     */
    cursor?: SelectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Selectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Selectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Selectors.
     */
    distinct?: SelectorScalarFieldEnum | SelectorScalarFieldEnum[]
  }

  /**
   * Selector findFirstOrThrow
   */
  export type SelectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter, which Selector to fetch.
     */
    where?: SelectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Selectors to fetch.
     */
    orderBy?: SelectorOrderByWithRelationInput | SelectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Selectors.
     */
    cursor?: SelectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Selectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Selectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Selectors.
     */
    distinct?: SelectorScalarFieldEnum | SelectorScalarFieldEnum[]
  }

  /**
   * Selector findMany
   */
  export type SelectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter, which Selectors to fetch.
     */
    where?: SelectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Selectors to fetch.
     */
    orderBy?: SelectorOrderByWithRelationInput | SelectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Selectors.
     */
    cursor?: SelectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Selectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Selectors.
     */
    skip?: number
    distinct?: SelectorScalarFieldEnum | SelectorScalarFieldEnum[]
  }

  /**
   * Selector create
   */
  export type SelectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * The data needed to create a Selector.
     */
    data: XOR<SelectorCreateInput, SelectorUncheckedCreateInput>
  }

  /**
   * Selector createMany
   */
  export type SelectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Selectors.
     */
    data: SelectorCreateManyInput | SelectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Selector createManyAndReturn
   */
  export type SelectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * The data used to create many Selectors.
     */
    data: SelectorCreateManyInput | SelectorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Selector update
   */
  export type SelectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * The data needed to update a Selector.
     */
    data: XOR<SelectorUpdateInput, SelectorUncheckedUpdateInput>
    /**
     * Choose, which Selector to update.
     */
    where: SelectorWhereUniqueInput
  }

  /**
   * Selector updateMany
   */
  export type SelectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Selectors.
     */
    data: XOR<SelectorUpdateManyMutationInput, SelectorUncheckedUpdateManyInput>
    /**
     * Filter which Selectors to update
     */
    where?: SelectorWhereInput
    /**
     * Limit how many Selectors to update.
     */
    limit?: number
  }

  /**
   * Selector updateManyAndReturn
   */
  export type SelectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * The data used to update Selectors.
     */
    data: XOR<SelectorUpdateManyMutationInput, SelectorUncheckedUpdateManyInput>
    /**
     * Filter which Selectors to update
     */
    where?: SelectorWhereInput
    /**
     * Limit how many Selectors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Selector upsert
   */
  export type SelectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * The filter to search for the Selector to update in case it exists.
     */
    where: SelectorWhereUniqueInput
    /**
     * In case the Selector found by the `where` argument doesn't exist, create a new Selector with this data.
     */
    create: XOR<SelectorCreateInput, SelectorUncheckedCreateInput>
    /**
     * In case the Selector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SelectorUpdateInput, SelectorUncheckedUpdateInput>
  }

  /**
   * Selector delete
   */
  export type SelectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
    /**
     * Filter which Selector to delete.
     */
    where: SelectorWhereUniqueInput
  }

  /**
   * Selector deleteMany
   */
  export type SelectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Selectors to delete
     */
    where?: SelectorWhereInput
    /**
     * Limit how many Selectors to delete.
     */
    limit?: number
  }

  /**
   * Selector without action
   */
  export type SelectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Selector
     */
    select?: SelectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Selector
     */
    omit?: SelectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SelectorInclude<ExtArgs> | null
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
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParticipationMaxAggregateOutputType = {
    id: string | null
    influencerId: string | null
    campaignId: string | null
    currentBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParticipationCountAggregateOutputType = {
    id: number
    influencerId: number
    campaignId: number
    currentBalance: number
    createdAt: number
    updatedAt: number
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
    createdAt?: true
    updatedAt?: true
  }

  export type ParticipationMaxAggregateInputType = {
    id?: true
    influencerId?: true
    campaignId?: true
    currentBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParticipationCountAggregateInputType = {
    id?: true
    influencerId?: true
    campaignId?: true
    currentBalance?: true
    createdAt?: true
    updatedAt?: true
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
    createdAt: Date
    updatedAt: Date
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
    createdAt?: boolean
    updatedAt?: boolean
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
    createdAt?: boolean
    updatedAt?: boolean
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    influencer?: boolean | UserDefaultArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectScalar = {
    id?: boolean
    influencerId?: boolean
    campaignId?: boolean
    currentBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParticipationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "influencerId" | "campaignId" | "currentBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["participation"]>
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
      createdAt: Date
      updatedAt: Date
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
    readonly createdAt: FieldRef<"Participation", 'DateTime'>
    readonly updatedAt: FieldRef<"Participation", 'DateTime'>
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
    updatedAt: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: string | null
    type: $Enums.EventType | null
    participationId: string | null
    externalTxId: string | null
    payoutGenerated: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    type: number
    participationId: number
    externalTxId: number
    metadata: number
    payoutGenerated: number
    createdAt: number
    updatedAt: number
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
    updatedAt?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    type?: true
    participationId?: true
    externalTxId?: true
    payoutGenerated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    type?: true
    participationId?: true
    externalTxId?: true
    metadata?: true
    payoutGenerated?: true
    createdAt?: true
    updatedAt?: true
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
    updatedAt: Date
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
    updatedAt?: boolean
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
    updatedAt?: boolean
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
    updatedAt?: boolean
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
    updatedAt?: boolean
  }

  export type AnalyticsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "participationId" | "externalTxId" | "metadata" | "payoutGenerated" | "createdAt" | "updatedAt", ExtArgs["result"]["analyticsEvent"]>
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
      updatedAt: Date
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
    readonly updatedAt: FieldRef<"AnalyticsEvent", 'DateTime'>
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
    ownerId: 'ownerId',
    title: 'title',
    escrowAddress: 'escrowAddress',
    budgetTotal: 'budgetTotal',
    yellowChannelId: 'yellowChannelId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const RewardEventScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    eventType: 'eventType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RewardEventScalarFieldEnum = (typeof RewardEventScalarFieldEnum)[keyof typeof RewardEventScalarFieldEnum]


  export const CampaignRewardEventScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    rewardEventId: 'rewardEventId',
    amount: 'amount',
    volumeStep: 'volumeStep',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignRewardEventScalarFieldEnum = (typeof CampaignRewardEventScalarFieldEnum)[keyof typeof CampaignRewardEventScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const TrackedEventScalarFieldEnum: {
    id: 'id',
    campaignRewardEventId: 'campaignRewardEventId',
    clientId: 'clientId',
    data: 'data',
    timestamp: 'timestamp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackedEventScalarFieldEnum = (typeof TrackedEventScalarFieldEnum)[keyof typeof TrackedEventScalarFieldEnum]


  export const SelectorScalarFieldEnum: {
    id: 'id',
    rewardEventId: 'rewardEventId',
    selector: 'selector',
    eventType: 'eventType',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SelectorScalarFieldEnum = (typeof SelectorScalarFieldEnum)[keyof typeof SelectorScalarFieldEnum]


  export const ParticipationScalarFieldEnum: {
    id: 'id',
    influencerId: 'influencerId',
    campaignId: 'campaignId',
    currentBalance: 'currentBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SelectorEventType'
   */
  export type EnumSelectorEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SelectorEventType'>
    


  /**
   * Reference to a field of type 'SelectorEventType[]'
   */
  export type ListEnumSelectorEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SelectorEventType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
    rewardEvents?: RewardEventListRelationFilter
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
    rewardEvents?: RewardEventOrderByRelationAggregateInput
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
    rewardEvents?: RewardEventListRelationFilter
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
    ownerId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    rewardEvents?: CampaignRewardEventListRelationFilter
    participations?: ParticipationListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    escrowAddress?: SortOrder
    budgetTotal?: SortOrder
    yellowChannelId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    rewardEvents?: CampaignRewardEventOrderByRelationAggregateInput
    participations?: ParticipationOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    ownerId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    rewardEvents?: CampaignRewardEventListRelationFilter
    participations?: ParticipationListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
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
    ownerId?: StringWithAggregatesFilter<"Campaign"> | string
    title?: StringWithAggregatesFilter<"Campaign"> | string
    escrowAddress?: StringWithAggregatesFilter<"Campaign"> | string
    budgetTotal?: DecimalWithAggregatesFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusWithAggregatesFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type RewardEventWhereInput = {
    AND?: RewardEventWhereInput | RewardEventWhereInput[]
    OR?: RewardEventWhereInput[]
    NOT?: RewardEventWhereInput | RewardEventWhereInput[]
    id?: StringFilter<"RewardEvent"> | string
    ownerId?: StringFilter<"RewardEvent"> | string
    name?: StringFilter<"RewardEvent"> | string
    eventType?: EnumEventTypeFilter<"RewardEvent"> | $Enums.EventType
    createdAt?: DateTimeFilter<"RewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RewardEvent"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    selectors?: SelectorListRelationFilter
    campaigns?: CampaignRewardEventListRelationFilter
  }

  export type RewardEventOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    selectors?: SelectorOrderByRelationAggregateInput
    campaigns?: CampaignRewardEventOrderByRelationAggregateInput
  }

  export type RewardEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RewardEventWhereInput | RewardEventWhereInput[]
    OR?: RewardEventWhereInput[]
    NOT?: RewardEventWhereInput | RewardEventWhereInput[]
    ownerId?: StringFilter<"RewardEvent"> | string
    name?: StringFilter<"RewardEvent"> | string
    eventType?: EnumEventTypeFilter<"RewardEvent"> | $Enums.EventType
    createdAt?: DateTimeFilter<"RewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RewardEvent"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    selectors?: SelectorListRelationFilter
    campaigns?: CampaignRewardEventListRelationFilter
  }, "id">

  export type RewardEventOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RewardEventCountOrderByAggregateInput
    _max?: RewardEventMaxOrderByAggregateInput
    _min?: RewardEventMinOrderByAggregateInput
  }

  export type RewardEventScalarWhereWithAggregatesInput = {
    AND?: RewardEventScalarWhereWithAggregatesInput | RewardEventScalarWhereWithAggregatesInput[]
    OR?: RewardEventScalarWhereWithAggregatesInput[]
    NOT?: RewardEventScalarWhereWithAggregatesInput | RewardEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RewardEvent"> | string
    ownerId?: StringWithAggregatesFilter<"RewardEvent"> | string
    name?: StringWithAggregatesFilter<"RewardEvent"> | string
    eventType?: EnumEventTypeWithAggregatesFilter<"RewardEvent"> | $Enums.EventType
    createdAt?: DateTimeWithAggregatesFilter<"RewardEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RewardEvent"> | Date | string
  }

  export type CampaignRewardEventWhereInput = {
    AND?: CampaignRewardEventWhereInput | CampaignRewardEventWhereInput[]
    OR?: CampaignRewardEventWhereInput[]
    NOT?: CampaignRewardEventWhereInput | CampaignRewardEventWhereInput[]
    id?: StringFilter<"CampaignRewardEvent"> | string
    campaignId?: StringFilter<"CampaignRewardEvent"> | string
    rewardEventId?: StringFilter<"CampaignRewardEvent"> | string
    amount?: DecimalFilter<"CampaignRewardEvent"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"CampaignRewardEvent"> | number
    createdAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    rewardEvent?: XOR<RewardEventScalarRelationFilter, RewardEventWhereInput>
    trackedEvents?: TrackedEventListRelationFilter
  }

  export type CampaignRewardEventOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    rewardEventId?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    rewardEvent?: RewardEventOrderByWithRelationInput
    trackedEvents?: TrackedEventOrderByRelationAggregateInput
  }

  export type CampaignRewardEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    campaignId_rewardEventId?: CampaignRewardEventCampaignIdRewardEventIdCompoundUniqueInput
    AND?: CampaignRewardEventWhereInput | CampaignRewardEventWhereInput[]
    OR?: CampaignRewardEventWhereInput[]
    NOT?: CampaignRewardEventWhereInput | CampaignRewardEventWhereInput[]
    campaignId?: StringFilter<"CampaignRewardEvent"> | string
    rewardEventId?: StringFilter<"CampaignRewardEvent"> | string
    amount?: DecimalFilter<"CampaignRewardEvent"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"CampaignRewardEvent"> | number
    createdAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    rewardEvent?: XOR<RewardEventScalarRelationFilter, RewardEventWhereInput>
    trackedEvents?: TrackedEventListRelationFilter
  }, "id" | "campaignId_rewardEventId">

  export type CampaignRewardEventOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    rewardEventId?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignRewardEventCountOrderByAggregateInput
    _avg?: CampaignRewardEventAvgOrderByAggregateInput
    _max?: CampaignRewardEventMaxOrderByAggregateInput
    _min?: CampaignRewardEventMinOrderByAggregateInput
    _sum?: CampaignRewardEventSumOrderByAggregateInput
  }

  export type CampaignRewardEventScalarWhereWithAggregatesInput = {
    AND?: CampaignRewardEventScalarWhereWithAggregatesInput | CampaignRewardEventScalarWhereWithAggregatesInput[]
    OR?: CampaignRewardEventScalarWhereWithAggregatesInput[]
    NOT?: CampaignRewardEventScalarWhereWithAggregatesInput | CampaignRewardEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignRewardEvent"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignRewardEvent"> | string
    rewardEventId?: StringWithAggregatesFilter<"CampaignRewardEvent"> | string
    amount?: DecimalWithAggregatesFilter<"CampaignRewardEvent"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntWithAggregatesFilter<"CampaignRewardEvent"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CampaignRewardEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampaignRewardEvent"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    sessionId?: StringFilter<"Client"> | string
    userAgent?: StringNullableFilter<"Client"> | string | null
    ipAddress?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    trackedEvents?: TrackedEventListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trackedEvents?: TrackedEventOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    userAgent?: StringNullableFilter<"Client"> | string | null
    ipAddress?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    trackedEvents?: TrackedEventListRelationFilter
  }, "id" | "sessionId">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    sessionId?: StringWithAggregatesFilter<"Client"> | string
    userAgent?: StringNullableWithAggregatesFilter<"Client"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type TrackedEventWhereInput = {
    AND?: TrackedEventWhereInput | TrackedEventWhereInput[]
    OR?: TrackedEventWhereInput[]
    NOT?: TrackedEventWhereInput | TrackedEventWhereInput[]
    id?: StringFilter<"TrackedEvent"> | string
    campaignRewardEventId?: StringFilter<"TrackedEvent"> | string
    clientId?: StringFilter<"TrackedEvent"> | string
    data?: JsonNullableFilter<"TrackedEvent">
    timestamp?: DateTimeFilter<"TrackedEvent"> | Date | string
    createdAt?: DateTimeFilter<"TrackedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"TrackedEvent"> | Date | string
    campaignRewardEvent?: XOR<CampaignRewardEventScalarRelationFilter, CampaignRewardEventWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type TrackedEventOrderByWithRelationInput = {
    id?: SortOrder
    campaignRewardEventId?: SortOrder
    clientId?: SortOrder
    data?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaignRewardEvent?: CampaignRewardEventOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
  }

  export type TrackedEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackedEventWhereInput | TrackedEventWhereInput[]
    OR?: TrackedEventWhereInput[]
    NOT?: TrackedEventWhereInput | TrackedEventWhereInput[]
    campaignRewardEventId?: StringFilter<"TrackedEvent"> | string
    clientId?: StringFilter<"TrackedEvent"> | string
    data?: JsonNullableFilter<"TrackedEvent">
    timestamp?: DateTimeFilter<"TrackedEvent"> | Date | string
    createdAt?: DateTimeFilter<"TrackedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"TrackedEvent"> | Date | string
    campaignRewardEvent?: XOR<CampaignRewardEventScalarRelationFilter, CampaignRewardEventWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type TrackedEventOrderByWithAggregationInput = {
    id?: SortOrder
    campaignRewardEventId?: SortOrder
    clientId?: SortOrder
    data?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackedEventCountOrderByAggregateInput
    _max?: TrackedEventMaxOrderByAggregateInput
    _min?: TrackedEventMinOrderByAggregateInput
  }

  export type TrackedEventScalarWhereWithAggregatesInput = {
    AND?: TrackedEventScalarWhereWithAggregatesInput | TrackedEventScalarWhereWithAggregatesInput[]
    OR?: TrackedEventScalarWhereWithAggregatesInput[]
    NOT?: TrackedEventScalarWhereWithAggregatesInput | TrackedEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackedEvent"> | string
    campaignRewardEventId?: StringWithAggregatesFilter<"TrackedEvent"> | string
    clientId?: StringWithAggregatesFilter<"TrackedEvent"> | string
    data?: JsonNullableWithAggregatesFilter<"TrackedEvent">
    timestamp?: DateTimeWithAggregatesFilter<"TrackedEvent"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TrackedEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrackedEvent"> | Date | string
  }

  export type SelectorWhereInput = {
    AND?: SelectorWhereInput | SelectorWhereInput[]
    OR?: SelectorWhereInput[]
    NOT?: SelectorWhereInput | SelectorWhereInput[]
    id?: StringFilter<"Selector"> | string
    rewardEventId?: StringFilter<"Selector"> | string
    selector?: StringFilter<"Selector"> | string
    eventType?: EnumSelectorEventTypeFilter<"Selector"> | $Enums.SelectorEventType
    isActive?: BoolFilter<"Selector"> | boolean
    createdAt?: DateTimeFilter<"Selector"> | Date | string
    updatedAt?: DateTimeFilter<"Selector"> | Date | string
    rewardEvent?: XOR<RewardEventScalarRelationFilter, RewardEventWhereInput>
  }

  export type SelectorOrderByWithRelationInput = {
    id?: SortOrder
    rewardEventId?: SortOrder
    selector?: SortOrder
    eventType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rewardEvent?: RewardEventOrderByWithRelationInput
  }

  export type SelectorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rewardEventId_selector?: SelectorRewardEventIdSelectorCompoundUniqueInput
    AND?: SelectorWhereInput | SelectorWhereInput[]
    OR?: SelectorWhereInput[]
    NOT?: SelectorWhereInput | SelectorWhereInput[]
    rewardEventId?: StringFilter<"Selector"> | string
    selector?: StringFilter<"Selector"> | string
    eventType?: EnumSelectorEventTypeFilter<"Selector"> | $Enums.SelectorEventType
    isActive?: BoolFilter<"Selector"> | boolean
    createdAt?: DateTimeFilter<"Selector"> | Date | string
    updatedAt?: DateTimeFilter<"Selector"> | Date | string
    rewardEvent?: XOR<RewardEventScalarRelationFilter, RewardEventWhereInput>
  }, "id" | "rewardEventId_selector">

  export type SelectorOrderByWithAggregationInput = {
    id?: SortOrder
    rewardEventId?: SortOrder
    selector?: SortOrder
    eventType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SelectorCountOrderByAggregateInput
    _max?: SelectorMaxOrderByAggregateInput
    _min?: SelectorMinOrderByAggregateInput
  }

  export type SelectorScalarWhereWithAggregatesInput = {
    AND?: SelectorScalarWhereWithAggregatesInput | SelectorScalarWhereWithAggregatesInput[]
    OR?: SelectorScalarWhereWithAggregatesInput[]
    NOT?: SelectorScalarWhereWithAggregatesInput | SelectorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Selector"> | string
    rewardEventId?: StringWithAggregatesFilter<"Selector"> | string
    selector?: StringWithAggregatesFilter<"Selector"> | string
    eventType?: EnumSelectorEventTypeWithAggregatesFilter<"Selector"> | $Enums.SelectorEventType
    isActive?: BoolWithAggregatesFilter<"Selector"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Selector"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Selector"> | Date | string
  }

  export type ParticipationWhereInput = {
    AND?: ParticipationWhereInput | ParticipationWhereInput[]
    OR?: ParticipationWhereInput[]
    NOT?: ParticipationWhereInput | ParticipationWhereInput[]
    id?: StringFilter<"Participation"> | string
    influencerId?: StringFilter<"Participation"> | string
    campaignId?: StringFilter<"Participation"> | string
    currentBalance?: DecimalFilter<"Participation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Participation"> | Date | string
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    createdAt?: DateTimeFilter<"Participation"> | Date | string
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    createdAt?: DateTimeWithAggregatesFilter<"Participation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Participation"> | Date | string
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
    updatedAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
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
    updatedAt?: SortOrder
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
    updatedAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
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
    updatedAt?: SortOrder
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
    updatedAt?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignCreateNestedManyWithoutOwnerInput
    rewardEvents?: RewardEventCreateNestedManyWithoutOwnerInput
    participations?: ParticipationCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    rewardEvents?: RewardEventUncheckedCreateNestedManyWithoutOwnerInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUpdateManyWithoutOwnerNestedInput
    rewardEvents?: RewardEventUpdateManyWithoutOwnerNestedInput
    participations?: ParticipationUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    rewardEvents?: RewardEventUncheckedUpdateManyWithoutOwnerNestedInput
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
    owner: UserCreateNestedOneWithoutCampaignsCreatedInput
    rewardEvents?: CampaignRewardEventCreateNestedManyWithoutCampaignInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    ownerId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: CampaignRewardEventUncheckedCreateNestedManyWithoutCampaignInput
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
    owner?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    rewardEvents?: CampaignRewardEventUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvents?: CampaignRewardEventUncheckedUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    ownerId: string
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
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardEventCreateInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutRewardEventsInput
    selectors?: SelectorCreateNestedManyWithoutRewardEventInput
    campaigns?: CampaignRewardEventCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    selectors?: SelectorUncheckedCreateNestedManyWithoutRewardEventInput
    campaigns?: CampaignRewardEventUncheckedCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutRewardEventsNestedInput
    selectors?: SelectorUpdateManyWithoutRewardEventNestedInput
    campaigns?: CampaignRewardEventUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectors?: SelectorUncheckedUpdateManyWithoutRewardEventNestedInput
    campaigns?: CampaignRewardEventUncheckedUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignRewardEventCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutRewardEventsInput
    rewardEvent: RewardEventCreateNestedOneWithoutCampaignsInput
    trackedEvents?: TrackedEventCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventUncheckedCreateInput = {
    id?: string
    campaignId: string
    rewardEventId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trackedEvents?: TrackedEventUncheckedCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutRewardEventsNestedInput
    rewardEvent?: RewardEventUpdateOneRequiredWithoutCampaignsNestedInput
    trackedEvents?: TrackedEventUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackedEvents?: TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventCreateManyInput = {
    id?: string
    campaignId: string
    rewardEventId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignRewardEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignRewardEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    sessionId: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trackedEvents?: TrackedEventCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    sessionId: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trackedEvents?: TrackedEventUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackedEvents?: TrackedEventUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackedEvents?: TrackedEventUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    sessionId: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventCreateInput = {
    id?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignRewardEvent: CampaignRewardEventCreateNestedOneWithoutTrackedEventsInput
    client: ClientCreateNestedOneWithoutTrackedEventsInput
  }

  export type TrackedEventUncheckedCreateInput = {
    id?: string
    campaignRewardEventId: string
    clientId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignRewardEvent?: CampaignRewardEventUpdateOneRequiredWithoutTrackedEventsNestedInput
    client?: ClientUpdateOneRequiredWithoutTrackedEventsNestedInput
  }

  export type TrackedEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignRewardEventId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventCreateManyInput = {
    id?: string
    campaignRewardEventId: string
    clientId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignRewardEventId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorCreateInput = {
    id?: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvent: RewardEventCreateNestedOneWithoutSelectorsInput
  }

  export type SelectorUncheckedCreateInput = {
    id?: string
    rewardEventId: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SelectorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvent?: RewardEventUpdateOneRequiredWithoutSelectorsNestedInput
  }

  export type SelectorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorCreateManyInput = {
    id?: string
    rewardEventId: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SelectorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationCreateInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: TrackingLinkUncheckedCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationCreateManyInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParticipationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    updatedAt?: Date | string
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
    updatedAt?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id?: string
    type: $Enums.EventType
    participationId: string
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    participationId?: StringFieldUpdateOperationsInput | string
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RewardEventListRelationFilter = {
    every?: RewardEventWhereInput
    some?: RewardEventWhereInput
    none?: RewardEventWhereInput
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

  export type RewardEventOrderByRelationAggregateInput = {
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

  export type CampaignRewardEventListRelationFilter = {
    every?: CampaignRewardEventWhereInput
    some?: CampaignRewardEventWhereInput
    none?: CampaignRewardEventWhereInput
  }

  export type CampaignRewardEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
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
    ownerId?: SortOrder
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
    ownerId?: SortOrder
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

  export type SelectorListRelationFilter = {
    every?: SelectorWhereInput
    some?: SelectorWhereInput
    none?: SelectorWhereInput
  }

  export type SelectorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RewardEventCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardEventMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardEventMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type RewardEventScalarRelationFilter = {
    is?: RewardEventWhereInput
    isNot?: RewardEventWhereInput
  }

  export type TrackedEventListRelationFilter = {
    every?: TrackedEventWhereInput
    some?: TrackedEventWhereInput
    none?: TrackedEventWhereInput
  }

  export type TrackedEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignRewardEventCampaignIdRewardEventIdCompoundUniqueInput = {
    campaignId: string
    rewardEventId: string
  }

  export type CampaignRewardEventCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    rewardEventId?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignRewardEventAvgOrderByAggregateInput = {
    amount?: SortOrder
    volumeStep?: SortOrder
  }

  export type CampaignRewardEventMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    rewardEventId?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignRewardEventMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    rewardEventId?: SortOrder
    amount?: SortOrder
    volumeStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignRewardEventSumOrderByAggregateInput = {
    amount?: SortOrder
    volumeStep?: SortOrder
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

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type CampaignRewardEventScalarRelationFilter = {
    is?: CampaignRewardEventWhereInput
    isNot?: CampaignRewardEventWhereInput
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type TrackedEventCountOrderByAggregateInput = {
    id?: SortOrder
    campaignRewardEventId?: SortOrder
    clientId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackedEventMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignRewardEventId?: SortOrder
    clientId?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackedEventMinOrderByAggregateInput = {
    id?: SortOrder
    campaignRewardEventId?: SortOrder
    clientId?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumSelectorEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SelectorEventType | EnumSelectorEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSelectorEventTypeFilter<$PrismaModel> | $Enums.SelectorEventType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SelectorRewardEventIdSelectorCompoundUniqueInput = {
    rewardEventId: string
    selector: string
  }

  export type SelectorCountOrderByAggregateInput = {
    id?: SortOrder
    rewardEventId?: SortOrder
    selector?: SortOrder
    eventType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SelectorMaxOrderByAggregateInput = {
    id?: SortOrder
    rewardEventId?: SortOrder
    selector?: SortOrder
    eventType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SelectorMinOrderByAggregateInput = {
    id?: SortOrder
    rewardEventId?: SortOrder
    selector?: SortOrder
    eventType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSelectorEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SelectorEventType | EnumSelectorEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSelectorEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SelectorEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSelectorEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSelectorEventTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParticipationAvgOrderByAggregateInput = {
    currentBalance?: SortOrder
  }

  export type ParticipationMaxOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParticipationMinOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    campaignId?: SortOrder
    currentBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParticipationSumOrderByAggregateInput = {
    currentBalance?: SortOrder
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

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrder
    metadata?: SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    updatedAt?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    participationId?: SortOrder
    externalTxId?: SortOrder
    payoutGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnalyticsEventSumOrderByAggregateInput = {
    payoutGenerated?: SortOrder
  }

  export type CampaignCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type RewardEventCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput> | RewardEventCreateWithoutOwnerInput[] | RewardEventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RewardEventCreateOrConnectWithoutOwnerInput | RewardEventCreateOrConnectWithoutOwnerInput[]
    createMany?: RewardEventCreateManyOwnerInputEnvelope
    connect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
  }

  export type ParticipationCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<ParticipationCreateWithoutInfluencerInput, ParticipationUncheckedCreateWithoutInfluencerInput> | ParticipationCreateWithoutInfluencerInput[] | ParticipationUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutInfluencerInput | ParticipationCreateOrConnectWithoutInfluencerInput[]
    createMany?: ParticipationCreateManyInfluencerInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type RewardEventUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput> | RewardEventCreateWithoutOwnerInput[] | RewardEventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RewardEventCreateOrConnectWithoutOwnerInput | RewardEventCreateOrConnectWithoutOwnerInput[]
    createMany?: RewardEventCreateManyOwnerInputEnvelope
    connect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
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

  export type CampaignUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutOwnerInput | CampaignUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutOwnerInput | CampaignUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutOwnerInput | CampaignUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type RewardEventUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput> | RewardEventCreateWithoutOwnerInput[] | RewardEventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RewardEventCreateOrConnectWithoutOwnerInput | RewardEventCreateOrConnectWithoutOwnerInput[]
    upsert?: RewardEventUpsertWithWhereUniqueWithoutOwnerInput | RewardEventUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RewardEventCreateManyOwnerInputEnvelope
    set?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    disconnect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    delete?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    connect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    update?: RewardEventUpdateWithWhereUniqueWithoutOwnerInput | RewardEventUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RewardEventUpdateManyWithWhereWithoutOwnerInput | RewardEventUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RewardEventScalarWhereInput | RewardEventScalarWhereInput[]
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

  export type CampaignUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutOwnerInput | CampaignUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutOwnerInput | CampaignUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutOwnerInput | CampaignUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type RewardEventUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput> | RewardEventCreateWithoutOwnerInput[] | RewardEventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RewardEventCreateOrConnectWithoutOwnerInput | RewardEventCreateOrConnectWithoutOwnerInput[]
    upsert?: RewardEventUpsertWithWhereUniqueWithoutOwnerInput | RewardEventUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RewardEventCreateManyOwnerInputEnvelope
    set?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    disconnect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    delete?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    connect?: RewardEventWhereUniqueInput | RewardEventWhereUniqueInput[]
    update?: RewardEventUpdateWithWhereUniqueWithoutOwnerInput | RewardEventUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RewardEventUpdateManyWithWhereWithoutOwnerInput | RewardEventUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RewardEventScalarWhereInput | RewardEventScalarWhereInput[]
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

  export type CampaignRewardEventCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput> | CampaignRewardEventCreateWithoutCampaignInput[] | CampaignRewardEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutCampaignInput | CampaignRewardEventCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignRewardEventCreateManyCampaignInputEnvelope
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
  }

  export type ParticipationCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ParticipationCreateWithoutCampaignInput, ParticipationUncheckedCreateWithoutCampaignInput> | ParticipationCreateWithoutCampaignInput[] | ParticipationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutCampaignInput | ParticipationCreateOrConnectWithoutCampaignInput[]
    createMany?: ParticipationCreateManyCampaignInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CampaignRewardEventUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput> | CampaignRewardEventCreateWithoutCampaignInput[] | CampaignRewardEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutCampaignInput | CampaignRewardEventCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignRewardEventCreateManyCampaignInputEnvelope
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
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

  export type CampaignRewardEventUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput> | CampaignRewardEventCreateWithoutCampaignInput[] | CampaignRewardEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutCampaignInput | CampaignRewardEventCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignRewardEventUpsertWithWhereUniqueWithoutCampaignInput | CampaignRewardEventUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignRewardEventCreateManyCampaignInputEnvelope
    set?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    disconnect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    delete?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    update?: CampaignRewardEventUpdateWithWhereUniqueWithoutCampaignInput | CampaignRewardEventUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignRewardEventUpdateManyWithWhereWithoutCampaignInput | CampaignRewardEventUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
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

  export type CampaignRewardEventUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput> | CampaignRewardEventCreateWithoutCampaignInput[] | CampaignRewardEventUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutCampaignInput | CampaignRewardEventCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignRewardEventUpsertWithWhereUniqueWithoutCampaignInput | CampaignRewardEventUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignRewardEventCreateManyCampaignInputEnvelope
    set?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    disconnect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    delete?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    update?: CampaignRewardEventUpdateWithWhereUniqueWithoutCampaignInput | CampaignRewardEventUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignRewardEventUpdateManyWithWhereWithoutCampaignInput | CampaignRewardEventUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutRewardEventsInput = {
    create?: XOR<UserCreateWithoutRewardEventsInput, UserUncheckedCreateWithoutRewardEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardEventsInput
    connect?: UserWhereUniqueInput
  }

  export type SelectorCreateNestedManyWithoutRewardEventInput = {
    create?: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput> | SelectorCreateWithoutRewardEventInput[] | SelectorUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: SelectorCreateOrConnectWithoutRewardEventInput | SelectorCreateOrConnectWithoutRewardEventInput[]
    createMany?: SelectorCreateManyRewardEventInputEnvelope
    connect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
  }

  export type CampaignRewardEventCreateNestedManyWithoutRewardEventInput = {
    create?: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput> | CampaignRewardEventCreateWithoutRewardEventInput[] | CampaignRewardEventUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutRewardEventInput | CampaignRewardEventCreateOrConnectWithoutRewardEventInput[]
    createMany?: CampaignRewardEventCreateManyRewardEventInputEnvelope
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
  }

  export type SelectorUncheckedCreateNestedManyWithoutRewardEventInput = {
    create?: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput> | SelectorCreateWithoutRewardEventInput[] | SelectorUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: SelectorCreateOrConnectWithoutRewardEventInput | SelectorCreateOrConnectWithoutRewardEventInput[]
    createMany?: SelectorCreateManyRewardEventInputEnvelope
    connect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
  }

  export type CampaignRewardEventUncheckedCreateNestedManyWithoutRewardEventInput = {
    create?: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput> | CampaignRewardEventCreateWithoutRewardEventInput[] | CampaignRewardEventUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutRewardEventInput | CampaignRewardEventCreateOrConnectWithoutRewardEventInput[]
    createMany?: CampaignRewardEventCreateManyRewardEventInputEnvelope
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type UserUpdateOneRequiredWithoutRewardEventsNestedInput = {
    create?: XOR<UserCreateWithoutRewardEventsInput, UserUncheckedCreateWithoutRewardEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardEventsInput
    upsert?: UserUpsertWithoutRewardEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRewardEventsInput, UserUpdateWithoutRewardEventsInput>, UserUncheckedUpdateWithoutRewardEventsInput>
  }

  export type SelectorUpdateManyWithoutRewardEventNestedInput = {
    create?: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput> | SelectorCreateWithoutRewardEventInput[] | SelectorUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: SelectorCreateOrConnectWithoutRewardEventInput | SelectorCreateOrConnectWithoutRewardEventInput[]
    upsert?: SelectorUpsertWithWhereUniqueWithoutRewardEventInput | SelectorUpsertWithWhereUniqueWithoutRewardEventInput[]
    createMany?: SelectorCreateManyRewardEventInputEnvelope
    set?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    disconnect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    delete?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    connect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    update?: SelectorUpdateWithWhereUniqueWithoutRewardEventInput | SelectorUpdateWithWhereUniqueWithoutRewardEventInput[]
    updateMany?: SelectorUpdateManyWithWhereWithoutRewardEventInput | SelectorUpdateManyWithWhereWithoutRewardEventInput[]
    deleteMany?: SelectorScalarWhereInput | SelectorScalarWhereInput[]
  }

  export type CampaignRewardEventUpdateManyWithoutRewardEventNestedInput = {
    create?: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput> | CampaignRewardEventCreateWithoutRewardEventInput[] | CampaignRewardEventUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutRewardEventInput | CampaignRewardEventCreateOrConnectWithoutRewardEventInput[]
    upsert?: CampaignRewardEventUpsertWithWhereUniqueWithoutRewardEventInput | CampaignRewardEventUpsertWithWhereUniqueWithoutRewardEventInput[]
    createMany?: CampaignRewardEventCreateManyRewardEventInputEnvelope
    set?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    disconnect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    delete?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    update?: CampaignRewardEventUpdateWithWhereUniqueWithoutRewardEventInput | CampaignRewardEventUpdateWithWhereUniqueWithoutRewardEventInput[]
    updateMany?: CampaignRewardEventUpdateManyWithWhereWithoutRewardEventInput | CampaignRewardEventUpdateManyWithWhereWithoutRewardEventInput[]
    deleteMany?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
  }

  export type SelectorUncheckedUpdateManyWithoutRewardEventNestedInput = {
    create?: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput> | SelectorCreateWithoutRewardEventInput[] | SelectorUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: SelectorCreateOrConnectWithoutRewardEventInput | SelectorCreateOrConnectWithoutRewardEventInput[]
    upsert?: SelectorUpsertWithWhereUniqueWithoutRewardEventInput | SelectorUpsertWithWhereUniqueWithoutRewardEventInput[]
    createMany?: SelectorCreateManyRewardEventInputEnvelope
    set?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    disconnect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    delete?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    connect?: SelectorWhereUniqueInput | SelectorWhereUniqueInput[]
    update?: SelectorUpdateWithWhereUniqueWithoutRewardEventInput | SelectorUpdateWithWhereUniqueWithoutRewardEventInput[]
    updateMany?: SelectorUpdateManyWithWhereWithoutRewardEventInput | SelectorUpdateManyWithWhereWithoutRewardEventInput[]
    deleteMany?: SelectorScalarWhereInput | SelectorScalarWhereInput[]
  }

  export type CampaignRewardEventUncheckedUpdateManyWithoutRewardEventNestedInput = {
    create?: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput> | CampaignRewardEventCreateWithoutRewardEventInput[] | CampaignRewardEventUncheckedCreateWithoutRewardEventInput[]
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutRewardEventInput | CampaignRewardEventCreateOrConnectWithoutRewardEventInput[]
    upsert?: CampaignRewardEventUpsertWithWhereUniqueWithoutRewardEventInput | CampaignRewardEventUpsertWithWhereUniqueWithoutRewardEventInput[]
    createMany?: CampaignRewardEventCreateManyRewardEventInputEnvelope
    set?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    disconnect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    delete?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    connect?: CampaignRewardEventWhereUniqueInput | CampaignRewardEventWhereUniqueInput[]
    update?: CampaignRewardEventUpdateWithWhereUniqueWithoutRewardEventInput | CampaignRewardEventUpdateWithWhereUniqueWithoutRewardEventInput[]
    updateMany?: CampaignRewardEventUpdateManyWithWhereWithoutRewardEventInput | CampaignRewardEventUpdateManyWithWhereWithoutRewardEventInput[]
    deleteMany?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutRewardEventsInput = {
    create?: XOR<CampaignCreateWithoutRewardEventsInput, CampaignUncheckedCreateWithoutRewardEventsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutRewardEventsInput
    connect?: CampaignWhereUniqueInput
  }

  export type RewardEventCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<RewardEventCreateWithoutCampaignsInput, RewardEventUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: RewardEventCreateOrConnectWithoutCampaignsInput
    connect?: RewardEventWhereUniqueInput
  }

  export type TrackedEventCreateNestedManyWithoutCampaignRewardEventInput = {
    create?: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput> | TrackedEventCreateWithoutCampaignRewardEventInput[] | TrackedEventUncheckedCreateWithoutCampaignRewardEventInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutCampaignRewardEventInput | TrackedEventCreateOrConnectWithoutCampaignRewardEventInput[]
    createMany?: TrackedEventCreateManyCampaignRewardEventInputEnvelope
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
  }

  export type TrackedEventUncheckedCreateNestedManyWithoutCampaignRewardEventInput = {
    create?: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput> | TrackedEventCreateWithoutCampaignRewardEventInput[] | TrackedEventUncheckedCreateWithoutCampaignRewardEventInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutCampaignRewardEventInput | TrackedEventCreateOrConnectWithoutCampaignRewardEventInput[]
    createMany?: TrackedEventCreateManyCampaignRewardEventInputEnvelope
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CampaignUpdateOneRequiredWithoutRewardEventsNestedInput = {
    create?: XOR<CampaignCreateWithoutRewardEventsInput, CampaignUncheckedCreateWithoutRewardEventsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutRewardEventsInput
    upsert?: CampaignUpsertWithoutRewardEventsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutRewardEventsInput, CampaignUpdateWithoutRewardEventsInput>, CampaignUncheckedUpdateWithoutRewardEventsInput>
  }

  export type RewardEventUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<RewardEventCreateWithoutCampaignsInput, RewardEventUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: RewardEventCreateOrConnectWithoutCampaignsInput
    upsert?: RewardEventUpsertWithoutCampaignsInput
    connect?: RewardEventWhereUniqueInput
    update?: XOR<XOR<RewardEventUpdateToOneWithWhereWithoutCampaignsInput, RewardEventUpdateWithoutCampaignsInput>, RewardEventUncheckedUpdateWithoutCampaignsInput>
  }

  export type TrackedEventUpdateManyWithoutCampaignRewardEventNestedInput = {
    create?: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput> | TrackedEventCreateWithoutCampaignRewardEventInput[] | TrackedEventUncheckedCreateWithoutCampaignRewardEventInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutCampaignRewardEventInput | TrackedEventCreateOrConnectWithoutCampaignRewardEventInput[]
    upsert?: TrackedEventUpsertWithWhereUniqueWithoutCampaignRewardEventInput | TrackedEventUpsertWithWhereUniqueWithoutCampaignRewardEventInput[]
    createMany?: TrackedEventCreateManyCampaignRewardEventInputEnvelope
    set?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    disconnect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    delete?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    update?: TrackedEventUpdateWithWhereUniqueWithoutCampaignRewardEventInput | TrackedEventUpdateWithWhereUniqueWithoutCampaignRewardEventInput[]
    updateMany?: TrackedEventUpdateManyWithWhereWithoutCampaignRewardEventInput | TrackedEventUpdateManyWithWhereWithoutCampaignRewardEventInput[]
    deleteMany?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
  }

  export type TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventNestedInput = {
    create?: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput> | TrackedEventCreateWithoutCampaignRewardEventInput[] | TrackedEventUncheckedCreateWithoutCampaignRewardEventInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutCampaignRewardEventInput | TrackedEventCreateOrConnectWithoutCampaignRewardEventInput[]
    upsert?: TrackedEventUpsertWithWhereUniqueWithoutCampaignRewardEventInput | TrackedEventUpsertWithWhereUniqueWithoutCampaignRewardEventInput[]
    createMany?: TrackedEventCreateManyCampaignRewardEventInputEnvelope
    set?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    disconnect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    delete?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    update?: TrackedEventUpdateWithWhereUniqueWithoutCampaignRewardEventInput | TrackedEventUpdateWithWhereUniqueWithoutCampaignRewardEventInput[]
    updateMany?: TrackedEventUpdateManyWithWhereWithoutCampaignRewardEventInput | TrackedEventUpdateManyWithWhereWithoutCampaignRewardEventInput[]
    deleteMany?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
  }

  export type TrackedEventCreateNestedManyWithoutClientInput = {
    create?: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput> | TrackedEventCreateWithoutClientInput[] | TrackedEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutClientInput | TrackedEventCreateOrConnectWithoutClientInput[]
    createMany?: TrackedEventCreateManyClientInputEnvelope
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
  }

  export type TrackedEventUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput> | TrackedEventCreateWithoutClientInput[] | TrackedEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutClientInput | TrackedEventCreateOrConnectWithoutClientInput[]
    createMany?: TrackedEventCreateManyClientInputEnvelope
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
  }

  export type TrackedEventUpdateManyWithoutClientNestedInput = {
    create?: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput> | TrackedEventCreateWithoutClientInput[] | TrackedEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutClientInput | TrackedEventCreateOrConnectWithoutClientInput[]
    upsert?: TrackedEventUpsertWithWhereUniqueWithoutClientInput | TrackedEventUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TrackedEventCreateManyClientInputEnvelope
    set?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    disconnect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    delete?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    update?: TrackedEventUpdateWithWhereUniqueWithoutClientInput | TrackedEventUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TrackedEventUpdateManyWithWhereWithoutClientInput | TrackedEventUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
  }

  export type TrackedEventUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput> | TrackedEventCreateWithoutClientInput[] | TrackedEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrackedEventCreateOrConnectWithoutClientInput | TrackedEventCreateOrConnectWithoutClientInput[]
    upsert?: TrackedEventUpsertWithWhereUniqueWithoutClientInput | TrackedEventUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TrackedEventCreateManyClientInputEnvelope
    set?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    disconnect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    delete?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    connect?: TrackedEventWhereUniqueInput | TrackedEventWhereUniqueInput[]
    update?: TrackedEventUpdateWithWhereUniqueWithoutClientInput | TrackedEventUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TrackedEventUpdateManyWithWhereWithoutClientInput | TrackedEventUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
  }

  export type CampaignRewardEventCreateNestedOneWithoutTrackedEventsInput = {
    create?: XOR<CampaignRewardEventCreateWithoutTrackedEventsInput, CampaignRewardEventUncheckedCreateWithoutTrackedEventsInput>
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutTrackedEventsInput
    connect?: CampaignRewardEventWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutTrackedEventsInput = {
    create?: XOR<ClientCreateWithoutTrackedEventsInput, ClientUncheckedCreateWithoutTrackedEventsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTrackedEventsInput
    connect?: ClientWhereUniqueInput
  }

  export type CampaignRewardEventUpdateOneRequiredWithoutTrackedEventsNestedInput = {
    create?: XOR<CampaignRewardEventCreateWithoutTrackedEventsInput, CampaignRewardEventUncheckedCreateWithoutTrackedEventsInput>
    connectOrCreate?: CampaignRewardEventCreateOrConnectWithoutTrackedEventsInput
    upsert?: CampaignRewardEventUpsertWithoutTrackedEventsInput
    connect?: CampaignRewardEventWhereUniqueInput
    update?: XOR<XOR<CampaignRewardEventUpdateToOneWithWhereWithoutTrackedEventsInput, CampaignRewardEventUpdateWithoutTrackedEventsInput>, CampaignRewardEventUncheckedUpdateWithoutTrackedEventsInput>
  }

  export type ClientUpdateOneRequiredWithoutTrackedEventsNestedInput = {
    create?: XOR<ClientCreateWithoutTrackedEventsInput, ClientUncheckedCreateWithoutTrackedEventsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTrackedEventsInput
    upsert?: ClientUpsertWithoutTrackedEventsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutTrackedEventsInput, ClientUpdateWithoutTrackedEventsInput>, ClientUncheckedUpdateWithoutTrackedEventsInput>
  }

  export type RewardEventCreateNestedOneWithoutSelectorsInput = {
    create?: XOR<RewardEventCreateWithoutSelectorsInput, RewardEventUncheckedCreateWithoutSelectorsInput>
    connectOrCreate?: RewardEventCreateOrConnectWithoutSelectorsInput
    connect?: RewardEventWhereUniqueInput
  }

  export type EnumSelectorEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.SelectorEventType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RewardEventUpdateOneRequiredWithoutSelectorsNestedInput = {
    create?: XOR<RewardEventCreateWithoutSelectorsInput, RewardEventUncheckedCreateWithoutSelectorsInput>
    connectOrCreate?: RewardEventCreateOrConnectWithoutSelectorsInput
    upsert?: RewardEventUpsertWithoutSelectorsInput
    connect?: RewardEventWhereUniqueInput
    update?: XOR<XOR<RewardEventUpdateToOneWithWhereWithoutSelectorsInput, RewardEventUpdateWithoutSelectorsInput>, RewardEventUncheckedUpdateWithoutSelectorsInput>
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

  export type NestedEnumSelectorEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SelectorEventType | EnumSelectorEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSelectorEventTypeFilter<$PrismaModel> | $Enums.SelectorEventType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSelectorEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SelectorEventType | EnumSelectorEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SelectorEventType[] | ListEnumSelectorEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSelectorEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SelectorEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSelectorEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSelectorEventTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type CampaignCreateWithoutOwnerInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: CampaignRewardEventCreateNestedManyWithoutCampaignInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: CampaignRewardEventUncheckedCreateNestedManyWithoutCampaignInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput>
  }

  export type CampaignCreateManyOwnerInputEnvelope = {
    data: CampaignCreateManyOwnerInput | CampaignCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RewardEventCreateWithoutOwnerInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    selectors?: SelectorCreateNestedManyWithoutRewardEventInput
    campaigns?: CampaignRewardEventCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    selectors?: SelectorUncheckedCreateNestedManyWithoutRewardEventInput
    campaigns?: CampaignRewardEventUncheckedCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventCreateOrConnectWithoutOwnerInput = {
    where: RewardEventWhereUniqueInput
    create: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput>
  }

  export type RewardEventCreateManyOwnerInputEnvelope = {
    data: RewardEventCreateManyOwnerInput | RewardEventCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ParticipationCreateWithoutInfluencerInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutInfluencerInput = {
    id?: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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

  export type CampaignUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutOwnerInput, CampaignUncheckedUpdateWithoutOwnerInput>
    create: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutOwnerInput, CampaignUncheckedUpdateWithoutOwnerInput>
  }

  export type CampaignUpdateManyWithWhereWithoutOwnerInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    ownerId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    escrowAddress?: StringFilter<"Campaign"> | string
    budgetTotal?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    yellowChannelId?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type RewardEventUpsertWithWhereUniqueWithoutOwnerInput = {
    where: RewardEventWhereUniqueInput
    update: XOR<RewardEventUpdateWithoutOwnerInput, RewardEventUncheckedUpdateWithoutOwnerInput>
    create: XOR<RewardEventCreateWithoutOwnerInput, RewardEventUncheckedCreateWithoutOwnerInput>
  }

  export type RewardEventUpdateWithWhereUniqueWithoutOwnerInput = {
    where: RewardEventWhereUniqueInput
    data: XOR<RewardEventUpdateWithoutOwnerInput, RewardEventUncheckedUpdateWithoutOwnerInput>
  }

  export type RewardEventUpdateManyWithWhereWithoutOwnerInput = {
    where: RewardEventScalarWhereInput
    data: XOR<RewardEventUpdateManyMutationInput, RewardEventUncheckedUpdateManyWithoutOwnerInput>
  }

  export type RewardEventScalarWhereInput = {
    AND?: RewardEventScalarWhereInput | RewardEventScalarWhereInput[]
    OR?: RewardEventScalarWhereInput[]
    NOT?: RewardEventScalarWhereInput | RewardEventScalarWhereInput[]
    id?: StringFilter<"RewardEvent"> | string
    ownerId?: StringFilter<"RewardEvent"> | string
    name?: StringFilter<"RewardEvent"> | string
    eventType?: EnumEventTypeFilter<"RewardEvent"> | $Enums.EventType
    createdAt?: DateTimeFilter<"RewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RewardEvent"> | Date | string
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
    createdAt?: DateTimeFilter<"Participation"> | Date | string
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
  }

  export type UserCreateWithoutCampaignsCreatedInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: RewardEventCreateNestedManyWithoutOwnerInput
    participations?: ParticipationCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateWithoutCampaignsCreatedInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: RewardEventUncheckedCreateNestedManyWithoutOwnerInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserCreateOrConnectWithoutCampaignsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignsCreatedInput, UserUncheckedCreateWithoutCampaignsCreatedInput>
  }

  export type CampaignRewardEventCreateWithoutCampaignInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvent: RewardEventCreateNestedOneWithoutCampaignsInput
    trackedEvents?: TrackedEventCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventUncheckedCreateWithoutCampaignInput = {
    id?: string
    rewardEventId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trackedEvents?: TrackedEventUncheckedCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventCreateOrConnectWithoutCampaignInput = {
    where: CampaignRewardEventWhereUniqueInput
    create: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignRewardEventCreateManyCampaignInputEnvelope = {
    data: CampaignRewardEventCreateManyCampaignInput | CampaignRewardEventCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type ParticipationCreateWithoutCampaignInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutCampaignInput = {
    id?: string
    influencerId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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
    rewardEvents?: RewardEventUpdateManyWithoutOwnerNestedInput
    participations?: ParticipationUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvents?: RewardEventUncheckedUpdateManyWithoutOwnerNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type CampaignRewardEventUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignRewardEventWhereUniqueInput
    update: XOR<CampaignRewardEventUpdateWithoutCampaignInput, CampaignRewardEventUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignRewardEventCreateWithoutCampaignInput, CampaignRewardEventUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignRewardEventUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignRewardEventWhereUniqueInput
    data: XOR<CampaignRewardEventUpdateWithoutCampaignInput, CampaignRewardEventUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignRewardEventUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignRewardEventScalarWhereInput
    data: XOR<CampaignRewardEventUpdateManyMutationInput, CampaignRewardEventUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignRewardEventScalarWhereInput = {
    AND?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
    OR?: CampaignRewardEventScalarWhereInput[]
    NOT?: CampaignRewardEventScalarWhereInput | CampaignRewardEventScalarWhereInput[]
    id?: StringFilter<"CampaignRewardEvent"> | string
    campaignId?: StringFilter<"CampaignRewardEvent"> | string
    rewardEventId?: StringFilter<"CampaignRewardEvent"> | string
    amount?: DecimalFilter<"CampaignRewardEvent"> | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFilter<"CampaignRewardEvent"> | number
    createdAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignRewardEvent"> | Date | string
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

  export type UserCreateWithoutRewardEventsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignCreateNestedManyWithoutOwnerInput
    participations?: ParticipationCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateWithoutRewardEventsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    participations?: ParticipationUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserCreateOrConnectWithoutRewardEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRewardEventsInput, UserUncheckedCreateWithoutRewardEventsInput>
  }

  export type SelectorCreateWithoutRewardEventInput = {
    id?: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SelectorUncheckedCreateWithoutRewardEventInput = {
    id?: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SelectorCreateOrConnectWithoutRewardEventInput = {
    where: SelectorWhereUniqueInput
    create: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput>
  }

  export type SelectorCreateManyRewardEventInputEnvelope = {
    data: SelectorCreateManyRewardEventInput | SelectorCreateManyRewardEventInput[]
    skipDuplicates?: boolean
  }

  export type CampaignRewardEventCreateWithoutRewardEventInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutRewardEventsInput
    trackedEvents?: TrackedEventCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventUncheckedCreateWithoutRewardEventInput = {
    id?: string
    campaignId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trackedEvents?: TrackedEventUncheckedCreateNestedManyWithoutCampaignRewardEventInput
  }

  export type CampaignRewardEventCreateOrConnectWithoutRewardEventInput = {
    where: CampaignRewardEventWhereUniqueInput
    create: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput>
  }

  export type CampaignRewardEventCreateManyRewardEventInputEnvelope = {
    data: CampaignRewardEventCreateManyRewardEventInput | CampaignRewardEventCreateManyRewardEventInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRewardEventsInput = {
    update: XOR<UserUpdateWithoutRewardEventsInput, UserUncheckedUpdateWithoutRewardEventsInput>
    create: XOR<UserCreateWithoutRewardEventsInput, UserUncheckedCreateWithoutRewardEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRewardEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRewardEventsInput, UserUncheckedUpdateWithoutRewardEventsInput>
  }

  export type UserUpdateWithoutRewardEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUpdateManyWithoutOwnerNestedInput
    participations?: ParticipationUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateWithoutRewardEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type SelectorUpsertWithWhereUniqueWithoutRewardEventInput = {
    where: SelectorWhereUniqueInput
    update: XOR<SelectorUpdateWithoutRewardEventInput, SelectorUncheckedUpdateWithoutRewardEventInput>
    create: XOR<SelectorCreateWithoutRewardEventInput, SelectorUncheckedCreateWithoutRewardEventInput>
  }

  export type SelectorUpdateWithWhereUniqueWithoutRewardEventInput = {
    where: SelectorWhereUniqueInput
    data: XOR<SelectorUpdateWithoutRewardEventInput, SelectorUncheckedUpdateWithoutRewardEventInput>
  }

  export type SelectorUpdateManyWithWhereWithoutRewardEventInput = {
    where: SelectorScalarWhereInput
    data: XOR<SelectorUpdateManyMutationInput, SelectorUncheckedUpdateManyWithoutRewardEventInput>
  }

  export type SelectorScalarWhereInput = {
    AND?: SelectorScalarWhereInput | SelectorScalarWhereInput[]
    OR?: SelectorScalarWhereInput[]
    NOT?: SelectorScalarWhereInput | SelectorScalarWhereInput[]
    id?: StringFilter<"Selector"> | string
    rewardEventId?: StringFilter<"Selector"> | string
    selector?: StringFilter<"Selector"> | string
    eventType?: EnumSelectorEventTypeFilter<"Selector"> | $Enums.SelectorEventType
    isActive?: BoolFilter<"Selector"> | boolean
    createdAt?: DateTimeFilter<"Selector"> | Date | string
    updatedAt?: DateTimeFilter<"Selector"> | Date | string
  }

  export type CampaignRewardEventUpsertWithWhereUniqueWithoutRewardEventInput = {
    where: CampaignRewardEventWhereUniqueInput
    update: XOR<CampaignRewardEventUpdateWithoutRewardEventInput, CampaignRewardEventUncheckedUpdateWithoutRewardEventInput>
    create: XOR<CampaignRewardEventCreateWithoutRewardEventInput, CampaignRewardEventUncheckedCreateWithoutRewardEventInput>
  }

  export type CampaignRewardEventUpdateWithWhereUniqueWithoutRewardEventInput = {
    where: CampaignRewardEventWhereUniqueInput
    data: XOR<CampaignRewardEventUpdateWithoutRewardEventInput, CampaignRewardEventUncheckedUpdateWithoutRewardEventInput>
  }

  export type CampaignRewardEventUpdateManyWithWhereWithoutRewardEventInput = {
    where: CampaignRewardEventScalarWhereInput
    data: XOR<CampaignRewardEventUpdateManyMutationInput, CampaignRewardEventUncheckedUpdateManyWithoutRewardEventInput>
  }

  export type CampaignCreateWithoutRewardEventsInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutCampaignsCreatedInput
    participations?: ParticipationCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutRewardEventsInput = {
    id?: string
    ownerId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ParticipationUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutRewardEventsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutRewardEventsInput, CampaignUncheckedCreateWithoutRewardEventsInput>
  }

  export type RewardEventCreateWithoutCampaignsInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutRewardEventsInput
    selectors?: SelectorCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventUncheckedCreateWithoutCampaignsInput = {
    id?: string
    ownerId: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    selectors?: SelectorUncheckedCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventCreateOrConnectWithoutCampaignsInput = {
    where: RewardEventWhereUniqueInput
    create: XOR<RewardEventCreateWithoutCampaignsInput, RewardEventUncheckedCreateWithoutCampaignsInput>
  }

  export type TrackedEventCreateWithoutCampaignRewardEventInput = {
    id?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTrackedEventsInput
  }

  export type TrackedEventUncheckedCreateWithoutCampaignRewardEventInput = {
    id?: string
    clientId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventCreateOrConnectWithoutCampaignRewardEventInput = {
    where: TrackedEventWhereUniqueInput
    create: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput>
  }

  export type TrackedEventCreateManyCampaignRewardEventInputEnvelope = {
    data: TrackedEventCreateManyCampaignRewardEventInput | TrackedEventCreateManyCampaignRewardEventInput[]
    skipDuplicates?: boolean
  }

  export type CampaignUpsertWithoutRewardEventsInput = {
    update: XOR<CampaignUpdateWithoutRewardEventsInput, CampaignUncheckedUpdateWithoutRewardEventsInput>
    create: XOR<CampaignCreateWithoutRewardEventsInput, CampaignUncheckedCreateWithoutRewardEventsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutRewardEventsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutRewardEventsInput, CampaignUncheckedUpdateWithoutRewardEventsInput>
  }

  export type CampaignUpdateWithoutRewardEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutRewardEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type RewardEventUpsertWithoutCampaignsInput = {
    update: XOR<RewardEventUpdateWithoutCampaignsInput, RewardEventUncheckedUpdateWithoutCampaignsInput>
    create: XOR<RewardEventCreateWithoutCampaignsInput, RewardEventUncheckedCreateWithoutCampaignsInput>
    where?: RewardEventWhereInput
  }

  export type RewardEventUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: RewardEventWhereInput
    data: XOR<RewardEventUpdateWithoutCampaignsInput, RewardEventUncheckedUpdateWithoutCampaignsInput>
  }

  export type RewardEventUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutRewardEventsNestedInput
    selectors?: SelectorUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectors?: SelectorUncheckedUpdateManyWithoutRewardEventNestedInput
  }

  export type TrackedEventUpsertWithWhereUniqueWithoutCampaignRewardEventInput = {
    where: TrackedEventWhereUniqueInput
    update: XOR<TrackedEventUpdateWithoutCampaignRewardEventInput, TrackedEventUncheckedUpdateWithoutCampaignRewardEventInput>
    create: XOR<TrackedEventCreateWithoutCampaignRewardEventInput, TrackedEventUncheckedCreateWithoutCampaignRewardEventInput>
  }

  export type TrackedEventUpdateWithWhereUniqueWithoutCampaignRewardEventInput = {
    where: TrackedEventWhereUniqueInput
    data: XOR<TrackedEventUpdateWithoutCampaignRewardEventInput, TrackedEventUncheckedUpdateWithoutCampaignRewardEventInput>
  }

  export type TrackedEventUpdateManyWithWhereWithoutCampaignRewardEventInput = {
    where: TrackedEventScalarWhereInput
    data: XOR<TrackedEventUpdateManyMutationInput, TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventInput>
  }

  export type TrackedEventScalarWhereInput = {
    AND?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
    OR?: TrackedEventScalarWhereInput[]
    NOT?: TrackedEventScalarWhereInput | TrackedEventScalarWhereInput[]
    id?: StringFilter<"TrackedEvent"> | string
    campaignRewardEventId?: StringFilter<"TrackedEvent"> | string
    clientId?: StringFilter<"TrackedEvent"> | string
    data?: JsonNullableFilter<"TrackedEvent">
    timestamp?: DateTimeFilter<"TrackedEvent"> | Date | string
    createdAt?: DateTimeFilter<"TrackedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"TrackedEvent"> | Date | string
  }

  export type TrackedEventCreateWithoutClientInput = {
    id?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignRewardEvent: CampaignRewardEventCreateNestedOneWithoutTrackedEventsInput
  }

  export type TrackedEventUncheckedCreateWithoutClientInput = {
    id?: string
    campaignRewardEventId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventCreateOrConnectWithoutClientInput = {
    where: TrackedEventWhereUniqueInput
    create: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput>
  }

  export type TrackedEventCreateManyClientInputEnvelope = {
    data: TrackedEventCreateManyClientInput | TrackedEventCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type TrackedEventUpsertWithWhereUniqueWithoutClientInput = {
    where: TrackedEventWhereUniqueInput
    update: XOR<TrackedEventUpdateWithoutClientInput, TrackedEventUncheckedUpdateWithoutClientInput>
    create: XOR<TrackedEventCreateWithoutClientInput, TrackedEventUncheckedCreateWithoutClientInput>
  }

  export type TrackedEventUpdateWithWhereUniqueWithoutClientInput = {
    where: TrackedEventWhereUniqueInput
    data: XOR<TrackedEventUpdateWithoutClientInput, TrackedEventUncheckedUpdateWithoutClientInput>
  }

  export type TrackedEventUpdateManyWithWhereWithoutClientInput = {
    where: TrackedEventScalarWhereInput
    data: XOR<TrackedEventUpdateManyMutationInput, TrackedEventUncheckedUpdateManyWithoutClientInput>
  }

  export type CampaignRewardEventCreateWithoutTrackedEventsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutRewardEventsInput
    rewardEvent: RewardEventCreateNestedOneWithoutCampaignsInput
  }

  export type CampaignRewardEventUncheckedCreateWithoutTrackedEventsInput = {
    id?: string
    campaignId: string
    rewardEventId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignRewardEventCreateOrConnectWithoutTrackedEventsInput = {
    where: CampaignRewardEventWhereUniqueInput
    create: XOR<CampaignRewardEventCreateWithoutTrackedEventsInput, CampaignRewardEventUncheckedCreateWithoutTrackedEventsInput>
  }

  export type ClientCreateWithoutTrackedEventsInput = {
    id?: string
    sessionId: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUncheckedCreateWithoutTrackedEventsInput = {
    id?: string
    sessionId: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutTrackedEventsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutTrackedEventsInput, ClientUncheckedCreateWithoutTrackedEventsInput>
  }

  export type CampaignRewardEventUpsertWithoutTrackedEventsInput = {
    update: XOR<CampaignRewardEventUpdateWithoutTrackedEventsInput, CampaignRewardEventUncheckedUpdateWithoutTrackedEventsInput>
    create: XOR<CampaignRewardEventCreateWithoutTrackedEventsInput, CampaignRewardEventUncheckedCreateWithoutTrackedEventsInput>
    where?: CampaignRewardEventWhereInput
  }

  export type CampaignRewardEventUpdateToOneWithWhereWithoutTrackedEventsInput = {
    where?: CampaignRewardEventWhereInput
    data: XOR<CampaignRewardEventUpdateWithoutTrackedEventsInput, CampaignRewardEventUncheckedUpdateWithoutTrackedEventsInput>
  }

  export type CampaignRewardEventUpdateWithoutTrackedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutRewardEventsNestedInput
    rewardEvent?: RewardEventUpdateOneRequiredWithoutCampaignsNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateWithoutTrackedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpsertWithoutTrackedEventsInput = {
    update: XOR<ClientUpdateWithoutTrackedEventsInput, ClientUncheckedUpdateWithoutTrackedEventsInput>
    create: XOR<ClientCreateWithoutTrackedEventsInput, ClientUncheckedCreateWithoutTrackedEventsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutTrackedEventsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutTrackedEventsInput, ClientUncheckedUpdateWithoutTrackedEventsInput>
  }

  export type ClientUpdateWithoutTrackedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateWithoutTrackedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardEventCreateWithoutSelectorsInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutRewardEventsInput
    campaigns?: CampaignRewardEventCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventUncheckedCreateWithoutSelectorsInput = {
    id?: string
    ownerId: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignRewardEventUncheckedCreateNestedManyWithoutRewardEventInput
  }

  export type RewardEventCreateOrConnectWithoutSelectorsInput = {
    where: RewardEventWhereUniqueInput
    create: XOR<RewardEventCreateWithoutSelectorsInput, RewardEventUncheckedCreateWithoutSelectorsInput>
  }

  export type RewardEventUpsertWithoutSelectorsInput = {
    update: XOR<RewardEventUpdateWithoutSelectorsInput, RewardEventUncheckedUpdateWithoutSelectorsInput>
    create: XOR<RewardEventCreateWithoutSelectorsInput, RewardEventUncheckedCreateWithoutSelectorsInput>
    where?: RewardEventWhereInput
  }

  export type RewardEventUpdateToOneWithWhereWithoutSelectorsInput = {
    where?: RewardEventWhereInput
    data: XOR<RewardEventUpdateWithoutSelectorsInput, RewardEventUncheckedUpdateWithoutSelectorsInput>
  }

  export type RewardEventUpdateWithoutSelectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutRewardEventsNestedInput
    campaigns?: CampaignRewardEventUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventUncheckedUpdateWithoutSelectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignRewardEventUncheckedUpdateManyWithoutRewardEventNestedInput
  }

  export type UserCreateWithoutParticipationsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignCreateNestedManyWithoutOwnerInput
    rewardEvents?: RewardEventCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutParticipationsInput = {
    id?: string
    walletAddress: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignsCreated?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    rewardEvents?: RewardEventUncheckedCreateNestedManyWithoutOwnerInput
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
    owner: UserCreateNestedOneWithoutCampaignsCreatedInput
    rewardEvents?: CampaignRewardEventCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutParticipationsInput = {
    id?: string
    ownerId: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    rewardEvents?: CampaignRewardEventUncheckedCreateNestedManyWithoutCampaignInput
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
    updatedAt?: Date | string
  }

  export type AnalyticsEventUncheckedCreateWithoutParticipationInput = {
    id?: string
    type: $Enums.EventType
    externalTxId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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
    campaignsCreated?: CampaignUpdateManyWithoutOwnerNestedInput
    rewardEvents?: RewardEventUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignsCreated?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    rewardEvents?: RewardEventUncheckedUpdateManyWithoutOwnerNestedInput
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
    owner?: UserUpdateOneRequiredWithoutCampaignsCreatedNestedInput
    rewardEvents?: CampaignRewardEventUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvents?: CampaignRewardEventUncheckedUpdateManyWithoutCampaignNestedInput
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
    updatedAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type ParticipationCreateWithoutLinksInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    events?: AnalyticsEventCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutLinksInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationCreateWithoutEventsInput = {
    id?: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    influencer: UserCreateNestedOneWithoutParticipationsInput
    campaign: CampaignCreateNestedOneWithoutParticipationsInput
    links?: TrackingLinkCreateNestedManyWithoutParticipationInput
  }

  export type ParticipationUncheckedCreateWithoutEventsInput = {
    id?: string
    influencerId: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type CampaignCreateManyOwnerInput = {
    id?: string
    title: string
    escrowAddress: string
    budgetTotal: Decimal | DecimalJsLike | number | string
    yellowChannelId?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardEventCreateManyOwnerInput = {
    id?: string
    name: string
    eventType: $Enums.EventType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParticipationCreateManyInfluencerInput = {
    id?: string
    campaignId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvents?: CampaignRewardEventUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvents?: CampaignRewardEventUncheckedUpdateManyWithoutCampaignNestedInput
    participations?: ParticipationUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    escrowAddress?: StringFieldUpdateOperationsInput | string
    budgetTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    yellowChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardEventUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectors?: SelectorUpdateManyWithoutRewardEventNestedInput
    campaigns?: CampaignRewardEventUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectors?: SelectorUncheckedUpdateManyWithoutRewardEventNestedInput
    campaigns?: CampaignRewardEventUncheckedUpdateManyWithoutRewardEventNestedInput
  }

  export type RewardEventUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateManyWithoutInfluencerInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignRewardEventCreateManyCampaignInput = {
    id?: string
    rewardEventId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParticipationCreateManyCampaignInput = {
    id?: string
    influencerId: string
    currentBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignRewardEventUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardEvent?: RewardEventUpdateOneRequiredWithoutCampaignsNestedInput
    trackedEvents?: TrackedEventUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackedEvents?: TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardEventId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    influencer?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    links?: TrackingLinkUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: TrackingLinkUncheckedUpdateManyWithoutParticipationNestedInput
    events?: AnalyticsEventUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ParticipationUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    influencerId?: StringFieldUpdateOperationsInput | string
    currentBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorCreateManyRewardEventInput = {
    id?: string
    selector: string
    eventType: $Enums.SelectorEventType
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignRewardEventCreateManyRewardEventInput = {
    id?: string
    campaignId: string
    amount: Decimal | DecimalJsLike | number | string
    volumeStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SelectorUpdateWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorUncheckedUpdateWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SelectorUncheckedUpdateManyWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    selector?: StringFieldUpdateOperationsInput | string
    eventType?: EnumSelectorEventTypeFieldUpdateOperationsInput | $Enums.SelectorEventType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignRewardEventUpdateWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutRewardEventsNestedInput
    trackedEvents?: TrackedEventUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackedEvents?: TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventNestedInput
  }

  export type CampaignRewardEventUncheckedUpdateManyWithoutRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventCreateManyCampaignRewardEventInput = {
    id?: string
    clientId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventUpdateWithoutCampaignRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTrackedEventsNestedInput
  }

  export type TrackedEventUncheckedUpdateWithoutCampaignRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventUncheckedUpdateManyWithoutCampaignRewardEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventCreateManyClientInput = {
    id?: string
    campaignRewardEventId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackedEventUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignRewardEvent?: CampaignRewardEventUpdateOneRequiredWithoutTrackedEventsNestedInput
  }

  export type TrackedEventUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignRewardEventId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackedEventUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignRewardEventId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    updatedAt?: Date | string
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    externalTxId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    payoutGenerated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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