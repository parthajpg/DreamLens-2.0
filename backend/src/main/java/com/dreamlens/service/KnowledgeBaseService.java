package com.dreamlens.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class KnowledgeBaseService {

    @Value("${dreamlens.knowledge-base.path:knowledge-base/processed}")
    private String knowledgeBasePath;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<JsonNode> psychologyChunks = new ArrayList<>();
    private final List<JsonNode> mythologyChunks = new ArrayList<>();

    @PostConstruct
    public void init() {
        loadKnowledgeBase();
    }

    private void loadKnowledgeBase() {
        File psychDir = new File(knowledgeBasePath, "psychology");
        if (!psychDir.exists()) {
            psychDir = new File("../knowledge-base/processed/psychology");
        }
        if (psychDir.exists() && psychDir.isDirectory()) {
            File[] files = psychDir.listFiles((dir, name) -> name.endsWith(".json"));
            if (files != null) {
                for (File file : files) {
                    try {
                        JsonNode node = objectMapper.readTree(file);
                        if (node.isArray()) {
                            node.forEach(psychologyChunks::add);
                        }
                    } catch (IOException e) {
                        System.err.println("Could not load psychology knowledge file: " + file.getName());
                    }
                }
            }
        }

        File mythDir = new File(knowledgeBasePath, "mythology");
        if (!mythDir.exists()) {
            mythDir = new File("../knowledge-base/processed/mythology");
        }
        if (mythDir.exists() && mythDir.isDirectory()) {
            File[] files = mythDir.listFiles((dir, name) -> name.endsWith(".json"));
            if (files != null) {
                for (File file : files) {
                    try {
                        JsonNode node = objectMapper.readTree(file);
                        if (node.isArray()) {
                            node.forEach(mythologyChunks::add);
                        }
                    } catch (IOException e) {
                        System.err.println("Could not load mythology knowledge file: " + file.getName());
                    }
                }
            }
        }

        System.out.println("Loaded Knowledge Base: " + psychologyChunks.size() + " Psychology chunks, " 
                + mythologyChunks.size() + " Hindu Mythology chunks.");
    }

    public List<JsonNode> getPsychologyChunks() {
        return psychologyChunks;
    }

    public List<JsonNode> getMythologyChunks() {
        return mythologyChunks;
    }
}
