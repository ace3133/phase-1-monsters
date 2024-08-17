const monsterContainer = document.getElementById("monster-container");
const form = document.getElementById("form");
const nameText = document.getElementById("name");
const ageText = document.getElementById("age");
const description = document.getElementById("Des");
const forward = document.getElementById("forward");
const back = document.getElementById("back")
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters(currentPage);
    setupFormListener();
    setupLoadMoreButton();
    setupbackButton()
});

function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(monster =>makeAMonster(monster));
            forward.disabled = data.length < 50; 
        })
}

function makeAMonster(monster) {
    const monsterDiv = document.createElement("div");
    monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
}

function setupLoadMoreButton() {
    forward.addEventListener("click", () => {
        currentPage++
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
        .then(res=>res.json())
        .then(data => {
            Object.values(data).forEach(monster=> makeAMonster(monster))
        })
    });
}
function setupbackButton(){
    back.addEventListener("click",()=>{
        currentPage--;
    monsterContainer.innerHTML="";
    })
}

function setupFormListener() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: nameText.value,
                age: ageText.value,
                description: description.value
            })
        })
        .then(res => res.json())
        .then(monster => {
            makeAMonster(monster);
            form.reset();
        })
    });
}
