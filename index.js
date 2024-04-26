let cardSection = document.body.querySelector(".cardSection")
let detailView = document.body.querySelector(".detailView")
let viewStatus = false


document.addEventListener("DOMContentLoaded", () => {
    fetch('./webservice/index.php')
        .then(res => res.json())
        .then(data => makeCards(data))

    let favoritedCardIds = JSON.parse(localStorage.getItem('favoriteCardIds')) || [];
    favoritedCardIds.forEach(favoritedId => {
        let cardElement = document.getElementById(`${favoritedId}`);
        if (cardElement) {
            cardElement.classList.add('favorite');
        }
    })
})


function makeCards(data){
    data.forEach(player => {
        console.log(player)

        let id = player.id
        let card = document.createElement('article')
        let name = document.createElement('h2')
        let team = document.createElement('p')
        let descriptionArticle = document.createElement('article')
        let description = document.createElement('p')
        let tags = document.createElement('ul')
        let detailBtn = document.createElement('button')
        let favoriteBtn = document.createElement('button')

        name.innerText = player.name
        team.innerText = player.team
        detailBtn.innerText = 'Show Details'
        favoriteBtn.innerText = 'Favorites'
        description.innerText= player.description

        card.setAttribute('id', `${id}`)
        card.appendChild(name)
        card.appendChild(team)
        card.appendChild(detailBtn)
        card.appendChild(favoriteBtn)

        descriptionArticle.appendChild(name.cloneNode(true))
        descriptionArticle.appendChild(description)

        detailBtn.classList.add('detailBtn')
        favoriteBtn.classList.add('favoriteBtn')
        card.classList.add('card')

        cardSection.appendChild(card)

        if (localStorage.getItem(`${id}`)) {
            card.classList.add('favorite');
        }

        detailBtn.addEventListener('click', () => {
            if (viewStatus === false) {
                detailView.appendChild(descriptionArticle)
                viewStatus = true

            } else if( viewStatus === true){
                detailView.innerHTML = "";
                viewStatus = false
            }
        })

        favoriteBtn.addEventListener('click', () => {
            if (localStorage.getItem(`${id}`)) {

                localStorage.removeItem(`${id}`);
                card.classList.remove('favorite');
            } else {
                localStorage.setItem(`${id}`, 'true');
                card.classList.add('favorite');

            }
        })

    })
}
