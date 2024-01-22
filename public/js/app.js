//.then() method of a promise instances takes up 2 arguments. callback functions and rejected cases of the promise

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "From Java";

//deafult is that it will refresh the page, but we dont want that
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //we only fetch when the form is submitted
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
//.json function within fetch
//then parsing the response to a json object
// promise defined by an action and  a callback, you proimise that your operation will finish sometime in the future but you dont know when
// new Promise((resolve,reject)=>{resolve();}) blah blah
// we control promises with two functions, .then (resolved callback) and .catch(reject callback)
