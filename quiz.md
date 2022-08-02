# Quiz
## Axios, Async and useEffect Hook
### Q1: Javascript is an asynchronous, non-blocking and multi-threaded programming language.

- A: True
- B: False

---
### Q2: How does Javascript use Promises to implement asynchronous functions?
*(there could be more than one answer)*

- A: `if...then...else`
- B: `async...await`
- C: `.then()`
- D: `do...while`

---
### Q3: Which one of the following is not a valid HTTP command. 
 
- A: POST
- B: SET
- C: GET
- D: PUT

---
### Q4 The NPM package for axios is:

- A: http-axios
- B: axios-http
- C: fetch-axios
- D: axios

---
### Q5: What do Axios functions (.get, .post, .put, .delete ) return?

- A: Variable
- B: Constant
- C: Promise
- D: Function

---
### Q6: What is the equivalent Axios command for `axios('/user')`?
- A: `axios.get('/user)`
- B: `axios.put('/user)`
- C: `axios.post('/user)`
- D: `axios.patch('/user)`

---
### Q7: What is the purpose of the `useEffect` hook in React?
- A: Declares a state effect variable in the component.
- B: Returns a side-effect object whose property is initialised to the passed argument.
- C: Updates complex side-effect state logic in a component
- D: Triggers side-effect functions after component rendering

---
### Q8: What is the behaviour `useEffect` in the following code:
```js
useEffect(() => {
  // Run some functions...
}, [])
```
- A: Runs after every rendering
- B: Runs once after initial rendering
- C: Runs once after initial rendering and after every rendering conditionally on state change
- D: Does not run at all

---
### Q9: What is the behaviour `useEffect` in the following code:
```js
const [flag, setFlag] = useState(false);
useEffect(() => {
  // Run some functions...
}, [flag])
```
- A: Runs after every rendering
- B: Runs once after initial rendering
- C: Runs once after initial rendering and after every rendering conditionally on state change
- D: Does not run at all

---
### Q8: What is the behaviour `useEffect` in the following code:
```js
useEffect(() => {
  // Run some functions...
})
```
- A: Runs after every rendering
- B: Runs once after initial rendering
- C: Runs once after initial rendering and after every rendering conditionally on state change
- D: Does not run at all
