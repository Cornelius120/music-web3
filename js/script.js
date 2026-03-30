// Kode ini diletakkan di music-web3/js/script.js

// Deklarasi Elemen DOM
const songListContainer = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");

const prevBtn = document.getElementById("prev-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const nextBtn = document.getElementById("next-btn");

const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");

const progressBar = document.getElementById("progress-bar");
const progressWrapper = document.getElementById("progress-wrapper");

const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerCover = document.getElementById("player-cover");

let currentSongIndex = 0;
let isPlaying = false;

// 1. Fungsi Merender Daftar Lagu
function initPlaylist() {
  songListContainer.innerHTML = "";

  playlist.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song-card");

    songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="song-card-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <span class="song-genre">${song.genre}</span>
            </div>
        `;

    songElement.addEventListener("click", () => {
      currentSongIndex = index;
      loadSongDetails(playlist[currentSongIndex]);
      playMusic();
    });

    songListContainer.appendChild(songElement);
  });
}

// 2. Fungsi Memuat Data Lagu ke Player Bawah
function loadSongDetails(song) {
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
  playerCover.src = song.cover;
  audioPlayer.src = song.src;
}

// 3. Fungsi Kontrol Putar dan Jeda
function playMusic() {
  audioPlayer.play();
  isPlaying = true;
  iconPlay.style.display = "none";
  iconPause.style.display = "block";
}

function pauseMusic() {
  audioPlayer.pause();
  isPlaying = false;
  iconPlay.style.display = "block";
  iconPause.style.display = "none";
}

playPauseBtn.addEventListener("click", () => {
  // Cegah error jika belum ada lagu yang dimuat
  if (!audioPlayer.src || audioPlayer.src === window.location.href) {
    loadSongDetails(playlist[currentSongIndex]);
  }

  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// 4. Fungsi Lagu Berikutnya & Sebelumnya
function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex > playlist.length - 1) {
    currentSongIndex = 0; // Kembali ke lagu pertama
  }
  loadSongDetails(playlist[currentSongIndex]);
  playMusic();
}

function playPrevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1; // Pindah ke lagu terakhir
  }
  loadSongDetails(playlist[currentSongIndex]);
  playMusic();
}

nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
audioPlayer.addEventListener("ended", playNextSong); // Otomatis lanjut saat lagu habis

// 5. Fungsi Progress Bar interaktif
audioPlayer.addEventListener("timeupdate", () => {
  const duration = audioPlayer.duration;
  const currentTime = audioPlayer.currentTime;

  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }
});

progressWrapper.addEventListener("click", (e) => {
  const width = progressWrapper.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  if (duration) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
});

// Inisialisasi awal saat web dimuat
initPlaylist();
loadSongDetails(playlist[0]);
