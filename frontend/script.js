document.addEventListener("DOMContentLoaded", () => {

    // Core Elements
    const districtSelect = document.getElementById("district");
    const searchForm = document.getElementById("search-form");
    const cutoffInput = document.getElementById("cutoff");
    const typeSelect = document.getElementById("type");
    const submitBtn = document.getElementById("submit-btn");

    // State Containers
    const collegeGrid = document.getElementById("college-grid");
    const resultsHeader = document.getElementById("results-header");
    const resultCount = document.getElementById("result-count");
    const downloadBtn = document.getElementById("download-btn");
    const emptyState = document.getElementById("empty-state");
    const loadingState = document.getElementById("loading-state");

    const BASE_URL = 'http://localhost:5000/api/colleges';

    // Fallback data if DB is down
    const FALLBACK_DISTRICTS = ['Erode', 'Tiruppur', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Vellore', 'Kanniyakumari', 'Thanjavur', 'Tirunelveli', 'Kanchipuram'];
    const FALLBACK_COLLEGES = [
        { _id: '1', name: 'J K K Munirajah College of Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 146.5 },
        { _id: '2', name: 'Nandha College of Technology', district: 'Erode', type: 'Autonomous', previousYearCutoff: 153.0 },
        { _id: '3', name: 'Surya Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 140.25 },
        { _id: '4', name: 'Shree Venkateshwara Hi-Tech Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 135.25 },
        { _id: '5', name: 'Erode Builder Educational Trusts Group of Institutions', district: 'Tiruppur', type: 'Autonomous', previousYearCutoff: 181.5 },
        { _id: '6', name: 'M P Nachimuthu M Jaganathan Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 147.0 },
        { _id: '7', name: 'Aishwarya College of Engineering and Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 153.25 },
        { _id: '8', name: 'Vidhya Mandhir Institute of Technology', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 144.0 },
        { _id: '9', name: 'Erode Sengunthar Engineering College', district: 'Erode', type: 'Autonomous', previousYearCutoff: 172.0 },
        { _id: '10', name: 'Al-Ameen Engineering College', district: 'Erode', type: 'Non-Autonomous', previousYearCutoff: 144.75 },
        { _id: '11', name: 'University Departments of Anna University, Chennai - CEG Campus', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 199.5 },
        { _id: '12', name: 'University Departments of Anna University, Chennai - ACT Campus', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 197.5 },
        { _id: '13', name: 'Central Institute of Plastics Engineering and Technology', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 190.75 },
        { _id: '14', name: 'Loyola - ICAM College of Engineering and Technology', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
        { _id: '15', name: 'Meenakshi College of Engineering', district: 'Chennai', type: 'Non-Autonomous', previousYearCutoff: 182.5 },
        { _id: '16', name: 'Government College of Technology (GCT)', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 197.5 },
        { _id: '17', name: 'PSG College of Technology', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 199 },
        { _id: '18', name: 'Coimbatore Institute of Technology (CIT)', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 198 },
        { _id: '19', name: 'Dr Mahalingam College of Engineering & Technology', district: 'Coimbatore', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
        { _id: '20', name: 'Thiagarajar College of Engineering', district: 'Madurai', type: 'Non-Autonomous', previousYearCutoff: 198 },
        { _id: '21', name: 'Velammal College of Engineering and Technology', district: 'Madurai', type: 'Non-Autonomous', previousYearCutoff: 191.25 },
        { _id: '22', name: 'University College of Engineering, Tiruchirappalli', district: 'Tiruchirappalli', type: 'Non-Autonomous', previousYearCutoff: 192.75 },
        { _id: '23', name: 'J J College of Engineering and Technology', district: 'Tiruchirappalli', type: 'Non-Autonomous', previousYearCutoff: 170.5 },
        { _id: '24', name: 'Government College of Engineering - Salem', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 196.0 },
        { _id: '25', name: 'Sona College of Technology', district: 'Salem', type: 'Autonomous', previousYearCutoff: 192.5 },
        { _id: '26', name: 'The Kavery Engineering College', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 161.75 },
        { _id: '27', name: 'Knowledge Institute of Technology', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 174.25 },
        { _id: '28', name: 'Annapoorana Engineering College', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 113.75 },
        { _id: '29', name: 'Tagore Institute of Engineering and Technology', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 125.0 },
        { _id: '30', name: 'Greentech College of Engineering for Women', district: 'Salem', type: 'Non-Autonomous', previousYearCutoff: 130.75 },
        { _id: '31', name: 'Sree Krishna College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 108.25 },
        { _id: '32', name: 'Adhiparasakthi College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 159.25 },
        { _id: '33', name: 'C Abdul Hakeem College of Engineering and Technology', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 175.0 },
        { _id: '34', name: 'Priyadarshini Engineering College', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 158.75 },
        { _id: '35', name: 'Ranippettai Engineering College', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 129.75 },
        { _id: '36', name: 'Sri Nandhanam College of Engineering and Technology', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 141.25 },
        { _id: '37', name: 'Saraswathi Velu College of Engineering', district: 'Vellore', type: 'Non-Autonomous', previousYearCutoff: 116.25 },
        { _id: '38', name: 'University College of Engineering, Nagercoil', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 189.75 },
        { _id: '39', name: 'Maria College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 141.75 },
        { _id: '40', name: 'Mar Ephraem College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 135.0 },
        { _id: '41', name: 'Sivaji College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 118.5 },
        { _id: '42', name: 'Satyam College of Engineering and Technology', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 106.5 },
        { _id: '43', name: 'Arunachala College of Engineering for Women', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 157.0 },
        { _id: '44', name: 'Vins Christian Women\'s College of Engineering', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 146.25 },
        { _id: '45', name: 'Stella Mary\'s College of Engineering', district: 'Kanniyakumari', type: 'Non-Autonomous', previousYearCutoff: 153.5 },
        { _id: '46', name: 'University College of Engineering, Pattukkottai', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 178.75 },
        { _id: '47', name: 'SMR East Coast College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 127.5 },
        { _id: '48', name: 'Star Lion College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 96.25 },
        { _id: '49', name: 'Arasu Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 156.0 },
        { _id: '50', name: 'P.R. Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 134.25 },
        { _id: '51', name: 'Ponnaiyah Ramajayam College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 137.5 },
        { _id: '52', name: 'St. Joseph\'s College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 138.0 },
        { _id: '53', name: 'Parisutham Institute of Technology and Science', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 168.0 },
        { _id: '54', name: 'Vandayar Engineering College', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 120.0 },
        { _id: '55', name: 'Annai College of Engineering and Technology', district: 'Thanjavur', type: 'Non-Autonomous', previousYearCutoff: 120.75 },
        { _id: '56', name: 'Thamirabharani Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 111.0 },
        { _id: '57', name: 'SCAD Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 133.0 },
        { _id: '58', name: 'A R College of Engineering and Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 112.25 },
        { _id: '59', name: 'Arul College of Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 99.5 },
        { _id: '60', name: 'Cape Institute of Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 155.75 },
        { _id: '61', name: 'Francis Xavier Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 171.75 },
        { _id: '62', name: 'Joe Suresh Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 108.0 },
        { _id: '63', name: 'National College of Engineering', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 164.75 },
        { _id: '64', name: 'PSN College of Engineering and Technology', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 158.5 },
        { _id: '65', name: 'PET Engineering College', district: 'Tirunelveli', type: 'Non-Autonomous', previousYearCutoff: 158.25 },
        { _id: '66', name: 'University Departments of Anna University, Chennai - MIT Campus', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 198.67 },
        { _id: '67', name: 'University College of Engineering, Kanchipuram', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 186.25 },
        { _id: '68', name: 'Arignar Anna Institute of Science and Technology', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 147.75 },
        { _id: '69', name: 'D M I College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 162.0 },
        { _id: '70', name: 'Kalsar College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 132.0 },
        { _id: '71', name: 'Lord Venkateshwaraa Engineering College', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 176.5 },
        { _id: '72', name: 'Maamallan Institute of Technology', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 179.5 },
        { _id: '73', name: 'Pallavan College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 168.75 },
        { _id: '74', name: 'P B College of Engineering', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 167.0 },
        { _id: '75', name: 'Prince Shri Venkateshwara Padmavathy Engineering College', district: 'Kanchipuram', type: 'Non-Autonomous', previousYearCutoff: 188.5 }
    ];

    // Initialization
    async function fetchDistricts() {
        try {
            const res = await fetch(`${BASE_URL}/districts`);
            if (!res.ok) throw new Error('Network response DB down');
            const data = await res.json();
            populateDistrictsDropdown(data);
        } catch (error) {
            console.warn('Failed fetching districts from DB. Using fallback local data.');
            populateDistrictsDropdown(FALLBACK_DISTRICTS);
        }
    }

    function populateDistrictsDropdown(districtsList) {
        districtsList.forEach(d => {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            districtSelect.appendChild(option);
        });
    }

    // Handle Form Submit
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset View States
        collegeGrid.innerHTML = '';
        collegeGrid.classList.remove('active');
        resultsHeader.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        emptyState.classList.add('hidden');
        loadingState.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i><span>Searching...</span>';

        // Gather Filters
        const cutoffValue = Number(cutoffInput.value);
        const districtValue = districtSelect.value;
        const typeValue = typeSelect.value;

        // Fetch mechanism
        let results = [];
        try {
            const queryParams = new URLSearchParams({
                cutoff: cutoffValue,
                district: districtValue,
                type: typeValue
            });

            const res = await fetch(`${BASE_URL}?${queryParams}`);
            if (!res.ok) throw new Error('API down');

            results = await res.json();

            // Introduce a small deliberate delay so the user feels the seamless animation of loading
            await new Promise(resolve => setTimeout(resolve, 600));

        } catch (error) {
            console.warn('Search failed via DB. Using fallback mocked logic.');
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate latency

            results = FALLBACK_COLLEGES.filter(c => {
                let match = true;
                if (cutoffValue && c.previousYearCutoff > cutoffValue) match = false;
                if (districtValue !== 'All' && c.district !== districtValue) match = false;
                if (typeValue !== 'All' && c.type !== typeValue) match = false;
                return match;
            });
        }

        renderResults(results);

        // Reset Button State
        loadingState.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ph-bold ph-magnifying-glass"></i><span>Predict Colleges</span>';
    });

    function renderResults(collegesList) {
        // Handle Empty state
        collegeGrid.innerHTML = '';
        if (collegesList.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        // Show Results Header
        resultCount.textContent = `Found ${collegesList.length} ${collegesList.length === 1 ? 'College' : 'Colleges'}`;
        resultsHeader.classList.remove('hidden');
        downloadBtn.classList.remove('hidden');

        // Generate Data Grid (Table)
        const tableContainer = document.createElement('div');
        tableContainer.className = 'data-grid-container fade-in-up';

        let tableHTML = `
            <table class="data-grid glass-panel">
                <thead>
                    <tr>
                        <th>College Name</th>
                        <th>District</th>
                        <th>Type</th>
                        <th>Max Cutoff</th>
                    </tr>
                </thead>
                <tbody>
        `;

        collegesList.forEach((college, idx) => {
            const badgeClass = college.type === 'Autonomous' ? 'badge-autonomous' : 'badge-non-autonomous';
            tableHTML += `
                <tr style="animation-delay: ${idx * 0.05}s" class="grid-row">
                    <td class="primary-cell">${college.name}</td>
                    <td><i class="ph-fill ph-map-pin map-icon"></i> ${college.district}</td>
                    <td><span class="badge ${badgeClass}">${college.type}</span></td>
                    <td class="cutoff-cell"><i class="ph-bold ph-target" style="color:var(--accent-secondary)"></i> ${college.previousYearCutoff.toFixed(2)}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = tableHTML;
        collegeGrid.appendChild(tableContainer);
        collegeGrid.classList.add('active');
    }

    // PDF Download Handler
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('college-grid');

        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Generating...';
        downloadBtn.disabled = true;

        // Apply dark mode overrides for pure canvas capture
        element.classList.add('pdf-export-mode');

        // Dynamically calculate exact dimensions so it perfectly fits strictly on ONE page
        // Adding padding to ensure it fits comfortably
        const elementWidth = element.scrollWidth > 1000 ? element.scrollWidth : 1000;
        const widthInInches = (elementWidth + 40) / 96;
        const heightInInches = (element.scrollHeight + 40) / 96;

        const opt = {
            margin: 0.2,
            filename: 'tnea_colleges_report.pdf',
            image: { type: 'png' }, // Lossless PNG guarantees no blurriness
            html2canvas: {
                scale: 2, // High resolution while protecting GPU limits
                backgroundColor: '#0d0f1a',
                useCORS: true
            },
            // Custom jsPDF format array strictly locks to table dimension limits
            jsPDF: {
                unit: 'in',
                format: [widthInInches, heightInInches],
                orientation: heightInInches > widthInInches ? 'portrait' : 'landscape'
            }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.classList.remove('pdf-export-mode');
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error("PDF generation failed", err);
            element.classList.remove('pdf-export-mode');
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        });
    });

    // Bootstrap app
    fetchDistricts();
});
