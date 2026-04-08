package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

    @Query("SELECT DISTINCT c.district FROM College c ORDER BY c.district ASC")
    List<String> findDistinctDistrict();

    @Query("SELECT c FROM College c WHERE " +
           "(:cutoff IS NULL OR c.previousYearCutoff <= :cutoff) AND " +
           "(:district IS NULL OR c.district = :district) AND " +
           "(:type IS NULL OR c.type = :type) " +
           "ORDER BY c.previousYearCutoff DESC")
    List<College> findByFilters(@org.springframework.data.repository.query.Param("cutoff") Double cutoff, 
                                @org.springframework.data.repository.query.Param("district") String district, 
                                @org.springframework.data.repository.query.Param("type") String type);
}
