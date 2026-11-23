package com.dreamlens.controller;

import com.dreamlens.dto.InterpretationRequest;
import com.dreamlens.dto.InterpretationResponse;
import com.dreamlens.service.AIOrchestratorService;
import com.dreamlens.service.KnowledgeBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class DreamInterpretationController {

    private final AIOrchestratorService aiOrchestratorService;
    private final KnowledgeBaseService knowledgeBaseService;

    public DreamInterpretationController(AIOrchestratorService aiOrchestratorService, KnowledgeBaseService knowledgeBaseService) {
        this.aiOrchestratorService = aiOrchestratorService;
        this.knowledgeBaseService = knowledgeBaseService;
    }

    @PostMapping("/interpret")
    public ResponseEntity<InterpretationResponse> interpretDream(@RequestBody InterpretationRequest request) {
        if (request.getDreamText() == null || request.getDreamText().trim().length() < 5) {
            return ResponseEntity.badRequest().build();
        }
        InterpretationResponse response = aiOrchestratorService.interpret(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "DreamLens 2.0 Backend",
                "psychologyChunks", knowledgeBaseService.getPsychologyChunks().size(),
                "mythologyChunks", knowledgeBaseService.getMythologyChunks().size(),
                "timestamp", System.currentTimeMillis()
        ));
    }
}
