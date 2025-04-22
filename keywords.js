function extractKeywords(data) {
    // Örnek basit anahtar kelime çıkarımı
    const keywords = [];

    data.forEach(item => {
        item.text.split(' ').forEach(word => {
            if (keywords.indexOf(word) === -1) {
                keywords.push(word);
            }
        });
    });

    return keywords;
}