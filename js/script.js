// Kode ini diletakkan di C:\Users\User\Downloads\music-web3\js\script.js

// --- DATABASE LAGU KAMU ---
// Ganti URL 'src' dengan link langsung dari Catbox atau host lain.
// Ganti URL 'cover' dengan link gambar album.
const playlist = [
  {
    title: "Lagu Pertama",
    artist: "Artis A",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Ganti dengan link catbox kamu
    cover: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Cover+1",
  },
  {
    title: "Lagu Kedua",
    artist: "Artis B",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Ganti dengan link catbox kamu
    cover: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Cover+2",
  },
  {
    title: "Lagu Ketiga",
    artist: "Artis C",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Ganti dengan link catbox kamu
    cover: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Cover+3",
  },
];

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

// 1. Tampilkan daftar lagu ke layar utama
function renderSongList() {
  songListContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    songDiv.innerHTML = `
            <img src="${song.cover}" alt="cover">
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
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
  playBtn.innerText = "⏸"; // Ganti icon jadi pause
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.innerText = "▶"; // Ganti icon jadi play
}

playBtn.addEventListener("click", () => {
  if (audioPlayer.src === "" || !audioPlayer.src.includes("http")) {
    // Jika belum ada lagu yang dipilih, muat lagu pertama
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
    currentSongIndex = 0; // Kembali ke awal jika habis
  }
  loadSong(playlist[currentSongIndex]);
  playSong();
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1; // Lompat ke lagu terakhir
  }
  loadSong(playlist[currentSongIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
// Otomatis next jika lagu selesai
audioPlayer.addEventListener("ended", nextSong);

// 5. Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audioPlayer;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
});

// Klik progress bar untuk melompat
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
// Muat data lagu pertama sebagai standby (tapi tidak autoplay)
loadSong(playlist[0]);
