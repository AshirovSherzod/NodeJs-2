const API_URL = "http://localhost:8000"
const wrapper = document.querySelector(".wrapper")
const form = document.querySelector(".form")
const fname = document.querySelector(".name")
const username = document.querySelector(".username")
const password = document.querySelector(".password")
const url = document.querySelector(".url")

async function fetchData(api) {
    let response = await fetch(`${api}/users`)
    response
        .json()
        .then(res => mapCards(res))
        .catch(res => console.log(res))
}

fetchData(API_URL)

async function postData(api, body) {
    let response = await fetch(`${api}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body
    })
    response
        .json()
        .then(res => console.log(res))
        .catch(res => console.log(res))
    fetchData(API_URL)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newUser = {
        fname: fname.value,
        username: username.value,
        password: password.value,
        url: url.value
    }
    postData(API_URL, JSON.stringify(newUser))
})

function mapCards(data) {
    let newData = ""
    data.payload.forEach(e => {
        newData += `
            <div data-id=${e.id} class="user__card">
                <div class="user__img">
                    <img width={300} src="${e.url}" alt="">
                </div>
                <div class="user__desc">
                    <h1 class="line__clamp">${e.fname}</h1>
                    <p>${e.password}</p>
                    <button class="delete">Delete</button>              
                </div>
            </div>
        `
        wrapper.innerHTML = newData
    });
}

wrapper.addEventListener("click", e => {
    if (e.target.className === "delete") {
        let id = e.target.closest(".user__card").dataset.id
        fetch(`${API_URL}/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                fetchData(API_URL)
            })
    }
})