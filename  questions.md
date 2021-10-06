1.
PureComponents will only re-render if some value of state and/or props changed.
 
3.
a) Using hooks, you can pass setState as a props and update the parent's state in the child's component.
b) Making a function/method on the Parent component that updates its state, and pass this method as props to the child component.

4.
a) use react PureComponent 
b) use React.memo

5.
React fragment is a resource to wrap multiple html elements in jsx, without adding it to the DOM. 

8.
setState receives 2 arguments. It's async because it sends like a "request" to change the state values, and to ensure performance, it does not stop there until it's done. 

9.
- remove class statement, declare a function instead- remove constructor- if there is a state, import useState from react, destructure the return of useState in an array, where the first element is the state and the second is the function to update this state
- remove render method- transform all created methods into functions

10.
- inline style receives an object with the attributes (camelCase) and values
- import a .css file and select elements by className, id or tag name.
11. 
using dangerouslySetInnerHTML