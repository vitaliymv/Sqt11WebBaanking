const ownerKey = "rtxcyvujbkuhl8ugtdyh";
const url = "https://thread-apricot-index.glitch.me/cards/";

document.querySelector("#new").addEventListener("click", () => {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"ownerKey": ownerKey})
    }).then(async function (response) {
        console.log(await response.json());
    })
})

fetch(url + ownerKey).then(async function (response) {
    console.log(await response.json());
})