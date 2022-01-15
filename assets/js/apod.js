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
            
            // card image or video
            let img = document.createElement("img");
            let iframe = document.createElement("iframe");
            
            //conditionl to determine if iframe or img tag is used
            if (data[i].media_type === 'image') {
                img.setAttribute('src', data[i].hdurl);
                img.setAttribute("class", "card-img-top img-fluid");
                div.appendChild(img);
            } else if (data[i].media_type === 'video') {
                div.appendChild(iframe);
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '300px');
                iframe.setAttribute('src', data[i].url);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('SameSite', 'None');
            } else {
                return null;
            }


            // div for info under image
            let template = document.createElement('div');
            
            // title for card
            let title = document.createElement("h5");
            title.innerHTML = data[i].title;
            title.setAttribute("class", "card-title");
            
            // date for card
            let date = document.createElement("h6");
            date.innerHTML=data[i].date;
            
            // dropdown for summary text
            let details = document.createElement("details");
            
            // summary for the image
            let description= document.createElement("p");
            description.innerHTML = data[i].explanation;
            description.setAttribute("class", "card-text");
            details.appendChild(description);
            
            //appending card content to their respective containers            
            template.appendChild(title);
            template.appendChild(date);
            template.appendChild(details);
            template.setAttribute("class", "card-body");

            div.appendChild(template);
            div.setAttribute("class", "card col-8 offset-2 mt-3");
            
            mainEl.appendChild(div);

            console.log(data[i]);
        };
    });
});
