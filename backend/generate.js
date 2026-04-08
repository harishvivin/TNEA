const fs = require('fs');
const content = fs.readFileSync('d:/TNEA/backend/seed.js', 'utf8');
const match = content.match(/const mockColleges = (\[[\s\S]*?\]);/);
if (match) {
    const func = new Function(`return ${match[1]};`);
    const mockColleges = func();
    let sql = '';
    mockColleges.forEach(c => {
        sql += `INSERT INTO college (name, district, type, previous_year_cutoff) VALUES ('${c.name.replace(/'/g, "''")}', '${c.district}', '${c.type}', ${c.previousYearCutoff});\n`;
    });
    fs.writeFileSync('d:/TNEA/backend/src/main/resources/data.sql', sql);
    console.log('Success');
}
