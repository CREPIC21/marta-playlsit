
const songs = [];
const allSongs = document.querySelectorAll(".song");
allSongs.forEach(song => songs.push(song.getAttribute("id")));

const allButons = document.getElementById("buttons");
console.log(allButons);

// control buttons
const playAllBtnSongs = document.querySelector(".autoplay-all-songs");
const playSongBtn = document.querySelector(".play-btn");
const pauseSongBtn = document.querySelector(".pause-btn");
const stopSongsBtn = document.querySelector(".stop-btn");

// interval variable
let continuePlay;

function addSpinningVinyl(buttonPlaying) {
    const vinyl = document.createElement("i");
    vinyl.classList.add("fas");
    vinyl.classList.add("fa-compact-disc");
    buttonPlaying.appendChild(vinyl);
}

function removeSpinningVinyl() {
    let vinylToRemove = document.querySelector("button i.fa-compact-disc");
    let btnPlaying = document.querySelector(".currently-playing");
    if (vinylToRemove === null) {
        return
    } else {
        btnPlaying.removeChild(vinylToRemove);
    }

}

// creating button for each song in the array
songs.forEach(song => {
    const btn = document.createElement("button");
    // const spam = document.createElement("spam");
    // btn.appendChild(spam);
    btn.classList.add("btn");
    btn.classList.add(song);

    let songText = song.replaceAll("-", " ");
    // btn.innerText = song.replaceAll("-", " ");
    btn.innerText = songText.charAt(0).toUpperCase() + songText.slice(1);
    // spam.innerText = songText.charAt(0).toUpperCase() + songText.slice(1);

    // adding event listener on each button/song
    btn.addEventListener("click", function () {
        // stoping all songs so the choosen song will play
        stopSongs();
        let playingSong = document.getElementById(song);
        playingSong.play();
        addSpinningVinyl(btn);
        // adding additional class to button for later usage - ability to pause/stop certain song
        btn.classList.add("currently-playing");
        // adding additional class to audio tag for later usage - ability to pause/stop certain song
        playingSong.classList.add("playing");
        pausePlayControl();
    });

    allButons.appendChild(btn);

    // document.getElementById("buttons").appendChild(btn);
    // console.log(document.getElementById("buttons").appendChild(btn));
});


// function for controling play/pause of the song currently playing
function pausePlayControl() {
    let allButtons = document.querySelectorAll("button");
    allButtons.forEach(btn => {
        if (btn.classList.contains("currently-playing")) {
            console.log(true);
            console.log(btn);
            pauseSongBtn.addEventListener("click", pauseUnpauseSong);
            playSongBtn.addEventListener("click", playUnplaySong);
        }
    });
}

// function to stop all songs from playing when different song is chossen
function stopSongs() {
    songs.forEach(song => {
        const songPlaying = document.getElementById(song);
        const button = document.querySelector(".currently-playing");

        songPlaying.pause();
        songPlaying.currentTime = 0;

        removeSpinningVinyl();
        clearInterval(continuePlay);
        document.querySelector(`button.${song}`).classList.remove("currently-playing");
        songPlaying.classList.remove("playing");
    });
}

// event listener to stop all songs from playing when stop button is pressed
stopSongsBtn.addEventListener("click", stopSongs);


let i = 0;
// function for event listener playing all songs
function autoplaySongs() {
    const audioArray = document.querySelectorAll("audio");
    const buttonsArray = document.querySelectorAll(".btn");
    console.log(buttonsArray);
    if (i < audioArray.length) {
        let nextSong = audioArray[i];
        let songButton = buttonsArray[i];
        nextSong.play();
        songButton.classList.add("currently-playing");
        nextSong.classList.add("playing");
        addSpinningVinyl(songButton);
        pausePlayControl();
        i++;
    } else {
        i = 0;
        let nextSong = audioArray[i];
        let songButton = buttonsArray[i];
        nextSong.play();
        songButton.classList.add("currently-playing");
        nextSong.classList.add("playing");
        addSpinningVinyl(songButton);
        pausePlayControl();
        i++;
        console.log(i);
    }

}

// event listener to play all songs when note button is pressed
playAllBtnSongs.addEventListener("click", function () {
    stopSongs();
    clearInterval(continuePlay);
    autoplaySongs();
    continuePlay = setInterval(playNextSong, 10000);
});

// function for interval to play next song when current song is finished
function playNextSong() {
    let song = document.querySelector("audio.playing");
    let btnPlaying = document.querySelector(".currently-playing");
    console.log(song);
    let songCurrentTime = song.currentTime;
    let songDurationTime = song.duration;
    if (songDurationTime - songCurrentTime === 0) {
        removeSpinningVinyl();
        btnPlaying.classList.remove("currently-playing");
        song.classList.remove("playing");
        autoplaySongs();
    }
    console.log(songDurationTime);
    console.log(songCurrentTime);
}

// clear/stop interval
function stopInterval() {
    clearInterval();
}

// pause control
function pauseUnpauseSong() {
    console.log("Sucess");
    let songs = document.querySelectorAll("audio");
    songs.forEach(song => {
        if (song.classList.contains("playing")) {
            song.pause();
        }
    })
    // console.log(songs);

}

// play control
function playUnplaySong() {
    console.log("Sucess");
    let songs = document.querySelectorAll("audio");
    songs.forEach(song => {
        if (song.classList.contains("playing")) {
            song.play();
        }
    })
    // console.log(songs);
}

