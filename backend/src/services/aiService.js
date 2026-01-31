const OpenAI = require('openai');

// Initialize OpenAI conditionally
let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

/**
 * Generates an AI investment analysis for a given bond.
 * @param {Object} bond - The bond object to analyze.
 * @param {Object} userProfile - The user's risk profile (optional).
 * @returns {Promise<Object>} - The analysis result.
 */
exports.analyzeBond = async (bond, userProfile) => {
    try {
        // 1. Try Real AI Call if Key Exists
        if (openai) {
            // In a real hackathon, we might want to save tokens, so maybe we skip this 
            // unless explicitly enabled. For now, let's fallback to "Smart Simulation" 
            // to ensure 100% uptime during the demo.
            // Uncomment below to enable real AI:
            /*
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Analyze this bond: ${bond.name} yielding ${bond.expected_returns}%` }],
            });
            return { analysis: response.choices[0].message.content };
            */
        }

        // 2. Smart Simulation (The "Winning" Strategy for Demos)
        // Returns instant, deterministic, high-quality markdown formatted analysis.
        return simulateAIAnalysis(bond);

    } catch (error) {
        console.error("AI Service Error:", error);
        // Fallback on error
        return simulateAIAnalysis(bond);
    }
};

/**
 * Generates a chat response for user queries.
 * @param {string} message - The user's message.
 * @returns {Promise<Object>} - The AI response.
 */
exports.chat = async (message) => {
    // 1. Check for real AI key (Simulated logic for now as per instructions)
    // if (openai) { ... }

    // 2. Fallback to Smart Rules Engine for Hackathon robustness
    return simulateAIChat(message);
};

function simulateAIChat(message) {
    const msg = message.toLowerCase();

    // Financial Intelligence Simulation
    if (msg.includes('risk') || msg.includes('safe')) {
        return {
            reply: "For a conservative risk profile, I recommend Government Bonds (G-Secs) or AAA-rated Corporate Bonds like NHAI or REC. They offer 7-8% returns with high safety coverage."
        };
    }
    if (msg.includes('return') || msg.includes('profit') || msg.includes('yield')) {
        return {
            reply: "Currently, Corporate Bonds in the Infrastructure sector are offering the highest yields (9-11%). However, always check the credit rating. 'Adani Green' and 'L&T Finance' are popular high-yield options on our platform."
        };
    }
    if (msg.includes('tax') || msg.includes('free')) {
        return {
            reply: "Tax-Free Bonds (like IRFC or PFC) are excellent for high tax bracket investors. The effective pre-tax yield can be as high as 12% compared to FDs."
        };
    }
    if (msg.includes('rebalance') || msg.includes('portfolio')) {
        return {
            reply: "I can help you rebalance. Based on current market volatility, shifting 15% from Equity-linked bonds to Fixed G-Secs is recommended to stabilize your portfolio."
        };
    }
    if (msg.includes('hello') || msg.includes('hi')) {
        return {
            reply: "Hello! I am your AI Investment Assistant. Ask me about bond yields, risk assessment, or portfolio optimization."
        };
    }

    // Default Fallback
    return {
        reply: "That's an interesting market query. To give you the best advice, I'd suggest looking at our 'Marketplace' for the latest yield curves. Generally, diversifying across Govt and AAA Corporate bonds is the safest strategy right now."
    };
}

/**
 * Generates a realistic-looking analysis based on bond data.
 */
function simulateAIAnalysis(bond) {
    const isGreen = bond.category === 'green';
    const isHighYield = bond.expected_returns > 10;

    const sentiment = isHighYield ? "Positive but Risky" : "Safe & Stable";
    const score = isGreen ? 92 : (isHighYield ? 78 : 88);

    const analysisText = `
### 🤖 AI Investment Verdict: **${sentiment}**

**Score: ${score}/100**

**Why this bond?**
${bond.name} offers a **${bond.expected_returns}% yield**, which is ${isHighYield ? 'significantly higher' : 'competitive'} compared to the current inflation rate of 5.5%. 
${isGreen ? '✅ **ESG Impact**: This is a Green Bond. Investment directly funds sustainable infrastructure, qualifying for potential tax benefits.' : ''}

**Risk Assessment:**
- **Credit Risk**: ${bond.risk_category.toUpperCase()}.
- **Liquidity**: High demand in secondary markets.
- **Interest Rate Sensitivity**: Moderate.

**Recommendation:**
${isHighYield
            ? `Aggressive investors should **BUY** for yield maximization. Conservative investors should limit exposure to 10% of portfolio.`
            : `Strongly recommended for **Conservative Portfolios** seeking capital preservation.`}
  `;

    return {
        success: true,
        data: {
            analysis: analysisText.trim(),
            score: score,
            sentiment: sentiment,
            tags: isHighYield ? ['High Yield', 'Volatile'] : ['Stable', 'Long Term']
        }
    };
}
