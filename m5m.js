const music = document.getElementById("bg-music");

  const playlist = [
    "1.mp3",
    "song2.mp3",
    "song3.mp3"
  ];

  let currentTrack = 0;

  function playNextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    music.src = playlist[currentTrack];
    music.play();
  }

  // เริ่มเล่น
  music.src = playlist[currentTrack];
  music.volume = 0.1; // ลดเสียงลง
  music.play();

   function changeVolume(amount) {
  let newVolume = music.volume + amount;
  newVolume = Math.max(0, Math.min(1, newVolume)); // อยู่ในช่วง 0.0 - 1.0
  music.volume = newVolume;
  console.log("Volume:", Math.round(newVolume * 100) + "%");
   }


  // เมื่อเพลงจบ เล่นเพลงต่อไป
  music.addEventListener("ended", playNextTrack);
// ✅ ฟังก์ชันแจ้งเตือนด้านบนกล่อง (แทน Toast ลอย)
function showToast(message) {
  const box = document.getElementById("alertBox");
  box.innerHTML = `
    <div class="animate-fade-in-down bg-red-500 text-white px-4 py-2 rounded-xl shadow-md text-center">
      ${message}
    </div>
  `;
  setTimeout(() => {
    box.innerHTML = "";
  }, 3000);
}
function playBackSound(event) {
    event.preventDefault(); // กันการเปลี่ยนหน้าทันที
    const audio = document.getElementById("back-sound");
    audio.play();

    // เปลี่ยนหน้า หลังจากเสียงเล่น (เช่น รอ 300ms)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 300);
  }