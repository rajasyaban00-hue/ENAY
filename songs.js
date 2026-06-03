const songs = [{
    image: 'wa1 (9).jpeg',
    title: 'Selamat pacaran sama orang depok',
    artist: 'RIIISENG'
}]

let songsHTML = '';
songs.forEach((song)=> {
    songsHTML += `
    <div class="spotify-container">
        <div class="upper">
            <div class="separate">
                <img src="${song.image}" alt="Aura">  
            </div>
            <div class="separate">
                <p id="title">${song.title}</p>
                <p>${song.artist}</p>
            </div>
            
        </div>
        <div class="play">
            <i class="fas fa-backward"></i>
            <i class="fas fa-play" data-songs = "${song.title}"></i>
            <i class="fas fa-forward"></i>
        </div>
    </div>  
    `;

 
});



document.querySelector('.songs-container').innerHTML = songsHTML;

let currentAudio = null;
let currentButton = null;

const audioMap = {
    'Selamat pacaran sama orang depok': new Audio('aura.mp3'),
    'Museo': new Audio('songs/museo.mp3'),
    'Happiness': new Audio('songs/Rex Orange County - Happiness (Lyrics).mp3'),
    'The Night We Met': new Audio('songs/The night we met.mp3')
};

const playbtn = document.querySelectorAll('.fa-play');

playbtn.forEach((button) => {
    const songTitle = button.dataset.songs;

    // Add both click and touchend to support mobile responsiveness
    ['click', 'touchend'].forEach(eventType => {
        button.addEventListener(eventType, (e) => {
            e.preventDefault();

            const audio = audioMap[songTitle];

            // If same button is clicked again
            if (currentAudio === audio && !audio.paused) {
                audio.pause();
                button.classList.remove('fa-pause');
                button.classList.add('fa-play');
                currentAudio = null;
                currentButton = null;
            } else {
                // Pause all audios and reset all buttons
                Object.values(audioMap).forEach(a => a.pause());
                playbtn.forEach(btn => {
                    btn.classList.remove('fa-pause');
                    btn.classList.add('fa-play');
                });

                // Play selected
                audio.play();
                button.classList.remove('fa-play');
                button.classList.add('fa-pause');
                currentAudio = audio;
                currentButton = button;
            }
        });
    });
});



let newX = 0, newY = 0, startX = 0, startY = 0;
let currentElement = null;

const spotify_container = document.querySelectorAll('.spotify-container');

spotify_container.forEach((container) => {
    // Mouse Events
    container.addEventListener('mousedown', startDrag);
    // Touch Events
    container.addEventListener('touchstart', startDrag, { passive: false });
});

function startDrag(e) {
    // Prevent drag when clicking on .fa-play or any button
    if (e.target.closest('.fa-play')) {
        return; // Do not drag when clicking the play icon
    }

    e.preventDefault(); // Prevent touch scroll

    currentElement = e.currentTarget;

    const rect = currentElement.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX - rect.left;
    startY = clientY - rect.top;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', mouseUp);
}

function mouseMove(e) {
    if (!currentElement) return;
    updatePosition(e.clientX, e.clientY);
}

function touchMove(e) {
    if (!currentElement) return;
    e.preventDefault(); // Prevent scroll while dragging
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
}

function updatePosition(clientX, clientY) {
    const left = clientX - startX;
    const top = clientY - startY;

    currentElement.style.position = 'absolute';
    currentElement.style.left = left + 'px';
    currentElement.style.top = top + 'px';
}

function mouseUp() {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', mouseUp);
    currentElement = null;
}
