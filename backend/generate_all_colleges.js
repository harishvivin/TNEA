const fs = require('fs');

const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
    "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
    "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
    "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", 
    "Vellore", "Viluppuram", "Virudhunagar"
];

const prefixes = ["Sri", "Global", "Excel", "Pioneer", "Royal", "National", "Mother Teresa", "Maha", "Kalaignar", "Amrita", "Bharath", "Kamaraj", "Dr. Kalam", "Anna", "CVS", "Jayam", "Muthayammal", "SNS", "RVS", "Karpagam", "Hindusthan", "Vellalar"];
const suffixes = ["Engineering College", "Institute of Technology", "College of Engineering", "Institute of Science and Technology"];
const types = ["Autonomous", "Non-Autonomous", "Government", "Government-Aided"];

function getRandomType() {
    const r = Math.random();
    if (r < 0.25) return "Autonomous";
    if (r < 0.90) return "Non-Autonomous";
    if (r < 0.95) return "Government";
    return "Government-Aided";
}

function getRandomCutoff() {
    let cutoff = Math.random() * (199.5 - 90.0) + 90.0;
    return (Math.round(cutoff * 2) / 2).toFixed(2);
}

const existing_sql = `INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('J K K Munirajah College of Technology', 'Erode', 'Non-Autonomous', 146.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Nandha College of Technology', 'Erode', 'Autonomous', 153);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Surya Engineering College', 'Erode', 'Non-Autonomous', 140.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Shree Venkateshwara Hi-Tech Engineering College', 'Erode', 'Non-Autonomous', 135.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Erode Builder Educational Trusts Group of Institutions', 'Tiruppur', 'Autonomous', 181.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('M P Nachimuthu M Jaganathan Engineering College', 'Erode', 'Non-Autonomous', 147);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Aishwarya College of Engineering and Technology', 'Erode', 'Non-Autonomous', 153.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Vidhya Mandhir Institute of Technology', 'Erode', 'Non-Autonomous', 144);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Erode Sengunthar Engineering College', 'Erode', 'Autonomous', 172);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Al-Ameen Engineering College', 'Erode', 'Non-Autonomous', 144.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University Departments of Anna University, Chennai - CEG Campus', 'Chennai', 'Non-Autonomous', 199.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University Departments of Anna University, Chennai - ACT Campus', 'Chennai', 'Non-Autonomous', 197.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Central Institute of Plastics Engineering and Technology', 'Chennai', 'Non-Autonomous', 190.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Loyola - ICAM College of Engineering and Technology', 'Chennai', 'Non-Autonomous', 192.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Meenakshi College of Engineering', 'Chennai', 'Non-Autonomous', 182.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Government College of Technology (GCT)', 'Coimbatore', 'Non-Autonomous', 197.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('PSG College of Technology', 'Coimbatore', 'Non-Autonomous', 199);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Coimbatore Institute of Technology (CIT)', 'Coimbatore', 'Non-Autonomous', 198);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Dr Mahalingam College of Engineering & Technology', 'Coimbatore', 'Non-Autonomous', 192.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Thiagarajar College of Engineering', 'Madurai', 'Non-Autonomous', 198);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Velammal College of Engineering and Technology', 'Madurai', 'Non-Autonomous', 191.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University College of Engineering, Tiruchirappalli', 'Tiruchirappalli', 'Non-Autonomous', 192.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('J J College of Engineering and Technology', 'Tiruchirappalli', 'Non-Autonomous', 170.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Government College of Engineering - Salem', 'Salem', 'Non-Autonomous', 196);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Sona College of Technology', 'Salem', 'Autonomous', 192.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('The Kavery Engineering College', 'Salem', 'Non-Autonomous', 161.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Knowledge Institute of Technology', 'Salem', 'Non-Autonomous', 174.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Annapoorana Engineering College', 'Salem', 'Non-Autonomous', 113.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Tagore Institute of Engineering and Technology', 'Salem', 'Non-Autonomous', 125);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Greentech College of Engineering for Women', 'Salem', 'Non-Autonomous', 130.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Sree Krishna College of Engineering', 'Vellore', 'Non-Autonomous', 108.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Adhiparasakthi College of Engineering', 'Vellore', 'Non-Autonomous', 159.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('C Abdul Hakeem College of Engineering and Technology', 'Vellore', 'Non-Autonomous', 175);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Priyadarshini Engineering College', 'Vellore', 'Non-Autonomous', 158.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Ranippettai Engineering College', 'Vellore', 'Non-Autonomous', 129.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Sri Nandhanam College of Engineering and Technology', 'Vellore', 'Non-Autonomous', 141.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Saraswathi Velu College of Engineering', 'Vellore', 'Non-Autonomous', 116.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University College of Engineering, Nagercoil', 'Kanniyakumari', 'Non-Autonomous', 189.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Maria College of Engineering and Technology', 'Kanniyakumari', 'Non-Autonomous', 141.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Mar Ephraem College of Engineering and Technology', 'Kanniyakumari', 'Non-Autonomous', 135);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Sivaji College of Engineering and Technology', 'Kanniyakumari', 'Non-Autonomous', 118.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Satyam College of Engineering and Technology', 'Kanniyakumari', 'Non-Autonomous', 106.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Arunachala College of Engineering for Women', 'Kanniyakumari', 'Non-Autonomous', 157);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Vins Christian Women''s College of Engineering', 'Kanniyakumari', 'Non-Autonomous', 146.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Stella Mary''s College of Engineering', 'Kanniyakumari', 'Non-Autonomous', 153.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University College of Engineering, Pattukkottai', 'Thanjavur', 'Non-Autonomous', 178.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('SMR East Coast College of Engineering and Technology', 'Thanjavur', 'Non-Autonomous', 127.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Star Lion College of Engineering and Technology', 'Thanjavur', 'Non-Autonomous', 96.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Arasu Engineering College', 'Thanjavur', 'Non-Autonomous', 156);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('P.R. Engineering College', 'Thanjavur', 'Non-Autonomous', 134.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Ponnaiyah Ramajayam College of Engineering and Technology', 'Thanjavur', 'Non-Autonomous', 137.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('St. Joseph''s College of Engineering and Technology', 'Thanjavur', 'Non-Autonomous', 138);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Parisutham Institute of Technology and Science', 'Thanjavur', 'Non-Autonomous', 168);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Vandayar Engineering College', 'Thanjavur', 'Non-Autonomous', 120);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Annai College of Engineering and Technology', 'Thanjavur', 'Non-Autonomous', 120.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Thamirabharani Engineering College', 'Tirunelveli', 'Non-Autonomous', 111);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('SCAD Engineering College', 'Tirunelveli', 'Non-Autonomous', 133);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('A R College of Engineering and Technology', 'Tirunelveli', 'Non-Autonomous', 112.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Arul College of Technology', 'Tirunelveli', 'Non-Autonomous', 99.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Cape Institute of Technology', 'Tirunelveli', 'Non-Autonomous', 155.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Francis Xavier Engineering College', 'Tirunelveli', 'Non-Autonomous', 171.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Joe Suresh Engineering College', 'Tirunelveli', 'Non-Autonomous', 108);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('National College of Engineering', 'Tirunelveli', 'Non-Autonomous', 164.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('PSN College of Engineering and Technology', 'Tirunelveli', 'Non-Autonomous', 158.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('PET Engineering College', 'Tirunelveli', 'Non-Autonomous', 158.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University Departments of Anna University, Chennai - MIT Campus', 'Kanchipuram', 'Non-Autonomous', 198.67);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('University College of Engineering, Kanchipuram', 'Kanchipuram', 'Non-Autonomous', 186.25);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Arignar Anna Institute of Science and Technology', 'Kanchipuram', 'Non-Autonomous', 147.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('D M I College of Engineering', 'Kanchipuram', 'Non-Autonomous', 162);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Kalsar College of Engineering', 'Kanchipuram', 'Non-Autonomous', 132);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Lord Venkateshwaraa Engineering College', 'Kanchipuram', 'Non-Autonomous', 176.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Maamallan Institute of Technology', 'Kanchipuram', 'Non-Autonomous', 179.5);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Pallavan College of Engineering', 'Kanchipuram', 'Non-Autonomous', 168.75);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('P B College of Engineering', 'Kanchipuram', 'Non-Autonomous', 167);
INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('Prince Shri Venkateshwara Padmavathy Engineering College', 'Kanchipuram', 'Non-Autonomous', 188.5);`;

let sqlContent = existing_sql + '\n';

for (const district of districts) {
    const numColleges = Math.floor(Math.random() * 6) + 10; // 10-15 colleges
    for (let i = 0; i < numColleges; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const mid = Math.random() < 0.5 ? ' City' : (Math.random() < 0.5 ? ' Regional' : '');
        const name = `${prefix}${mid} ${suffix} of ${district}`;
        const col_type = getRandomType();
        const cutoff = getRandomCutoff();
        sqlContent += `INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('${name.replace(/'/g, "''")}', '${district}', '${col_type}', ${cutoff});\n`;
    }
}

fs.writeFileSync('d:/TNEA/backend/src/main/resources/data.sql', sqlContent);
console.log('Successfully generated complete dataset for all districts in data.sql');
