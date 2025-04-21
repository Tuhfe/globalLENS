const apiKey = "1a6bfcf1ba4a4947b4736aabc0e5d42f"; // senin verdiğin API anahtarı
const translateBtn = document.getElementById("translateBtn");
const textInput = document.getElementById("textInput");
const languageSelect = document.getElementById("languageSelect");
const resultDiv = document.getElementById("result");

translateBtn.addEventListener("click", async () => {
  const text = textInput.value;
  const targetLang = languageSelect.value;

  if (!text.trim()) {
    resultDiv.innerText = "Lütfen bir metin gir.";
    return;
  }

  try {
    const response = await fetch("https://api.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `auth_key=${apiKey}&text=${encodeURIComponent(text)}&target_lang=${targetLang}`
    });

    const data = await response.json();

    if (data.translations && data.translations.length > 0) {
      resultDiv.innerText = data.translations[0].text;
    } else {
      resultDiv.innerText = "Çeviri yapılamadı.";
    }
  } catch (error) {
    resultDiv.innerText = "Hata oluştu: " + error.message;
  }
});