// Use strict
"use strict";

// Load yesterday's APOD by default
showTodayAPOD()
function showTodayAPOD() {
    document.querySelector('#input').valueAsDate = new Date(new Date() - 86400000);
    showAPOD();
}

// Listener
document.querySelector('#submit').addEventListener('click', showAPOD)
function showAPOD() {
    // Get input date
    let date = document.querySelector('#input').value
    if (new Date(date) > new Date()) {
        // Load today's APOD if input date is beyond today
        showTodayAPOD()
    } else {
        // Fetch APOD for input date
        let url = `https://api.nasa.gov/planetary/apod?api_key=a6ALMYiMj6NcDGomcUrOhcUuliq2XZf0YVbAvBHe&date=${date}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.media_type === 'video') {
                    // Remove image
                    document.querySelector('#bg').style.background = ''
                    document.querySelector('#bg').style.backgroundSize = ''
                    // Show video with filter (darken)
                    document.querySelector('#bgvid').src = `${data.url}&autoplay=1&controls=0&showinfo=0&autohide=1&mute=1&loop=1`
                    document.querySelector('#bg').style.background = 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))'
                } else {
                    // Remove video
                    document.querySelector('#bgvid').src = ''
                    // Show image with filter (darken)
                    document.querySelector('#bg').style.background = `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${data.hdurl}) no-repeat center center`
                    document.querySelector('#bg').style.backgroundSize = `cover`
                } 
                // Show title and explanation
                document.querySelector('#title').innerHTML = data.title
                document.querySelector('#explanation').innerHTML = data.explanation
            })
            .catch(err => console.log(`Error: ${err}`))
    }
}

// Show random APOD
document.querySelector('#random').addEventListener('click', showRandomAPOD)
function showRandomAPOD() {
    document.querySelector('#input').valueAsDate = new Date(+(new Date()) - Math.floor( Math.random() * (new Date() - new Date('1995-06-15')) ));
    showAPOD();
}