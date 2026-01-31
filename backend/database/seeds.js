require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Bond = require('../src/models/Bond');
const Portfolio = require('../src/models/Portfolio');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bond_platform');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Bond.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create demo users
    const users = await User.create([
      {
        email: 'admin@bondplatform.demo',
        password: 'Admin@CIH2026',
        name: 'Admin User',
        subscription_tier: 'enterprise',
        kyc_status: 'verified'
      },
      {
        email: 'premium@bondplatform.demo',
        password: 'Premium@CIH2026',
        name: 'Premium Investor',
        subscription_tier: 'premium',
        kyc_status: 'verified'
      },
      {
        email: 'basic@bondplatform.demo',
        password: 'Basic@CIH2026',
        name: 'Basic Investor',
        subscription_tier: 'basic',
        kyc_status: 'pending'
      },
      {
        email: 'free@bondplatform.demo',
        password: 'Free@CIH2026',
        name: 'Free User',
        subscription_tier: 'free',
        kyc_status: 'pending'
      }
    ]);
    console.log(`✓ Created ${users.length} demo users`);

    // Create sample bonds
    const bonds = await Bond.create([
      {
        bond_id: 'NHAI-2026-01',
        name: 'NHAI Highway Green Bond',
        issuer: 'National Highways Authority',
        issue_date: new Date('2026-01-15'),
        maturity_date: new Date('2031-01-15'),
        coupon_rate: 7.5,
        current_price: 5000,
        expected_returns: 9.2,
        risk_category: 'low',
        units_available: 75000,
        description: 'Sustainable highway infrastructure development across India with carbon offset tracking.'
      },
      {
        bond_id: 'MUMB-PORT-26',
        name: 'Mumbai Port Modernization',
        issuer: 'Mumbai Port Trust',
        issue_date: new Date('2026-02-01'),
        maturity_date: new Date('2033-06-15'),
        coupon_rate: 8.2,
        current_price: 10000,
        expected_returns: 10.5,
        risk_category: 'medium',
        units_available: 45000,
        description: 'Deep water port expansion and logistics automation infrastructure.'
      },
      {
        bond_id: 'SOLAR-SE-26',
        name: 'Solar Energy Grid Exp.',
        issuer: 'Solar Energy Corp of India',
        issue_date: new Date('2026-01-20'),
        maturity_date: new Date('2036-01-15'),
        coupon_rate: 6.8,
        current_price: 1000,
        expected_returns: 8.5,
        risk_category: 'low',
        units_available: 150000,
        description: 'Large scale solar park development in Rajasthan and Gujarat.'
      },
      {
        bond_id: 'IRF-TECH-26',
        name: 'Indian Railways Tech Upgrade',
        issuer: 'Indian Railways Finance',
        issue_date: new Date('2026-03-10'),
        maturity_date: new Date('2031-03-10'),
        coupon_rate: 7.1,
        current_price: 5000,
        expected_returns: 7.8,
        risk_category: 'low',
        units_available: 80000,
        description: 'Implementation of Kavach safety system and high-speed rail corridors.'
      },
      {
        bond_id: 'BLR-METRO-26',
        name: 'Bangalore Metro Phase 3',
        issuer: 'BMRCL',
        issue_date: new Date('2026-04-01'),
        maturity_date: new Date('2034-04-01'),
        coupon_rate: 7.9,
        current_price: 2500,
        expected_returns: 9.8,
        risk_category: 'medium',
        units_available: 60000,
        description: 'Expansion of metro lines into tech corridors and suburban areas.'
      },
      {
        bond_id: 'SMART-PUNE',
        name: 'Pune Smart City Bond',
        issuer: 'Pune Municipal Corp',
        issue_date: new Date('2026-02-15'),
        maturity_date: new Date('2029-02-15'),
        coupon_rate: 8.5,
        current_price: 1000,
        expected_returns: 11.2,
        risk_category: 'high',
        units_available: 30000,
        description: 'Integrated traffic management and smart street lighting projects.'
      },
      {
        bond_id: 'GANG-CLEAN',
        name: 'Clean Ganga Initiative',
        issuer: 'National Mission for Clean Ganga',
        issue_date: new Date('2026-01-10'),
        maturity_date: new Date('2036-01-10'),
        coupon_rate: 6.5,
        current_price: 1000,
        expected_returns: 7.0,
        risk_category: 'low',
        units_available: 200000,
        description: 'River rejuvenation and sewage treatment plant construction.'
      },
      {
        bond_id: 'HYD-ORR-26',
        name: 'Hyderabad Outer Ring Road',
        issuer: 'HMDA',
        issue_date: new Date('2026-05-20'),
        maturity_date: new Date('2032-05-20'),
        coupon_rate: 9.0,
        current_price: 10000,
        expected_returns: 12.5,
        risk_category: 'high',
        units_available: 15000,
        description: 'Commercial development zones along the outer ring road.'
      },
      {
        bond_id: 'DIGI-INFRA',
        name: 'Digital India Infrastructure',
        issuer: 'Bharat Broadband Network',
        issue_date: new Date('2026-03-01'),
        maturity_date: new Date('2030-03-01'),
        coupon_rate: 7.4,
        current_price: 2000,
        expected_returns: 8.8,
        risk_category: 'medium',
        units_available: 95000,
        description: 'Fiber optic network expansion to 50,000 gram panchayats.'
      },
      {
        bond_id: 'WIND-OFFSHORE',
        name: 'Tamil Nadu Offshore Wind',
        issuer: 'TANGEDCO',
        issue_date: new Date('2026-06-15'),
        maturity_date: new Date('2041-06-15'),
        coupon_rate: 8.1,
        current_price: 5000,
        expected_returns: 9.9,
        risk_category: 'medium',
        units_available: 40000,
        description: 'Development of India\'s first offshore wind energy farm.'
      }
    ]);
    console.log(`✓ Created ${bonds.length} sample bonds`);

    // Create portfolios for each user with initial holdings
    const portfolios = await Portfolio.create([
      {
        user_id: users[0]._id,
        total_invested: 5000000,
        current_value: 5250000,
        holdings: [
          { bond_id: bonds[0]._id, units: 500, average_price: 5000 },
          { bond_id: bonds[1]._id, units: 400, average_price: 5000 },
          { bond_id: bonds[2]._id, units: 300, average_price: 5000 }
        ]
      },
      {
        user_id: users[1]._id,
        total_invested: 2500000,
        current_value: 2625000,
        holdings: [
          { bond_id: bonds[0]._id, units: 250, average_price: 5000 },
          { bond_id: bonds[3]._id, units: 200, average_price: 5000 }
        ]
      },
      {
        user_id: users[2]._id,
        total_invested: 1000000,
        current_value: 1050000,
        holdings: [
          { bond_id: bonds[2]._id, units: 100, average_price: 5000 }
        ]
      },
      {
        user_id: users[3]._id,
        total_invested: 0,
        current_value: 0,
        holdings: []
      }
    ]);
    console.log(`✓ Created ${portfolios.length} portfolios`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('  Admin: admin@bondplatform.demo / Admin@CIH2026');
    console.log('  Premium: premium@bondplatform.demo / Premium@CIH2026');
    console.log('  Basic: basic@bondplatform.demo / Basic@CIH2026');
    console.log('  Free: free@bondplatform.demo / Free@CIH2026');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
