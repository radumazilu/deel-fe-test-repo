### 1. What is the difference between Component and PureComponent? give an example where it might break my app.
React.PureComponent compares the current state and props with the new ones and decides if the component should re-render, eliminating the need for `shouldComponentUpdate`. React.Component re-renders itself for every time a parent component re-renders or if the `shouldComponentUpdate` function is called.


### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
We don't have that much experience working with the context api (besides a theme provider), but it may be dangerous because the shouldComponentUpdate function could block parts of the rendering and thus stop the context change or update to be propagated to the choldren components.


### 3. Describe 3 ways to pass information from a component to its PARENT.
- by using a callback function
- by using an external state management solution, like Redux
- by using a reference to the parent component (in the child component)

### 4. Give 2 ways to prevent components from re-rendering.
- using a PureComponent to avoid re-rendering when parent re-renders
- using shouldComponentUpdate in a Component to only re-render when we want to (according to changes in the state for example)


### 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragments allow us to group multiple components and return them in a parent component without adding unnecessary divs or extra nodes to the dom. Fragments can break the styling of an app when we use cascading styles that expect to see a div as a wrapper.


### 6. Give 3 examples of the HOC pattern.
We can use higher order components for more complex logic in an application. In particular, when we need an abstraction to write some logic in the structure of the component that is shared by multiple components. For example, if we build multiple components that fetch data from an api, we can build a HOC that takes a path of an api, does the api call and passes some information to the component on which it is called. A few examples could be:

- when we want to build features for authenticated / unauthenticated users. I.e. you have different action buttons on a form, but only want the user to be able to submit the form if they are logged in. The buttons could be surrounded by a HOC that checks authentication status and displays an authentication modal if the user is not logged in.
- when we fetch data from an api in a similar pattern in multiple components (i.e. in componentDidMount you set a listener and in componentWillUnmount you remove that listener for example)
- showing a loader while a component waits for data
- providing components with specific styling


### 7. What's the difference in handling exceptions in promises, callbacks and async...await.
- in promises, we can use the catch(err => {}) function to display / do something when an error occurs, or we can pass an error to the reject Promise function
- in callbacks, errors are usually passed as an argument of the callback function, or we can use the try catch pattern
- in async functions, we can use the .catch(err) pattern at the end of the function call (i.e. `await doSomething(args).catch(err => console.log(err))`)


### 8. How many arguments does setState take and why is it async.
The setState method has two arguments, the new state object (or a state changer) and an optional callback function. setState is async because it changes this.state, making it an expensive operation in terms of rerenderering. It sometimes batches multiple actions to gain performance, and making it synchronous could make the browser unresponsive.


### 9. List the steps needed to migrate a Class to Function Component.
- change the class into a function (i.e. class MyComponent extends to function MyComponent(props))
- remove the render method and use return to return jsx
- replace logic where using this. in a component
- use useState and the associated function for each state variable instead of this.setState
- convert component methods (and binded ones) to functions
- use useState to establish the initial value of the state attributes and remove the constructor
- use useEffect for data fetching and component updates according to state changes
- replace lifecycle methods with hooks, mostly useEffect logic


### 10. List a few ways styles can be used with components.
- by passing a className and using css directly
- by using jsx inline styling (i.e. `{{ alignItem: 'center' }})`
- by using a third party library or framework, like `styled-components`


### 11. How to render an HTML string coming from the server.
- by using a third party library or directly by attaching `dangerouslySetInnerHTML={{ yourHtml }}` to a div