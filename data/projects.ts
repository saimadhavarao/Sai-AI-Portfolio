export interface Project {
  slug: string;
  name: string;
  year: number;
  category: string;
  subtitle: string;
  description: string;
  technologies: string[];
  flagship: boolean;
  github: string;
  accent: string;
  problem: string;
  objective: string;
  architecture: string[][];
  metrics: { value: string; label: string }[];
  sections: { title: string; paragraphs: string[] }[];
}
export const projects: Project[] = [
  {
    "slug": "friday",
    "name": "FRIDAY",
    "year": 2026,
    "category": "Agentic AI / Generative AI",
    "subtitle": "Personal AI Agent & Workflow Orchestration Platform",
    "description": "A context-aware personal AI assistant that combines knowledge retrieval, persistent memory, email intelligence, interview scheduling and proactive workflow automation.",
    "technologies": [
      "Python",
      "LangGraph",
      "RAG",
      "FastAPI",
      "React",
      "SQLite",
      "Docker"
    ],
    "flagship": true,
    "github": "https://github.com/saimadhavarao/FRIDAY-PersonalAI",
    "accent": "#b9a1ff",
    "problem": "Personal productivity tools operate independently across emails, calendars, tasks and documents. Users repeatedly search for information, manually coordinate schedules and track follow-ups without a unified understanding of their context.",
    "objective": "Develop a unified personal AI workspace capable of retrieving relevant knowledge, remembering user preferences, orchestrating multi-step workflows and executing approved actions.",
    "architecture": [
      [
        "React workspace"
      ],
      [
        "LangGraph"
      ],
      [
        "RAG",
        "Memory",
        "Tools",
        "Jobs"
      ],
      [
        "Human approval"
      ],
      [
        "Action execution",
        "Audit & persistence"
      ]
    ],
    "metrics": [
      {
        "value": "33.3 pp",
        "label": "Grounding improvement"
      },
      {
        "value": "72 / 72",
        "label": "V2 regression cases"
      },
      {
        "value": "22",
        "label": "Local tests passed"
      }
    ],
    "sections": [
      {
        "title": "Engineering decisions & implementation",
        "paragraphs": [
          "LangGraph-based multi-step workflow orchestration.",
          "Sparse, dense and hybrid retrieval with reranking and supporting citations.",
          "Persistent and editable user preference memory.",
          "Recruiter follow-up drafting and calendar scheduling workflows.",
          "Human approval gates with draft-specific approval fingerprints.",
          "Asynchronous background workers and proactive daily briefings.",
          "Integration interfaces for JARVIS and AgentTrace.",
          "Evaluation framework covering retrieval, scheduling, grounding and abstention."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "Paired synthetic regression benchmark with a deterministic mock provider and 72 cases per version. A pass represents a grounded answer or a correct abstention."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "Improved grounded answer performance from 48/72 to 72/72 on the paired synthetic regression suite. Locally validated persistent memory, scheduling, approval workflows, background processing and Docker deployment."
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Coordinating multiple AI workflows while preserving user context, preventing unsupported answers and ensuring external actions require explicit approval."
        ]
      },
      {
        "title": "Limitations & scope",
        "paragraphs": [
          "Evaluation used fictional data and a mock provider. External writes require draft-specific human approval."
        ]
      }
    ]
  },
  {
    "slug": "agenttrace",
    "name": "AgentTrace",
    "year": 2026,
    "category": "LLM Evaluation / AI Observability",
    "subtitle": "AI Agent Failure Detection & Recovery Platform",
    "description": "Detects reasoning failures, tool-call errors, execution loops and context inconsistencies in AI agent workflows through trace-level analysis.",
    "technologies": [
      "Python",
      "FastAPI",
      "LLM Evaluation",
      "PostgreSQL",
      "React",
      "Docker"
    ],
    "flagship": true,
    "github": "https://github.com/saimadhavarao/AgentTrace",
    "accent": "#929fff",
    "problem": "AI agents can produce incorrect outcomes even when individual tool calls execute successfully. Traditional application monitoring struggles to identify reasoning failures, missing actions and contradictory context across multi-step workflows.",
    "objective": "Build an observability platform that analyzes agent execution traces, identifies failure patterns, distinguishes confirmed failures from ambiguous outcomes and supports systematic debugging.",
    "architecture": [
      [
        "Agent traces"
      ],
      [
        "Ingestion"
      ],
      [
        "Analysis"
      ],
      [
        "Evaluation"
      ],
      [
        "Persistence"
      ],
      [
        "Dashboard"
      ]
    ],
    "metrics": [
      {
        "value": "480",
        "label": "Generated traces"
      },
      {
        "value": "8",
        "label": "Failure categories"
      },
      {
        "value": "21",
        "label": "Backend tests passed"
      }
    ],
    "sections": [
      {
        "title": "Engineering decisions & implementation",
        "paragraphs": [
          "Structured ingestion and normalization of multi-step agent execution traces.",
          "Failure detection covering execution loops, invalid arguments, missing actions, semantic errors and context mismatches.",
          "Evaluation dataset containing successful, failed and ambiguous executions.",
          "Rule checks and optional semantic judging surface evidence-linked findings and advisory recovery recommendations in the React dashboard.",
          "SQLite and PostgreSQL testing with containerized deployment."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "The generated dataset spans three fixture-backed LangGraph agents and is split into 288 training, 96 validation and 96 holdout traces. Review compares rule-based findings and optional semantic judging against expected labels, including ambiguous outcomes."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "Built and locally validated an agent observability system using 480 generated traces across three agents, with separate development and holdout splits."
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Distinguishing actual reasoning failures from valid retries and ambiguous agent behavior."
        ]
      },
      {
        "title": "Limitations & scope",
        "paragraphs": [
          "Findings carry supporting evidence and advisory recovery actions. Generated traces do not establish accuracy on production traffic."
        ]
      }
    ]
  },
  {
    "slug": "jarvis",
    "name": "JARVIS",
    "year": 2026,
    "category": "Document AI / Intelligent Automation",
    "subtitle": "Intelligent Document & Deadline Assistant",
    "description": "Transforms bills, notices and personal documents into actionable obligations, tracks document revisions and automatically manages deadline reminders.",
    "technologies": [
      "Python",
      "OCR",
      "NLP",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Docker"
    ],
    "flagship": false,
    "github": "https://github.com/saimadhavarao/Jarvis-PersonalAI",
    "accent": "#65dfb4",
    "problem": "Important deadlines are scattered across bills, insurance notices, financial statements and personal documents. When documents are revised, existing reminders can become outdated, resulting in missed deadlines or incorrect payments.",
    "objective": "Build a document intelligence system that understands actionable information, maintains document history and manages reminders throughout the obligation lifecycle.",
    "architecture": [
      [
        "Documents"
      ],
      [
        "OCR & parsing"
      ],
      [
        "Extraction"
      ],
      [
        "Version matching"
      ],
      [
        "Approval"
      ],
      [
        "Scheduler"
      ]
    ],
    "metrics": [
      {
        "value": "93.3%",
        "label": "Fully correct obligations"
      },
      {
        "value": "100%",
        "label": "Exact dates, including unresolved"
      },
      {
        "value": "120",
        "label": "Fictional documents"
      }
    ],
    "sections": [
      {
        "title": "Engineering decisions & implementation",
        "paragraphs": [
          "Document ingestion, OCR and structured information extraction.",
          "Automatic identification of deadlines, payment amounts and obligations.",
          "Similarity-based detection of duplicate and revised documents.",
          "Human-in-the-loop approval for changes to existing obligations.",
          "Automatic cancellation and rescheduling of outdated reminders.",
          "Persistent document history and obligation lifecycle management."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "The synthetic benchmark generated 360 fictional documents and grouped the 120-document holdout by template family. Dates matched in 120 of 120 cases, including expected unresolved dates. 112 of 120 cases were fully correct across evaluated obligation fields. All eight differences came from issuer OCR."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "The revised-bill API test verified that approving a replacement cancelled five future reminders and scheduled five new ones, while preserving both documents and the audit events."
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Maintaining consistency between document versions, active obligations and scheduled reminders without duplicating actions.",
          "Preserving source evidence so reviewers can resolve uncertain OCR or dates."
        ]
      },
      {
        "title": "Limitations & scope",
        "paragraphs": [
          "The team inspected this synthetic holdout during development to correct extraction behavior. Revised obligations require a human approval before reminders change."
        ]
      }
    ]
  },
  {
    "slug": "escalationiq",
    "name": "EscalationIQ",
    "year": 2026,
    "category": "Predictive ML / NLP",
    "subtitle": "Customer Support Escalation Prediction",
    "description": "Predicts which customer support conversations are likely to escalate, allowing teams to identify high-risk tickets before problems become critical.",
    "technologies": [
      "Python",
      "Machine Learning",
      "NLP",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Docker"
    ],
    "flagship": false,
    "github": "https://github.com/saimadhavarao/EscalationIQ",
    "accent": "#62dcf0",
    "problem": "Customer support teams often discover escalation risks only after customers become frustrated. Manual ticket prioritization struggles to capture changing conversation patterns across large support queues.",
    "objective": "Develop an early-warning ML system that estimates escalation risk using information available at each stage of a support conversation.",
    "architecture": [
      [
        "Support tickets"
      ],
      [
        "Preprocessing"
      ],
      [
        "Features"
      ],
      [
        "ML inference"
      ],
      [
        "Risk policy"
      ],
      [
        "Dashboard"
      ]
    ],
    "metrics": [
      {
        "value": "900",
        "label": "Synthetic support tickets"
      },
      {
        "value": "240",
        "label": "Chronological holdout"
      },
      {
        "value": "9",
        "label": "Support categories"
      }
    ],
    "sections": [
      {
        "title": "Engineering decisions & implementation",
        "paragraphs": [
          "NLP-based conversation processing and escalation risk prediction.",
          "Chronological train and holdout separation to reduce temporal data leakage.",
          "Prefix-only inference using messages available at prediction time.",
          "Interactive conversation replay showing changes in escalation risk.",
          "Alert cooldown mechanisms to prevent repeated notifications.",
          "FastAPI and SQLAlchemy persist messages and prediction decisions in PostgreSQL, with Alembic migrations."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "The chronological holdout contains 240 tickets with 77 escalations. Replay submits one message at a time and the model scores the ordered prefix available at that point. Dataset counts describe evaluation scope."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "Developed an end-to-end predictive ML application with 900 synthetic support tickets and a chronological holdout of 240 tickets, including 77 escalations."
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Preventing future conversation information from leaking into earlier predictions while maintaining useful risk estimates."
        ]
      },
      {
        "title": "Limitations & scope",
        "paragraphs": [
          "A seeded synthetic dataset supports repeatable local evaluation. Alerts recommend specialist review and have a cooldown."
        ]
      }
    ]
  },
  {
    "slug": "multi-layer-perceptron",
    "name": "Multi-Layer Perceptron",
    "year": 2025,
    "category": "Deep Learning / Computer Vision",
    "subtitle": "Handwritten Digit Classification & Neural Network Optimization",
    "description": "A supervised deep learning project focused on training and optimizing a fully connected neural network for handwritten digit recognition, investigating model generalization and classification performance.",
    "technologies": [
      "Python",
      "Deep Learning",
      "MLP",
      "MNIST",
      "Computer Vision",
      "Jupyter"
    ],
    "flagship": false,
    "github": "https://github.com/saimadhavarao/Training-a-Multi-Layer-Perceptron",
    "accent": "#f3c36c",
    "problem": "Neural networks trained on standardized benchmark datasets can struggle to recognize unfamiliar handwriting. Differences in stroke patterns, image representation and writing styles create distribution shifts that affect classification accuracy.",
    "objective": "Develop a Multi-Layer Perceptron for handwritten digit classification, evaluate its predictive performance and investigate techniques for improving generalization beyond the original training dataset.",
    "architecture": [
      [
        "784 input features"
      ],
      [
        "Fully connected hidden layers"
      ],
      [
        "10 digit classes"
      ]
    ],
    "metrics": [
      {
        "value": "10",
        "label": "Digit classes"
      },
      {
        "value": "784",
        "label": "MNIST input features"
      },
      {
        "value": "2",
        "label": "Dataset domains"
      }
    ],
    "sections": [
      {
        "title": "Machine learning pipeline",
        "paragraphs": [
          "Data ingestion: Load MNIST and custom handwritten digit datasets.",
          "Image preprocessing: Prepare image representations and numerical features.",
          "Model development: Construct a fully connected neural network for multiclass classification.",
          "Training and optimization: Investigate improvements to predictive performance.",
          "Model evaluation: Compare classification performance across dataset distributions.",
          "Generalization analysis: Identify limitations when processing unfamiliar handwriting."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "The academic submission reports 35% and 52% accuracy on custom handwritten digits and credits augmentation and dropout. The public notebook documents multiple custom-data runs and does not independently reproduce that exact pair."
        ]
      },
      {
        "title": "Engineering decisions & implementation",
        "paragraphs": [
          "Neural network development",
          "Image feature processing",
          "Model optimization",
          "Cross-dataset evaluation",
          "Notebook-based experimental development"
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Distribution shift between standardized images and unfamiliar handwriting.",
          "Generalization beyond the original training distribution.",
          "Capturing meaningful digit characteristics using fully connected layers."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "Developed a supervised deep learning workflow for handwritten digit recognition, demonstrating neural network implementation, experimental training, model evaluation and cross-dataset generalization analysis."
        ]
      },
      {
        "title": "Limitations & scope",
        "paragraphs": [
          "Generalization remains sensitive to handwriting style and preprocessing. Hidden-layer widths are omitted from the schematic."
        ]
      }
    ]
  },
  {
    "slug": "realtime-chess",
    "name": "Real-Time Multiplayer Chess",
    "year": 2025,
    "category": "Full-Stack Engineering / Real-Time Systems",
    "subtitle": "Event-Driven Multiplayer Gaming Platform",
    "description": "An interactive multiplayer chess platform featuring real-time game synchronization, asynchronous communication, authenticated gameplay and persistent game history.",
    "technologies": [
      "Python",
      "Django",
      "Django Channels",
      "WebSockets",
      "JavaScript",
      "Docker",
      "GCP"
    ],
    "flagship": false,
    "github": "https://github.com/saimadhavarao/realtime-chess-django",
    "accent": "#87c8ff",
    "problem": "Traditional polling-based web applications continuously request updates from the server, even when no new events have occurred. In multiplayer gaming, this creates unnecessary network overhead and can introduce delays between player interactions.",
    "objective": "Develop a multiplayer chess platform that replaces periodic HTTP polling with asynchronous, bidirectional communication while maintaining authenticated gameplay and persistent game records.",
    "architecture": [
      [
        "Player A",
        "Player B"
      ],
      [
        "WebSocket"
      ],
      [
        "Django Channels"
      ],
      [
        "Application logic",
        "User & game records"
      ]
    ],
    "metrics": [],
    "sections": [
      {
        "title": "Application layer",
        "paragraphs": [
          "Authentication, game logic and server-side rendering."
        ]
      },
      {
        "title": "Evaluation methodology",
        "paragraphs": [
          "The case study documents the event flow from a browser move through Django Channels to the second client, along with authentication and game history. Concurrent-session load testing is future work."
        ]
      },
      {
        "title": "Persistence layer",
        "paragraphs": [
          "User and game records."
        ]
      },
      {
        "title": "Infrastructure",
        "paragraphs": [
          "Docker, Google Cloud Platform and static IP configuration."
        ]
      },
      {
        "title": "Engineering decision",
        "paragraphs": [
          "Transition from request-driven AJAX polling to event-driven WebSocket communication."
        ]
      },
      {
        "title": "Implementation highlights",
        "paragraphs": [
          "Real-time communication",
          "Multiplayer synchronization",
          "Authentication",
          "Persistent game history",
          "Dynamic rendering",
          "Containerized deployment"
        ]
      },
      {
        "title": "Technical challenges",
        "paragraphs": [
          "Communication overhead: Replace periodic AJAX polling with WebSockets.",
          "Multiplayer interactions: Asynchronous event handling through Django Channels.",
          "State persistence: Store user information and game history.",
          "Application portability: Containerize using Docker.",
          "Deployment accessibility: Configure cloud hosting with a static IP."
        ]
      },
      {
        "title": "Outcome",
        "paragraphs": [
          "Developed an event-driven multiplayer chess application combining persistent communication, asynchronous backend processing, user authentication, dynamic rendering and game history management."
        ]
      },
      {
        "title": "Future enhancements",
        "paragraphs": [
          "Future enhancements include Redis-backed channel layers, automatic reconnection, ELO matchmaking, move analytics, Stockfish integration and concurrent-session load testing."
        ]
      }
    ]
  }
];

