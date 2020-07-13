const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const firstMessage = document.querySelector("#message-1");
const secondMessage = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const location = search.value;

    search.value = "";
    firstMessage.textContent = "Loading...";
    secondMessage.textContent = "";

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstMessage.textContent = data.error;
            } else {
                firstMessage.textContent = data.location;
                secondMessage.textContent = data.forecast;
            }
        });
    });
});
