const mongoose = require('mongoose');
const College = require('./models/College');

const MONGO_URI = 'mongodb://localhost:27017/tnea-predictor';

const mockColleges = [
  { name: 'J K K Munirajah College of Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 146.5 },
  { name: 'Nandha College of Technology', district: 'Erode', type: 'Autonomous', previousYearCutoff: 153.0 },
  { name: 'Surya Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 140.25 },
  { name: 'Shree Venkateshwara Hi-Tech Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 135.25 },
  { name: 'Erode Builder Educational Trusts Group of Institutions', district: 'Tiruppur', type: 'Autonomous', previousYearCutoff: 181.5 },
  { name: 'M P Nachimuthu M Jaganathan Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 147.0 },
  { name: 'Aishwarya College of Engineering and Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 153.25 },
  { name: 'Vidhya Mandhir Institute of Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 144.0 },
  { name: 'Erode Sengunthar Engineering College', district: 'Erode', type: 'Autonomous', previousYearCutoff: 172.0 },
  { name: 'Al-Ameen Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 144.75 },
  { name: 'University Departments of Anna University, Chennai - CEG Campus', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 199.5 },
  { name: 'University Departments of Anna University, Chennai - ACT Campus', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 197.5 },
  { name: 'Central Institute of Plastics Engineering and Technology', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 190.75 },
  { name: 'Loyola - ICAM College of Engineering and Technology', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
  { name: 'Meenakshi College of Engineering', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 182.5 },
  { name: 'Government College of Technology (GCT)', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 197.5 },
  { name: 'PSG College of Technology', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 199.0 },
  { name: 'Coimbatore Institute of Technology (CIT)', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 198.0 },
  { name: 'Dr Mahalingam College of Engineering & Technology', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
  { name: 'Thiagarajar College of Engineering', district: 'Madurai', type: 'Non-Autonomous', previousYearCutoff: 198.0 },
  { name: 'Velammal College of Engineering and Technology', district: 'Madurai', type: 'Non-Autonomous', previousYearCutoff: 191.25 },
  { name: 'University College of Engineering, Tiruchirappalli', district: 'Tiruchirappalli', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
  { name: 'J J College of Engineering and Technology', district: 'Tiruchirappalli', type: 'Non-Autonomous', previousYearCutoff: 170.5 },
  { name: 'Government College of Engineering - Salem', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 196.0 },
  { name: 'Sona College of Technology', district: 'Salem', type: 'Autonomous', previousYearCutoff: 192.5 },
  { name: 'The Kavery Engineering College', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 161.75 },
  { name: 'Knowledge Institute of Technology', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 174.25 },
  { name: 'Annapoorana Engineering College', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 113.75 },
  { name: 'Tagore Institute of Engineering and Technology', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 125.0 },
  { name: 'Greentech College of Engineering for Women', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 130.75 },
  { name: 'Sree Krishna College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 108.25 },
  { name: 'Adhiparasakthi College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 159.25 },
  { name: 'C Abdul Hakeem College of Engineering and Technology', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 175.0 },
  { name: 'Priyadarshini Engineering College', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 158.75 },
  { name: 'Ranippettai Engineering College', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 129.75 },
  { name: 'Sri Nandhanam College of Engineering and Technology', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 141.25 },
  { name: 'Saraswathi Velu College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 116.25 },
  { name: 'University College of Engineering, Nagercoil', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 189.75 },
  { name: 'Maria College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 141.75 },
  { name: 'Mar Ephraem College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 135.0 },
  { name: 'Sivaji College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 118.5 },
  { name: 'Satyam College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 106.5 },
  { name: 'Arunachala College of Engineering for Women', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 157.0 },
  { name: 'Vins Christian Women\'s College of Engineering', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 146.25 },
  { name: 'Stella Mary\'s College of Engineering', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 153.5 },
  { name: 'University College of Engineering, Pattukkottai', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 178.75 },
  { name: 'SMR East Coast College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 127.5 },
  { name: 'Star Lion College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 96.25 },
  { name: 'Arasu Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 156.0 },
  { name: 'P.R. Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 134.25 },
  { name: 'Ponnaiyah Ramajayam College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 137.5 },
  { name: 'St. Joseph\'s College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 138.0 },
  { name: 'Parisutham Institute of Technology and Science', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 168.0 },
  { name: 'Vandayar Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 120.0 },
  { name: 'Annai College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 120.75 },
  { name: 'Thamirabharani Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 111.0 },
  { name: 'SCAD Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 133.0 },
  { name: 'A R College of Engineering and Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 112.25 },
  { name: 'Arul College of Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 99.5 },
  { name: 'Cape Institute of Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 155.75 },
  { name: 'Francis Xavier Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 171.75 },
  { name: 'Joe Suresh Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 108.0 },
  { name: 'National College of Engineering', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 164.75 },
  { name: 'PSN College of Engineering and Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 158.5 },
  { name: 'PET Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 158.25 },
  { name: 'University Departments of Anna University, Chennai - MIT Campus', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 198.67 },
  { name: 'University College of Engineering, Kanchipuram', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 186.25 },
  { name: 'Arignar Anna Institute of Science and Technology', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 147.75 },
  { name: 'D M I College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 162.0 },
  { name: 'Kalsar College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 132.0 },
  { name: 'Lord Venkateshwaraa Engineering College', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 176.5 },
  { name: 'Maamallan Institute of Technology', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 179.5 },
  { name: 'Pallavan College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 168.75 },
  { name: 'P B College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 167.0 },
  { name: 'Prince Shri Venkateshwara Padmavathy Engineering College', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 188.5 }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing previous entries...');
    await College.deleteMany({});
    console.log('Inserting custom college data...');
    await College.insertMany(mockColleges);
    console.log('Seeding Success!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed', err);
    process.exit(1);
  });
