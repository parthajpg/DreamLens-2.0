package com.dreamlens.dto;

public class TheoreticalExplanationDto {
    private String school;
    private String theory;
    private String empiricalStatus;

    public TheoreticalExplanationDto() {}

    public TheoreticalExplanationDto(String school, String theory, String empiricalStatus) {
        this.school = school;
        this.theory = theory;
        this.empiricalStatus = empiricalStatus;
    }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public String getTheory() { return theory; }
    public void setTheory(String theory) { this.theory = theory; }

    public String getEmpiricalStatus() { return empiricalStatus; }
    public void setEmpiricalStatus(String empiricalStatus) { this.empiricalStatus = empiricalStatus; }
}
