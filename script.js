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
                <td><input type="password" value="${card.cvv}" readonly></td>
                <td>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
        `
    }
}

function deleteCard(number) {
    fetch(url + number, {
        method: "DELETE"
    }).then(async function (response) {
        getData();
    })
}