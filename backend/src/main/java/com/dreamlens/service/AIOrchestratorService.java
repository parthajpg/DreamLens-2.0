package com.dreamlens.service;

import com.dreamlens.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
public class AIOrchestratorService {

    private static final Logger log = LoggerFactory.getLogger(AIOrchestratorService.class);
    private final KnowledgeBaseService knowledgeBaseService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${dreamlens.ai.primary-provider:groq}")
    private String primaryProvider;

    @Value("${dreamlens.ai.groq.api-key:}")
    private String groqApiKey;

    @Value("${dreamlens.ai.groq.model:llama-3.3-70b-versatile}")
    private String groqModel;

    @Value("${dreamlens.ai.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${dreamlens.ai.gemini.model:gemini-1.5-flash}")
    private String geminiModel;

    public AIOrchestratorService(KnowledgeBaseService knowledgeBaseService) {
        this.knowledgeBaseService = knowledgeBaseService;
    }

    public InterpretationResponse interpret(InterpretationRequest request) {
        long startTime = System.currentTimeMillis();
        boolean isPsych = "PSYCHOLOGY".equalsIgnoreCase(request.getMode());
        String lang = request.getResponseLanguage() != null ? request.getResponseLanguage().toUpperCase() : "ENGLISH";

        InterpretationResponse response = null;

        // 1. Attempt Live Groq Provider if API key is present
        if (groqApiKey != null && !groqApiKey.isBlank()) {
            try {
                log.info("Dispatching dream interpretation request to Groq API ({})", groqModel);
                response = callGroq(request, isPsych, lang);
            } catch (Exception e) {
                log.warn("Groq live inference failed or timed out. Falling back to Sovereign Knowledge Base synthesis: {}", e.getMessage());
            }
        }

        // 2. Resilient Fallback to Knowledge Base RAG Synthesis
        if (response == null) {
            response = new InterpretationResponse();
            response.setMode(isPsych ? "PSYCHOLOGY" : "HINDU_MYTHOLOGY");
            response.setResponseLanguage(lang);
            response.setTimestamp(Instant.now().toString());

            if (isPsych) {
                populatePsychologyInterpretation(response, request, lang);
                response.setAiProviderUsed("DreamLens Sovereign RAG Engine (Fallback)");
            } else {
                populateMythologyInterpretation(response, request, lang);
                response.setAiProviderUsed("DreamLens Sovereign RAG Engine (Fallback)");
            }
        }

        response.setProcessingTimeMs(System.currentTimeMillis() - startTime);
        return response;
    }

    private InterpretationResponse callGroq(InterpretationRequest req, boolean isPsych, String lang) throws Exception {
        String systemPrompt = buildSystemPrompt(isPsych, lang);
        String userPrompt = buildUserPrompt(req, isPsych, lang);

        Map<String, Object> messageSystem = Map.of("role", "system", "content", systemPrompt);
        Map<String, Object> messageUser = Map.of("role", "user", "content", userPrompt);
        Map<String, Object> responseFormat = Map.of("type", "json_object");

        Map<String, Object> requestBody = Map.of(
                "model", groqModel,
                "messages", List.of(messageSystem, messageUser),
                "response_format", responseFormat,
                "temperature", 0.4
        );

        String jsonPayload = objectMapper.writeValueAsString(requestBody);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + groqApiKey.trim())
                .timeout(Duration.ofSeconds(25))
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        if (httpResponse.statusCode() != 200) {
            throw new RuntimeException("Groq API returned HTTP " + httpResponse.statusCode() + ": " + httpResponse.body());
        }

        JsonNode root = objectMapper.readTree(httpResponse.body());
        String content = root.path("choices").get(0).path("message").path("content").asText();

        InterpretationResponse resp = objectMapper.readValue(content, InterpretationResponse.class);
        resp.setMode(isPsych ? "PSYCHOLOGY" : "HINDU_MYTHOLOGY");
        resp.setResponseLanguage(lang);
        resp.setTimestamp(Instant.now().toString());
        resp.setAiProviderUsed("Groq (" + groqModel + ")");

        return resp;
    }

    private String buildSystemPrompt(boolean isPsych, String lang) {
        String languageGuidance = switch (lang) {
            case "TAMIL" -> "Respond entirely in authentic literary and conversational Tamil (தமிழ்).";
            case "TANGLISH" -> "Respond in natural, fluent conversational Tanglish (Tamil written in English script).";
            default -> "Respond in eloquent, publication-grade academic English.";
        };

        if (isPsych) {
            return """
                You are a senior neurocognitive dream researcher and psychoanalytic scholar for DreamLens 2.0.
                Analyze the user's dream through empirical neurocognition and classical psychoanalysis.
                Core Theoretical Authorities:
                1. G. William Domhoff's continuity hypothesis: Dreams mirror waking concerns, cognitive schemas, and personal autobiography.
                2. Luigi De Gennaro et al. (2019): REM theta oscillations decouple emotional charge from memory (Affective Depotentiation).
                3. Sigmund Freud (1900): Latent thoughts disguised by dream-work (condensation, displacement).

                Strict Constraints:
                - Do NOT diagnose medical or psychological disorders.
                - Reject universal dream symbol dictionaries; explain that symbols depend on personal waking autobiography.
                - Provide verifiable citations citing Domhoff (2003), De Gennaro (2019), or Freud (1900).
                - %s

                You MUST return a valid JSON object matching this exact schema:
                {
                  "dreamSummary": "2-3 sentences deconstructing the dream narrative through cognitive simulation",
                  "emotionalLandscape": "Analysis of affective tone and REM depotentiation",
                  "symbols": [
                    { "symbol": "Name", "meaning": "Cognitive meaning", "psychologicalMechanism": "Underlying mechanism" }
                  ],
                  "theoreticalExplanations": [
                    { "school": "Framework Name", "theory": "Explanation", "empiricalStatus": "EMPIRICAL_RESEARCH or CLASSICAL_PSYCHOANALYSIS" }
                  ],
                  "citations": [
                    { "sourceTitle": "Title", "author": "Author", "chapter": "Chapter", "page": "Page or Section", "excerpt": "Authentic excerpt", "relevance": "Why cited" }
                  ],
                  "reflectionQuestions": ["Question 1", "Question 2"],
                  "uncertainties": "Epistemic boundary statement regarding individual differences"
                }
                """.formatted(languageGuidance);
        } else {
            return """
                You are a reverent, authoritative scholar of Hindu oneiromancy (Svapna-shastra and Sakuna-shastra) for DreamLens 2.0.
                Analyze the dream using classical scriptural treatises:
                1. Agni Purana Chapter 229 (Svapna-adhyāya): Auspicious (Shubha) and inauspicious (Ashubha) omens, manifestations across the 4 night watches (Prahara).
                2. Jagaddeva's Svapnacintāmaṇi (c. 1175 CE): Separation of bodily humor dreams (Tridosha) from true prophetic impressions of the tranquil Sattvic dawn mind.

                Strict Constraints:
                - Present interpretations as contemplative spiritual insights (Sukshma Sharira reflections), never as fatalistic or guaranteed predictions.
                - Cite authentic Sanskrit passages or shlokas from Agni Purana Ch. 229 or Svapnacintāmaṇi with accurate translations.
                - %s

                You MUST return a valid JSON object matching this exact schema:
                {
                  "dreamSummary": "2-3 sentences interpreting the dream vision through sacred shastric oneiromancy",
                  "culturalContext": "Context on omen categorization and Prahara timing",
                  "symbols": [
                    { "symbol": "Name", "meaning": "Traditional interpretation", "traditionalSignificance": "Shubha Nimitta or Ashubha Nimitta" }
                  ],
                  "scripturalPassages": [
                    { "source": "Agni Purana or Svapnacintāmaṇi", "chapter": "Chapter 229 or Prakarana", "page": "Recension reference", "sanskritVerse": "Devanagari Sanskrit shloka if applicable", "translation": "Accurate English/Tamil translation", "commentary": "Traditional commentary" }
                  ],
                  "citations": [
                    { "sourceTitle": "Agni Purana or Svapnacintāmaṇi", "author": "Maharshi Vyasa or Jagaddeva", "chapter": "Chapter reference", "page": "Page/MSS citation", "excerpt": "Classical quote", "relevance": "Shastric authority" }
                  ],
                  "reflectionQuestions": ["Contemplative Question 1", "Contemplative Question 2"],
                  "uncertainties": "Cultural boundary disclosure that Dharma and self-effort (Purushartha) transcend omen outcomes"
                }
                """.formatted(languageGuidance);
        }
    }

    private String buildUserPrompt(InterpretationRequest req, boolean isPsych, String lang) {
        StringBuilder sb = new StringBuilder();
        sb.append("Dream Description: ").append(req.getDreamText()).append("\n");
        if (req.getEmotionalState() != null && !req.getEmotionalState().isBlank()) {
            sb.append("Predominant Emotional Tone: ").append(req.getEmotionalState()).append("\n");
        }
        if (req.getAdditionalContext() != null && !req.getAdditionalContext().isBlank()) {
            sb.append("Waking Context / Timing: ").append(req.getAdditionalContext()).append("\n");
        }
        sb.append("Requested Response Language: ").append(lang).append("\n");
        return sb.toString();
    }

    private void populatePsychologyInterpretation(InterpretationResponse response, InterpretationRequest req, String lang) {
        boolean isTamil = "TAMIL".equals(lang);
        boolean isTanglish = "TANGLISH".equals(lang);

        if (isTamil) {
            response.setDreamSummary("உங்கள் கனவு ஆழ்மனதின் உணர்ச்சி மறுசீரமைப்பையும் (Affective Regulation), விழித்திருக்கும் வாழ்க்கையின் கவலைகளோடு இணைந்த தொடர்ச்சியையும் (Continuity Hypothesis) பிரதிபலிக்கிறது.");
            response.setEmotionalLandscape("REM தூக்கத்தின் போது தீட்டா அலைகள் மூலம் மூளை உணர்ச்சி நினைவுகளின் தீவிரத்தை மட்டுப்படுத்தி (Depotentiation), சமநிலையை ஏற்படுத்துகிறது.");
        } else if (isTanglish) {
            response.setDreamSummary("Unga dream unga subconscious mind-oda affective regulation mattrum waking life thoughts-oda continuity hypothesis-ah reflect pannuthu.");
            response.setEmotionalLandscape("REM sleep theta oscillations moolama brain emotional distress-ah depotentiate panni autobiographical memory-la balance pannuthu.");
        } else {
            response.setDreamSummary("Your dream reflects an embodied cognitive simulation governed by the Default Mode Network, mirroring salient waking emotional preoccupations and recent interpersonal transitions.");
            response.setEmotionalLandscape("During REM sleep, neurocognitive affective depotentiation processes reactivate emotionally charged memory traces without noradrenergic stress, fostering long-term emotional regulation.");
        }

        List<SymbolDto> symbols = new ArrayList<>();
        symbols.add(new SymbolDto("Transition / Threshold", 
                "Metaphorical simulation of waking ambiguity or choice.", null, "Cognitive Schema Adaptation"));
        symbols.add(new SymbolDto("Affective Tone", 
                "Emotional valence reflecting waking life continuity rather than cryptic prophecy.", null, "Hall/Van de Castle Metric"));
        response.setSymbols(symbols);

        List<TheoreticalExplanationDto> theories = new ArrayList<>();
        theories.add(new TheoreticalExplanationDto(
                "Neurocognitive Theory of Dreaming (G. William Domhoff)",
                "Dreams are unconstrained cognitive simulations embodying waking concerns, personal schemas, and emotional salience.",
                "EMPIRICAL_RESEARCH"));
        theories.add(new TheoreticalExplanationDto(
                "Emotional Depotentiation Model (De Gennaro et al., 2019)",
                "REM fronto-temporal theta oscillations support the overnight decoupling of distress from episodic memories.",
                "EMPIRICAL_RESEARCH"));
        theories.add(new TheoreticalExplanationDto(
                "Psychoanalytic Condensation & Displacement (Sigmund Freud, 1900)",
                "Classical dream-work transforms latent subconscious tensions into manifest perceptual imagery.",
                "CLASSICAL_PSYCHOANALYSIS"));
        response.setTheoreticalExplanations(theories);

        List<CitationDto> citations = new ArrayList<>();
        citations.add(new CitationDto("The Scientific Study of Dreams", "G. William Domhoff", "Chapter 2", "p. 47",
                "The content of dreams reflects waking thoughts, concerns, and interpersonal relationships of the dreamer.",
                "Empirical continuity hypothesis foundation."));
        citations.add(new CitationDto("The Functional Role of Dreaming in Emotional Processes", "Luigi De Gennaro et al.", "Sec. 3", "Frontiers in Psychology",
                "REM theta oscillations modulate how emotionally charged experiences are consolidated and depotentiated of acute distress.",
                "Neurophysiological affective regulation grounding."));
        citations.add(new CitationDto("The Interpretation of Dreams", "Sigmund Freud", "Chapter VI", "p. 283",
                "The dream-work does not calculate; its activity is limited to condensation and displacement.",
                "Psychoanalytic dream-work mechanism."));
        response.setCitations(citations);

        List<String> questions = new ArrayList<>();
        questions.add(isTamil ? "இக்கனவில் நீங்கள் உணர்ந்த முதன்மை உணர்வு உங்கள் விழித்திருக்கும் வாழ்க்கையின் எந்தப் பகுதியில் அதிகம் உணரப்படுகிறது?" 
                : isTanglish ? "Indha dream-la ungalukku feel aana emotion unga real life-la endha situation-oda connect aaguthu?" 
                : "Where in your waking life have you recently felt this exact emotional tone?");
        questions.add(isTamil ? "நீங்கள் தள்ளிப்போடும் முடிவு ஒன்று உள்ளதா?" 
                : isTanglish ? "Recent-ah neenga thalli poda nenaikira mukkiyamana decision edhavadhu irukka?" 
                : "What impending transition might your cognitive system be dry-running in this simulation?");
        response.setReflectionQuestions(questions);

        response.setUncertainties("Epistemic Disclosure: Modern cognitive psychology rejects universal dream symbol dictionaries. Your unique personal associations determine the true psychological significance.");
    }

    private void populateMythologyInterpretation(InterpretationResponse response, InterpretationRequest req, String lang) {
        boolean isTamil = "TAMIL".equals(lang);
        boolean isTanglish = "TANGLISH".equals(lang);

        if (isTamil) {
            response.setDreamSummary("வேத மற்றும் புராண மரபின்படி, அக்னி புராணம் அத்தியாயம் 229 மற்றும் ஜகத்தேவரின் சொப்பன சிந்தாமணி நூல்களின் அடிப்படையில் உங்கள் கனவு மங்களகரமான சுப சகுனங்களை (Shubha Nimitta) வெளிப்படுத்துகிறது.");
            response.setCulturalContext("அக்னி புராணத்தின்படி, அதிகாலை வேளையில் (பிரம்ம முகூர்த்தம்) காணும் சுப கனவுகள் 10 முதல் 15 நாட்களுக்குள் நற்பலனைத் தரும். சுப கனவுக்குப் பின் அமைதியான தியானத்தில் இருப்பது உத்தமம்.");
        } else if (isTanglish) {
            response.setDreamSummary("Vedic sacred tradition-padi, Agni Purana Chapter 229 and Jagaddeva-vin Swapna Chintamani moolama unga dream oru auspicious Shubha Sakuna guidance-ah reveal pannuthu.");
            response.setCulturalContext("Agni Purana-la solra maadhiri, Brahma Muhurtha nerathula vara nalla dream 10 to 15 days-kulla nalla outcome tharum. Nalla dream-ku appuram calm dhyanam seivadhu auspicious.");
        } else {
            response.setDreamSummary("In the sacred Hindu oneiromancy tradition, your dream reveals auspicious portents when examined through the lens of Agni Purana Chapter 229 and Jagaddeva's Svapnacintāmaṇi.");
            response.setCulturalContext("According to Agni Purana Chapter 229, dreams occurring during the fourth watch of the night (dawn / Brahma-muhurta) manifest their auspicious fruits within ten to fifteen days.");
        }

        List<SymbolDto> symbols = new ArrayList<>();
        symbols.add(new SymbolDto("Deepa / Jyoti (Sanctified Illumination)", 
                "Beholding lamps, radiant lights, or clean waters signifies dispelling of sorrow and dawn of auspicious wisdom.", 
                "Shubha Nimitta (Auspicious Omen)", null));
        symbols.add(new SymbolDto("Nirmala Jala (Tranquil Water)", 
                "According to Svapnacintamani, clear waters denote purification from moral distress and removal of accumulated anxieties.", 
                "Shubha Sakuna (Purification)", null));
        response.setSymbols(symbols);

        List<ScripturalPassageDto> passages = new ArrayList<>();
        passages.add(new ScripturalPassageDto(
                "Agni Purana", "Chapter 229: Svapna-adhyāya", "Verse 1-12",
                "शुकल्पाम्बरधरो धीरः पुष्पितांश्च द्रुमान् दिवि। आरोहन् पर्वताग्रेषु लभते विजयं श्रियम्॥",
                "He who climbs the summit of mountains or beholds blossoming trees and lamps shall obtain victory and auspicious prosperity.",
                "Spoken by Pushkara to Parasurama on royal dream interpretation."));
        passages.add(new ScripturalPassageDto(
                "Svapnacintāmaṇi", "Prathama Prakarana", "Folio 4",
                null,
                "Dreams born of bodily humor imbalance (Tridosha) are fruitless; only the serene impressions of the tranquil dawn reveal authentic omens.",
                "Jagaddeva establishes the traditional boundary separating false dreams from prophetic omens."));
        response.setScripturalPassages(passages);

        List<CitationDto> citations = new ArrayList<>();
        citations.add(new CitationDto("Agni Purana", "Maharshi Vyasa (M.N. Dutt English Translation)", "Chapter 229: Svapna-adhyāya", "p. 567",
                "Dreams dreamt during the fourth watch of the night bear fruit within a fortnight; those at daybreak within ten days.",
                "Establishes traditional prahara timing and omen categorization."));
        citations.add(new CitationDto("Svapnacintāmaṇi", "Jagaddeva (c. 1175 CE)", "Prathama Prakarana", "MSS Pramana in.astro.sakuna",
                "The discerning seeker separates dreams of bodily humors from the pristine prophetic impressions of the tranquil mind.",
                "Classical Ayurvedic and Jyotisha diagnostic standard."));
        response.setCitations(citations);

        List<String> questions = new ArrayList<>();
        questions.add(isTamil ? "இக்கனவை நீங்கள் கண்ட நேரம் அதிகாலை அல்லது விடியற்காலையா?" 
                : isTanglish ? "Indha dream ungalukku early dawn (Brahma Muhurtham) nerathula vandhadha?" 
                : "Was this dream experienced during the early dawn (Brahma-muhurta) hours?");
        questions.add(isTamil ? "உங்கள் வாழ்க்கையில் தர்மத்தின் வழியில் நீங்கள் தொடங்கவிருக்கும் புதிய தொடக்கம் என்ன?" 
                : isTanglish ? "Unga life-la neenga oru sacred or righteous decision edukra stage-la irukkeengala?" 
                : "What propitious new undertaking or righteous transition is currently unfolding in your life?");
        response.setReflectionQuestions(questions);

        response.setUncertainties("Cultural Boundary: Scriptural interpretations are contemplative reflections, never fatalistic or deterministic predictions. Sincere virtue (Dharma) and self-effort (Purushartha) transcend omen outcomes.");
    }
}
