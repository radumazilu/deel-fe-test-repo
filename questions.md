### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

React.PureComponent compares the current state and props with the new ones and decides if the component should re-render, eliminating the need for `shouldComponentUpdate`. React.Component re-renders itself for every time a parent component re-renders or if the `shouldComponentUpdate` function is called.


