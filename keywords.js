const thematicTags = {
    'conflict': ['war', 'attack', 'conflict', 'tension', 'violence', 'clash', 'crisis'],
    'summit': ['summit', 'meeting', 'conference', 'talks', 'negotiation', 'diplomatic'],
    'sanction': ['sanction', 'embargo', 'ban', 'restriction', 'penalty'],
    'military': ['military', 'army', 'navy', 'air force', 'defense', 'troops', 'drone'],
    'diplomacy': ['diplomacy', 'treaty', 'agreement', 'alliance', 'partnership', 'accord']
};

export function analyzeKeywords(text) {
    const results = {
        tags: new Set(),
        keywords: []
    };

    const words = text.toLowerCase().split(/\s+/);
    
    // Check for thematic tags
    for (const [tag, keywords] of Object.entries(thematicTags)) {
        if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
            results.tags.add(tag);
        }
    }

    // Simple keyword extraction (in a real project, use proper NLP)
    const importantWords = words.filter(word => 
        word.length > 4 && 
        !['that', 'this', 'with', 'which', 'have', 'from'].includes(word)
    );
    
    results.keywords = [...new Set(importantWords)].slice(0, 20);
    
    return results;
}