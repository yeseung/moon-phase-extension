
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

document.getElementById("solar").innerText = `양력 날짜: ${year}-${month}-${day}`;

const serviceKey = "li9mSpO68gQ%2BoRq2KYxinPdRUJAJ4YL98gfEOPZGp6v94o2JJkhNEk3NhHcun9uDrYMsEDzKBrUGqwK1zyjxgg%3D%3D";
const url = `https://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getLunCalInfo?solYear=${year}&solMonth=${month}&solDay=${day}&ServiceKey=${serviceKey}`;

fetch(url)
.then(response => response.text())
.then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const lunYear = xmlDoc.querySelector("lunYear")?.textContent || "N/A";
    const lunMonth = xmlDoc.querySelector("lunMonth")?.textContent.padStart(2, '0') || "00";
    const lunDay = parseInt(xmlDoc.querySelector("lunDay")?.textContent || "0");

    const lunarDate = `${lunYear}-${lunMonth}-${String(lunDay).padStart(2, '0')}`;
    document.getElementById("lunar").innerText = `음력 날짜: ${lunarDate}`;

    let moonEmoji = "?";
    let moonDesc = "알 수 없음";
    if (lunDay >= 1 && lunDay <= 2) {
        moonEmoji = "🌑";
        moonDesc = "삭 (New Moon)";
    }
    else if (lunDay >= 3 && lunDay <= 6) {
        moonEmoji = "🌒";
        moonDesc = "초승달 (Waxing Crescent)";
    }
    else if (lunDay >= 7 && lunDay <= 10) {
        moonEmoji = "🌓";
        moonDesc = "상현달 (First Quarter)";
    }
    else if (lunDay >= 11 && lunDay <= 14) {
        moonEmoji = "🌔";
        moonDesc = "보름 전 (Waxing Gibbous)";
    }
    else if (lunDay === 15) {
        moonEmoji = "🌕";
        moonDesc = "보름달 (Full Moon)";
    }
    else if (lunDay >= 16 && lunDay <= 19) {
        moonEmoji = "🌖";
        moonDesc = "보름 후 (Waning Gibbous)";
    }
    else if (lunDay >= 20 && lunDay <= 23) {
        moonEmoji = "🌗";
        moonDesc = "하현달 (Last Quarter)";
    }
    else if (lunDay >= 24 && lunDay <= 27) {
        moonEmoji = "🌘";
        moonDesc = "그믐 전 (Waning Crescent)";
    }
    else if (lunDay >= 28 && lunDay <= 30) {
        moonEmoji = "🌑";
        moonDesc = "그믐 (Dark Moon)";
    }

    document.getElementById("moon").innerHTML = `${moonEmoji}`;

    document.getElementById("desc").innerHTML = `${moonDesc}`;

    const lunSecha = xmlDoc.querySelector("lunSecha")?.textContent || "N/A";
    const lunWolgeon = xmlDoc.querySelector("lunWolgeon")?.textContent || "N/A";
    const lunIljin = xmlDoc.querySelector("lunIljin")?.textContent || "N/A";

    const lunarGanji = `${lunSecha}년 ${lunWolgeon}월 ${lunIljin}일`;
    document.getElementById("ganji").innerText = `${lunarGanji}`;

    const solWeek = xmlDoc.querySelector("solWeek")?.textContent || "N/A";
    document.getElementById("weekday").innerText = `${solWeek}요일`;
})
.catch(error => {
    console.error("API 호출 오류:", error);
    document.body.innerHTML += `<p>API 호출에 실패했습니다.</p>`;
});