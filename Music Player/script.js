const songs = [
{
    title: "Dhun",
    artist: "Arjit singh",
    src: "songs/song1.mp3",
    cover:"images/cover1.jpg"
},
{
    title: "Dhooro Dhooro ",
    artist: "Paresh Pahuja",
    src: "songs/song2.mp3",
    cover:"images/cover2.jpg"
},
{
    title: "Nazar Na Lag Jaaye",
    artist: "Ash King, Sachin-Jigar",
    src: "songs/song3.mp3",
    cover:"images/cover3.jpg"
}
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");

let currentSong = 0;

// Load Song
function loadSong(index){
    document.getElementById("coverImage").src =
songs[index].cover;
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSong);

// Play / Pause
function playPause(){

    if(audio.paused){
        audio.play();
        playBtn.innerHTML = "⏸";
    }
    else{
        audio.pause();
        playBtn.innerHTML = "▶";
    }
}

// Next Song
function nextSong(){

    currentSong = (currentSong + 1) % songs.length;

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";
}

// Previous Song
function prevSong(){

    currentSong = (currentSong - 1 + songs.length) % songs.length;

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";
}

// Progress Bar Update
audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        progress.value =
        (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
        formatTime(audio.currentTime);
    }
});

// Duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
    formatTime(audio.duration);
});

// Seek Song
progress.addEventListener("input", () => {

    if(audio.duration){

        audio.currentTime =
        (progress.value / 100) * audio.duration;
    }
});

// Volume
volume.addEventListener("input", () => {

    audio.volume = volume.value;
});

// Format Time
function formatTime(time){

    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Auto Next Song
audio.addEventListener("ended", () => {

    nextSong();
});

// Playlist
songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent =
    `${song.title} - ${song.artist}`;

    li.onclick = () => {

        currentSong = index;

        loadSong(currentSong);

        audio.play();

        playBtn.innerHTML = "⏸";
    };

    playlist.appendChild(li);
});