//api-key
var url = 'https://api.nasa.gov/planetary/apod?api_key=mDDTHtQpHkPKUJL8FtI4cOsiGm3Hr4paNKBbR59A&start_date=2022-01-05';

// main element declaration
const mainEl = document.querySelector('main');

//api fetch and json parse
fetch (url, {
    method: 'GET',

})
.then(response => {
    response.json().then(function(data) {

        for (let i = 10; i > 0; i--) {
            
            // parent div
            let div = document.createElement("div");

            // card image
            let img = document.createElement("img");
            img.setAttribute('src', data[i].hdurl);

            // div for info under image
            let template = document.createElement('div');
            
            // title for card
            let title = document.createElement("h5");
            title.innerHTML = data[i].title;
            
            // date for card
            let date = document.createElement("h6");
            
            // dropdown for summary text
            let details = document.createElement("details");

            // summary for the image
            let description= document.createElement("p");
            


            img.setAttribute("class", "card-img-top img-fluid");
            
            title.setAttribute("class", "card-title");
            
            date.innerHTML=data[i].date;
            
            description.innerHTML = data[i].explanation;
            description.setAttribute("class", "card-text");
            
            details.appendChild(description);
            
            template.appendChild(title);
            template.appendChild(date);
            template.appendChild(details);
            template.setAttribute("class", "card-body");

            
            div.appendChild(img);
            div.appendChild(template);
            div.setAttribute("class", "card col-6 offset-3 mt-5");
            
            mainEl.appendChild(div);

            console.log(data[i]);
           
        };
    });
});
