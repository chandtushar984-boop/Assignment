const form = document.querySelector('#form');
const eventCards = document.querySelector('.cards');
const clearBtn = document.querySelector('#clearBtn');
const sampleBtn = document.querySelector('#sampleBtn');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.querySelector('#eventTitle').value;
    const date = document.querySelector('#eventDate').value;
    const cat = document.querySelector('#category').value;
    const desc = document.querySelector('#description').value;

    addCard(title, date, cat, desc);

    form.reset();
});

function addCard(title, date, cat, desc) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h3>${title}</h3>
        <p>📅 ${date}</p>
        <span class="category-badge">${cat}</span>
        <p>${desc}</p>
        <div class="deleteCard">✖</div>
    `;

    card.querySelector('.deleteCard').addEventListener('click', () => {
        card.remove();
    });

    eventCards.appendChild(card);
}

clearBtn.addEventListener('click', () => {
    eventCards.innerHTML = "";
});

sampleBtn.addEventListener('click', () => {
    addCard("Tech Conference", "2026-03-20", "Conference", "A big tech meetup event.");
    addCard("Web Dev Workshop", "2026-04-05", "Workshop", "Hands-on coding workshop.");
});

document.addEventListener('keydown', (e) => {
    document.querySelector('.key').innerText = e.key;
});
