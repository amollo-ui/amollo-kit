import type { ComponentType, Component } from "react";

type ComponentInferType<T> = T extends infer C ? C : T;

type GetComponentProps<T, W = never> = T extends
    | ComponentType<infer P>
    | Component<infer P>
    ? P
    : W;

export type ExtractOverrideReturn<
    T extends ExtractOverrideProps<D>,
    D extends { [key: string]: ComponentType<unknown> }
> = {
    [K in keyof D]: {
        "component": ComponentInferType<D[K]>;
        "props": GetComponentProps<T[K], unknown>;
    };
};

export type ExtractOverrideProps<
    D extends { [key: string]: ComponentType<unknown> }
> = {
    [K in keyof D]+?: {
        "component"?: ComponentType<unknown>;
        "props"?: ExtractOverrideProps<D>[K] extends {
            "component": ComponentType<unknown>;
        }
            ? GetComponentProps<ExtractOverrideProps<D>[K]["component"]>
            : GetComponentProps<D[K]>;
    };
};

export interface IOverrideInstance<
    T extends ExtractOverrideProps<D>,
    D extends { [key: string]: ComponentType<any> }, // eslint-disable-line @typescript-eslint/no-explicit-any
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
    D extends { [key: string]: ComponentType<any> } // eslint-disable-line @typescript-eslint/no-explicit-any
> = {
    [K in keyof T]+?: K extends keyof D
        ? D[K] extends undefined
            ? never
            : IOverrideInstance<T, D, K>
        : never;
};
