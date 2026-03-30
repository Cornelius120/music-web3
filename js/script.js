// Kode ini diletakkan di C:\Users\User\Downloads\music-web3\js\script.js

const songListContainer = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");
const prevBtn = document.getElementById("prev-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const nextBtn = document.getElementById("next-btn");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const progressBar = document.getElementById("progress-bar");
const progressWrapper = document.getElementById("progress-wrapper");

// Elemen Tampilan Bawah
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerCover = document.getElementById("player-cover");
const bottomTrackInfo = document.getElementById("bottom-track-info");

// Elemen Tampilan ViewSPA
const homeView = document.getElementById("home-view");
const detailView = document.getElementById("detail-view");
const backBtn = document.getElementById("back-btn");
const navBeranda = document.getElementById("nav-beranda");

// Elemen Detail View
const detailCover = document.getElementById("detail-cover");
const detailTitle = document.getElementById("detail-title");
const detailArtist = document.getElementById("detail-artist");
const detailDesc = document.getElementById("detail-desc");
const detailLyrics = document.getElementById("detail-lyrics");
const recommendationList = document.getElementById("recommendation-list");

let currentSongIndex = 0;
let isPlaying = false;

// 1. Fungsi Navigasi SPA (Berpindah Tampilan)
function showDetailView() {
  homeView.style.display = "none";
  detailView.style.display = "block";
}

function showHomeView() {
  detailView.style.display = "none";
  homeView.style.display = "block";
}

backBtn.addEventListener("click", showHomeView);
navBeranda.addEventListener("click", showHomeView);
bottomTrackInfo.addEventListener("click", showDetailView);

// 2. Render Daftar Lagu (Digunakan untuk Home dan Rekomendasi)
function createSongCard(song, index, container) {
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
    currentSongIndex = playlist.indexOf(song); // Cari index asli di playlist
    loadSongDetails(playlist[currentSongIndex]);
    playMusic();
    showDetailView(); // Otomatis buka halaman detail saat lagu di klik
  });

  container.appendChild(songElement);
}

function initPlaylist() {
  songListContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    createSongCard(song, index, songListContainer);
  });
}

function renderRecommendations(currentGenre, excludeTitle) {
  recommendationList.innerHTML = "";
  // Filter lagu dengan genre sama, tapi kecualikan lagu yang sedang diputar
  const recommendedSongs = playlist.filter(
    (song) => song.genre === currentGenre && song.title !== excludeTitle,
  );

  if (recommendedSongs.length === 0) {
    recommendationList.innerHTML =
      "<p style='color: #888; font-size: 0.9rem;'>Belum ada lagu rekomendasi yang serupa.</p>";
    return;
  }

  recommendedSongs.forEach((song, index) => {
    createSongCard(song, index, recommendationList);
  });
}

// 3. Memuat Data Lagu ke Player dan Halaman Detail
function loadSongDetails(song) {
  // Update Bottom Player
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
  playerCover.src = song.cover;
  audioPlayer.src = song.src;

  // Update Detail View
  detailCover.src = song.cover;
  detailTitle.textContent = song.title;
  detailArtist.textContent = song.artist;
  detailDesc.textContent =
    song.description || "Tidak ada deskripsi untuk lagu ini.";
  detailLyrics.textContent = song.lyrics || "Lirik tidak tersedia.";

  // Render Rekomendasi
  renderRecommendations(song.genre, song.title);
}

// 4. Kontrol Putar dan Jeda
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
  if (!audioPlayer.src || audioPlayer.src === window.location.href) {
    loadSongDetails(playlist[currentSongIndex]);
  }
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// 5. Kontrol Lagu Berikutnya & Sebelumnya
function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex > playlist.length - 1) {
    currentSongIndex = 0;
  }
  loadSongDetails(playlist[currentSongIndex]);
  playMusic();
}

function playPrevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSongDetails(playlist[currentSongIndex]);
  playMusic();
}

nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
audioPlayer.addEventListener("ended", playNextSong);

// 6. Progress Bar
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

// Inisialisasi awal
initPlaylist();
loadSongDetails(playlist[0]);
