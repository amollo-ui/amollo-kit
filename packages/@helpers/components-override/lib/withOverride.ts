import type { ComponentType } from "react";
import type {
    ExtractOverrideProps,
    ExtractOverrideReturn,
} from "./override.interface";

/**
 * @author David Schnurr @see {@link https://dschnurr.medium.com/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646}
 * @author arma73 <arma739805@gmail.com> promote type safety
 *
 * @description this is a helper function used to unload
 *  overrides and combine them into a set of components.
 *
 * @param defaultComponents - components that will be used by default if there was no override.
 * @param overrides - passing an object to override default components or props
 *
 * @example
 *  ```
 *      const defaultComponents = { Root: ReactElement, Input: ReactElement };
 *      const overrides = { Input: { props: { 'aria-label': 'Search product' }, }, };
 *
 *      getComponentsWithOverride(defaultComponents, overrides);
 *  ```
 *
 * @returns {ExtractOverrideReturn} object with keys "component" and "props"
 *  - **component** - if there are overrides of the component,
 *      then returns this component, if not, returns the default component.
 *  - **props** - returns the parameters that were predefined
 */
export const getComponentsWithOverride = <
    D extends { [key: string]: ComponentType<Record<string, unknown>> },
    T extends ExtractOverrideProps<D>
>(
    defaultComponents: D,
    overrides?: ExtractOverrideProps<D>
) =>
    Object.keys(defaultComponents).reduce((components, name: keyof D) => {
        const override = (overrides && overrides[name]) || {};
        const props = override?.props || {};

        return {
            ...components,
            [name]: {
                "component": override?.component || defaultComponents[name],
                "props": props,
            },
        };
    }, {} as ExtractOverrideReturn<T, D>);
