package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String district;
    private String type;
    private Double previousYearCutoff;

    public College() {
    }

    public College(String name, String district, String type, Double previousYearCutoff) {
        this.name = name;
        this.district = district;
        this.type = type;
        this.previousYearCutoff = previousYearCutoff;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPreviousYearCutoff() {
        return previousYearCutoff;
    }

    public void setPreviousYearCutoff(Double previousYearCutoff) {
        this.previousYearCutoff = previousYearCutoff;
    }
}
