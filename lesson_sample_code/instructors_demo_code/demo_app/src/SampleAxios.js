//To use axios for the file, the axios package is called in the require method.
const axios = require("axios");

//Axios can be called as is and other parameters can be provided.
//However, for this example, the API constant is created and the baseURL that axios needs to connect to is provided.
//This would reduce the text that is needed to be supplied later on.
const API = axios.create({baseURL:"https://jsonplaceholder.typicode.com"});


//HTTP methods are used to identify what kind of request is sent to the API.
//There are 4 commonly used verbs: GET, POST, PUT, DELETE
//The discussion for each verb is part of the self-study for this lesson.

//Promises can be written in two ways: the then().catch() and the async/await
//The then().catch() can be used to easily identify the parts of the response. It goes to the then() block if the promise is successfully fulfilled and it goes to the catch() block if the promise has not been successfully fulfilled.

//Axios can use the 4 http verbs as methods to identify what kind of request it needs. The route is also supplied for the API to know what kind of data to retrieve / manipulate.

//GET request for all posts
// API.get("/posts").then(function (response) {
//     // handle success
//     // console.log(response);
// }).catch(function (error) {
//     // handle error
//     console.log(error);
// })


//Async / await is an easier way to write promises
//The async keyword before a function means that it always returns a promise. 
//The keyword await makes JavaScript wait until that promise settles and returns its result.
//GET request for single post
const singlePost = async () => {
    const result = await API.get("/posts/9")
    console.log(result);
}
singlePost();

//IIFE can be used as well for promises. 
//To send data to the API, the data is passed as an object after the route.

//POST request
// (async () => {
//     const result = await API.post("/posts",
//         {
//             title: 'test post',
//             body: 'this is a test post',
//             userId: 999,
//         }
//     );
//     console.log(result.data);
// })();

//UPDATE request
const updatePost = async () => {
    const result = await API.put("/posts/9", 
        {
            title : "updated title for post 1",
            body : "update body for post 1",
            userId : 99
        }
    )
    console.log(result.data);
}
// updatePost();
singlePost();

//DELETE request 
const deletePost = async () => {
    const result = await API.delete("/posts/9");
    console.log("Entry has been deleted");
}
// deletePost();