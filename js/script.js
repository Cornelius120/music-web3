// Kode ini diletakkan di C:\Users\User\Downloads\music-web3\js\script.js

const songListContainer = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// PERBAIKAN: Tangkap elemen SVG Play dan Pause secara terpisah
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");

const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerCover = document.getElementById("player-cover");

let currentSongIndex = 0;
let isPlaying = false;

function renderSongList() {
  songListContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    songDiv.innerHTML = `
            <img src="${song.cover}" alt="cover">
            <div style="flex: 1;">
                <h4>${song.title}</h4>
                <p>${song.artist} • <span style="color: #1db954; font-size: 0.75rem;">${song.genre}</span></p>
            </div>
        `;
    songDiv.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(playlist[currentSongIndex]);
      playSong();
    });
    songListContainer.appendChild(songDiv);
  });
}

function loadSong(song) {
  playerTitle.innerText = song.title;
  playerArtist.innerText = song.artist;
  playerCover.src = song.cover;
  audioPlayer.src = song.src;
}

// 3. PERBAIKAN: Fungsi Play dan Pause menggunakan display none/block
function playSong() {
  audioPlayer.play();
  isPlaying = true;
  // Sembunyikan ikon Play, Tampilkan ikon Pause
  iconPlay.style.display = "none";
  iconPause.style.display = "block";
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  // Sembunyikan ikon Pause, Tampilkan ikon Play
  iconPlay.style.display = "block";
  iconPause.style.display = "none";
}

// PERBAIKAN: Logika klik tombol play menggunakan variabel isPlaying
playBtn.addEventListener("click", () => {
  if (audioPlayer.src === "" || !audioPlayer.src.includes("http")) {
    loadSong(playlist[currentSongIndex]);
  }

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > playlist.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(playlist[currentSongIndex]);
  playSong();
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSong(playlist[currentSongIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioPlayer.addEventListener("ended", nextSong);

audioPlayer.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audioPlayer;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  if (duration) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
});

renderSongList();
loadSong(playlist[0]);
