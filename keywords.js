function extractKeywords(text) {
    const keywords = text.match(/\b(\w+)\b/g);
    return keywords ? keywords.slice(0, 5) : [];