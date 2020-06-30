# Tagged template literals

- Tagged Template Literals are a new feature in ES6. They let you define custom string interpolation rules, which is how we're able to create styled components.
- If you pass no interpolations, the first argument your function receives is an array with a string in it.

```javascript
// These are equivalent:
fn`some string here`;
fn(["some string here"]);
```

- Once you pass interpolations, the array contains the passed string, split at the positions of the interpolations. The rest of the arguments will be the interpolations, in order.

```javascript
const aVar = "good";

// These are equivalent:
fn`this is a ${aVar} day`;
fn(["this is a ", " day"], aVar);
```

- Since the string interpolation works we can pass functions too

```javascript
logArgs(`Test ${() => console.log("test")}`);
// -> Test () => console.log('test')
```

```javascript
// styled components work on the same pattern
const Button = styled.button`
  font-size: ${props => (props.primary ? "2em" : "1em")};
`;
```

- This means we now have access to the function and can actually execute it! example function that executes every function it gets passed as an argument:

```javascript
const execFuncArgs = (...args) =>
  args.forEach(arg => {
    if (typeof arg === "function") {
      arg();
    }
  });
```
