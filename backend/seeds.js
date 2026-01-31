const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bond = require('./src/models/Bond');
const User = require('./src/models/User'); // Ensure path is correct

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Data Generators
const sectors = ['Infrastructure', 'Green Energy', 'Power', 'Transportation', 'Banking', 'Fintech', 'Real Estate', 'Healthcare'];
const issuers_infra = ['NHAI', 'IRFC', 'PFC', 'REC', 'HUDCO'];
const issuers_corp = ['HDFC', 'Reliance', 'Tata', 'Adani', 'L&T', 'SBI', 'Bajaj Finance'];
const cities = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Indore'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const generateBonds = (count) => {
  const bonds = [];

  for (let i = 0; i < count; i++) {
    const isGovt = Math.random() > 0.6;
    const isGreen = Math.random() > 0.8;
    const sector = isGovt ? 'Infrastructure' : getRandomElement(sectors);

    let issuer, prefix;
    if (isGovt) {
      issuer = getRandomElement(issuers_infra);
      prefix = 'GOI';
    } else {
      issuer = getRandomElement(issuers_corp);
      prefix = issuer.substring(0, 3).toUpperCase();
    }

    const maturityYear = getRandomInt(2025, 2035);
    const coupon = isGovt ? getRandomFloat(6.5, 7.8) : getRandomFloat(8.0, 11.5);
    const risk = isGovt ? 'low' : (parseFloat(coupon) > 9.5 ? 'high' : 'medium');
    const rating = isGovt ? 'SOV' : (parseFloat(coupon) > 10 ? 'AA' : 'AAA');

    const bondId = `${prefix}${maturityYear}${String.fromCharCode(65 + getRandomInt(0, 25))}${getRandomInt(100, 999)}`;
    const name = `${issuer} ${isGreen ? 'Green ' : ''}${isGovt ? 'Tax-Free ' : ''}Bond ${maturityYear}`;

    bonds.push({
      bond_id: bondId,
      name: name,
      description: `Secured ${isGovt ? 'government guaranteed' : 'corporate'} bonds for financing ${sector.toLowerCase()} projects in ${getRandomElement(cities)}.`,
      issuer: issuer,
      issue_date: new Date(2023, getRandomInt(0, 11), getRandomInt(1, 28)),
      maturity_date: new Date(maturityYear, getRandomInt(0, 11), getRandomInt(1, 28)),
      par_value: 1000,
      coupon_rate: coupon,
      coupon_frequency: getRandomElement(['annual', 'semi-annual']),
      current_price: 1000 * (1 + (Math.random() * 0.1 - 0.05)), // +/- 5%
      risk_category: risk,
      credit_rating: rating,
      expected_returns: coupon,
      units_available: getRandomInt(5000, 50000),
      sector: sector,
      status: 'active',
      ai_recommendation_score: getRandomFloat(5.0, 9.9)
    });
  }
  return bonds;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Bond.deleteMany({});
    console.log('Cleared existing bonds');

    // Generate 1000 Bonds
    const bonds = generateBonds(1000);
    await Bond.insertMany(bonds);
    console.log(`Successfully seeded ${bonds.length} bonds`);

    mongoose.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
