async function translateText() {
  const text = document.getElementById('inputText').value.trim();
  const source = document.getElementById('sourceLang').value;
  const target = document.getElementById('targetLang').value;

  if (!text) {
    showToast("กรุณาพิมพ์ข้อความก่อนแปล");
    return;
  }

  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`);
  const data = await response.json();

  const translated = data.responseData.translatedText.trim();

  // เช็กว่าคำแปลว่าง หรือเหมือนกับต้นฉบับ
  if (!translated || translated.toLowerCase() === text.toLowerCase()) {
    showToast("ไม่พบคำแปลที่ตรงกัน หรือข้อความอาจไม่ถูกต้อง");
    document.getElementById('outputText').innerText = "";
  } else {
    document.getElementById('outputText').innerText = translated;
  }
}

function speakText() {
  const text = document.getElementById('outputText').innerText;
  if (!text) {
    showToast("ยังไม่มีข้อความให้พูด");
    return;
  }

  const lang = document.getElementById('targetLang').value;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang === "th" ? "th-TH" : lang === "en" ? "en-US" : "zh-CN";
  speechSynthesis.speak(msg);
}

// ✅ แปลเมื่อกด Enter
document.getElementById("inputText").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    translateText();
  }
});
const music = document.getElementById("bg-music");

  const playlist = [
    ".mp3",
    "2.mp3",
    "3.mp3"
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
  async function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!input) return alert("กรุณาใส่ข้อความก่อนแปล");
  if (source === target) return alert("กรุณาเลือกภาษาต้นทางและปลายทางให้ต่างกัน");

  const langMap = { th: "ไทย", eng: "อังกฤษ", zh: "จีนตัวย่อ" };

  try {
    const response = await fetch("https://akeayothayaxmatthayom52.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        sourceLang: langMap[source],
        targetLang: langMap[target]
      })
    });

    const data = await response.json();
    document.getElementById("outputText").innerText = data.result || "เกิดข้อผิดพลาดในการแปล";
  } catch (err) {
    console.error(err);
    document.getElementById("outputText").innerText = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
  }
}

function speakText() {
  const text = document.getElementById("outputText").innerText;
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

