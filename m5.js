async function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!input) return alert("กรุณาใส่ข้อความก่อนแปล");
  if (source === target) return alert("กรุณาเลือกภาษาต้นทางและปลายทางให้ต่างกัน");

  const langMap = { th: "ไทย", eng: "อังกฤษ", zh: "จีนตัวย่อ" };

  const prompt = `
แปลคำหรือข้อความต่อไปนี้จากภาษา${langMap[source]}เป็นภาษา${langMap[target]} โดยให้แปลตรงความหมายที่สุด ไม่ตีความเกินความจำเป็น และไม่แต่งประโยคเพิ่ม:

"${input}"
`;

  try {
    const response = await fetch("https://akeayothayaxmatthayom52.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      })
    });

    const data = await response.json();
    document.getElementById("outputText").innerText = data.result || "เกิดข้อผิดพลาดในการแปล";
  } catch (err) {
    console.error(err);
    document.getElementById("outputText").innerText = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
  }
}
