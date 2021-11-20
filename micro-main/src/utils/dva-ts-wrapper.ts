/* eslint-disable guard-for-in */
import { SubscriptionsMapObject, EffectType } from 'dva';

/**
 * dva 内置 d.ts 对 Model 的定义写得太简陋，基本属于残废。
 * 这里手动定义一份，补充了很多类型信息，但是省略一些不常用的 dva 用法.
 */

export interface Action<Payload = any> {
  [key: string]: any;
  type: string;
  payload: Payload;
}

export type Reducer<S, Payload> = (state: S, action: Action<Payload>) => S

/**
 * 因为 IterableIterator 的 yield 关键字返回值为 any，而且我们一段时间内不计划对 effect 进行测试。
 * 所以对于各种操作符，将返回值定义为 unknown 而不是真实类型。
 */
export interface EffectsCommandMap<State> {
  put: (action: Action) => unknown;
  call: <A extends any[]>(func: (...args: A) => any, ...args: A) => unknown;
  select: <T>(selector: (state: State) => T) => unknown;
  take: (actionType: string | string[]) => unknown;
  cancel: (actionType: string | string[]) => unknown;
  [key: string]: any;
}

export type Effect<GState, Payload> = (action: Action<Payload>, effects: EffectsCommandMap<GState>) => void

export type EffectWithType<GState, Payload> = [Effect<GState, Payload>, { type: EffectType }]

export type Reducers<State, PS> = {
  [K in keyof PS]: Reducer<State, PS[K]>
}

export type Effects<GState, PS> = {
  [K in keyof PS]: Effect<GState, PS[K]> | EffectWithType<GState, PS[K]>
}

/**
 * @template State 当前 model 的类型
 * @template GState 根 model 的类型
 * @template RP reducers payloads 的类型
 * @template RP effects payloads 的类型
 */
export interface Model<State, GState, RP, EP> {
  namespace: string;
  state: State;
  reducers: Reducers<State, RP>;
  effects: Effects<GState, EP>;
  subscriptions?: SubscriptionsMapObject;
}

type Nullable<P> = P extends void ? void | null : P

function mapReducersOrEffectsToCreaters<T>(
  namespace: string,
  object: Reducers<any, T> | Effects<any, T>,
) {
  const actionCreaters = {} as {
    [K in keyof T]: (
      payload: Nullable<T[K]>,
      noNS?: boolean,
      extData?: Record<string, any>,
    ) => Action<Nullable<T[K]>>
  };

  for (const key in object) { // tslint:disable forin
    actionCreaters[key] = (
      payload,
      noNS = false,
      extData = {},
    ) => {
      return {
        type: namespace && !noNS ? `${namespace}/${key}` : key,
        payload,
        ...extData,
      };
    };
  }

  return actionCreaters;
}

/**
 * 始终使用 createActionCreaters 创建 action，才能保证 store 定义和业务调用的类型一致。
 */
export function createActionCreaters<RP, EP>(model: Model<any, any, RP, EP>) {
  return {
    reducers: mapReducersOrEffectsToCreaters(model.namespace, model.reducers),
    effects: mapReducersOrEffectsToCreaters(model.namespace, model.effects),
  };
}
