const audio = document.querySelector('audio');
const play = document.querySelector('.controls__play');
const prev = document.querySelector('.controls__prev');
const next = document.querySelector('.controls__next');
const singer = document.querySelector('.player__singer');
const song = document.querySelector('.player__song');
const background = document.querySelector('.player__background');
const cover = document.querySelector('.cover_img');



// воспроизведение и остановка звука
let isPlay = false
function playAudio () {
    if (!isPlay) {
        audio.currentTime = 0;
        isPlay = true;
        play.classList.add('pause');
        audio.play();
    } else {
        isPlay = false;
        play.classList.remove('pause');
        audio.pause();
        clearInterval()
    }
}

play.addEventListener ("click", playAudio)

// плейлист
let playlist = [
    {
    name:"Mr. Rager",
    artist:"Kid Cudi",
    source:"Kid_Cudi.mp3",
    img: "url(./assets/img/MrRager.jpg)",
    },
    {
    name:"The Madness",
    artist:"Foreign Air",
    source:"Foreign_Air.mp3",
    img: "url(./assets/img/The_Madness.jpg)",
    },
];

// переключение треков
function changeSong (i) {
    audio.src = "./assets/music/" + playlist[i].source;
    audio.currentTime = 0;
    singer.innerHTML = playlist[i].name;
    song.innerHTML = playlist[i].artist;
    background.style.backgroundImage = playlist[i].img;
    cover.style.backgroundImage = playlist[i].img;
    audio.play();
};

// предыдущий трек
let playNum = 0;
prev.addEventListener ("click", function () {
    if (playNum > 0) {
        playNum--;
        changeSong (playNum);
    } else {
        playNum = playlist.length - 1;
        changeSong (playNum)
    }
});


// следующий трек
next.addEventListener ("click", function () {
    if (playNum < playlist.length - 1) {
        playNum++;
        changeSong (playNum);
    } else {
        playNum = 0;
        changeSong (playNum)
    }
});
//-------------------------------------------------------------------------

audio.addEventListener(
    "loadeddata",
    () => {document.querySelector(".length-time").textContent = getTimeCodeFromNum(audio.duration);
    }, false
);

const timeline = document.querySelector(".timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);


setInterval(() => {
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    document.querySelector(".current-time").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);


function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}