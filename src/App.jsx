import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const visualSignals = [
  {
    number: "01",
    title: "Eyes & reflections",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "Natural eyes contain small irregularities in reflection, gaze, pupil response and eyelid movement. Synthetic media can sometimes produce unusually symmetrical highlights, glassy surfaces or eye behavior that does not completely agree with the surrounding expression.",
    points: [
      "Compare catchlights in both eyes.",
      "Look for natural asymmetry.",
      "Check whether the gaze changes naturally.",
      "Examine pupil and eyelid movement in video.",
    ],
  },
  {
    number: "02",
    title: "Skin texture",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "Real skin contains changing texture, pores, fine lines and subtle variations caused by lighting and movement. Generated or manipulated media may sometimes smooth these details excessively or create repeated-looking textures.",
    points: [
      "Look beyond overall smoothness.",
      "Inspect pores and fine facial detail.",
      "Check whether texture changes naturally between frames.",
      "Compare skin texture with nearby objects.",
    ],
  },
  {
    number: "03",
    title: "Hair & edges",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "Hair, ears and facial boundaries are visually complex. Individual strands interact with light and movement, making these areas useful places to inspect when evaluating manipulated media.",
    points: [
      "Inspect hair against the background.",
      "Look around ears and glasses.",
      "Check whether individual strands remain consistent.",
      "Watch facial boundaries across multiple frames.",
    ],
  },
  {
    number: "04",
    title: "Lips & movement",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "In manipulated video, facial motion can sometimes appear slightly disconnected from speech. Lip shape, mouth movement and expression should be considered together rather than relying on one unusual frame.",
    points: [
      "Compare mouth movement with speech.",
      "Watch rapid changes in expression.",
      "Look for unnatural transitions between frames.",
      "Listen for timing inconsistencies.",
    ],
  },
  {
    number: "05",
    title: "Lighting & shadows",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "Light normally behaves consistently across a scene. Highlights, shadows and reflections should make sense relative to the apparent light sources around the subject.",
    points: [
      "Identify the main light source.",
      "Compare highlights and shadows.",
      "Inspect reflections on glasses and skin.",
      "Check whether the face fits the environment.",
    ],
  },
  {
    number: "06",
    title: "Context & source",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fe20bdCRkj_Z3mLvAPxccoocIpwrl6WktUASEh3t3NepNxYLJSx1dFI&s=10",
    description:
      "A technically convincing image can still be misleading when it is presented without its original context. Source, date, location, caption and independent reporting can be more informative than a single visual clue.",
    points: [
      "Find the original source.",
      "Check publication date.",
      "Look for independent confirmation.",
      "Compare the claim with available context.",
    ],
  },
];

const mediaExamples = {
  images: [
    {
      title: "Synthetic portrait",
      source: "Your image source",
      image: "https://media.easy-peasy.ai/8159a26c-725a-4751-b52a-3515485ad85e/d07e7c19-16d4-46c9-93c9-a66765d57799_medium.webp",
      description:
        "A fully AI-generated face that doesn't belong to a real person — built entirely from learned patterns rather than a photograph.",
    },
    {
      title: "Identity manipulation",
      source: "Your image source",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrUt2e7MpcvjZW460CKGntrns8GbL67ss2Z0Tv-TZlY-VWhOHWhsiBXV4&s=10",
      description:
        "The digital alteration, fabrication, or theft of a person's biometric and behavioral traits using artificial intelligence.",
    },
  ],
  videos: [
  {
    title: "Synthetic video example",
    video: "https://www.youtube.com/embed/oxXpB9pSETo",
    description: "An educational synthetic-media example.",
  },
],
  audio: [
    {
      title: "Original voice",
      label: "ORIGINAL",
      audio: "/audio/original-voice.mp3",
      description:
        "Replace with your original voice recording.",
    },
    {
      title: "Synthetic voice",
      label: "SYNTHETIC",
      audio: "/audio/synthetic-voice.mp3",
      description:
        "Replace with a clearly labeled synthetic-audio demonstration.",
    },
  ],
};

const cases = [
  {
    number: "01",
    location: "Hong Kong",
    date: "January 2024",
    title: "The $25 Million Deepfake Video Call",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/250px-Flag_of_Hong_Kong.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    description:
      "An employee at a multinational company's Hong Kong office was deceived by a fake video conference involving digitally recreated versions of senior company staff. The employee ultimately authorized transfers totaling approximately HK$200 million.",
    whatHappened:
      "The employee received a phishing message appearing to come from the company's Chief Financial Officer and was invited to a video conference about a confidential transaction. The people appearing in the meeting looked like company employees. Following instructions given during the meeting, the employee authorized 15 transfers to five local bank accounts.",
    howUsed:
      "Hong Kong police said the fraudulent conference used publicly available video clips and voices of the impersonated officer. The apparent participants were digital recreations rather than real people interacting with the victim.",
    whyConvincing:
      "The scam combined a believable corporate setting, an apparent senior executive, familiar faces and voices, a confidential business explanation, and pressure to complete financial transfers.",
    impact:
      "Approximately HK$200 million was transferred, equivalent to roughly US$25 million. Arup later confirmed that it was the affected company and said its internal systems had not been compromised.",
    discovered:
      "The fraud was reported to Hong Kong police in January 2024. Police investigation found that the video conference had been fabricated using publicly available material.",
    lesson:
      "A familiar face or voice is not sufficient proof of identity. High-value financial instructions should be independently verified through a trusted communication channel.",
    sources: [
      {
        name: "Hong Kong Government",
        url: "https://www.info.gov.hk/gia/general/202406/26/P2024062600192.htm"
      }
    ]
  },

  {
    number: "02",
    location: "United Kingdom",
    date: "March 2019",
    title: "The Cloned CEO Voice",
    image: "https://magazine.alumni.ubc.ca/sites/default/files/2023-06/AI-clone-1920x1080.jpg",
    description:
      "A UK-based energy company lost approximately €220,000 after an executive received a phone call using an AI-generated imitation of the voice of the company's German parent-company CEO.",
    whatHappened:
      "The UK executive believed he was speaking directly with his German superior. The caller urgently instructed him to transfer €220,000 to what was described as a Hungarian supplier.",
    howUsed:
      "AI voice-generation technology was reportedly used to imitate the German executive's voice.",
    whyConvincing:
      "The impersonated voice reproduced recognizable speech characteristics and the caller created urgency around the financial transfer.",
    impact:
      "Approximately €220,000 was transferred to the fraudulent recipient.",
    discovered:
      "The executive became suspicious when the promised reimbursement did not appear and a later call came from a different number.",
    lesson:
      "Voice recognition should not be treated as authentication. Independently verify unusual financial requests.",
    sources: [
      {
        name: "Sophos",
        url: "https://www.sophos.com/en-gb/blog/scammers-deepfake-ceos-voice-to-talk-underling-into-243000-transfer"
      }
    ]
  },

  {
    number: "03",
    location: "United States",
    date: "January 2024",
    title: "The Fake Presidential Robocall",
    image: "https://spectrum.ieee.org/media-library/an-illustration-of-a-red-robot-hand-holding-a-blue-phone-with-a-line-emanating-from-it-in-the-shape-of-a-face.jpg?id=51451321&width=2000&height=1500&coordinates=0%2C0%2C0%2C0",
    description:
      "Two days before New Hampshire's 2024 presidential primary, voters received an automated telephone message using an AI-generated imitation of President Joe Biden's voice.",
    whatHappened:
      "The robocall appeared to use President Biden's voice and told recipients not to vote in the upcoming primary.",
    howUsed:
      "The voice message was generated using AI voice-cloning technology. Caller-ID information was also manipulated.",
    whyConvincing:
      "The message used a recognizable public figure's voice and was delivered through an ordinary telephone call.",
    impact:
      "The Federal Communications Commission investigated the incident and documented 9,581 calls carrying the deepfake message.",
    discovered:
      "The calls were reported publicly shortly after they were made. The New Hampshire Attorney General's Office and the FCC investigated the incident.",
    lesson:
      "A familiar political voice does not authenticate a message. Verify important claims through official and reliable sources.",
    sources: [
      {
        name: "Federal Communications Commission",
        url: "https://docs.fcc.gov/public/attachments/FCC-24-59A1_Rcd.pdf"
      }
    ]
  },

  {
    number: "04",
    location: "United States",
    date: "October 2023",
    title: "The Fake Tom Hanks Dental Advertisement",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLuj55H_5Lly-ZuW3M_JNwIX_zVpTmsPMKs47Jg-oeS-pehIgktTAT0W8_&s=10",
    description:
      "An online advertisement appeared to use an AI-generated version of actor Tom Hanks to promote a dental plan. Hanks publicly warned that the advertisement was not actually him.",
    whatHappened:
      "A video promoting a dental-related product appeared online and used an AI-generated representation of Tom Hanks.",
    howUsed:
      "The creators used artificial intelligence to reproduce Hanks's recognizable appearance and present him as though he were personally promoting the product.",
    whyConvincing:
      "The advertisement relied on the familiarity of a famous person's face and the expectation that viewers would recognize the person.",
    impact:
      "The incident demonstrated how synthetic media can be used for misleading commercial advertising and unauthorized use of a person's likeness.",
    discovered:
      "Hanks publicly identified the advertisement as fake and warned his followers that he had no involvement with it.",
    lesson:
      "Seeing a celebrity in an advertisement does not prove that the celebrity actually endorsed the product.",
    sources: [
      {
        name: "CBS News",
        url: "https://www.cbsnews.com/news/tom-hanks-ai-version-of-me-promoting-dental-plan/"
      }
    ]
  },

  {
    number: "05",
    location: "Ukraine",
    date: "March 2022",
    title: "The Fake Zelensky Surrender Video",
    image: "https://taylor-and-francis.shorthandstories.com/53bc7a4f-a5b7-4ed0-bec7-13bab3e2cda6/assets/TrbOHTusAU/kyiv-from-above-motherland-statue-4096x2729.jpeg",
    description:
      "During Russia's invasion of Ukraine, a manipulated video circulated online appearing to show Ukrainian President Volodymyr Zelenskyy telling Ukrainian forces to surrender.",
    whatHappened:
      "A short video appeared to show Zelenskyy standing behind a podium and telling Ukrainians to lay down their weapons. The video was not authentic.",
    howUsed:
      "Synthetic manipulation was used to make Zelenskyy's face appear on another person's body and make him appear to deliver a statement he had not made.",
    whyConvincing:
      "The video used a real public figure and a realistic political setting resembling Zelenskyy's normal public addresses.",
    impact:
      "The incident demonstrated how synthetic video could be used during a conflict to create false information about a major political and military event.",
    discovered:
      "Ukrainian officials and observers quickly challenged the video. Visual inconsistencies were also identified.",
    lesson:
      "During emergencies, verify major claims through multiple reliable sources rather than relying on a video alone.",
    sources: [
      {
        name: "Reuters",
        url: "https://www.reuters.com/world/deepfake-footage-purports-show-ukrainian-president-capitulating-2022-03-17/"
      }
    ]
  },

  {
  number: "06",
  location: "Germany",
  date: "April 2023",
  title: "The AI-Generated Schumacher Interview",
  image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/fom-website/teams/Ferrari/GettyImages-595721079.webp",
  description:
    "A German magazine promoted what appeared to be an exclusive interview with Formula One legend Michael Schumacher. The supposed interview was generated using artificial intelligence rather than conducted with Schumacher.",
  whatHappened:
    "Die Aktuelle published a cover promising readers a first interview with Schumacher. Inside, the article presented supposed statements from him, but the material was ultimately revealed to have been generated by AI.",
  howUsed:
    "Generative AI was used to create fabricated statements presented in the format of a real interview, making synthetic content appear to be an authentic first-person account.",
  whyConvincing:
    "The story used a recognizable public figure, a magazine cover, an interview format and realistic-looking quotations to create the impression that Schumacher had actually spoken.",
  impact:
    "The publisher apologized and dismissed the magazine's editor. In 2024, Schumacher's family received €200,000 in compensation following legal action.",
  discovered:
    "The article itself indicated that the supposed interview had been generated by AI, revealing that the apparent statements were not genuine quotations from Schumacher.",
  lesson:
    "A professional-looking publication does not automatically make its content authentic. Check whether the person actually made the statement and whether the source provides verifiable evidence.",
  sources: [
    {
      name: "Reuters",
      url: "https://www.reuters.com/sports/formula1/schumachers-family-win-compensation-ai-interview-2024-05-22/"
    }
  ]
},
];

const timeline = [
  [
    "Early synthesis",
    "Computer graphics and digital compositing establish foundations for manipulated imagery.",
  ],
  [
    "Face manipulation",
    "Machine learning begins making face replacement and facial editing more accessible.",
  ],
  [
    "Generative models",
    "New model architectures improve the ability to generate convincing images, audio and video.",
  ],
  [
    "Synthetic voices",
    "Voice generation and cloning become increasingly capable of reproducing speech characteristics.",
  ],
  [
    "Multimodal generation",
    "Images, video, audio and text increasingly work together inside generative systems.",
  ],
  [
    "Verification era",
    "As generation improves, provenance, context and independent verification become increasingly important.",
  ],
];

const protectionSteps = [
  "Pause before responding to urgent requests involving money, credentials or sensitive information.",
  "Verify identity through a communication channel you already trust.",
  "Avoid relying on a face or familiar voice as the only proof of identity.",
  "Check the original source, date, location and surrounding context.",
  "Preserve relevant evidence if you encounter impersonation or harmful synthetic media.",
  "Use platform reporting and appropriate local support channels when necessary.",
];

const myths = [
  {
    myth: "A strange-looking face always means it is AI.",
    reality:
      "Compression, lighting, camera quality and editing can also create visual artifacts. A single visual clue is not definitive.",
  },
  {
    myth: "If the voice sounds exactly like someone, it must be them.",
    reality:
      "Modern voice synthesis can reproduce aspects of a person's voice. Identity should be independently verified when the situation matters.",
  },
  {
    myth: "AI detectors can always tell what is fake.",
    reality:
      "Detection systems can produce false positives and false negatives. Results should be treated as evidence to investigate, not automatic proof.",
  },
  {
    myth: "Only video can be deepfaked.",
    reality:
      "Synthetic media can involve images, video, audio, voices and combinations of multiple media types.",
  },
];
const creationDetails = [
  {
    number: "01",
    title: "Data",
    image: "https://images.griddo.udit.es/f/jpg/w/1280/h/768/herramientas-de-big-data",
    eyebrow: "THE FOUNDATION",
    intro:
      "Synthetic media begins with information. Models learn patterns from examples such as images, video, voices, text and other forms of data.",
    howItWorks: [
      "A model is provided with many examples of the type of media it needs to understand.",
      "The examples contain patterns such as shapes, colors, speech characteristics, movement or language.",
      "The training process allows the model to represent relationships within that information.",
      "The quality, diversity and relevance of the data can affect what the resulting system is able to generate."
    ],
    example:
      "A system designed to generate realistic faces may learn from large collections of facial images. It does not simply store one photograph and reproduce it; it learns statistical patterns that can later be used to produce new outputs.",
    why:
      "Understanding data helps explain why synthetic media can reproduce realistic characteristics while still producing unusual details or inconsistencies.",
      takeaway:
  "Because a model learns from data, its output reflects what it has seen. Public photos, videos and voice recordings of a person can become raw material, so limiting what you share publicly reduces exposure.",
    visualLabel: "TRAINING DATA",
    techniques: ["Image datasets", "Video frames", "Voice recordings", "Text collections"],
inPractice:
  "Face-swap models are typically trained on many images of a person from different angles, expressions and lighting conditions. Some modern voice-cloning tools can work from only a short audio sample, which is why public recordings matter.",
  },
  {
    number: "02",
    title: "Learning",
    image: "https://static.wixstatic.com/media/65246d_c7bd3ba476fb4191af59a11494ad027f~mv2.jpg/v1/fill/w_528,h_296,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/65246d_c7bd3ba476fb4191af59a11494ad027f~mv2.jpg",
    eyebrow: "THE MODEL",
    intro:
      "Learning is the stage where a machine-learning system adjusts itself to recognize and represent patterns within its training data.",
    howItWorks: [
      "The model processes examples during training.",
      "It compares its output with the information it is expected to represent.",
      "Its internal parameters are adjusted repeatedly.",
      "After many training cycles, the model can represent increasingly complex patterns."
    ],
    example:
      "A voice-generation system can learn characteristics such as pronunciation, rhythm, pitch and timing from speech examples. Later, those learned patterns can be used to produce new speech.",
    why:
      "The learning stage is what allows generative systems to move beyond simple copying and produce new combinations of learned patterns.",
    takeaway:
  "Learning is statistical, not memorizing. The model captures patterns rather than knowing a person, which is why results can look convincing but still contain small errors in details like teeth, hands or reflections.",
      visualLabel: "MODEL LEARNING",
      techniques: ["Neural networks", "Autoencoders", "GANs", "Diffusion models"],
inPractice:
  "Two well-known approaches are GANs, where one network generates media while another judges it, and diffusion models, which learn to turn random noise into a coherent image step by step.",
  },
  {
    number: "03",
    title: "Generation",
    image: "https://i.ytimg.com/vi/Uk_ycrUeZp8/maxresdefault.jpg",
    eyebrow: "CREATING SOMETHING NEW",
    intro:
      "Generation is the point where a trained system produces new media from learned patterns, instructions or another piece of media.",
    howItWorks: [
      "A user or another system provides an instruction, prompt or input.",
      "The trained model uses patterns learned during training.",
      "The system generates a new image, video, sound, voice or other output.",
      "The output can then be edited, evaluated or combined with other media."
    ],
    example:
      "A generative image system can receive a description and produce an image that did not previously exist as a photograph.",
    why:
      "Generation demonstrates why synthetic media does not necessarily require an original recording of the event being depicted.",
      takeaway:
  "A generated result can be entirely new, so there may be no original recording to compare it against. Verification has to rely on source, context and provenance, not just on finding a real version.",
    visualLabel: "GENERATIVE OUTPUT",
    techniques: ["Text-to-image", "Text-to-speech", "Video synthesis", "Voice cloning"],
inPractice:
  "Many generation tools are now available through ordinary apps and websites, which lowers the technical skill needed to produce convincing synthetic media.",
  },
  {
    number: "04",
    title: "Manipulation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuPjc6tgVLeTMl4nmcVyhkBPInATBIPpQPND28uJEoOUYAApiVq4Q2v4&s=10",
    eyebrow: "ALTERING EXISTING MEDIA",
    intro:
      "Synthetic techniques can also modify authentic media. Faces, voices, expressions, backgrounds or other elements can be changed while parts of the original material remain intact.",
    howItWorks: [
      "Authentic media is selected as a starting point.",
      "A synthetic system modifies one or more elements.",
      "The generated material is combined with the original content.",
      "The final result can look like an authentic recording even though important parts have been changed."
    ],
    example:
      "A face-swap system may replace one person's facial appearance with another while keeping the original scene, clothing and background.",
    why:
      "Manipulation is important because synthetic media does not always mean that the entire image or video was generated from nothing.",
      takeaway:
  "Because parts of the original stay intact, manipulated media can pass a casual check. Look closely where altered and authentic parts meet, such as face edges, hairlines and lighting.",
    visualLabel: "MEDIA MANIPULATION",
    techniques: ["Face swapping", "Face reenactment", "Lip-sync editing", "Voice conversion"],
inPractice:
  "Face swapping replaces who appears in a scene, reenactment transfers one person's expressions and head movement onto another, and lip-sync editing changes the mouth to match new audio.",
  },
  {
    number: "05",
    title: "Presentation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINLT7gaeSBZip14bqE8sFY3T3wxoMFAdX_C9NrfEbw-zXqx2CHUIn4iRe&s=10",
    eyebrow: "THE STORY AROUND THE MEDIA",
    intro:
      "The final stage is not only about the file itself. The caption, source, date, location and claim surrounding media can strongly affect how people interpret it.",
    howItWorks: [
      "The finished media is published or shared.",
      "A caption or claim gives the media meaning.",
      "People may encounter the content without seeing its original source.",
      "The surrounding context can make authentic media misleading or synthetic media appear authentic."
    ],
    example:
      "An old authentic video can be reposted with a false date and described as a current event. The video itself may be genuine while the claim attached to it is misleading.",
    why:
      "Verification therefore requires more than inspecting pixels or listening to a voice. Source and context matter too.",
      takeaway:
  "Even genuine media can mislead when the caption, date or location is false. Before sharing, ask who published it first, when, and whether reliable outlets confirm it.",
    visualLabel: "MEDIA + CONTEXT",
    techniques: ["Social media posts", "Messaging apps", "News-style captions", "Calls and ads"],
inPractice:
  "When media is re-uploaded or forwarded, platforms often compress it and strip its metadata. This can hide visual artifacts and remove clues about where the file originally came from.",
  },
];

function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeMedia, setActiveMedia] = useState("images");
  const [signalIndex, setSignalIndex] = useState(0);
  const [comparison, setComparison] = useState(50);
  const [selectedCase, setSelectedCase] = useState(0);
  const [creationInterface, setCreationInterface] = useState(null);
  const [caseInterface, setCaseInterface] = useState(null);
  const [selectedMyth, setSelectedMyth] = useState(0);
  const [selectedLab, setSelectedLab] = useState("face");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [analysisStage, setAnalysisStage] = useState("idle");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState(
    "Ask about deepfakes, verification, synthetic media, or the analysis shown in this workspace."
  );
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [challengeStep, setChallengeStep] = useState(0);
  const [spotRound, setSpotRound] = useState(0);
  const [spotScore, setSpotScore] = useState(0);
  const [spotSelected, setSpotSelected] = useState(null);
  const [spotAnswered, setSpotAnswered] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const ids = [
        "home",
        "learn",
        "examples",
        "creation",
        "cases",
        "inspect",
        "lab",
        "protect",
        "challenge",
      ];

      let current = "home";

      ids.forEach((id) => {
        const section = document.getElementById(id);

        if (section && window.scrollY >= section.offsetTop - 180) {
          current = id;
        }
      });

      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSignal = visualSignals[signalIndex];

  const fileType = useMemo(() => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith("image/")) return "image";
    if (selectedFile.type.startsWith("video/")) return "video";
    if (selectedFile.type.startsWith("audio/")) return "audio";

    return "unknown";
  }, [selectedFile]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFile = (file) => {
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(url);
    setAnalysisStage("idle");
    setAnalysisProgress(0);
  };

  const startAnalysis = () => {
    if (!selectedFile) return;

    setAnalysisStage("analyzing");
    setAnalysisProgress(0);

    let progress = 0;

    const timer = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setAnalysisStage("complete");
        }, 350);
      }
    }, 120);
  };

  const askAssistant = () => {
  const question = assistantInput.trim().toLowerCase();

  if (!question) {
    setAssistantAnswer(
      "Type a question about deepfakes, synthetic media, verification, or online safety."
    );
    return;
  }

  const answers = [
    {
      keywords: ["what is a deepfake", "what are deepfakes", "define deepfake"],
      answer:
        "A deepfake is synthetic or manipulated media created using AI or other digital techniques. It can alter a person's face, voice, expressions or actions, or generate media that never existed. Deepfakes can be used for entertainment, education or harmful deception."
    },
    {
      keywords: ["synthetic media", "what is synthetic media"],
      answer:
        "Synthetic media is content that has been generated or significantly modified using computational techniques, including AI. It can include images, video, audio, voices and text."
    },
    {
      keywords: ["how are deepfakes made", "how is a deepfake made", "how deepfakes work"],
      answer:
        "A typical deepfake workflow involves collecting relevant data, training or using a model to learn patterns, generating or manipulating media, and then presenting the result as an image, video or audio recording."
    },
    {
      keywords: ["face swap", "face swapping"],
      answer:
        "Face swapping replaces or synthesizes one person's facial appearance in an image or video with another person's appearance. The surrounding scene can remain authentic while the face has been digitally altered."
    },
    {
      keywords: ["voice cloning", "clone a voice", "voice clone"],
      answer:
        "Voice cloning uses examples of someone's speech to generate new speech that resembles their voice. Because a familiar voice is not sufficient proof of identity, important requests should be verified through another trusted channel."
    },
    {
      keywords: ["ai generated image", "ai image", "generated image"],
      answer:
        "An AI-generated image is created partly or entirely by a generative model rather than being an ordinary photograph. Some generated images can look highly realistic, so context and source verification are important."
    },
    {
      keywords: ["ai generated video", "generated video"],
      answer:
        "AI-generated video can create new scenes or modify existing footage. Modern systems can manipulate faces, expressions, voices, backgrounds and movements."
    },
    {
      keywords: ["ai generated audio", "synthetic audio"],
      answer:
        "Synthetic audio is audio created or modified computationally. Voice cloning is one example. Suspicious audio should be checked against the source and, when necessary, verified through another communication channel."
    },
    {
      keywords: ["how to spot a deepfake", "spot a deepfake", "detect a deepfake"],
      answer:
        "Look for multiple signals rather than one clue. Check facial details, lighting, reflections, lip movement, audio quality, unnatural motion, source information and context. No single visual clue proves that media is synthetic."
    },
    {
      keywords: ["eyes", "eye artifacts"],
      answer:
        "Eyes can sometimes contain inconsistencies in reflections, movement, lighting or alignment. However, these are only clues. Camera quality, compression and ordinary image processing can also create unusual details."
    },
    {
      keywords: ["hands", "fingers"],
      answer:
        "Hands and fingers have historically been difficult for some image-generation systems. Unusual anatomy can be a useful clue, but it is not proof that an image is AI-generated."
    },
    {
      keywords: ["teeth", "mouth"],
      answer:
        "Look for unusual teeth, mouth shapes, lip boundaries or inconsistent movement. These can sometimes indicate manipulation, but compression and low-quality footage can produce similar artifacts."
    },
    {
      keywords: ["skin", "skin texture"],
      answer:
        "Synthetic media may sometimes contain unusually smooth or inconsistent skin texture. But lighting, camera processing, makeup and compression can produce similar effects."
    },
    {
      keywords: ["lighting", "light"],
      answer:
        "Check whether lighting appears consistent across the subject and environment. Shadows, highlights and reflections that do not agree with the scene can be useful clues, but they should be considered alongside other evidence."
    },
    {
      keywords: ["shadows", "shadow"],
      answer:
        "Inconsistent shadows can sometimes indicate manipulation. Compare the direction and softness of shadows with the apparent light sources in the scene."
    },
    {
      keywords: ["reflection", "reflections"],
      answer:
        "Reflections can provide useful verification clues. Check mirrors, windows, glasses and shiny surfaces for inconsistencies with the surrounding scene."
    },
    {
      keywords: ["lip sync", "lipsync", "mouth movement"],
      answer:
        "Compare the movement of the mouth with the speech. Poor synchronization can be a clue, although modern synthetic systems can produce increasingly convincing lip movement."
    },
    {
      keywords: ["blinking", "blink"],
      answer:
        "Blinking patterns were once discussed as a common deepfake clue, but they are not reliable by themselves. Modern systems can reproduce natural-looking blinking."
    },
    {
      keywords: ["facial movement", "face movement"],
      answer:
        "Look for movement that seems inconsistent with the person's expression, head position or surrounding scene. Treat this as one signal rather than definitive evidence."
    },
    {
      keywords: ["video quality", "compression"],
      answer:
        "Compression can create strange edges, blurry details and visual artifacts that resemble AI manipulation. Always consider whether the unusual detail could simply be caused by a low-quality copy of the original media."
    },
    {
      keywords: ["metadata", "exif"],
      answer:
        "Metadata can contain information about a file, such as creation software, timestamps or camera information. However, metadata can be removed or modified, so it should not be treated as conclusive proof."
    },
    {
      keywords: ["reverse image search", "reverse search"],
      answer:
        "Reverse-image search can help determine whether an image appeared online previously or whether similar versions exist. Finding the earliest reliable source can provide important context."
    },
    {
      keywords: ["verify an image", "image verification"],
      answer:
        "Start with the original source, publication date and context. Then use reverse-image search or other provenance tools where available. Compare versions of the image and look for independent reporting."
    },
    {
      keywords: ["verify a video", "video verification"],
      answer:
        "Check who originally published the video, when it appeared, where it supposedly happened and whether independent sources confirm the event. Examine the footage for inconsistencies, but do not rely on visual clues alone."
    },
    {
      keywords: ["verify audio", "verify a voice"],
      answer:
        "Do not rely solely on a familiar voice. Confirm the person's identity through a trusted communication channel that you already know belongs to them."
    },
    {
      keywords: ["fake news", "misinformation"],
      answer:
        "Synthetic media can contribute to misinformation when manipulated or generated content is presented as authentic. Verify the original source, date, context and independent evidence before accepting a claim."
    },
    {
      keywords: ["disinformation"],
      answer:
        "Disinformation generally refers to false or misleading information that is deliberately created or spread to deceive. Synthetic media can be one tool used in such campaigns."
    },
    {
      keywords: ["misleading context", "context"],
      answer:
        "Authentic media can still be misleading when it is given a false date, location or description. Verification therefore involves checking the claim surrounding the media, not only the file itself."
    },
    {
      keywords: ["old video", "old image"],
      answer:
        "An authentic photograph or video can be reused to represent a completely different event. Check when and where the media was originally published before accepting the surrounding claim."
    },
    {
      keywords: ["source", "original source"],
      answer:
        "The original source is usually more useful than a repost. Trace media back as far as possible and compare the original publication with later versions."
    },
    {
      keywords: ["how to verify a person", "verify identity", "identity verification"],
      answer:
        "A face, username or voice should not be treated as sufficient proof of identity for high-risk situations. Use an independent communication channel or another trusted verification method."
    },
    {
      keywords: ["scam", "deepfake scam"],
      answer:
        "Deepfake scams can imitate people through generated voices, faces or video. Be especially cautious when someone creates urgency or requests money, passwords, codes or sensitive information."
    },
    {
      keywords: ["money", "financial", "transfer"],
      answer:
        "Never approve an important financial transfer solely because a familiar person appears or sounds genuine. Verify the request through a communication channel you already trust."
    },
    {
      keywords: ["ceo", "boss", "executive"],
      answer:
        "AI impersonation can target executives and employees. A familiar voice or video should not override normal financial controls. Confirm unusual instructions independently before acting."
    },
    {
      keywords: ["phishing"],
      answer:
        "Phishing attempts use deceptive messages to obtain information or persuade people to take an action. Synthetic voices, images and videos can make these attempts appear more convincing."
    },
    {
      keywords: ["privacy", "personal information"],
      answer:
        "Synthetic media can create privacy risks when someone's face, voice or personal information is used without permission. Avoid unnecessarily sharing high-quality personal images, recordings or sensitive information publicly."
    },
    {
      keywords: ["revenge porn", "non consensual", "intimate deepfake"],
      answer:
        "Non-consensual intimate synthetic media is a serious form of abuse. If you encounter it, avoid resharing the material, preserve relevant evidence where safe, report it to the platform and consider appropriate legal or support resources."
    },
    {
      keywords: ["celebrity deepfake", "celebrity"],
      answer:
        "Public figures can be impersonated using synthetic images, voices and videos. A recognizable celebrity does not make a piece of media authentic; verify the source and look for confirmation from reliable channels."
    },
    {
      keywords: ["politician", "political deepfake"],
      answer:
        "Political figures can also be represented in synthetic media. Because such content can affect public understanding of events, check the original source, date, context and independent reporting before accepting a claim."
    },
    {
      keywords: ["ai detector", "deepfake detector"],
      answer:
        "AI detectors can provide useful signals, but they are not infallible. False positives and false negatives can occur. Detector results should be treated as evidence to investigate rather than automatic proof."
    },
    {
      keywords: ["can detectors always", "detectors always"],
      answer:
        "No detection system should be treated as universally reliable. Synthetic-media techniques change quickly, and detection performance can vary between different types of content."
    },
    {
      keywords: ["watermark", "watermarks"],
      answer:
        "Watermarks can indicate that content came from a particular system or publisher, but their absence does not automatically mean content is authentic. Watermarks can also be removed or cropped."
    },
    {
      keywords: ["provenance"],
      answer:
        "Provenance is information about where media came from and how it was created or changed. Strong provenance can help establish a media file's history, although not every file has complete provenance information."
    },
    {
      keywords: ["c2pa"],
      answer:
        "C2PA is a technical standard for recording content provenance and associated claims. It can help show information about how digital content was created or modified when compatible credentials are present."
    },
    {
      keywords: ["deepfake and ai", "ai and deepfake"],
      answer:
        "Deepfakes are one category of synthetic or manipulated media. AI can be used to generate or modify faces, voices, video and other content, but not every AI-generated piece of media is a deepfake."
    },
    {
      keywords: ["is every ai image fake", "every ai image"],
      answer:
        "An AI-generated image is synthetic, but 'fake' can be misleading because the image may be intended as fiction, art or illustration. The important question is whether it is being presented as authentic when it is not."
    },
    {
      keywords: ["can deepfakes be harmless", "harmless deepfake"],
      answer:
        "Yes. Synthetic media can have legitimate uses in entertainment, education, accessibility, film production and creative work. The major concern is deceptive or harmful use."
    },
    {
      keywords: ["why are deepfakes dangerous", "dangerous"],
      answer:
        "Deepfakes can make false events, statements or identities appear authentic. Potential harms include fraud, impersonation, privacy violations, reputational damage and confusion about genuine evidence."
    },
    {
      keywords: ["what should i do", "what do i do", "suspicious media"],
      answer:
        "Pause before sharing or acting on suspicious media. Check the source, date and context, compare independent sources, and verify important claims through a trusted channel."
    },
    {
      keywords: ["someone is impersonating me", "impersonating me", "my face"],
      answer:
        "Preserve evidence such as URLs, screenshots and relevant messages where safe. Report the material to the platform, secure your accounts and consider appropriate local legal or support resources if the situation is serious."
    },
    {
      keywords: ["deepfake laws", "legal", "law"],
      answer:
        "Laws concerning synthetic media vary by country and situation. Rules may involve fraud, impersonation, privacy, harassment, defamation or non-consensual intimate imagery. For a specific incident, local legal guidance is more appropriate than assuming one global rule."
    },
    {
      keywords: ["best way to verify", "verification process"],
      answer:
        "Use multiple independent signals: identify the original source, check the date and context, compare other reliable sources, inspect the media for inconsistencies, and independently verify important claims or identities."
    },
    {
      keywords: ["most important", "main rule", "one rule"],
      answer:
        "The most important principle is simple: do not let a familiar face, voice or convincing video become your only evidence. Pause, verify the source and independently confirm important claims."
    }
  ];

  const match = answers.find((item) =>
    item.keywords.some((keyword) => question.includes(keyword))
  );

  if (match) {
    setAssistantAnswer(match.answer);
  } else {
    setAssistantAnswer(
      "I’m the VERITY intelligence layer, focused on synthetic media and verification. Try asking about deepfakes, AI-generated images, voice cloning, face swaps, detection, reverse-image search, provenance, scams, privacy, impersonation, or how to verify suspicious media."
    );
  }
};

    const nextChallenge = () => {
    setChallengeStep((step) => Math.min(step + 1, 3));
  };

  const answerSpot = (choice) => {
    if (spotAnswered) return;

    setSpotSelected(choice);
    setSpotAnswered(true);

    if (choice === spotChallenge[spotRound].fake) {
      setSpotScore((score) => score + 1);
    }
  };

  const nextSpotRound = () => {
    if (spotRound < spotChallenge.length - 1) {
      setSpotRound((round) => round + 1);
      setSpotSelected(null);
      setSpotAnswered(false);
    }
  };

  const restartSpot = () => {
    setSpotRound(0);
    setSpotScore(0);
    setSpotSelected(null);
    setSpotAnswered(false);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => scrollTo("home")}
          aria-label="Verity home"
        >
          <span className="brand-mark">V</span>
          <span>VERITY</span>
        </button>

        <nav className="main-nav" aria-label="Primary navigation">
          {[
            ["home", "Explore"],
            ["lab", "Labs"],
            ["cases", "Cases"],
            ["learn", "Learn"],
            ["lab", "Analyze"],
          ].map(([id, label]) => (
            <button
              key={`${id}-${label}`}
              className={activeNav === id ? "nav-active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="login-button"
            onClick={() => setLoginOpen(true)}
          >
            {loggedIn ? "Account" : "Log in"}
          </button>

          <button
            className="header-cta"
            onClick={() => scrollTo("lab")}
          >
            Analyze media
            <span>↗</span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
       <section id="home" className="hero section-black">

  <video
    className="hero-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source
      src="/Videos/hero.mp4" type="video/mp4"/>
  </video>

  <div className="hero-overlay" />

  <div className="hero-atmosphere">
    <div className="orb orb-one" />
    <div className="orb orb-two" />
    <div className="orb orb-three" />
  </div>

  <div className="hero-grid" />

  <div className="hero-content" data-reveal>

    <div className="eyebrow">
      <span className="eyebrow-dot" />
      SYNTHETIC MEDIA INTELLIGENCE
    </div>

    <h1>
      Can you tell
      <br />
      <span className="hero-space">
        <em>what&apos;s real?</em>
      </span>
    </h1>

    <p className="hero-copy">
      Understanding deepfakes, recognizing manipulation, and verifying
      media before you trust it.
    </p>

    <div className="hero-actions">
      <button
        className="primary-button"
        onClick={() => scrollTo("learn")}
      >
        Explore deepfakes
        <span>↗</span>
      </button>

      <button
        className="text-button"
        onClick={() => scrollTo("lab")}
      >
        Open AI Media Checker
        <span>↓</span>
      </button>
    </div>

  </div>

</section>

        {/* WHAT IS A DEEPFAKE */}
        <section
          id="learn"
          className="section-navy section-padding"
        >
          <div className="section-intro" data-reveal>
            <span className="section-number">
              01 / UNDERSTAND
            </span>

            <h2>What is a deepfake?</h2>

            <p>
              A deepfake is synthetic or manipulated media created using
              artificial intelligence or machine-learning techniques. The
              result can look, sound or behave like authentic media even when
              the underlying event never happened.
            </p>
          </div>

          <div className="definition-layout" data-reveal>
            <div className="definition-copy">
              <p className="large-copy">
                In simple terms, AI learns patterns from existing information
                and uses those patterns to generate or modify new media.
              </p>

              <p>
                That can mean generating a completely new image, changing a
                person&apos;s face, cloning characteristics of a voice,
                modifying video frames, or combining several synthetic
                techniques at once.
              </p>

              <p>
                The technology itself has legitimate uses in areas such as
                entertainment, accessibility, education and creative work.
                The same capabilities can also be misused for impersonation,
                deception, harassment, fraud or misleading information.
              </p>

              <button
                className="outline-button"
                onClick={() => scrollTo("examples")}
              >
                Explore synthetic media
                <span>↘</span>
              </button>
            </div>

           <div className="definition-visual">
  <div className="visual-placeholder tall">
    <img src="https://www.bmdllc.com/media/45575/adobestock_288526357.png?width=600&height=375" alt="" />
    <span>IMAGE / VIDEO PLACEHOLDER</span>
    <small>
      Replace: /public/images/deepfake-definition.jpg
    </small>
  </div>

              <div className="floating-caption">
                <span>01</span>
                <p>
                  Synthetic media can affect what we see, hear and believe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE */}
        <section
          id="examples"
          className="section-black section-padding"
        >
          <div className="section-heading-row" data-reveal>
            <div>
              <span className="section-number">
                02 / EXPLORE
              </span>

              <h2>Explore synthetic media</h2>
            </div>

            <p>
              Move between images, video and audio to understand how different
              forms of synthetic media can appear.
            </p>
          </div>

          <div className="media-tabs" data-reveal>
            {["images", "videos",].map((type) => (
              <button
                key={type}
                className={
                  activeMedia === type
                    ? "media-tab active"
                    : "media-tab"
                }
                onClick={() => setActiveMedia(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="media-stage" data-reveal>
            {activeMedia === "images" && (
              <div className="media-example-grid">
                {mediaExamples.images.map((item) => (
                  <article
                    className="media-example"
                    key={item.title}
                  >
                    <div className="media-frame">
                      <img
                        src={item.image}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="media-placeholder-overlay">
                      
                        <small>{"This face was generated by AI and does not belong to any real person."}</small>
                      </div>
                    </div>

                    <div className="media-info">
                      <div>

                        <h3>{item.title}</h3>
                      </div>

                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeMedia === "videos" && (
  <div className="video-lab">
    <div className="video-frame">
  <iframe
    src={mediaExamples.videos[0].video}
    title={mediaExamples.videos[0].title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{ width: "100%", height: "100%", minHeight: "500px", border: 0, display: "block" }}
  />
</div>

    <div className="video-description">
      <span className="tiny-label">VIDEO EXPERIENCE</span>

      <h3>Study movement, not just a single frame.</h3>

      <p>
        Video can reveal inconsistencies that are difficult to
        notice in a still image. Scrub through several moments,
        observe facial movement, lighting and background
        consistency, and compare what you see with the claimed
        context.
      </p>
    </div>
  </div>
)}

          </div>
        </section>

        {/* CREATION */}
        <section
          id="creation"
          className="section-navy section-padding"
        >
          <div className="section-heading-row creation-heading" data-reveal>
            <div>
              <span className="section-number">
                03 / CREATION
              </span>

              <h2>How synthetic media is created</h2>
            </div>

            <p>
              Behind a convincing result is a sequence of data, learning,
              generation, manipulation and presentation.
            </p>
          </div>

          <div className="creation-layout">
  <div className="creation-visual">
    <div className="visual-placeholder tall">
      <img src="https://framerusercontent.com/images/3DeWLCim120bxMfDxZD3uxTRJoE.jpg?width=1792&height=1024" alt="" />
      <span>CREATION PROCESS VISUAL</span>
      <small>
        Replace: /public/images/creation-process.jpg
      </small>
    </div>
  </div>

  <div className="creation-steps">
    {[
      [
        "01",
        "Data",
        "Models learn patterns from examples such as images, voices, video or text.",
      ],
      [
        "02",
        "Learning",
        "Training allows a model to represent patterns and relationships within the data.",
      ],
      [
        "03",
        "Generation",
        "The system produces new content or a new version of existing content.",
      ],
      [
        "04",
        "Manipulation",
        "Synthetic elements can be combined with authentic media to alter what appears to have happened.",
      ],
      [
        "05",
        "Presentation",
        "The final media is distributed with a claim, caption or context that affects how people interpret it.",
      ],
    ].map(([number, title, text], index) => (
      <button
        className="creation-step"
        key={number}
        onClick={() => setCreationInterface(index)}
      >
        <span>{number}</span>

        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>

        <span className="step-arrow">↗</span>
      </button>
    ))}
  </div>
</div>
        </section>

        {/* CASES */}
        <section
          id="cases"
          className="section-black section-padding"
        >
          <div className="section-intro creation-center" data-reveal>
            <span className="section-number">
              04 / IMPACT
            </span>

            <h2>
              When synthetic media becomes a real problem
            </h2>

            <p>
              Understanding misuse is the first step toward protection.
              Synthetic media can affect money, identity, privacy, reputation
              and the way information spreads.
            </p>
          </div>

          <div className="case-grid" data-reveal>
            {cases.map((item) => (
              <button
                className={`case-card ${
                  selectedCase === Number(item.number) - 1
                    ? "selected"
                    : ""
                }`}
                key={item.number}

onClick={() => {
  setCaseInterface(Number(item.number) - 1);
}}
              >
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <strong>View case →</strong>
              </button>
            ))}
          </div>
        </section>

        {/* INSPECTION */}
<section
  id="inspect"
  className="section-navy section-padding"
>
  <div className="inspection-heading" data-reveal>
    <span className="section-number">
      05 / INSPECT
    </span>

    <h2>
      How to tell what is real versus synthetic
    </h2>

    <p>
      Learn to look closer. No single clue is definitive, but patterns
      across several signals can help you decide what deserves further
      verification.
    </p>
  </div>

  <div className="inspection-layout" data-reveal>

        <div className="inspection-image">
      <div className="visual-placeholder inspection-placeholder">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQPQO9lsjXsFsL784dCAAl67uQrvVkI8s7NXR9pt-IfoJbGtuRnaHio0&s=10"
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="placeholder-center">
          <span>INSPECTION IMAGE</span>
          <small>{currentSignal.image}</small>
        </div>

        <div className="inspection-crosshair" />
      </div>
    </div>

    <div className="inspection-content">
      <span className="tiny-label">
        SIGNAL {currentSignal.number}
      </span>

      <h3>
        {currentSignal.title}
      </h3>

      <p className="inspection-description">
        {currentSignal.description}
      </p>

      <div className="inspection-points">
        {currentSignal.points.map((point) => (
          <div key={point}>
            <span>+</span>
            <p>{point}</p>
          </div>
        ))}
      </div>

      <div className="signal-navigation">
        {visualSignals.map((signal, index) => (
          <button
            key={signal.number}
            className={
              index === signalIndex ? "active" : ""
            }
            onClick={() => setSignalIndex(index)}
          >
            {signal.number}
          </button>
        ))}
      </div>
    </div>

  </div>

  <div className="verification-principle">
    <strong>VERIFICATION PRINCIPLE</strong>

    <p>
      No single visual clue proves that media is synthetic. Look for
      several inconsistencies, then verify the source and context.
    </p>
  </div>
</section>

        {/* COMPARISON */}
                <section className="section-black section-padding">
          <div className="section-heading-row" data-reveal>
            <div>
              <span className="section-number">
                06 / COMPARE
              </span>

              <h2>Examine the difference</h2>
            </div>

            <p>
              Drag the divider across the full image. Replace both sides with
              your own media using the placeholders in the code.
            </p>
          </div>

          <div className="comparison-wrapper" data-reveal>
            <div className="comparison-stage">
              <div className="comparison-placeholder">
                <img src="https://icssindia.in/blog/wp-content/uploads/2025/09/ChatGPT-Image-Sep-1-2025-11_22_38-AM.png" alt="" />
                <span className="corner-badge corner-left">REAL</span>
  <span className="corner-badge corner-right">SYNTHETIC</span>
</div>
            </div>
          </div>
        </section>

        {/* LAB */}
        <section
          id="lab"
          className="section-navy section-padding lab-section"
        >
          <div className="section-heading-row" data-reveal>
            <div>
              <span className="section-number">
                07 / AI MEDIA CHECKER
              </span>

              <h2>Deepfake Lab</h2>
            </div>

            <p>
              Upload an image, video or audio file and explore how a
              professional media-review workspace can organize observations,
              uncertainty and verification steps.
            </p>
          </div>

          <div className="lab-shell" data-reveal>
            <aside className="lab-sidebar">
              <div className="lab-sidebar-title">
                <span>VERITY</span>
                <small>MEDIA WORKSPACE</small>
              </div>

              {[
                ["face", "Visual inspection"],
                ["video", "Video signals"],
                ["audio", "Audio signals"],
                ["source", "Source & context"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={
                    selectedLab === id
                      ? "lab-nav-active"
                      : ""
                  }
                  onClick={() => setSelectedLab(id)}
                >
                  <span>
                    {id === "face"
                      ? "01"
                      : id === "video"
                      ? "02"
                      : id === "audio"
                      ? "03"
                      : "04"}
                  </span>

                  {label}
                </button>
              ))}

              <div className="lab-sidebar-note">
                Educational workspace
                <br />
                No biometric identification.
              </div>
            </aside>

            <div className="lab-main">
              {selectedLab !== "source" ? (
                <>
                  <div
                    className="upload-zone"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    onDragOver={(event) =>
                      event.preventDefault()
                    }
                    onDrop={(event) => {
                      event.preventDefault();
                      handleFile(
                        event.dataTransfer.files?.[0]
                      );
                    }}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*,audio/*"
                      hidden
                      onChange={(event) =>
                        handleFile(
                          event.target.files?.[0]
                        )
                      }
                    />

                    {selectedFile ? (
                      <div className="uploaded-media">
                        {fileType === "image" && (
                          <img
                            src={previewUrl}
                            alt="Uploaded media preview"
                          />
                        )}

                        {fileType === "video" && (
                          <video
                            src={previewUrl}
                            controls
                            playsInline
                          />
                        )}

                        {fileType === "audio" && (
                          <div className="audio-upload-preview">
                            <span>♫</span>

                            <audio
                              src={previewUrl}
                              controls
                            />
                          </div>
                        )}

                        <div>
                          <strong>
                            {selectedFile.name}
                          </strong>

                          <small>
                            {(
                              selectedFile.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </small>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="upload-icon">
                          ＋
                        </span>

                        <h3>Drop media here</h3>

                        <p>
                          or choose an image, video or audio
                          file
                        </p>

                        <small>
                          Media stays local in this prototype.
                        </small>
                      </>
                    )}
                  </div>

                  <div className="lab-actions">
                    <button
                      className="primary-button"
                      disabled={
                        !selectedFile ||
                        analysisStage === "analyzing"
                      }
                      onClick={startAnalysis}
                    >
                      {analysisStage === "analyzing"
                        ? "Analyzing..."
                        : "Analyze media"}

                      <span>↗</span>
                    </button>

                    {selectedFile && (
                      <button
                        className="text-button"
                        onClick={() => {
                          if (previewUrl) {
                            URL.revokeObjectURL(
                              previewUrl
                            );
                          }

                          setSelectedFile(null);
                          setPreviewUrl("");
                          setAnalysisStage("idle");
                        }}
                      >
                        Clear file
                      </button>
                    )}
                  </div>

                  {analysisStage === "analyzing" && (
                    <div className="analysis-progress">
                      <div className="progress-header">
                        <span>
                          REVIEWING MEDIA
                        </span>

                        <span>
                          {analysisProgress}%
                        </span>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-value"
                          style={{
                            width: `${analysisProgress}%`,
                          }}
                        />
                      </div>

                      <p>
                        Reviewing the demonstration workflow.
                        A real detector would perform validated
                        model analysis here.
                      </p>
                    </div>
                  )}

                  {analysisStage === "complete" && (
                    <div className="analysis-result">
                      <div className="result-header">
                        <div>
                          <span className="tiny-label">
                            ANALYSIS COMPLETE
                          </span>

                          <h3>Media review</h3>
                        </div>

                        <span className="result-status">
                          DEMO
                        </span>
                      </div>

                      <div className="result-observations">
                        <div>
                          <span>
                            Visual consistency
                          </span>

                          <strong>Review</strong>
                        </div>

                        <div>
                          <span>
                            Lighting consistency
                          </span>

                          <strong>Review</strong>
                        </div>

                        <div>
                          <span>Facial detail</span>

                          <strong>Review</strong>
                        </div>

                        <div>
                          <span>
                            Source information
                          </span>

                          <strong>Unknown</strong>
                        </div>

                        <div>
                          <span>Web presence</span>

                          <strong>
                            Not checked
                          </strong>
                        </div>
                      </div>

                      <div className="result-warning">
                        <strong>Important</strong>

                        <p>
                          This prototype does not establish
                          whether the media is authentic or
                          synthetic. AI detection can make
                          mistakes. A real result should be
                          combined with source, context and
                          independent verification.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="source-workspace">
                  <span className="tiny-label">
                    SOURCE & CONTEXT
                  </span>

                  <h3>
                    Where did this media come from?
                  </h3>

                  <p>
                    Determining whether a file exists
                    elsewhere online is a different task
                    from analyzing whether it contains
                    synthetic content. A proper
                    source-checking workflow can use
                    reverse-image search, provenance
                    information and independent web sources.
                  </p>

                  <div className="source-tools">
                    <div>
                      <span>01</span>

                      <strong>
                        Original source
                      </strong>

                      <p>
                        Locate the earliest available
                        version.
                      </p>
                    </div>

                    <div>
                      <span>02</span>

                      <strong>Context</strong>

                      <p>
                        Check date, location, caption and
                        surrounding claims.
                      </p>
                    </div>

                    <div>
                      <span>03</span>

                      <strong>
                        Independent confirmation
                      </strong>

                      <p>
                        Look for credible sources reporting
                        the same event.
                      </p>
                    </div>
                  </div>

                  <div className="not-available">
                    <span>
                      WEB SEARCH CONNECTION
                    </span>

                    <strong>
                      Not connected in this local prototype.
                    </strong>

                    <p>
                      The interface is ready for a future
                      reverse-search or provenance service.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ASSISTANT */}
        <section className="section-black section-padding">
          <div
            className="assistant-layout"
            data-reveal
          >
            <div>
              <span className="section-number">
                08 / EXPLAIN
              </span>

              <h2>
                Ask the intelligence layer.
              </h2>

              <p>
                An AI explainer can translate technical
                observations into plain language and suggest
                practical verification steps.
              </p>
            </div>

            <div className="assistant-box">
              <div className="assistant-answer">
                <span>SYNTH ASSISTANT</span>

                <p>{assistantAnswer}</p>
              </div>

              <div className="assistant-input">
                <input
                  value={assistantInput}
                  onChange={(event) =>
                    setAssistantInput(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      askAssistant();
                    }
                  }}
                  placeholder="Ask: How can I verify this media?"
                />

                <button onClick={askAssistant}>
                  Ask ↗
                </button>
              </div>

              <div className="assistant-suggestions">
                {[
                  "What is a deepfake?",
                  "How can I verify a video?",
                  "Can AI detectors be wrong?",
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      setAssistantInput(question);

                      setTimeout(() => {
                        const lower =
                          question.toLowerCase();

                        if (
                          lower.includes("deepfake")
                        ) {
                          setAssistantAnswer(
                            "A deepfake is synthetic or manipulated media created using AI or machine-learning techniques. It can involve faces, voices, images, video or combinations of media."
                          );
                        } else if (
                          lower.includes("video")
                        ) {
                          setAssistantAnswer(
                            "Verify the original source, date and context, then inspect movement, lighting, facial edges and audio synchronization. Use several signals rather than one supposed giveaway."
                          );
                        } else {
                          setAssistantAnswer(
                            "Yes. Detection systems can produce false positives and false negatives. Detection output should be treated as evidence for further investigation, not definitive proof."
                          );
                        }
                      }, 0);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

                {/* SPOT THE FAKE CHALLENGE */}
        <section className="section-navy section-padding digital-labs-section">
          <div
            className="section-heading-row"
            data-reveal
          >
            <div>
              <span className="section-number">
                09 / CAN YOU SPOT IT?
              </span>

              <h2>Real or synthetic?</h2>
            </div>

            <p>
              Five rounds. Two images each time. Pick the one you
              think is AI-generated or manipulated.
            </p>
          </div>

          <div className="spot-challenge" data-reveal>
            <div className="spot-progress">
              {spotChallenge.map((_, index) => (
                <span
                  key={index}
                  className={index <= spotRound ? "completed" : ""}
                />
              ))}
            </div>

            <div className="spot-header">
              <span className="tiny-label">
                ROUND {spotChallenge[spotRound].number} / 05
              </span>

              <span className="spot-score">
                SCORE: {spotScore} / {spotChallenge.length}
              </span>
            </div>

            <p className="spot-prompt">
              {spotChallenge[spotRound].prompt}
            </p>

            <div className="spot-images">
              <button
                className={`spot-image-option ${
                  spotAnswered && spotChallenge[spotRound].fake === "A"
                    ? "is-fake"
                    : ""
                } ${
                  spotAnswered && spotSelected === "A" ? "is-selected" : ""
                }`}
                onClick={() => answerSpot("A")}
                disabled={spotAnswered}
              >
               <div className="visual-placeholder">
  <img src={spotChallenge[spotRound].imageA} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}} />
  <span>IMAGE A</span>
  <small>
    Replace: {spotChallenge[spotRound].imageA}
  </small>
</div>

                {spotAnswered && (
                  <span className="spot-tag">
                    {spotChallenge[spotRound].fake === "A"
                      ? "AI-GENERATED"
                      : "AUTHENTIC"}
                  </span>
                )}
              </button>

              <button
                className={`spot-image-option ${
                  spotAnswered && spotChallenge[spotRound].fake === "B"
                    ? "is-fake"
                    : ""
                } ${
                  spotAnswered && spotSelected === "B" ? "is-selected" : ""
                }`}
                onClick={() => answerSpot("B")}
                disabled={spotAnswered}
              >
                <div className="visual-placeholder">
  <img src={spotChallenge[spotRound].imageB} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} />
  <span>IMAGE B</span>
  <small>
    Replace: {spotChallenge[spotRound].imageB}
  </small>
</div>

                {spotAnswered && (
                  <span className="spot-tag">
                    {spotChallenge[spotRound].fake === "B"
                      ? "AI-GENERATED"
                      : "AUTHENTIC"}
                  </span>
                )}
              </button>
            </div>

            {spotAnswered && (
              <div className="spot-result">
                <p>
                  {spotSelected === spotChallenge[spotRound].fake
                    ? "Correct — that one was the AI-generated or manipulated image."
                    : "Not quite — the other image was the AI-generated or manipulated one."}
                </p>

                {spotRound < spotChallenge.length - 1 ? (
                  <button className="primary-button" onClick={nextSpotRound}>
                    Next round
                    <span>→</span>
                  </button>
                ) : (
                  <div className="spot-final">
                    <p className="spot-final-score">
                      Final score: {spotScore} / {spotChallenge.length}
                    </p>

                    <button className="outline-button" onClick={restartSpot}>
                      Play again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* MYTHS */}
        <section className="section-black section-padding">
          <div className="myth-layout" data-reveal>
            <div>
              <span className="section-number">
                10 / RECONSIDER
              </span>

              <h2>Myths versus reality</h2>

              <p>
                Synthetic media changes quickly. Good
                verification starts with avoiding assumptions.
              </p>
            </div>

            <div className="myth-interface">
              <div className="myth-tabs">
                {myths.map((item, index) => (
                  <button
                    key={item.myth}
                    className={
                      selectedMyth === index
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedMyth(index)
                    }
                  >
                    0{index + 1}
                  </button>
                ))}
              </div>

              <div className="myth-content">
                <span>MYTH</span>

                <h3>
                  {myths[selectedMyth].myth}
                </h3>

                <div className="myth-divider" />

                <span>REALITY</span>

                <p>
                  {myths[selectedMyth].reality}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROTECTION */}
        <section
          id="protect"
          className="section-navy section-padding"
        >
          <div className="section-intro" data-reveal>
            <span className="section-number">
              11 / PROTECT
            </span>

            <h2>
              If someone is threatened with synthetic media
            </h2>

            <p>
              Stay calm, preserve evidence and avoid making
              the situation worse by redistributing harmful
              material.
            </p>
          </div>

          <div
            className="protection-list"
            data-reveal
          >
            {protectionSteps.map((step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>

                <p>{step}</p>
              </div>
            ))}
          </div>

          <div
            className="protection-note"
            data-reveal
          >
            <span>REMEMBER</span>

            <strong>
              A familiar face, image or voice is not
              automatically proof of identity.
            </strong>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section-black section-padding timeline-section">
          <div
            className="section-heading-row"
            data-reveal
          >
            <div>
              <span className="section-number">
                12 / EVOLUTION
              </span>

              <h2>
                The synthetic-media timeline
              </h2>
            </div>

            <p>
              The tools have changed rapidly. Verification
              has to change with them.
            </p>
          </div>

          <div className="timeline" data-reveal>
            {timeline.map(
              ([title, text], index) => (
                <div
                  className="timeline-item"
                  key={title}
                >
                  <div className="timeline-marker">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <span>
                      PHASE {index + 1}
                    </span>

                    <h3>{title}</h3>

                    <p>{text}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

                {/* DIGITAL LABS */}
        <section
          id="challenge"
          className="section-navy section-padding digital-labs-section"
        >
          <div
            className="section-heading-row"
            data-reveal
          >
            <div>
              <span className="section-number">
                13 / DIGITAL LABS
              </span>

              <h2>
                Don&apos;t just watch. Verify.
              </h2>
            </div>

            <p>
              Explore different verification experiences
              depending on the media you are investigating.
            </p>
          </div>

          <div className="digital-labs" data-reveal>
            <button
              onClick={() => {
                setSelectedLab("face");
                scrollTo("lab");
              }}
            >
              <span className="lab-index">01</span>

              <div className="lab-card-image">
                <div className="visual-placeholder">
  <img src="https://play-lh.googleusercontent.com/mz7B2NVdtEb6yNRCdZLxzTfwkvCU1150s8rbA5YtY-_YOFZBmUXXlDQeJ_wahdiJ5I-E98xdhnxm-UZtyTc6zA" alt="" />
</div>
              </div>

              <h3>Face & Image Lab</h3>

              <p>
                Inspect facial details, texture, edges,
                reflections and visual consistency.
              </p>

              <strong>Enter lab ↗</strong>
            </button>

            <button
              onClick={() => {
                setSelectedLab("audio");
                scrollTo("lab");
              }}
            >
              <span className="lab-index">02</span>

              <div className="lab-card-image">
                <div className="visual-placeholder">
  <img src="https://media.istockphoto.com/id/1426475862/vector/podcast-icon.jpg?s=612x612&w=0&k=20&c=r0RAbwNOO040MTMZC1tT23vjJftIh8C4fZsjlZ0sfGs=" alt="" />
</div>
              </div>

              <h3>Voice & Audio Lab</h3>

              <p>
                Compare cadence, timing, breathing,
                noise and waveform behavior.
              </p>

              <strong>Enter lab ↗</strong>
            </button>

            <button
              onClick={() => {
                setSelectedLab("source");
                scrollTo("lab");
              }}
            >
              <span className="lab-index">03</span>

              <div className="lab-card-image">
                <div className="visual-placeholder">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXt6E-L6T8e_WeB0ew8w74p3j9Owce4b2fnKzo4oQIqDRxShXSewzw7g&s=10" alt="" />
</div>
              </div>

              <h3>Source & Context Lab</h3>

              <p>
                Trace origins, context and independent
                confirmation before trusting a claim.
              </p>

              <strong>Enter lab ↗</strong>
            </button>
          </div>
        </section>

        {/* SOURCES */}
        <section className="section-black section-padding">
          <div
            className="source-final"
            data-reveal
          >
            <span className="section-number">
              14 / SOURCES
            </span>

            <h2>
              Evidence over assumption.
            </h2>

            <p>
              Verity is designed around verification rather
              than certainty. Educational content should be
              supported by reliable sources and updated as the
              synthetic-media landscape changes.
            </p>

            <div className="source-links">
              <a
                href="https://www.europol.europa.eu/"
                target="_blank"
                rel="noreferrer"
              >
                Europol ↗
              </a>

              <a
                href="https://www.fbi.gov/"
                target="_blank"
                rel="noreferrer"
              >
                FBI ↗
              </a>

              <a
                href="https://www.ftc.gov/"
                target="_blank"
                rel="noreferrer"
              >
                FTC ↗
              </a>
            </div>
          </div>
        </section>
      </main>

{caseInterface !== null && (
  <div className="case-interface">
  
    <div className="case-interface-inner">
      <button
        className="case-back-button"
        onClick={() => setCaseInterface(null)}
      >
        ← Back to cases
      </button>

      <div className="case-interface-header">
        <span className="section-number">
          CASE {cases[caseInterface].number}
        </span>

        <p className="case-location">
          {cases[caseInterface].location} · {cases[caseInterface].date}
        </p>

        <h2>{cases[caseInterface].title}</h2>

        <p>{cases[caseInterface].description}</p>
      </div>
<div className="case-interface-visual">
  <div className="case-interface-visual-box">
    <img
      src={cases[caseInterface].image}
      alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.5}}
    />
  </div>
</div>

      <div className="case-interface-grid">

        <div className="case-info-block">
          <span className="tiny-label">WHAT HAPPENED</span>
          <h3>The incident</h3>
          <p>{cases[caseInterface].whatHappened}</p>
        </div>

        <div className="case-info-block">
          <span className="tiny-label">
            HOW SYNTHETIC MEDIA WAS USED
          </span>
          <h3>The technology</h3>
          <p>{cases[caseInterface].howUsed}</p>
        </div>

        <div className="case-info-block">
          <span className="tiny-label">WHY IT WAS CONVINCING</span>
          <h3>The deception</h3>
          <p>{cases[caseInterface].whyConvincing}</p>
        </div>

        <div className="case-info-block">
          <span className="tiny-label">THE IMPACT</span>
          <h3>What happened next</h3>
          <p>{cases[caseInterface].impact}</p>
        </div>

        <div className="case-info-block">
          <span className="tiny-label">HOW IT WAS DISCOVERED</span>
          <h3>Verification</h3>
          <p>{cases[caseInterface].discovered}</p>
        </div>

      </div>

      <div className="case-lesson-large">
        <span className="tiny-label">VERIFICATION LESSON</span>
        <h3>{cases[caseInterface].lesson}</h3>
      </div>

      <div className="case-sources">
        <span className="tiny-label">SOURCES</span>

        {cases[caseInterface].sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            {source.name} ↗
          </a>
        ))}
      </div>

    </div>
  </div>
)}

{creationInterface !== null && (
        <div className="creation-interface">
          <div className="creation-interface-inner">

            <button
              className="creation-back-button"
              onClick={() => setCreationInterface(null)}
            >
              ← Back to creation 
            </button>

            <div className="creation-interface-header">
              <span className="section-number">
                {creationDetails[creationInterface].number} /{" "}
                {creationDetails[creationInterface].eyebrow}
              </span>

              <h2>
                {creationDetails[creationInterface].title}
              </h2>

              <p>
                {creationDetails[creationInterface].intro}
              </p>
            </div>

            <div className="creation-interface-visual">
  <div className="creation-interface-visual-box">
    <img
      src={creationDetails[creationInterface].image}
      alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.5}}
    />
  
  </div>
</div>

           <div className="creation-interface-grid">

  <div className="creation-info-block">
    <span className="tiny-label">
      HOW IT WORKS
    </span>

    <h3>
      Inside the process
    </h3>

    <div className="creation-how-list">
      {creationDetails[
        creationInterface
      ].howItWorks.map((item, index) => (
        <div key={item}>
          <span>
            0{index + 1}
          </span>

          <p>{item}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="creation-side">
    <div className="creation-info-block">
      <span className="tiny-label">
        EXAMPLE
      </span>

      <h3>
        See it in context
      </h3>

      <p>
        {creationDetails[creationInterface].example}
      </p>
    </div>

    <div className="creation-info-block">
      <span className="tiny-label">
        KEY TAKEAWAY
      </span>

      <h3>
        What to remember
      </h3>

      <p>
        {creationDetails[creationInterface].takeaway}
      </p>
    </div>
  </div>

</div>

{/* ===== NEW: COMMON TECHNIQUES + IN PRACTICE ===== */}
<div className="creation-extra">
  <div className="creation-extra-block">
    <span className="tiny-label">COMMON TECHNIQUES</span>

    <div className="creation-chips">
      {(creationDetails[creationInterface].techniques || []).map((tech) => (
        <span className="creation-chip" key={tech}>
          {tech}
        </span>
      ))}
    </div>
  </div>

  <div className="creation-extra-block">
    <span className="tiny-label">IN PRACTICE</span>

    <p>{creationDetails[creationInterface].inPractice}</p>
  </div>
</div>
{/* ===== END NEW ===== */}

<div className="creation-why">
  <span className="tiny-label">
    WHY IT MATTERS
  </span>

  <h3>
    Why this stage matters
  </h3>

  <p>
    {creationDetails[
      creationInterface
    ].why}
  </p>
</div>

            <div className="creation-interface-footer">
              <button
                className="outline-button"
                onClick={() => {
                  if (creationInterface < creationDetails.length - 1) {
                    setCreationInterface(
                      creationInterface + 1
                    );
                  }
                }}
                disabled={
                  creationInterface ===
                  creationDetails.length - 1
                }
              >
                Next:{" "}
                {
                  creationDetails[
                    Math.min(
                      creationInterface + 1,
                      creationDetails.length - 1
                    )
                  ].title
                }
                <span>→</span>
              </button>

              <button
                className="text-button"
                onClick={() => setCreationInterface(null)}
              >
                Return to creation
                <span>↗</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark">
                V
              </span>

              <span>VERITY</span>
            </div>

            <p>
              Synthetic-media intelligence for education,
              awareness and verification.
            </p>
          </div>

          <div className="footer-columns">
            <div>
              <span>EXPLORE</span>

              <button
                onClick={() => scrollTo("learn")}
              >
                Learn
              </button>

              <button
                onClick={() => scrollTo("examples")}
              >
                Examples
              </button>

              <button
                onClick={() => scrollTo("cases")}
              >
                Cases
              </button>
            </div>

            <div>
              <span>LABS</span>

              <button
                onClick={() => scrollTo("lab")}
              >
                AI Media Checker
              </button>

              <button
                onClick={() => scrollTo("inspect")}
              >
                Inspection
              </button>

              <button
                onClick={() => scrollTo("challenge")}
              >
                Challenge
              </button>
            </div>

            <div>
              <span>TRUST</span>

              <button
                onClick={() => scrollTo("protect")}
              >
                Protection
              </button>

              <button
                onClick={() => scrollTo("learn")}
              >
                Privacy
              </button>

              <button
                onClick={() => scrollTo("lab")}
              >
                Verification
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>2026 TEAM FAKES</span>
          <span>
            EDUCATIONAL AI SAFETY INITIATIVE
          </span>
          <span>NO TRACKING</span>
          <span>LOCAL DEMO</span>
          <span>EDUCATIONAL USE</span>
          <span>
            BUILT FOR AWARENESS, NOT DETECTION GUARANTEES
          </span>
        </div>
      </footer>

      {loginOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="login-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() => setLoginOpen(false)}
            >
              ×
            </button>

            {!loggedIn ? (
              <>
                <span className="tiny-label">
                  VERITY ACCOUNT
                </span>

                <h2>
                  Sign in to Verity.
                </h2>

                <p>
                  Account functionality is presented as a
                  local prototype. No real authentication
                  service is connected yet.
                </p>

                <input
                  placeholder="Email address"
                  type="email"
                />

                <input
                  placeholder="Password"
                  type="password"
                />

                <button
                  className="primary-button full-button"
                  onClick={() => {
                    setLoggedIn(true);
                    setLoginOpen(false);
                  }}
                >
                  Continue
                  <span>→</span>
                </button>
              </>
            ) : (
              <>
                <span className="tiny-label">
                  ACCOUNT
                </span>

                <h2>
                  You&apos;re signed in.
                </h2>

                <p>
                  Local prototype session.
                </p>

                <button
                  className="outline-button full-button"
                  onClick={() => {
                    setLoggedIn(false);
                    setLoginOpen(false);
                  }}
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const spotChallenge = [
  {
    number: "01",
    prompt: "Which image is AI-generated?",
    imageA: "https://img.magnific.com/free-photo/nature-sunset-tranquil-meadow-rural-scene-beauty-generative-ai_188544-15462.jpg?semt=ais_hybrid&w=740&q=80",      // fake: "A" → A is the AI one
    imageB: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFuZHNjYXBlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    fake: "A",
  },
  {
    number: "02",
    prompt: "Which image is AI-generated?",
    imageA: "https://cdn.independent-photo.com/wp-content/uploads/2022/03/Karen-Pape-1800x1200.jpeg?width=1800&format=webp&quality=85",
    imageB: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8WnlEvvIIBVvUh_o5HZFX97tsnEKikyoqzlb1GUjp35AI4N0ITcaClM&s=10",      // fake: "B" → B is the AI one
    fake: "B",
  },
  {
    number: "03",
    prompt: "Which image is AI-generated?",
    imageA: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5c2FDd9ScxrDG7BbIEzuDkYcio5oeg3lXumLlRDET3gT8QJ-O6I4HRCw&s=10",      // fake: "A"
    imageB: "https://static.vecteezy.com/system/resources/thumbnails/057/340/902/small/close-up-portrait-of-a-handsome-confident-man-with-a-beard-wearing-a-suit-against-a-bright-white-background-in-a-professional-setting-free-photo.jpg",
    fake: "A",
  },
  {
    number: "04",
    prompt: "Which image is AI-generated?",
    imageA: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-kwlGRAFDUdVJAVEEGaaYJT39wAyjAdCeRXbUbyfsw&s=10",
    imageB: "https://torquecafe.b-cdn.net/wp-content/uploads/2025/09/google-gemini-ai-mercedes-benz.jpg",      // fake: "B"
    fake: "B",
  },
  {
    number: "05",
    prompt: "Which image is AI-generated?",
    imageA: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqo3O3PtQlbZPlWjXyTxi10FKlFE7_12LStTa8rzMV7Q&s=10",      // fake: "A"
    imageB: "https://img.magnific.com/free-photo/portrait-handsome-smiling-stylish-hipster-lambersexual-model-sexy-man-dressed-tshirt-jeans-fashion-male-isolated-blue-wall-studio_158538-26731.jpg?semt=ais_hybrid&w=740&q=80",
    fake: "A",
  },
];
export default App;