let currentMusic = 0;

let wrapper = document.querySelector(".wrapper")
let music = document.querySelector('#audio');
let songName = document.querySelector('.song-name');
let artistName = document.querySelector('.artist-name');
let disk = document.querySelector('.disk');
let seekBar = document.querySelector('.seek-bar');
let startTime = document.querySelector('.start-time')
let songDuration = document.querySelector('.song-duration')
let playBtn = document.querySelector('.play-btn');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play()
    } else {
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('disk-rotate')

})
let playMusic = () => {
    music.play();
    playBtn.classList.remove('pause')
    disk.classList.add('disk-rotate')

}

let setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.songName;
    artistName.innerHTML = song.artist;
    songName.innerHTML = song.songName;
    disk.style.backgroundImage = `url('${song.cover}')`
    wrapper.style.background = `url('${song.cover}') no-repeat center center/cover`

    startTime.innerHTML = `00:00`;
    setTimeout(() => {
        seekBar.max = music.duration;
        songDuration.innerHTML = formatTime(music.duration); //it will show NaN if settimeout not given
    }, 300);

}
setMusic(0)
let formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}: ${sec}`;
}
setInterval(() => {
    seekBar.value = music.currentTime;
    startTime.innerHTML = formatTime(music.currentTime)
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        next.click()
    }
}, 500);
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})

next.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++
    }
    setMusic(currentMusic);
    playMusic()
})

prev.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--
    }
    setMusic(currentMusic);
    playMusic()

})