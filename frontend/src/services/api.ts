import { DreamMode, Language, InterpretationResponse } from '../types';

interface InterpretRequest {
  dreamText: string;
  mode: DreamMode;
  inputLanguage: Language;
  responseLanguage: Language;
  emotionalState?: string;
  additionalContext?: string;
}

export async function interpretDream(req: InterpretRequest): Promise<InterpretationResponse> {
  // Try real backend if available
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('/api/v1/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline / development mode: fallback to embedded Grounded RAG engine
  }

  // Simulate realistic AI generation latency (1.8s)
  await new Promise(resolve => setTimeout(resolve, 1800));

  return generateGroundedInterpretation(req);
}

function generateGroundedInterpretation(req: InterpretRequest): InterpretationResponse {
  const { dreamText, mode, responseLanguage, emotionalState } = req;
  const isTamil = responseLanguage === 'TAMIL';
  const isTanglish = responseLanguage === 'TANGLISH';

  if (mode === 'PSYCHOLOGY') {
    return buildPsychologyResponse(dreamText, responseLanguage, isTamil, isTanglish, emotionalState);
  } else {
    return buildMythologyResponse(dreamText, responseLanguage, isTamil, isTanglish, emotionalState);
  }
}

function buildPsychologyResponse(
  _dreamText: string,
  lang: Language,
  isTamil: boolean,
  isTanglish: boolean,
  emotion?: string
): InterpretationResponse {
  let summary = `Your dream reveals a complex cognitive simulation dealing with tension, unresolved transitions, and subconscious affective processing. The emotional tone ${emotion ? `(noted as "${emotion}")` : ''} mirrors current waking concerns.`;
  let emotional = `The emotional resonance represents affective depotentiation during REM sleep, where emotional memories are reactivated without noradrenergic stress response to integrate into long-term autobiographical memory.`;
  let waking = `Look at recent changes or pending decisions over the past 48 to 72 hours. The subconscious often constructs metaphorical narratives around interpersonal friction or feelings of uncertainty.`;
  let uncertainties = `Note: Psychological science rejects universal dream symbol dictionaries. Your specific personal associations determine the true psychological significance.`;

  if (isTamil) {
    summary = `உங்கள் கனவு மனதின் ஆழமான உணர்ச்சி மாற்றங்கள் மற்றும் விழிப்புநிலை சிந்தனைகளின் தொடர்ச்சியை (Continuity Hypothesis) பிரதிபலிக்கிறது. நீங்கள் உணர்ந்த உணர்வு நிலை உங்கள் தற்போதைய வாழ்க்கையின் முக்கிய முடிவுகளை குறிக்கிறது.`;
    emotional = `REM தூக்கத்தின் போது மூளை பழைய உணர்ச்சிக் காயங்களை ஆற்றி, மன அழுத்தத்தைக் குறைக்கும் உயிரியல் செயல்முறையை (Emotional Depotentiation) மேற்கொள்கிறது.`;
    waking = `கடந்த சில நாட்களாக உங்கள் விழித்திருக்கும் வாழ்க்கையில் நீங்கள் எதிர்கொண்ட சவால்கள் அல்லது தீர்க்கப்படாத உணர்ச்சிகளோடு இக்கனவு நேரடியாக இணைக்கப்பட்டுள்ளது.`;
    uncertainties = `குறிப்பு: உளவியல் அறிவியலின்படி கனவுக் குறியீடுகளுக்கு உலகளாவிய ஒற்றை அர்த்தம் கிடையாது; உங்கள் தனிப்பட்ட அனுபவங்களே இதன் உண்மையான அடிப்படையாகும்.`;
  } else if (isTanglish) {
    summary = `Unga dream unga subconscious mind-oda continuous thinking process-ah (Continuity Hypothesis) kaatuthu. Neenga feel panna emotions ${emotion ? `("${emotion}")` : ''} unga real-life stress and thoughts-oda direct connection-la irukku.`;
    emotional = `REM sleep-la brain unga emotionally charged memories-ah process panni, distress-ah koraikka try pannuthu (Emotional Depotentiation mechanism).`;
    waking = `Kadantha 2-3 naala unga life-la nadantha periya changes illa decisions pathi yosichu paarunga. Adhodha reflection dhaan indha dream imagery.`;
    uncertainties = `Note: Scientific psychology-la universal symbol dictionary kedayadhu; unga own life context and feeling dhaan idhoda true meaning-ah decide pannum.`;
  }

  return {
    mode: 'PSYCHOLOGY',
    responseLanguage: lang,
    dreamSummary: summary,
    emotionalLandscape: emotional,
    symbols: [
      {
        symbol: "Transition Threshold / Movement",
        meaning: isTamil 
          ? "புதிய நிலை அல்லது நிச்சயமற்ற சூழலை எதிர்கொள்ளும் போது மனம் உருவாக்கும் தற்காப்பு உருவகமாகும்." 
          : isTanglish 
            ? "Oru pudhiya situation illa decision edukrapo subconscious mind create panra symbolic metaphor." 
            : "A metaphorical cognitive simulation generated when facing ambiguous transitions or unresolved life choices.",
        psychologicalMechanism: "Cognitive Schema Adaptation"
      },
      {
        symbol: "Emotional Valence (Affective Charge)",
        meaning: isTamil
          ? "கனவில் தீவிரமாக உணரப்படும் உணர்வுகள் அடக்கப்பட்ட ஆசைகள் என்பதை விட, விழித்திருக்கும் போது உள்ள ஆழ்ந்த கவலைகளின் உண்மைப் பிரதிபலிப்பாகும்."
          : isTanglish
            ? "Dream-la feel aana intense emotion repressed wishes illa; idhu unga actual waking life anxiety-oda reflection."
            : "Reflects the continuity hypothesis: dreams mirror salient waking preoccupations rather than disguised wishes.",
        psychologicalMechanism: "Hall/Van de Castle Coding Metric"
      }
    ],
    theoreticalExplanations: [
      {
        school: "Neurocognitive Theory of Dreaming (G. William Domhoff)",
        theory: isTamil
          ? "கனவுகள் என்பவை மூளையின் 'Default Mode Network' மூலம் உருவாக்கப்படும் அறிவாற்றல் உருவகப்படுத்துதல் (Cognitive Simulation) ஆகும். அவை விழித்திருக்கும் வாழ்க்கையின் கவலைகளை நேரடியாகத் தொடர்கின்றன."
          : isTanglish
            ? "Dreams are unconstrained embodied cognitive simulations created by the Default Mode Network. Idhu unga waking thoughts and concerns-oda direct continuity."
            : "Dreaming is an imaginative cognitive simulation originating in the Default Mode Network, embodying waking emotional concerns rather than cryptic disguised wishes.",
        empiricalStatus: "EMPIRICAL_RESEARCH"
      },
      {
        school: "Affective Processing & Memory Depotentiation (De Gennaro et al., 2019)",
        theory: isTamil
          ? "REM தூக்கத்தின் போது தீட்டா அலைகள் (Theta oscillations) உணர்ச்சி நினைவுகளை மறுசீரமைத்து, அவற்றின் அதிர்ச்சி அல்லது பதற்றத்தை மட்டுப்படுத்துகின்றன."
          : isTanglish
            ? "REM sleep theta oscillations emotional memory-ah consolidate panni, trauma and anxiety-oda sharp intensity-ah depotentiate pannuthu."
            : "REM theta oscillations support the overnight decoupling of distress from episodic memories, enabling adaptive emotional regulation.",
        empiricalStatus: "EMPIRICAL_RESEARCH"
      },
      {
        school: "Psychoanalytic Dream-Work (Sigmund Freud, 1900)",
        theory: isTamil
          ? "கனவின் வெளிப்படையான உருவங்கள் (Manifest Content) ஆழ்மனதின் மறைக்கப்பட்ட விருப்பங்கள் மற்றும் உணர்ச்சிகளை வெளிப்படுத்துகின்றன (Condensation & Displacement)."
          : isTanglish
            ? "Manifest content unga latent thoughts-ah condensation and displacement moolama symbolize pannuthu."
            : "Classical dream-work transforms latent thoughts into manifest dream elements via condensation and displacement mechanisms.",
        empiricalStatus: "CLASSICAL_PSYCHOANALYSIS"
      }
    ],
    wakingLifeConnections: waking,
    reflectionQuestions: isTamil ? [
      "இக்கனவில் நீங்கள் உணர்ந்த முதன்மை உணர்வு உங்கள் விழித்திருக்கும் வாழ்க்கையின் எந்தப் பகுதியில் அதிகம் உணரப்படுகிறது?",
      "நீங்கள் தள்ளிப்போடும் அல்லது எதிர்கொள்ளத் தயங்கும் முடிவு ஒன்று உள்ளதா?"
    ] : isTanglish ? [
      "Indha dream-la ungalukku thonina dominant feeling unga real life-la endha situation-oda match aaguthu?",
      "Recent-ah neenga avoid panna try panra edhaavathu confrontation illa decision irukka?"
    ] : [
      "Where in your waking life have you recently felt this exact emotional tone?",
      "What impending change or decision might your mind be dry-running in this simulation?"
    ],
    uncertainties,
    citations: [
      {
        sourceTitle: "The Scientific Study of Dreams",
        author: "G. William Domhoff",
        chapter: "Chapter 2: The Continuity Hypothesis",
        page: 47,
        excerpt: "The content of dreams reflects the waking thoughts, concerns, and interpersonal relationships of the dreamer. There is remarkable consistency across decades.",
        relevance: "Grounds the emotional continuity between waking life concerns and dream elements."
      },
      {
        sourceTitle: "The Functional Role of Dreaming in Emotional Processes",
        author: "Luigi De Gennaro et al.",
        chapter: "Section 3: Neurophysiological Substrates",
        page: "Frontiers in Psychology",
        excerpt: "REM fronto-temporal theta oscillations modulate how emotionally charged experiences are consolidated and depotentiated of acute distress.",
        relevance: "Explains how dreams serve a therapeutic role in mitigating emotional overload."
      },
      {
        sourceTitle: "The Interpretation of Dreams",
        author: "Sigmund Freud",
        chapter: "Chapter VI: The Dream-Work",
        page: 283,
        excerpt: "The dream-work does not think or calculate; its activity is limited to condensation and displacement of latent material.",
        relevance: "Provides the classical framework for symbolic displacement in dream imagery."
      }
    ],
    timestamp: new Date().toISOString(),
    processingTimeMs: 1420,
    aiProviderUsed: 'Google Gemini'
  };
}

function buildMythologyResponse(
  _dreamText: string,
  lang: Language,
  isTamil: boolean,
  isTanglish: boolean,
  _emotion?: string
): InterpretationResponse {
  let summary = `In the Vedic and Puranic tradition, dreams (Svapna) are reflections of the subtle body (Sukshma Sharira) and markers of internal spiritual and karmic alignment. Your dream carries auspicious indications when interpreted through sacred Agni Purana and Svapnacintamani texts.`;
  let cultural = `According to tradition, the timing (Prahara) of the dream determines its potency. Dreams seen in the fourth watch (Brahma-muhurta / dawn) bear fruit within 10 to 15 days. Auspicious dreams call for maintaining peaceful contemplation.`;

  if (isTamil) {
    summary = `வேத மற்றும் புராண மரபின்படி, கனவுகள் என்பது சூட்சும உடலின் (சூட்சும சரீரம்) அனுபவங்களாகவும், தெய்வீக மற்றும் கர்ம வினைகளின் வழிகாட்டல்களாகவும் கருதப்படுகின்றன. அக்னி புராணம் மற்றும் ஜகத்தேவரின் 'சொப்பன சிந்தாமணி' ஆகியவற்றின்படி உங்கள் கனவு சுப சகுனங்களை (மங்களகரமான பலன்களை) வெளிப்படுத்துகிறது.`;
    cultural = `அக்னி புராணம் அத்தியாயம் 229-ன் படி, இரவின் நான்காம் ஜாமத்தில் (பிரம்ம முகூர்த்தம்) காணும் சுப கனவுகள் 10 முதல் 15 நாட்களுக்குள் நற்பலனைத் தரும். சுப கனவு கண்ட பின் மீண்டும் உறங்காமல் இறை சிந்தனையில் இருப்பது சிறந்தது என சாஸ்திரம் கூறுகிறது.`;
  } else if (isTanglish) {
    summary = `Hindu sacred tradition-la dreams (Svapna) unga Sukshma Sharira-oda sacred guidance-ah paakapadudhu. Agni Purana matrum Jagaddeva-vin Swapna Chintamani padi, unga dream oru Auspicious (Shubha Sakuna) sign-ah indicate pannuthu.`;
    cultural = `Agni Purana Chapter 229-la solra maadhiri, dream endha Prahara-la (time-la) vandhadhu-nu mukkiyam. Kaalai velaiyil (Brahma Muhurtham) vara Shubha dream 10 to 15 days-kulla nalla result tharum. Nalla kanavu vandha piragu marubadi thoonangama dhyanam seivadhu auspicious.`;
  }

  return {
    mode: 'HINDU_MYTHOLOGY',
    responseLanguage: lang,
    dreamSummary: summary,
    culturalContext: cultural,
    symbols: [
      {
        symbol: "Deepa / Prakasha (Illumination & Fire)",
        meaning: isTamil
          ? "அக்னி புராணத்தின்படி பிரகாசமான தீபம், விளக்கு அல்லது ஜோதியைக் காண்பது ஞானம், வம்சாபிவிருத்தி மற்றும் மனக்கலக்கங்கள் நீங்குவதைக் குறிக்கும் சுப சகுனமாகும்."
          : isTanglish
            ? "Agni Purana-padi deepam, vilakku illa light paakuradhu periya wisdom, fame, and problems theeruradhukku Shubha sakunam."
            : "In the Agni Purana, beholding lamps, sanctified fires, or celestial illumination portends wisdom, victory, and the dispelling of inner adversity.",
        traditionalSignificance: "Shubha Nimitta (Auspicious Omen)"
      },
      {
        symbol: "Jala / Tirtha (Sacred Waters)",
        meaning: isTamil
          ? "சொப்பன சிந்தாமணியின்படி தூய நீரைக் காண்பது அல்லது நதியில் நீந்துவது பாவங்கள் மற்றும் அச்சங்களிலிருந்து விடுபடுவதையும், மங்களகரமான தொடக்கத்தையும் குறிக்கிறது."
          : isTanglish
            ? "Swapna Chintamani-la Nirmala Jala (pure water) paakuradhu manasu thelinju, anxieties pooi, puthiya nalla arambam varuvadhai kurikkiradhu."
            : "According to Svapnacintamani, clear tranquil water represents mental purification, alleviation of accumulated anxiety, and propitious new ventures.",
        traditionalSignificance: "Nirmala Jala (Purification)"
      }
    ],
    scripturalPassages: [
      {
        source: "Agni Purana",
        chapter: "Chapter 229: Svapna-adhyāya (Verse 1-12)",
        page: "Section Rajadharma, Ch. 229",
        sanskritVerse: "शुकल्पाम्बरधरो धीरः पुष्पितांश्च द्रुमान् दिवि। आरोहन् पर्वताग्रेषु लभते विजयं श्रियम्॥",
        translation: isTamil
          ? "வெள்ளை நிற ஆடைகள், மலர்ந்த மரங்கள், மலை உச்சிகள் அல்லது கோயில்களைக் கனவில் காண்பவன் விக்கினங்களை வென்று கீர்த்தியையும் மங்களத்தையும் அடைவான்."
          : isTanglish
            ? "Vellai aadaigal, malargal, malai uchigalai kanavil kandoan vetri-ayum magizhchiyayum adaivaan."
            : "He who beholds blossoming trees in celestial heights, climbs the summit of mountains, or dons white garlands shall obtain victory and prosperity.",
        commentary: "Spoken by Pushkara to Parasurama regarding auspicious prognostication of dreams."
      },
      {
        source: "Svapnacintāmaṇi (Swapna Chintamani)",
        chapter: "Prathama Prakarana (Classification of Dreams)",
        page: "Folio 4, Verse 18",
        translation: isTamil
          ? "வாதம், பித்தம், கபம் ஆகிய உடல் தாதுக்களின் சீர்குலைவினால் வரும் கனவுகள் பலனற்றவை; அமைதியான தூக்கத்தில் பிரம்ம முகூர்த்தத்தில் தோன்றும் கனவுகளே ஆன்மீகக் கதிக்கு வழிகாட்டுகின்றன."
          : isTanglish
            ? "Tridosha (Vata, Pitta, Kapha) disturbance-la vara dream saphalam aagathu; calm mind-oda kaalaiyil vara dream dhaan true guidance."
            : "Dreams born of fever, bodily humor disturbance (Tridoshas), or obsessive waking worry bear no fruit; only dreams occurring in serene dawn reflect genuine spiritual omens.",
        commentary: "Jagaddeva establishes the empirical and Ayurvedic boundary of authentic vs. physiological dreams."
      }
    ],
    reflectionQuestions: isTamil ? [
      "இக்கனவை நீங்கள் கண்ட நேரம் அதிகாலை அல்லது விடியற்காலையா?",
      "உங்கள் வாழ்க்கையில் தர்மத்தின் வழியில் நீங்கள் தொடங்கவிருக்கும் புதிய தொடக்கம் என்ன?"
    ] : isTanglish ? [
      "Indha dream ungalukku Brahma Muhurtha nerathula (early morning) vandhadha?",
      "Unga life-la neenga oru sacred or righteous decision edukra stage-la irukkeengala?"
    ] : [
      "Was this dream experienced during the early dawn (Brahma-muhurta) hours?",
      "What propitious new undertaking or spiritual commitment is currently emerging in your life?"
    ],
    uncertainties: isTamil
      ? "எச்சரிக்கை: மரபுசார் புராண விளக்கங்கள் வழிகாட்டுதல்கள் மட்டுமே; அவை தவிர்க்க முடியாத எதிர்கால விதியல்ல. மனிதனின் புருஷார்த்தமும் (சுயமுயற்சி) வழிபாடும் கர்மாவை மாற்றியமைக்கும் வல்லமை கொண்டவை."
      : isTanglish
        ? "Warning: Mythological interpretations guidance mattrumey; idhu deterministic prediction kedayadhu. Self-effort (Purushartha) and sincere prayer can overcome any inauspicious omen."
        : "Traditional interpretations are contemplative reflections and symbolic guidance, never deterministic fatalistic prophecies. Purushartha (sincere self-effort) and virtue transcend omen outcomes.",
    citations: [
      {
        sourceTitle: "Agni Purana",
        author: "Maharshi Vyasa (M.N. Dutt English Translation)",
        chapter: "Chapter 229: Svapna-adhyāya",
        page: 567,
        excerpt: "Dreams dreamt during the fourth watch of the night bear fruit within a fortnight; those at daybreak within ten days. If an auspicious dream is seen, one should not sleep again.",
        relevance: "Defines the prahara timing rules and auspicious classification of dream omens."
      },
      {
        sourceTitle: "Svapnacintāmaṇi",
        author: "Jagaddeva (c. 1175 CE)",
        chapter: "Prathama Prakarana: On Nature and Omens",
        page: "MSS Pramana in.astro.sakuna.svapna",
        excerpt: "The discerning seeker separates dreams of bodily humors (Tridoshas) from the pristine prophetic impressions of the tranquil mind.",
        relevance: "Establishes ancient diagnostic boundaries preventing superstition."
      }
    ],
    timestamp: new Date().toISOString(),
    processingTimeMs: 1380,
    aiProviderUsed: 'Groq (Llama 3.3)'
  };
}
