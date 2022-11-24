import type { ComponentType, Component } from "react";

type ComponentInferType<T> = T extends infer C ? C : T;

type GetComponentProps<T, W = never> = T extends
    | ComponentType<infer P>
    | Component<infer P>
    ? P
    : W;

export type ExtractOverrideReturn<
    T extends ExtractOverrideProps<D>,
    D extends { [key: string]: ComponentType<Record<string, unknown>> }
> = {
    [K in keyof D]: {
        "component": ComponentInferType<D[K]>;
        "props": GetComponentProps<
            T[K],
            Record<string, unknown>
        > extends Record<string, unknown>
            ? GetComponentProps<T[K], Record<string, unknown>>
            : never;
    };
};

export type ExtractOverrideProps<
    D extends { [key: string]: ComponentType<Record<string, unknown>> }
> = {
    [K in keyof D]+?: {
        "component"?: ComponentType<Record<string, unknown>>;
        "props"?: ExtractOverrideProps<D>[K] extends {
            "component": ComponentType<Record<string, unknown>>;
        }
            ? GetComponentProps<ExtractOverrideProps<D>[K]["component"]>
            : GetComponentProps<D[K]>;
    };
};

export interface IOverrideInstance<
    T extends ExtractOverrideProps<D>,
    D extends { [key: string]: ComponentType<Record<string, unknown>> },
    K extends keyof T
> {
    component?: K extends keyof D ? ComponentInferType<T[K]> : never;
    props?: K extends keyof D
        ? GetComponentProps<T[K]> extends undefined
            ? GetComponentProps<D[K]>
            : GetComponentProps<T[K]>
        : never;
}

export type Override<
    T extends ExtractOverrideProps<D>,
    D extends { [key: string]: ComponentType<Record<string, unknown>> }
> = {
    [K in keyof T]+?: K extends keyof D
        ? D[K] extends undefined
            ? never
            : IOverrideInstance<T, D, K>
        : never;
};
