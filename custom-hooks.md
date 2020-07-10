# Hooks

Classes are out. Everything is a function now.

- [Hooks](#hooks)
  - [Default Hooks](#default-hooks)
    - [`useState` Persist value between renders, trigger re-render.](#usestate-persist-value-between-renders-trigger-re-render)
    - [`useReducer` is useState in reducer pattern for complex state](#usereducer-is-usestate-in-reducer-pattern-for-complex-state)
    - [`useEffect` Side effects that run after render. Adding event listeners, changing things in the document, fetching data](#useeffect-side-effects-that-run-after-render-adding-event-listeners-changing-things-in-the-document-fetching-data)
    - [`useRef` Persist value between renders, no re-render](#useref-persist-value-between-renders-no-re-render)
    - [`useLayoutEffect` Side effects that run synchronously](#uselayouteffect-side-effects-that-run-synchronously)
    - [`useContext`](#usecontext)
    - [`useCallback` Persist ref equality between renders. `useMemo` Memoize value between renders](#usecallback-persist-ref-equality-between-renders-usememo-memoize-value-between-renders)
  - [Custom Hooks](#custom-hooks)
    - [`useClickOutSide` that uses `useRef`, `useEffect`, `useCallback`](#useclickoutside-that-uses-useref-useeffect-usecallback)
    - [`useFetch`](#usefetch)
    - [`useReducer` with `useContext`](#usereducer-with-usecontext)

## Default Hooks

### `useState` Persist value between renders, trigger re-render.

```jsx
// class without useState
export class Cart extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <>
        <p>Cart {count}</p>
        <button onClick={() => this.setState((count) => count + 1)}>Add to Cart</button>
      </>
    );
  }
}
```

```jsx
// function with useState hook
export function Cart() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>Cart {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Add to Cart</button>
    </>
  );
}
```

- setState(): state Updates are Merged
- useState(): updating a state variable always replaces it instead of merging it.

### `useReducer` is useState in reducer pattern for complex state

```jsx
// useReducer demo
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

### `useEffect` Side effects that run after render. Adding event listeners, changing things in the document, fetching data

componentDidMount, componentDidUpdate, componentWillUnmount: The useEffect Hook can express all combinations of these

```jsx
// without useEffect. manual detection
componentDidUpdate(prevProps){
  if(prevProps.itemId != this.props.itemId){
    this.addToCart(thi.props.itemId)
  }
}
```

```jsx
// with useEffect, No need of manual detection
React.useEffect(() => {
  addToCart(itemId);
}, [itemId]);
```

### `useRef` Persist value between renders, no re-render

- DOM refs Managing focus on dom nodes

```jsx
const textInput = useRef();

focusTextInput = () => textInput.current.focus();

return (
  <>
    <input type="text" ref={textInput} />
    <button onClick={focusTextInput}>Focus the text input</button>
  </>
);
```

- “ref” object is a generic container whose current property is mutable and can hold any value. With `useState` variables updates will cause re-render. With `useRef` mutating the `.current` property won't cause a re-render

```jsx
const Timer = () => {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      console.log("A second has passed");
    }, 1000);

    // We need the interval id to be accessible from the whole component.
    // If we stored the id in a state variable, the component would be re-rendered
    // after the state update so a new interval will be created (this effect is triggered
    // after every re-render) leading us to the infinite loop hell.
    intervalRef.current = id;

    return () => clearInterval(intervalRef.current);
  });

  const handleCancel = () => clearInterval(intervalRef.current);

  return <>//...</>;
};
```

### `useLayoutEffect` Side effects that run synchronously

- render -> The screen is visually updated -> then `useEffect` runs
- render -> `useLayoutEffect` runs, and React waits for it to finish. -> The screen is visually updated
- When to use? Almost Never.

```jsx
const useViewportSpy = (elementRef) => {
  const [isVisible, setIsVisible] = useState();

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((item) => {
        const nextValue = item.isIntersecting;
        setIsVisible(nextValue);
      })
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect(elementRef.current);
    };
  }, [elementRef]);

  return isVisible;
};
```

### `useContext`

```jsx
//ToastContext.ts
const ThemeContext = React.createContext("orange");

//CommonRoot.tsx
const CommomRoot = () => (
  <ThemeContext.Provider value="blue">
    <>
  </ToastContext.Provider>
)

//RandomChild.tsx
const color = React.useContext(ThemeContext);
```

- Problem? There is a component that consumes context and other that updates it.
- Whenever the context value changes all get updated. This can be solved using multi context. One provides methods to update the context and other provides state of context

### `useCallback` Persist ref equality between renders. `useMemo` Memoize value between renders

```jsx
function Foo({onClick, data}) {
  React.useEffect(() => {
    const options = {onClick, data}
    buzz(options)
  }, [onClick, data])

  return <div>foobar</div>
}

function Blub() {
  const clickAction = React.useCallback(() => {}, [])
  const data = React.useMemo(() => [1, 2, 3], [])
  return <Foo onClick={clickAction} data={data} />
```

## Custom Hooks

A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks

**function vs hook**:

- You cannot call a hook outside the render phase of React (so it must be called within a function component or within another hook).
- A function you can call whenever and it makes no difference.

**What hooks can do**:

- Extract functionality
- Reduce duplicate code
- Use your imagination!!

**Custom Hooks patterns**:

- Protable UI components: useToast, useAlert, useBottomSheet, useForm
- Business Logic: useAddToCart, useFetch
- Shareable global state: useTheme, useLoggedInUser, useClickOutside, useLoading

### `useClickOutSide` that uses `useRef`, `useEffect`, `useCallback`

- Implement with `useRef` and `useEffect`

```jsx
export const useClickOutSide = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current) {
        if (!ref.current.contains(e.target)) {
          onClickOutside(e);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClickOutside, ref]);
};
```

- Problem? `onClickOutside` function ref is changing with every render, causing `useClick -> useEffect` execute unnecessarily

```jsx
export const Demo = () => {
  const clickRegionRef = useRef();
  const onClickOutside = () => {
    // console.log('clicked outside')
  };
  useOutsideClick(clickRegionRef, onClickInside);

  return (
    <div className="outer-area">
      <p>OUTSIDE</p>
      <p ref={clickRegionRef} className="click-area">
        INSIDE
      </p>
      <p>OUTSIDE</p>
    </div>
  );
};
```

- `useCallback` to the rescue

```jsx
// Demo
const onClickOutside = React.useCallback(() => {
  // console.log('clicked outside')
}, []);
```

- Bad! the consumer of a hook has to do this to get things working properly. bring the API towards the hook than the consumer

```jsx
// useClickOutSideDemo
export const useClickOutSide = (ref, onClickOutside) => {
  const clickRef = React.useRef();
  clickRef.current = onClickOutside;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref?.current?.contains(e.target) && clickRef.current) {
          clickRef.current(e);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [clickRef, ref]);
};
```

### `useFetch`

```jsx
export const useFetch = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { loading, error, response };
};
```

### `useReducer` with `useContext`

<https://kentcdodds.com/blog/how-to-use-react-context-effectively>

<!--
### Custom Hooks vs HOC vs RenderProps

- HOF: functions that take functions as arguments or return them
- HOC: Components that take Components as arguments or return them
- RenderProp: A Render Prop is a function prop that a component uses to know what to render
- More on [HOC](https://gist.github.com/heygrady/f9bf3b6dd93fe3d87ba87430fd3c20d5#:~:text=The%20React%20community%20is%20moving,and%20flexible%20than%20an%20HOC) vs [RenderProp](https://blog.bitsrc.io/understanding-react-render-props-and-hoc-b37a9576e196) vs [Hooks](https://www.richardkotze.com/coding/hoc-vs-render-props-react)

- HOC, Render Props usage can be extracted to custom hooks

- HOC, RenderProps are moving logic around with components, custom hooks are way more shareabe/portable -->
