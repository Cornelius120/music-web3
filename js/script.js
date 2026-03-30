// Kode ini diletakkan di C:\Users\User\Downloads\music-web3\js\script.js

// Elemen DOM
const songListContainer = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// Elemen info lagu di player bawah
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerCover = document.getElementById("player-cover");

let currentSongIndex = 0;
let isPlaying = false;

// 1. Tampilkan daftar lagu ke layar utama (Sekarang menampilkan genre juga)
function renderSongList() {
  songListContainer.innerHTML = "";
  // Variabel 'playlist' otomatis terbaca dari file data.js
  playlist.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");

    // Menambahkan elemen span untuk menampilkan genre
    songDiv.innerHTML = `
            <img src="${song.cover}" alt="cover">
            <div style="flex: 1;">
                <h4>${song.title}</h4>
                <p>${song.artist} • <span style="color: #1db954; font-size: 0.75rem;">${song.genre}</span></p>
            </div>
        `;
    // Jika lagu di klik, mainkan lagu tersebut
    songDiv.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(playlist[currentSongIndex]);
      playSong();
    });
    songListContainer.appendChild(songDiv);
  });
}

// 2. Muat lagu ke audio player
function loadSong(song) {
  playerTitle.innerText = song.title;
  playerArtist.innerText = song.artist;
  playerCover.src = song.cover;
  audioPlayer.src = song.src;
}

// 3. Fungsi Play dan Pause
function playSong() {
  audioPlayer.play();
  isPlaying = true;
  playBtn.innerText = "⏸";
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.innerText = "▶";
}

playBtn.addEventListener("click", () => {
  if (audioPlayer.src === "" || !audioPlayer.src.includes("http")) {
    loadSong(playlist[currentSongIndex]);
  }
  const isAudioPlaying = playBtn.innerText === "⏸";
  if (isAudioPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// 4. Tombol Next dan Previous
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

// 5. Update Progress Bar
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

// Jalankan saat web pertama kali dibuka
renderSongList();
loadSong(playlist[0]);
