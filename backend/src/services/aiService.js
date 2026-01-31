/**
 * AI Service for Bond Analytics
 * Calculates investment scores based on bond parameters and market data
 */

// Weights for different scoring factors
const WEIGHTS = {
    CREDIT_RATING: 0.4,
    YIELD: 0.3,
    RISK: 0.2,
    MATURITY: 0.1
};

// Credit rating scores (0-10)
const RATING_SCORES = {
    'AAA': 10,
    'AA+': 9.5,
    'AA': 9,
    'A+': 8.5,
    'A': 8,
    'BBB+': 7.5,
    'BBB': 7,
    'BB+': 6,
    'BB': 5,
    'B': 4,
    'C': 2,
    'D': 1
};

const calculateRiskScore = (bond) => {
    let score = 50; // Base score

    // Adjust based on risk category
    switch (bond.risk_category) {
        case 'low': score -= 20; break; // Lower risk score is better for "riskiness", but here we want "safety"
        case 'medium': break;
        case 'high': score += 30; break;
    }

    // Adjust based on credit rating
    const ratingScore = RATING_SCORES[bond.credit_rating] || 5;
    score -= (ratingScore - 5) * 5;

    return Math.max(0, Math.min(100, score));
};

const calculateRecommendationScore = (bond) => {
    let score = 0;

    // 1. Credit Rating Contribution
    const ratingScore = RATING_SCORES[bond.credit_rating] || 5;
    score += ratingScore * WEIGHTS.CREDIT_RATING;

    // 2. Yield Contribution (Generic assumption: > 8% is good)
    const yieldScore = Math.min(10, (bond.coupon_rate / 8) * 5);
    score += yieldScore * WEIGHTS.YIELD;

    // 3. Risk Contribution (Low risk is good)
    const riskScore = bond.risk_category === 'low' ? 10 :
        bond.risk_category === 'medium' ? 6 : 2;
    score += riskScore * WEIGHTS.RISK;

    // 4. Maturity Contribution (Shorter maturity often preferred)
    // This is a simplification
    score += 6 * WEIGHTS.MATURITY;

    return parseFloat(score.toFixed(1));
};

const analyzeBond = async (bond) => {
    const riskScore = calculateRiskScore(bond);
    const recommendationScore = calculateRecommendationScore(bond);

    let sentiment = 'Neutral';
    if (recommendationScore > 7.5) sentiment = 'Bullish';
    else if (recommendationScore < 4) sentiment = 'Bearish';

    // Generate tags based on bond properties
    const tags = [];
    if (bond.risk_category === 'low') tags.push('Safe Haven');
    if (bond.coupon_rate > 9) tags.push('High Yield');
    if (bond.maturity_date && new Date(bond.maturity_date).getFullYear() - new Date().getFullYear() < 3) tags.push('Short Term');
    if (bond.credit_rating && bond.credit_rating.startsWith('A')) tags.push('Investment Grade');
    if (tags.length === 0) tags.push('Balanced');

    // Generate analysis text
    const safetyScore = 100 - riskScore;
    let analysisText = `### **Investment Memo**\n\n`;
    analysisText += `**Rating:** ${bond.credit_rating} | **Yield:** ${bond.coupon_rate}%\n\n`;

    if (safetyScore > 80) {
        analysisText += `This bond indicates a **very strong safety profile**. With a credit rating of ${bond.credit_rating}, it represents a low-risk investment suitable for capital preservation strategies. The returns are modest but reliable.`;
    } else if (safetyScore > 50) {
        analysisText += `This bond offers a **balanced risk-reward ratio**. The ${bond.coupon_rate}% yield helps hedge against inflation, while the ${bond.risk_category} risk profile suggests moderate volatility exposure.`;
    } else {
        analysisText += `**High Risk Warning**: This bond offers aggressive returns at ${bond.coupon_rate}%, but comes with significant credit risk. Only suitable for diversified, high-tolerance portfolios looking for yield enhancement.`;
    }

    return {
        // Internal Metrics
        risk_score: riskScore,
        recommendation_score: recommendationScore,
        market_sentiment: sentiment.toLowerCase(),

        // Frontend "AITradingCoach" Expected Fields
        score: safetyScore, // Frontend expects a "Safety Score" (Higher is better)
        sentiment: sentiment, // Capitalized for display
        analysis: analysisText,
        tags: tags.slice(0, 3) // Limit to 3 tags
    };
};

// Simple chat simulation for now
const chat = async (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('risk') || msg.includes('safe')) {
        return { reply: "For conservative investors, I recommend AAA-rated bonds like NHAI or REC." };
    }
    if (msg.includes('return') || msg.includes('profit')) {
        return { reply: "High-yield options currently offer 9-11% returns, but carry higher risk." };
    }

    return { reply: "I can help you analyze bonds and optimize your portfolio. Ask me about specific bonds or market trends." };
};

module.exports = {
    analyzeBond,
    chat
};
