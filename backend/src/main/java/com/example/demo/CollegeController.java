package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin(origins = "*") // Allow requests from our frontend
public class CollegeController {

    private final CollegeRepository collegeRepository;

    @Autowired
    public CollegeController(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @GetMapping("/districts")
    public List<String> getDistricts() {
        return collegeRepository.findDistinctDistrict();
    }

    @GetMapping
    public List<College> getColleges(
            @RequestParam(required = false) Double cutoff,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String type) {

        // The JS frontend sends 'All' for district and type when no filter is applied.
        String filterDistrict = (district != null && !district.equals("All")) ? district : null;
        String filterType = (type != null && !type.equals("All")) ? type : null;

        return collegeRepository.findByFilters(cutoff, filterDistrict, filterType);
    }
}
