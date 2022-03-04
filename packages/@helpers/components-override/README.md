# components-override

> Reusable react components with the overrides pattern

The template for use in react components was implemented from an article by [David Schnurr](https://dschnurr.medium.com/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646). For good experience, use it with typescript.

## Installation
- **npm**

```
npm install @amollo-kit/components-override
```

- **yarn**

```
yarn add @amollo-kit/components-override
```

## Criteria requirement

- Typescript can recognize types by default.
- If a component is passed, then the parameter typing should be for the parameters of this component.
- Don't skip more components not requiring the component to be overridden
- The overridden component must be [generic](https://medium.com/edonec/creating-a-generic-component-with-react-typescript-2c17f8c4386e)

## Usage
Reusable component:
```tsx
import type { Override } from "@amollo-kit/components-override";
import { getComponentsWithOverride } from "@amollo-kit/components-override";
import * as defaultComponents from "./components";

type DefaultComponentsType = typeof defaultComponents;

export interface BoxInputProps<T> {
    overrides: Override<T, DefaultComponentsType>;
}

/**
 * @description must be a generic component
 */
const BoxInput = <T extends object>({
    overrides,
}: BoxInputProps<T>) => {
    ....

    const {
        Root: { component: Root, props: rootProps },
        Input: { component: Input, props: inputProps },
    } = getComponentsWithOverride<DefaultComponentsType, T>(defaultComponents, overrides);

    return (
        <Root {...sharedProps} {...rootProps}>
            <Input
                type="text"
                value={query}
                onChange={onInputChange}
                {...sharedProps}
                {...inputProps}
            />
        </Root>
    );
};

export default BoxInput;
```

Component call:
```tsx
    <BoxInput
        overrides={{
            Root: {
                props: { "aria-label": "Select an option" },
            },
            Input: {
                component: TextField,
                props: {
                    type: "text",
                    draggable: true,
                },
            }
        }}
    />
```
