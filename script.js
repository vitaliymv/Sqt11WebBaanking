const ownerKey = "rtxcyvujbkuhl8ugtdyh";
const url = "https://thread-apricot-index.glitch.me/cards/";

document.querySelector("#new").addEventListener("click", () => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "ownerKey": ownerKey })
    }).then(async function (response) {
        getData();
    })
})

function getData() {
    fetch(url + ownerKey).then(async function (response) {
        render(await response.json())
    })
}
getData();
function render(cards) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = null;

    for (const card of cards) {
        let formattedNumber = card.cardNumber.match(/.{1,4}/g).join(" ");
        tbody.innerHTML += `
            <tr>
                <td>${card.id}</td>
                <td>${formattedNumber}</td>
                <td>${card.expireDate}</td>
                <td>${card.balance}₴</td>
                <td class="position-relative">
                    <input type="password" value="${card.cvv}" readonly id="input-${card.cvv}">
                    <i class="fa-solid fa-eye fa-lg position-absolute top-50 ms-3" id="${card.cvv}" style="cursor: pointer;"></i>
                </td>
                <td>
                    <button onclick="setNumber('${card.cardNumber}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" 
                    onclick="deleteCard('${card.cardNumber}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            <tr>
        `;
    }
    let eye = document.querySelectorAll(".fa-eye");
    Array.from(eye).forEach(item => item.addEventListener("mouseenter", show));
    Array.from(eye).forEach(item => item.addEventListener("mouseleave", hide));
}

function show() {
    let idInput = "input-" + this.id;
    document.querySelector(`#${idInput}`).type = "text";
}

function hide() {
    let idInput = "input-" + this.id;
    document.querySelector(`#${idInput}`).type = "password";
}

let hiddenNumber = document.querySelector("#card-number");
function setNumber(number) {
    hiddenNumber.value = number;
}

let form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let number = hiddenNumber.value;
    let amount = event.target["amount"].value;
    let choice = Array.from(event.target["type"]).find(radio => radio.checked);
    if (amount < 0) amount = Math.abs(amount);
    if (choice.id == "withdraw") amount *= -1;

    fetch(url + number + "/balance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "amount": amount })
    }).then(async  function (response) {
        getData();
    })
})

function deleteCard(number) {
    fetch(url + number, {
        method: "DELETE"
    }).then(async function (response) {
        let data = await response.json();
        if (response.status == 403) return alert(data.error);
        alert(data.message)
        getData();
    })
}