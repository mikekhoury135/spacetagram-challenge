// Global Declaration for dateFormat
var dateFormat = "2022-01-01";

// Datepicker jQuery UI function and dateFormat conversion
$( function() {

    $( "#datepicker" ).datepicker({ minDate: -365, maxDate: 0});

    // Triggered on input field change
    $("#datepicker").on("change", function(){

        // Splitting the date as formatted by the datepicker
        var dateInput = $( "#datepicker" ).val().split('/');

        // Reordering the output of the datepicker
        dateFormat = [dateInput[2], dateInput[0], dateInput[1]];

        // Joining them in new format for APOD's query parameter
        dateFormat = dateFormat.join("-");

        api(dateFormat);
        return dateFormat;
    });
});

// API data fetch function
function api(dateFormat) {
    
    // displaying loading state at the beginning of function
    document.getElementById("loading-state-wrapper").style.visibility = "visible";

    // main element declaration
    const mainEl = document.querySelector('main');

    //api url with with query parameter for api-key and start date
    var url = 'https://api.nasa.gov/planetary/apod?api_key=mDDTHtQpHkPKUJL8FtI4cOsiGm3Hr4paNKBbR59A&start_date=' + dateFormat;
    
    //api fetch and json parse
    fetch (url, {
        method: 'GET',
    })
    .then(response => {
        response.json().then(function(data) {

            // for loop to populate the cards with api data
            for (let i = 0; i < 366; i++) {
                
                // parent div for the card
                let div = document.createElement("div");

                // card image or video
                let img = document.createElement("img");
                let iframe = document.createElement("iframe");
                
                //conditional to determine if iframe or img tag is used
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
                    iframe.setAttribute('SameSite', 'Strict');
                } else {
                    return null;
                }
                
                // div for info under image
                let template = document.createElement('div');
                
                // title for card
                let title = document.createElement("h5");
                title.innerHTML = data[i].title;
                title.setAttribute("class", "card-title");
                
                // Like button
                let likeButton = document.createElement("div")
                likeButton.setAttribute("class", "heart-like-button")
                div.appendChild(likeButton)

                // Event listener to toggle like button
                likeButton.addEventListener("click", () => {
                if (likeButton.classList.contains("liked")) {
                    likeButton.classList.remove("liked");
                } else {
                    likeButton.classList.add("liked");
                }
                });
                
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

                // adding card data and classes to parent div
                div.appendChild(template);
                div.setAttribute("class", "card col-8 offset-2 mt-3");
                
                //adding parent div to mainEl in index file
                mainEl.appendChild(div);
            };
            
        });

        // removing loading state at the end of the function
        document.getElementById("loading-state-wrapper").style.display = "none";
    });
};