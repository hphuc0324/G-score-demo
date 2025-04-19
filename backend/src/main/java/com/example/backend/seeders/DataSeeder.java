package com.example.backend.seeders;

import com.example.backend.models.Language;
import com.example.backend.models.StudentScore;
import com.example.backend.repositories.LanguageRepository;
import com.example.backend.repositories.StudentScoreRepository;
import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ResourceLoader resourceLoader;
    private final StudentScoreRepository studentScoreRepository;
    private final LanguageRepository languageRepository;

    @Override
    public void run(String... args) throws Exception {
        if(studentScoreRepository.count() > 0){
            return;
        }

        System.out.println("Loading data...");

        Resource resource = resourceLoader.getResource("classpath:static/diem_thi_thpt_2024.csv");


        if(!resource.exists()){
            throw new RuntimeException("Resource not found");
        }

        List<StudentScore> studentScores = new ArrayList<>();
        int batchSize = 1000;

        System.out.println("Importing data...");

        try(CSVReader reader = new CSVReader(new FileReader(resource.getFile()))){

            reader.readNext();
            String[] record;
            while((record = reader.readNext()) != null){
                StudentScore student = parseRecord(record);

                studentScores.add(student);

                if(studentScores.size() >= batchSize){
                    studentScoreRepository.saveAll(studentScores);
                    studentScores.clear();
                }
            }
        }

        if(!studentScores.isEmpty()){
            studentScoreRepository.saveAll(studentScores);
        }

        System.out.println("Data imported successfully");
    }

    private StudentScore parseRecord(String[] record){
        return StudentScore.builder()
                .id(record[0])
                .math(parseFloat(record[1]))
                .literature(parseFloat(record[2]))
                .foreignLanguage(parseFloat(record[3]))
                .physics(parseFloat(record[4]))
                .chemistry(parseFloat(record[5]))
                .biology(parseFloat(record[6]))
                .history(parseFloat(record[7]))
                .geography(parseFloat(record[8]))
                .civicEducation(parseFloat(record[9]))
                .language(parseLanguage(record[10]))
                .build();
    }

    private Float parseFloat(String point){
        if(point == null || point.trim().isEmpty()){
            return null;
        }

        try{
            return Float.parseFloat(point);
        }catch (NumberFormatException e){
            return null;
        }
    }

    private Language parseLanguage(String key){
        if(key == null || key.trim().isEmpty()){
            return null;
        }

       return languageRepository.findById(key).orElse(null);
    }
}
