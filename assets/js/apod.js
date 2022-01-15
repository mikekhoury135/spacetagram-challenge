//api-key
var url = 'https://api.nasa.gov/planetary/apod?api_key=mDDTHtQpHkPKUJL8FtI4cOsiGm3Hr4paNKBbR59A&start_date=2022-01-05';

// card structure

// const card = {
//     document.createElement('div');
// };

const mainEl = document.querySelector('main');

//api fetch and json parse
fetch (url, {
    method: 'GET',

})
.then(response => {
    response.json().then(function(data) {
        
        for (let i = 0; i < 10; i++) {
            const template = document.createElement('template');
            template.innerHTML = `
            <div class="card col-6 offset-3 mt-5">
                <img class="card-img-top img-fluid" id="space-img" alt="NASA's Astronomy Picture of the Day">
                <div class="card-body">
                    <h5 class="card-title" id="space-title"></h5>
                    <h6 class="" id="space-date"></h6>
                    <details>
                        <summary>Description</summary>
                        <p class="card-text" id="space-description"></p>
                    </details>
                </div>
            </div>`

            class SpaceCard extends HTMLElement{
                constructor(){
                    super();
                    this.attachShadow({ mode: 'open'});
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                    this.shadowRoot.querySelector('#space-img').src = data[i].hdurl;   
                    this.shadowRoot.querySelector('#space-title').innerText = data[i].title;
                    this.shadowRoot.querySelector('#space-date').innerText = data[i].date;
                    this.shadowRoot.querySelector('#space-description').innerText = data[i].explanation;
                } 
            }
            window.customElements.get('space-card') || window.customElements.define('space-card', SpaceCard);

            // document.getElementById('space-img').setAttribute('src', data[i].hdurl)
            // document.getElementById('space-title').innerHTML = data[i].title;
            // document.getElementById('space-date').innerHTML = data[i].date;
            // document.getElementById('space-description').innerHTML = data[i].explanation;
        };
    });
});
