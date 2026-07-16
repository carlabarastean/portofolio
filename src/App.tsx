import { useState, useEffect, useRef } from 'react'
import './App.css'



import profileGraduationDiploma from './assets/images/profile/graduation-diploma.jpg'
import profileGraduationCap from './assets/images/profile/graduation-cap.jpg'
import profileEngineerBadge from './assets/images/profile/engineer-badge.png'
import redcross1 from './assets/images/redcross1.jpeg'
import redcross2 from './assets/images/redcross2.jpeg'
import redcross3 from './assets/images/redcross3.jpeg'
import bd1 from './assets/images/bd1.jpeg'
import bd2 from './assets/images/bd2.jpeg'
import bd3 from './assets/images/bd3.jpeg'
import budgetly2 from './assets/images/budgetly/personalized-overview-dashboard.png'
import budgetly1 from './assets/images/budgetly/landing-dashboard-preview.png'
import budgetly7 from './assets/images/budgetly/interface-settings-panel.png'
import budgetly5 from './assets/images/budgetly/income-category.png'
import budgetly6 from './assets/images/budgetly/friends-payments-module.png'
import budgetly3 from './assets/images/budgetly/expenses-income-summary.png'
import budgetly4 from './assets/images/budgetly/add-income.png'
import rob0 from './assets/images/robo/rob0.jpg'
import rob1_1 from './assets/images/robo/rob1-1.JPG'
import rob1_2 from './assets/images/robo/rob1-2.jpg'
import rob1 from './assets/images/robo/rob1.JPG'
import rob4 from './assets/images/robo/rob4.jpeg'
import rob5 from './assets/images/robo/rob5.jpg'
import rob6 from './assets/images/robo/rob6.png'
import lego1 from './assets/images/lego/lego1.jpeg'
import lego2 from './assets/images/lego/lego2.jpg'
import lego3 from './assets/images/lego/lego3.jpg'
import leo1 from './assets/images/leo/leo1.jpeg'
import leo2 from './assets/images/leo/leo2.jpg'
import leo3 from './assets/images/leo/leo3.jpg'
import leo4 from './assets/images/leo/leo4.jpg'
import sleep1 from './assets/images/sleep/1.jpg'
import sleep2 from './assets/images/sleep/2.jpg'
import sleep3 from './assets/images/sleep/3.jpg'
import sleep4 from './assets/images/sleep/4.jpg'
import sleep5 from './assets/images/sleep/5.jpg'
import sleep6 from './assets/images/sleep/6.jpg'
import sleep7 from './assets/images/sleep/7.jpg'
import eeg1 from './assets/images/eeg/1.jpg'
import eeg2 from './assets/images/eeg/2.jpg'
import eeg3 from './assets/images/eeg/3.jpg'
import eeg4 from './assets/images/eeg/4.jpg'
import eeg5 from './assets/images/eeg/5.jpg'
import eeg6 from './assets/images/eeg/6.jpg'
import eeg7 from './assets/images/eeg/7.jpg'
import eeg8 from './assets/images/eeg/8.jpg'
import cassini1 from './assets/images/cassini/cassini_1.jpeg'
import cassini2 from './assets/images/cassini/cassini_2.jpeg'
import cassini3 from './assets/images/cassini/cassini_3.jpeg'
import cassini4 from './assets/images/cassini/cassini_4.jpeg'
import researchPaperFirstPage from './assets/images/research/iccp-2026-paper-first-page.png'
import bachelorThesisCover from './assets/images/research/bachelor-thesis-cover.png'

const profileImages = [
  {
    src: profileGraduationDiploma,
    alt: 'Carla Maria Bărăștean at her graduation ceremony, holding her diploma and a rose',
    objectPosition: 'center 43%',
  },
  {
    src: profileGraduationCap,
    alt: 'Carla Maria Bărăștean holding her personalized graduation cap',
    objectPosition: 'center 42%',
  },
  {
    src: profileEngineerBadge,
    alt: 'Carla Maria Bărăștean holding her engineer name badge',
    objectPosition: 'center 36%',
  },
]
// Dynamically import any presentation slide images placed in the cassini/pptx or
// cassini/pptx_cassini folders. This accepts both locations so you can keep the
// older folder or the new `pptx_cassini` (higher-quality PNGs) without editing
// this file again. Files will be sorted by filename.
const cassiniPptSlides = [
  ...Object.values(
    import.meta.glob('./assets/images/cassini/pptx/*.{png,jpg,jpeg}', { eager: true }) as Record<
      string,
      { default: string }
    >
  ).map((m) => m.default),
  ...Object.values(
    import.meta.glob('./assets/images/cassini/pptx_cassini/*.{png,jpg,jpeg}', { eager: true }) as Record<
      string,
      { default: string }
    >
  ).map((m) => m.default),
].sort((a: string, b: string) => a.localeCompare(b))

// Dynamically import any images placed in the waste-recognition folder for the EcoSort project.
// Files will be sorted by filename so previews are deterministic.
const ecoSortImages = Object.values(
  import.meta.glob('./assets/images/waste-recognition/*.{png,jpg,jpeg}', { eager: true }) as Record<
    string,
    { default: string }
  >
)
  .map((m) => m.default)
  .sort((a: string, b: string) => a.localeCompare(b))

const segwayControlImages = Object.values(
  import.meta.glob('./assets/images/segway-control/*.{png,jpg,jpeg}', { eager: true }) as Record<
    string,
    { default: string }
  >
)
  .map((m) => m.default)
  .sort((a: string, b: string) => {
    const aIsInterface = a.includes('08-interactive-ekf-viewer')
    const bIsInterface = b.includes('08-interactive-ekf-viewer')

    if (aIsInterface !== bIsInterface) return aIsInterface ? -1 : 1
    return a.localeCompare(b)
  })

const scpcLevelControlImages = Object.values(
  import.meta.glob('./assets/images/scpc-level-control/*.{png,jpg,jpeg}', { eager: true }) as Record<
    string,
    { default: string }
  >
)
  .map((m) => m.default)
  .sort((a: string, b: string) => a.localeCompare(b))



const experiences = [
  {
    role: 'Model-Based Software Developer',
    company: 'BOSCH · Cluj-Napoca',
    period: 'July 2024 - Jan 2025',
    requestFeedback: true,
    details: [
      'Modeled an EV drivetrain using six critical components',
      'Implemented Simulink/ASCET models and validated in TPT',
      'Generated production-grade C code for STM32 controllers',
      'Designed a monitoring GUI for system insights',
    ],
  },
  {
    role: 'Computer and Network Operator',
    company: 'ALBALUX COM',
    period: '2019 - Present',
    details: [
      'Installed and configured hardware for SMEs',
      'Diagnosed network and workstation issues',
      'Delivered on-site and remote technical support',
    ],
  },
]

const projects = [
  {
    id: 'segway-control-estimation',
    title: 'Segway Control & State Estimation Suite',
    subtitle: 'Nonlinear modeling, state-feedback control, observers and Kalman filtering',
    period: 'March 2026',
    stack: 'MATLAB · Simulink · Control Systems · State Estimation',
    description:
      'A complete control-engineering workflow for an unstable nonlinear Segway: modeling, equilibrium analysis, linearization, pole-placement control, Luenberger observation, Kalman filtering, EKF estimation, and unknown-input reconstruction.',
    repository: '',
    color: '#4054d8',
    year: 2026,
    category: 'Control Engineering',
    details: {
      overview:
        'This project follows a nonlinear Segway from its physical state equations to a controlled and observable implementation. I modeled the three-state plant in MATLAB and Simulink, found the upright equilibrium, linearized the dynamics through symbolic Jacobians, and compared the linear approximation with the original nonlinear system.\n\n' +
        'The work then extends the same plant through continuous and forward-Euler discrete models, state-feedback control, observer design, stochastic estimation, and disturbance reconstruction. I also built an interactive MATLAB interface that switches between open-loop, closed-loop, Luenberger, linear Kalman, and nonlinear EKF scenarios while visualizing the Segway and its states in real time.',
      features: [
        'Three-state nonlinear Segway model with a translational state, body angle, angular rate, and one control input',
        'Continuous and discrete linear/nonlinear implementations with a 20 ms sampling period',
        'State-feedback regulation, reference prefiltering, actuator saturation, and linear-versus-nonlinear comparison',
        'Luenberger observer, discrete Kalman filter, extended Kalman filter, and unknown-input estimation',
        'Interactive response viewer with selectable plant, estimator, input signal, noise covariance, and initial conditions',
      ],
      contributions: [
        'Nonlinear Plant Modeling: Implemented the coupled Segway dynamics using MATLAB Function blocks and state integration in Simulink',
        'Linearization & Stability Analysis: Computed symbolic Jacobians at x0 = [0, 0, 0] and identified the unstable open-loop pole at +2.8172',
        'Controller Design: Verified full controllability, placed the closed-loop poles, added a reference prefilter, and tested the controller on both linear and nonlinear plants',
        'State Estimation: Verified full observability and implemented Luenberger, linear Kalman, and extended Kalman estimators',
        'Disturbance Reconstruction: Extended the state to estimate piecewise-constant unknown inputs and tested an unknown-input-decoupling observer',
        'Interactive Engineering UI: Built a MATLAB application for switching scenarios and observing the plant, control effort, estimated states, and estimation error live',
      ],
      results:
        'The complete code executes end-to-end in MATLAB R2025a. Both controllability and observability matrices have full rank 3. With Ts = 0.02 s, the designed controller places the closed-loop poles at approximately 0.9231, 0.9418, and 0.9608 - all inside the discrete-time unit circle. Near the equilibrium, the controlled linear and nonlinear responses closely overlap and track the reference. The experiments also make the model limits visible: the linear Luenberger observer converges on the linear plant but degrades under strong nonlinear mismatch, while the Kalman and EKF implementations provide noise-aware estimates and the augmented observer reconstructs piecewise-constant disturbances after each transient.',
      techStack:
        'MATLAB, Simulink, Symbolic Math Toolbox, Control System Toolbox, State-Space Modeling, Pole Placement, Luenberger Observer, Kalman Filter, Extended Kalman Filter, Unknown-Input Observer, GUI Development',
      images: segwayControlImages,
    },
  },
  {
    id: 'festo-level-control',
    title: 'Festo Level Control - Cascade & Feedforward',
    subtitle: 'Nonlinear process modeling, PI control and disturbance rejection',
    period: 'November 2025',
    stack: 'MATLAB · Simulink · Process Control · System Identification',
    description:
      'A nonlinear level-control project for a Festo process workstation, covering physical plant modeling, experimental identification, PI design, cascade control, feedforward compensation, and inlet/outlet disturbance rejection.',
    repository: '',
    color: '#168878',
    year: 2025,
    category: 'Control Engineering',
    details: {
      overview:
        'This project models and controls the water level in the primary tank of a Festo didactic process workstation. The manipulated variable is the amplifier command voltage that drives the DC motor and centrifugal pump, while the controlled output is the tank level measured through the sensor chain. I built the nonlinear plant from its physical subsystems - amplifier, motor, pump, pump efficiency, rotor current, hydraulic filter, reservoir, and level sensor - rather than replacing the process with a single transfer function.\n\n' +
        'The implementation uses my assigned parameters C = 5.15, u0 = 4.1 V, and k = 0.0210, with a 332.5 cm² tank area. After identifying first-order models around the operating point, I designed PI controllers for the inner flow loop and outer level loop, then evaluated classical feedback, feedforward, cascade, and combined cascade + feedforward structures.',
      features: [
        'Nonlinear component-level model of the Festo hydraulic workstation in Simulink',
        'Personalized operating point and hydraulic parameters used throughout the simulations',
        'Experimental-style first-order identification for pump flow and tank level dynamics',
        'PI control with separate inner flow and outer level loops',
        'Inlet-flow and outlet-flow disturbance scenarios',
        'Classical feedback, feedforward, cascade, and combined cascade + feedforward control structures',
      ],
      contributions: [
        'Physical Process Modeling: Connected amplifier, DC motor, centrifugal pump, efficiency, current, filter, reservoir, and sensing subsystems into a nonlinear plant model',
        'Personalized Parameterization: Implemented the assigned values C = 5.15, u0 = 4.1 V, k = 0.0210, and the corresponding operating point',
        'System Identification: Extracted inner-loop flow and outer-loop level step responses and approximated both dynamics with first-order models',
        'PI Controller Design: Designed and implemented regulators for the flow and level loops using the identified process behavior',
        'Advanced Control Structures: Built feedforward compensation, cascade control, and a combined architecture for simultaneous inlet and outlet disturbances',
        'Simulation Validation: Compared full responses and detailed tracking-error behavior using signals logged directly from the Simulink models',
      ],
      results:
        'All five relevant Simulink models execute end-to-end in MATLAB R2025a with the personalized parameters. The inner-loop identification moves the pump flow from 18.4679 to approximately 30.025 cm³/s over a 6 s simulation, while the external loop captures the much slower tank dynamics from 12.8493 to approximately 17.6547 cm. Both the cascade and combined cascade + feedforward structures converge to the 17.6625 cm reference. When inlet and outlet disturbances are introduced, the combined structure rejects them with only small transient level deviations - on the order of 10^-3 cm in the simulated scenario - before returning toward zero tracking error.',
      techStack:
        'MATLAB, Simulink, Control System Toolbox, Nonlinear Process Modeling, System Identification, PI Control, Cascade Control, Feedforward Control, Disturbance Rejection, Hydraulic Process Control',
      images: scpcLevelControlImages,
    },
  },
  {
    id: 'budgetly',
    title: 'BudgetLy - Collaborative Finance Platform',
    subtitle: 'Full-Stack Finance Platform with Shared Payments',
    period: 'May 2025',
    stack: 'React · Node.js · MongoDB · Express',
    description:
      'A full-stack web application for tracking income, expenses, subscriptions, and shared payments. Features a modern dashboard, monthly financial summaries, transaction management, chart visualizations, friend-based debt tracking, and customizable interface settings.',
    repository: 'https://github.com/carlabarastean/budgetLy_app',
    color: '#6ee7b7',
    year: 2025,
    category: 'Full-Stack Development',
    details: {
      overview:
        'BudgetLy is a full-stack finance management web application developed as a team project. The platform helps users organize their personal finances by tracking income, expenses, subscriptions, upcoming payments, and shared debts in a single, centralized dashboard.\n\n' +
        'The main goal was to build a practical and intuitive budgeting tool that combines financial tracking, visual summaries, and collaborative payment management in a modern web interface.',
      features: [
        'Personal Finance Tracking: Users can manage income, expenses, subscriptions, and upcoming payments while viewing their monthly financial activity in one place.',
        'Interactive Dashboard: Displays key indicators such as monthly expenses, expected income, active subscriptions, net flow, spending categories, and recent activity.',
        'Transaction Management: Add income or expense transactions through interactive forms, assign categories, select dates, and view transactions in a structured overview.',
        'Friends & Shared Payments: Track debts between friends, split payments, view payment history, and send reminders.',
        'Interface Customization: Personalize the app with dark mode, compact view, chart visibility settings, and currency selection (RON, EUR, USD).'
      ],
      contributions: [
        'Full-Stack Development: Contributed to frontend and backend implementation using React.js, Node.js with Express, and MongoDB.',
        'Frontend Implementation: Built React components for dashboards, forms, modals, transaction flows, and settings pages.',
        'Financial Data Management: Implemented logic for organizing transactions, subscriptions, and monthly summaries.',
        'Shared Payments Module: Contributed to debt tracking, split payments, payment status handling, and reminder functionality.',
        'User Experience: Helped design a responsive, dark-themed interface focused on clarity and usability.'
      ],
      results:
        'BudgetLy demonstrates a complete full-stack web application that integrates personal budgeting, collaborative expense tracking, and visual analytics.\n\n' +
        'This project strengthened my experience in full-stack development, database design, API structure, and team-based software delivery.',
      techStack: 'React.js, Node.js, Express.js, MongoDB, JavaScript, HTML5, CSS, REST API, CRUD Operations, State Management, Data Visualization',
      images: [budgetly1, budgetly2, budgetly3, budgetly4, budgetly5, budgetly6, budgetly7],
    },
  },
  {
    id: 'sleep-ai',
    title: 'AI-Based Sleep Quality Prediction System',
    subtitle: 'Academic Machine Learning Project for Predicting Sleep Quality from Questionnaire Data',
    period: 'April 2025',
    stack: 'Python · Machine Learning · Deep Learning · SMOTE',
    description:
      'Developed an AI-based system for predicting sleep quality using questionnaire data, feature selection, SMOTE balancing, CNN models, and ensemble learning.',
    repository: '',
    color: '#a78bfa',
    year: 2025,
    category: 'Machine/Deep Learning',
    details: {
      overview:
        'AI-Based Sleep Quality Prediction System is an academic machine learning project focused on estimating sleep quality using questionnaire-based data collected from active military personnel. I developed a custom composite sleep score from multiple indicators, including subjective sleep quality, sleep duration, insomnia frequency, sleep latency, and daytime sleepiness, then transformed the task into a binary classification problem for model comparison.',
      contributions: [
        'Custom Sleep Score: Created a composite sleep_score by combining subjective sleep quality, sleep duration, insomnia frequency, sleep latency, and daytime sleepiness',
        'Feature Selection: Used statistical correlation analysis to identify the most relevant predictors, including diet quality, sports activity, snoring frequency, night pain, breathing difficulties, breathing pauses, and thermal discomfort during sleep',
        'Data Preprocessing: Cleaned, normalized, and encoded the questionnaire data before applying SMOTE to balance the target classes',
        'Model Comparison: Trained and evaluated Logistic Regression, Random Forest, LightGBM, XGBoost, CNN, and a StackingClassifier to compare different approaches on the same dataset',
        'Pipeline Ownership: Handled the full workflow from preprocessing and feature engineering to training, validation, and result analysis',
      ],
      results:
        'The best results were obtained with a StackingClassifier, which achieved approximately 91.9% accuracy in classifying sleep quality. A Random Forest Regressor also achieved an R² score of approximately 0.87 for continuous sleep score prediction. The comparative analysis showed that while CNNs performed competitively, the stacking ensemble delivered the strongest overall results for this tabular health-data problem.',
      techStack:
        'Python, Scikit-learn, TensorFlow/Keras, XGBoost, LightGBM, Random Forest, StackingClassifier, SMOTE, Optuna, Pandas, NumPy',
      images: [sleep1, sleep2, sleep3, sleep4, sleep5, sleep6, sleep7],
    },
  },
  {
    id: 'eeg-bci',
    title: 'EEG-Based Motor Intention Classification System',
    subtitle: 'Brain-Computer Interface Pipeline for Hand Movement Detection using CNNs',
    period: 'November 2024',
    stack: 'Python · PyTorch · CNN · Signal Processing',
    description:
      'Developed a Brain-Computer Interface pipeline to classify EEG signals into rest, left-hand, and right-hand movement intentions using deep learning and signal-processing methods.',
    repository: 'https://github.com/carlabarastean/eeg-prosthetic-control',
    color: '#67e8f9',
    year: 2024,
    category: 'Machine/Deep Learning',
    details: {
      overview:
        'This project explores the use of AI and EEG signal processing to detect motor intentions from brain activity. Using the PhysioNet Motor Movement/Imagery Dataset, I built a research-oriented pipeline for preprocessing EEG signals, extracting frequency-time features, and training CNN models to classify hand movement intentions.',
      contributions: [
        'EEG Data Analysis: Processed recordings from the PhysioNet Motor Movement/Imagery Dataset (64 channels, 160 Hz) to extract motor-relevant segments.',
        'Signal Preprocessing: Implemented band-pass (7.5-30 Hz) and notch filtering, channel standardization, artifact removal, and normalization to improve signal quality.',
        'Channel Selection: Reduced dimensionality by selecting motor-cortex channels (FC5, FC3, FC1, FCz) to focus the model on relevant signals.',
        'Feature Engineering: Converted time-series EEG into spectrogram and frequency-domain representations using STFT and Welch methods.',
        'Deep Learning Modeling: Designed and iterated multiple CNN architectures with regularization (dropout, batch norm), learning-rate schedules, and early stopping using PyTorch.',
        'Evaluation & Analysis: Measured accuracy, precision, recall, F1-score, and confusion matrices to analyze class separability and model generalization.'
      ],
      results:
        'Implemented a full EEG-to-decision pipeline and identified that simpler CNNs generalized better on noisy EEG data. The best model reached ~60.3% accuracy; analysis showed stronger detection of the Rest class and challenges separating left vs right movement - insights useful for future hybrid or larger-scale models.',
      techStack: 'Python, PyTorch, NumPy, SciPy, STFT, Welch, Spectrograms, Jupyter Notebook',
      images: [eeg1, eeg2, eeg3, eeg4, eeg5, eeg6, eeg7, eeg8],
    },
  },
  {
    id: 'ecosort',
    title: 'EcoSort - Intelligent Waste Recognition & Sorting System',
    subtitle: 'Real-time Waste Classification with EfficientNetB3 & OpenCV',
    period: 'January 2026',
    stack: 'Python · TensorFlow · OpenCV · Arduino',
    description:
      'EcoSort is a deep-learning driven waste classification and sorting prototype that recognizes common waste materials (paper, metal, plastic) and supports real-time webcam inference and optional Arduino-controlled sorting.',
    repository: 'https://github.com/carlabarastean/smart-waste-sorting',
    color: '#16a34a',
    year: 2026,
    category: 'Machine/Deep Learning',
    details: {
      overview:
        'EcoSort is a deep learning waste classification project that identifies waste materials as paper, metal, or plastic. The system uses transfer learning with EfficientNetB3, evaluates model performance with classification metrics, and supports real-time webcam inference through OpenCV. It can also be extended with Arduino serial communication for automatic sorting commands.',
      features: [
        'Classifies waste images into paper, metal, or plastic',
        'Uses EfficientNetB3 with a custom classification head',
        'Applies image preprocessing and data augmentation for robustness',
        'Two-stage training: head training followed by EfficientNet fine-tuning',
        'Evaluates with accuracy, precision, recall, F1-score, and confusion matrix',
        'Supports real-time webcam inference and optional Arduino integration',
      ],
      contributions: [
        'Model design and transfer-learning setup using EfficientNetB3',
        'Data pipeline and augmentation in TensorFlow/Keras',
        'Real-time webcam inference demo using OpenCV',
        'Evaluation scripts and result reporting (classification report, confusion matrix)',
      ],
      results:
        'Test Accuracy: 95.6% (44/46 correct). The model shows strong per-class performance with weighted F1 ~0.96 on the held-out test set.',
      techStack: 'Python, TensorFlow/Keras, OpenCV, NumPy, Pandas, Scikit-learn, Jupyter Notebook, PySerial (optional)',
      images: ecoSortImages,
    },
  },
  ]

const activities = [
  {
    id: 'cassini-aquagraph',
    title: 'CASSINI Hackathon - AquaGraph',
    role: 'Satellite Data Processing Contributor',
    period: 'April 2026',
    location: 'Cluj-Napoca, Romania',
    description:
      'Competed in the 11th CASSINI Hackathon: EU Space for Water with AquaGraph and won 3rd place nationally in Romania, which also meant 1st place in the Cluj-Napoca local hub.',
    color: '#38bdf8',
    year: 2026,
    type: 'Hackathon / Space Data',
    details: {
      overview:
        'I participated in the 11th CASSINI Hackathon: EU Space for Water, a European innovation event where multidisciplinary teams built solutions for major water-related challenges using services such as Copernicus and Galileo. Our team, AquaGraph, competed in the "Tracking and preventing water pollution" category and developed a satellite-based platform for near real-time pollution monitoring in Romanian rivers.',
      contributions: [
        'Achievement: Won 3rd place nationally in Romania; because the first two ranked teams were from Bucharest, our team also achieved 1st place in the Cluj-Napoca local hub',
        'Project Scope: Helped build AquaGraph, an interactive platform that visualizes river pollution risk, combines water-related news, and supports community cleanup initiatives',
        'Sentinel-1 Radar Analysis: Focused on processing Sentinel-1 data to identify potential oil pollution signatures, including dark and smooth patches linked to changes in water surface roughness',
        'Data Fusion Design: Contributed to integrating Sentinel-2 multispectral indicators, EU-Hydro river graph modeling, and GloFAS discharge/forecast data to estimate downstream contamination spread',
        'Team Collaboration: Worked in a six-student interdisciplinary team from Babeș-Bolyai University and the Technical University of Cluj-Napoca, aligned across frontend, backend, and satellite processing tracks',
      ],
      impact:
        'AquaGraph addresses the delay between a pollution event and official detection by combining Earth observation with graph-based river propagation modeling. The approach improves monitoring coverage beyond isolated sampling points and can support faster intervention by authorities, NGOs, and local communities to protect ecosystems and public health.',
      skills:
        'Sentinel-1 Processing, Remote Sensing, Geospatial Data Analysis, Graph Modeling, Environmental Monitoring, Hackathon Collaboration',
      images: [
        cassini1,
        cassini2,
        cassini3,
        cassini4,
      ],
      presentationSlides: cassiniPptSlides,
    },
  },
  {
    id: 'ieee-saci',
    title: 'Panel Speaker - IEEE SACI 2025',
    role: 'International Conference Speaker',
    period: 'May 2025',
    location: 'Budapest, Hungary',
    description:
      'Invited as a panel speaker at the IEEE 19th SACI Conference, representing the ADAPTED Research Group in discussions on innovation in STEM and academic entrepreneurship.',
    color: '#fbbf24',
    year: 2025,
    type: 'Conference / Speaking',
    details: {
      overview:
        'I was honored to be invited as a panel speaker at the IEEE 19th International Symposium on Applied Computational Intelligence and Informatics (SACI 2025) in Budapest. This opportunity allowed me to represent the ADAPTED Research Group in an international workshop focused on innovation in STEM fields and academic entrepreneurship.',
      contributions: [
        'Panel Participation: Engaged in expert discussions on computational intelligence, machine learning applications, and the intersection of research and industry',
        'Research Representation: Presented the ADAPTED Research Group\'s work and contributions to the field of applied computational intelligence',
        'Academic Entrepreneurship: Shared insights on bridging the gap between academic research and practical applications in STEM',
        'International Networking: Connected with researchers, academics, and industry professionals from around the world',
      ],
      impact:
        'This experience strengthened my ability to communicate complex technical concepts to diverse audiences and provided valuable exposure to cutting-edge research in computational intelligence and its real-world applications.',
      skills: 'Public Speaking, Research Communication, Academic Networking, Technical Presentation',
      images: [
        bd1,
        bd2,
        bd3,
      ],
    },
  },
  {
    id: 'robotics-ftc',
    title: 'FIRST Tech Challenge - RO060 Decebal Tech',
    role: 'Team Member & Mentor',
    period: '2019-2022',
    location: 'Deva, Romania',
    description:
      'Built complex competition robots using advanced technologies, applied mathematical and physics concepts, and mentored team members in construction and software development.',
    color: '#f87171',
    year: 2022,
    type: 'Robotics / Competition',
    details: {
      overview:
        "For three seasons, I was a core member and later a mentor for Team RO060 Decebal Tech, competing in Romania's premier robotics championship. My journey involved building competitive robots from scratch, culminating in significant achievements such as the Control Award (1st Place) and the Finalist Alliance Award (1st Pick) at regional qualifiers. Beyond engineering, I actively engaged with the national robotics community, participating in technical inspections and judging sessions.",
      contributions: [
        'Software & Control: Developed Java algorithms for autonomous navigation and sensor integration, which was instrumental in winning the Control Award',
        "The \"All-Rounder\" Phase: As a member of a startup team, I initially juggled multiple roles - Programming, Mechanics, and PR - ensuring the team's survival and growth during its early stages",
        'Competition Strategy: Led the team through high-pressure Technical Inspections and presented our engineering portfolio to expert judges, defending our technical choices',
      ],
      impact:
        "This experience was a crash course in engineering management.\n\n**The Value of Design**: I learned \"the hard way\" that skipping the design phase is costly. After initial failures, I realized that 3D Modeling/CAD must precede physical assembly to ensure precision and efficiency.\n\n**Organizational Efficiency**: Handling Coding, Mechanics, and PR simultaneously taught me a crucial lesson: while versatility is good, a scalable team requires role specialization. This insight helped me restructure the team when I became a mentor.\n\n**Community**: Interacting with students and mentors nationally and internationally broadened my perspective on collaborative innovation.",
      skills: 'Java, Robotics, CAD Concepts, Crisis Management, Public Speaking, Team Leadership',
      images: [
        rob0,
  
        rob1_1,
        rob1_2,
        rob1,
        rob4,
        rob5,
        rob6,
      ],
    },
  },
  {
    id: 'math-olympiad',
    title: 'Mathematics Olympiad',
    role: 'National Competition Participant',
    period: '2023',
    location: 'Iași, Romania',
    description:
      'Participated in the Traian Lalescu National Student Contest, demonstrating advanced problem-solving skills and mathematical reasoning.',
    color: '#93c5fd',
    year: 2023,
    type: 'Academic Competition',
    details: {
      overview:
        'Participated in the Traian Lalescu National Student Contest, a prestigious mathematics competition that challenges students with complex problem-solving and advanced mathematical reasoning.',
      contributions: [
        'Problem Solving: Tackled challenging mathematical problems requiring creative thinking and deep understanding of mathematical principles',
        'Analytical Reasoning: Applied advanced mathematical concepts including algebra, geometry, number theory, and combinatorics',
        'Competition Performance: Demonstrated proficiency in time-constrained problem-solving under competitive conditions',
      ],
      impact:
        'This competition sharpened my analytical thinking and problem-solving abilities, skills that directly translate to tackling complex challenges in computer science and engineering.',
      skills: 'Mathematical Problem Solving, Analytical Thinking, Competitive Mathematics',
    },
  },
  {
    id: 'lego-league',
    title: 'FIRST Lego League',
    role: 'Team Member & Mentor',
    period: '2018-2020',
    location: 'Deva, Romania',
    description:
      'Started as a core team member, then advanced to a technical mentor for Team Lego Warriors. Guided junior students in building autonomous robots with LEGO Mindstorms EV3, focusing on algorithmic logic, structural stability, and competitive strategy.',
        color: '#6ee7b7',
    year: 2020,
    type: 'Robotics / Competition',
    details: {
      overview:
        "FIRST LEGO League is an international competition for students (ages 9-16) that introduces them to science and technology through real-world challenges. As a Mentor for Team Lego Warriors, I transitioned from a \"builder\" role to a leadership position. I guided a team of younger students through the Robot Game (designing autonomous robots using LEGO Mindstorms EV3) and the Innovation Project, fostering their passion for STEM at an early age.",
      contributions: [
        'Technical Mentorship: Taught students the fundamentals of block-based programming and structural stability using the LEGO Mindstorms EV3 platform. I helped them translate abstract logic into physical robot movements',
        "Strategic Planning: Coordinated the team's competition strategy by analyzing the game field, prioritizing high-value missions, and optimizing the robot's run time (2.5 minutes)",
        "Core Values: Instilled the philosophy of \"Gracious Professionalism\" and \"Coopertition,\" ensuring the team worked cohesively while respecting opponents",
      ],
      impact:
        "Mentoring FLL was my first lesson in technical leadership.\n\n**The \"Teacher\" Insight**: I discovered that understanding a concept is different from explaining it. I had to break down complex engineering principles (gear ratios, sensors) into simple terms for younger students.\n\n**Patience & Delegation**: Unlike personal projects where I had full control, here I had to step back, guide, and let the students make (and learn from) their own mistakes.",
      skills: 'Mentoring, LEGO Mindstorms EV3, Project Management, Communication, Youth Leadership',
      images: [
        lego1,
        lego2,
        lego3,
      ],
    },
  },
  {
    id: 'red-cross',
    title: 'Red Cross Volunteer',
    role: 'Volunteer Member',
    period: '2020-2022',
    location: 'Deva, Romania',
    description:
      'Contributed to community well-being through various initiatives, developing skills in first aid, counseling, and emergency response.',
    color: '#ef4444',
    year: 2022,
    type: 'Volunteering',
    details: {
      overview:
        'Served as a volunteer with the Red Cross in Deva from 2020 to 2022, contributing to community well-being through various initiatives. This experience provided opportunities to make meaningful contributions while developing essential interpersonal and emergency response skills.',
      contributions: [
        'Community Service: Contributed to community well-being through various initiatives, focusing on health, safety, and emergency preparedness',
        'First Aid Training: Gained comprehensive skills in first aid, emergency response, and medical assistance',
        'Counseling & Support: Developed skills in counseling and effective communication, helping people in need during difficult situations',
        'Emergency Response: Participated in emergency response activities, contributing to community safety and preparedness',
        'Empathy Development: Developed a deeper understanding of people\'s needs and the importance of compassionate service',
      ],
      impact:
        'This experience developed my empathy, communication skills, and ability to work effectively under pressure. Providing first aid and support to people in need taught me the value of service and gave me valuable perspective on the importance of community support.',
      skills: 'First Aid, Emergency Response, Counseling, Communication, Community Service, Crisis Management',
      images: [
        redcross1,
        redcross2,
        redcross3,
      ],
    },
  },
  {
    id: 'leo-club',
    title: 'LEO Club Sarmizegetusa',
    role: 'Volunteer Member & Treasurer',
    period: '2018-2022',
    location: 'Deva, Romania',
    description:
      'Served as an active volunteer and member of the Coordinator Board in Deva as Treasurer, while also leading projects supporting health initiatives, elderly care, and disability aid.',
    color: '#a78bfa',
    year: 2022,
    type: 'Volunteering',
    details: {
      overview:
        'Active member of LEO Club Sarmizegetusa in Deva from 2018 to 2022, where I contributed both as a volunteer and as part of the Coordinator Board, serving as Treasurer. Alongside this leadership role, I also supported projects focused on health initiatives, elderly care, and disability aid. This experience centered on organizing community development programs and educational initiatives.',
      contributions: [
        'Coordinator Board Leadership: Served on the Coordinator Board in Deva as Treasurer, helping oversee financial coordination and organizational responsibilities',
        'Project Leadership: Led projects supporting health initiatives, elderly care, and disability aid, coordinating volunteer efforts and managing project logistics',
        'Community Development: Organized initiatives focused on education, skills development, and healthy living within the community',
        'Event Organization: Planned and executed community events, managing logistics, coordination, and volunteer participation',
        'Youth Engagement: Facilitated programs that engaged young people in community service and leadership development',
        'Health & Wellness Programs: Organized initiatives promoting healthy living, education, and community wellness',
      ],
      impact:
        'Leading community projects enhanced my organizational and leadership capabilities. This experience taught me the importance of giving back to the community and provided valuable skills in project management, event organization, and working with diverse groups of people.',
      skills: 'Project Leadership, Event Organization, Community Development, Volunteer Coordination, Youth Engagement, Program Management',
      images: [
        leo1,
        leo2,
        leo3,
        leo4,
      ],
    },
  },
  {
    id: 'leadership-course',
    title: 'Leadership and Personal Development',
    role: 'Professional Development Course',
    period: '2019',
    location: 'Romania',
    description:
      'Completed a comprehensive course on leadership and personal development, enhancing professional and interpersonal skills.',
    color: '#f9a8d4',
    year: 2019,
    type: 'Professional Development',
    details: {
      overview:
        'Completed a professional development course on Leadership and Personal Development, instructed by Dr. Ing. Marin Marius Dumitru. This course provided structured learning in leadership principles, personal growth, and professional development.',
      contributions: [
        'Leadership Principles: Studied core leadership theories and practical applications in team and organizational contexts',
        'Personal Development: Explored strategies for self-improvement, goal setting, and professional growth',
        'Communication Skills: Enhanced ability to communicate effectively, give feedback, and build relationships',
        'Professional Growth: Developed frameworks for career development and professional advancement',
      ],
      impact:
        'This course provided a foundation in leadership principles that I\'ve applied throughout my academic and professional journey, particularly in mentoring roles and team collaborations.',
      skills: 'Leadership, Personal Development, Professional Communication, Team Management',
    },
  },
]

const techStack = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'Vite',
  'Tailwind CSS',
  'Python',
  'TensorFlow',
  'PyTorch',
  'OpenCV',
  'Docker',
  'MongoDB',
  'Git',
  'GitHub Actions',
  'MATLAB',
  'Simulink',
]

const projectNoteColors: Record<string, string> = {
  All: '#96607d',
  'Control Engineering': '#4054d8',
  'Full-Stack Development': '#168878',
  'Machine/Deep Learning': '#5f67bd',
}

const activityNoteColors: Record<string, string> = {
  All: '#96607d',
  'Hackathon / Space Data': '#26899a',
  'Conference / Speaking': '#a34f7a',
  'Robotics / Competition': '#aa6e28',
  'Academic Competition': '#526bb0',
  Volunteering: '#4f8965',
  'Professional Development': '#835fa6',
}

const ACTIVITY_AUTOPLAY_INTERVAL_MS = 3000
const usesTechnicalProjectPreview = (projectId: string) => (
  projectId === 'segway-control-estimation' ||
  projectId === 'festo-level-control'
)
const usesProjectSlidePreview = (projectId: string) => (
  projectId === 'sleep-ai' ||
  projectId === 'eeg-bci' ||
  usesTechnicalProjectPreview(projectId)
)

function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null)
  const [isThesisOpen, setIsThesisOpen] = useState<boolean>(false)
  const [isFeedbackRequestOpen, setIsFeedbackRequestOpen] = useState<boolean>(false)
  const [feedbackRequestStatus, setFeedbackRequestStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedbackRequestError, setFeedbackRequestError] = useState<string>('')
  const [feedbackFormStartedAt, setFeedbackFormStartedAt] = useState<number>(0)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxVariant, setLightboxVariant] = useState<'default' | 'sleep-ai'>('default')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [previewImages, setPreviewImages] = useState<string[] | null>(null)
  const [activityAutoplay, setActivityAutoplay] = useState<boolean>(false)
  const activityAutoplayRef = useRef<number | null>(null)
  // Timeout ref used to delay auto-start when the slides section enters view
  const activityAutoplayStartTimeoutRef = useRef<number | null>(null)
  const [activityAutoplayUserPaused, setActivityAutoplayUserPaused] = useState<boolean>(false)
  const slidesSectionRef = useRef<HTMLDivElement | null>(null)
  const slidePreviewRef = useRef<HTMLDivElement | null>(null)
  const [activityPreviewIndex, setActivityPreviewIndex] = useState<number>(0)
  const [isSlideFullscreen, setIsSlideFullscreen] = useState<boolean>(false)
  // Project presentation slides (sleep-ai, eeg-bci) - same behavior as activity slideshow
  const projectPreviewRef = useRef<HTMLDivElement | null>(null)
  const [projectPreviewIndex, setProjectPreviewIndex] = useState<number>(0)
  const [projectAutoplay, setProjectAutoplay] = useState<boolean>(false)
  const projectAutoplayRef = useRef<number | null>(null)
  const projectAutoplayStartTimeoutRef = useRef<number | null>(null)
  const [projectAutoplayUserPaused, setProjectAutoplayUserPaused] = useState<boolean>(false)
  const [isProjectFullscreen, setIsProjectFullscreen] = useState<boolean>(false)

  // Profile image cycling (hero section)
  const [profileImageIndex, setProfileImageIndex] = useState<number>(0)

  // Project filters
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All')
  const [projectYearFilter, setProjectYearFilter] = useState<string>('All')

  // Activity filters
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>('All')

  const projectNoteColor = projectNoteColors[projectCategoryFilter] ?? projectNoteColors.All
  const activityNoteColor = activityNoteColors[activityTypeFilter] ?? activityNoteColors.All

  // Sort projects chronologically (newest first) for default display
  // We keep the original `projects` array untouched and derive a sorted copy for rendering.
  const sortedProjects = [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    // Fallback: compare period strings when years are equal (keeps ordering deterministic)
    return (b.period || '').localeCompare(a.period || '', undefined, { numeric: true, sensitivity: 'base' })
  })

  // Get unique values for filters
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  // Use sortedProjects to produce year filters in descending order
  const projectYears = ['All', ...Array.from(new Set(sortedProjects.map((p) => p.year.toString()))).sort((a, b) => Number(b) - Number(a))]

  const activityTypes = ['All', ...Array.from(new Set(activities.map((a) => a.type)))]

  // Filter projects (apply filters on the chronologically-sorted list)
  const filteredProjects = sortedProjects.filter((project) => {
    const categoryMatch = projectCategoryFilter === 'All' || project.category === projectCategoryFilter
    const yearMatch = projectYearFilter === 'All' || project.year.toString() === projectYearFilter
    return categoryMatch && yearMatch
  })
  
  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const typeMatch = activityTypeFilter === 'All' || activity.type === activityTypeFilter
    return typeMatch
  })

  // Function to format text with bold keywords
  const formatImpactText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const keyword = part.slice(2, -2)
        return (
          <span key={idx}>
            <span className="impact-keyword">{keyword}</span>
            {part.includes(':') ? ': ' : ''}
          </span>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }

  const openFeedbackRequest = () => {
    setFeedbackRequestStatus('idle')
    setFeedbackRequestError('')
    setFeedbackFormStartedAt(Date.now())
    setIsFeedbackRequestOpen(true)
  }

  const closeFeedbackRequest = () => {
    if (feedbackRequestStatus === 'submitting') return
    setIsFeedbackRequestOpen(false)
  }

  const handleFeedbackRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const request = {
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      reason: String(formData.get('reason') || '').trim(),
      website: String(formData.get('website') || ''),
      elapsedMs: feedbackFormStartedAt ? Date.now() - feedbackFormStartedAt : 0,
    }

    setFeedbackRequestStatus('submitting')
    setFeedbackRequestError('')

    try {
      const response = await fetch('/api/request-bosch-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      const responseBody = await response.json().catch(() => ({})) as { error?: string }

      if (!response.ok) {
        throw new Error(responseBody.error || 'The request could not be sent. Please try again.')
      }

      form.reset()
      setFeedbackRequestStatus('success')
    } catch (error) {
      setFeedbackRequestError(
        error instanceof Error ? error.message : 'The request could not be sent. Please try again.'
      )
      setFeedbackRequestStatus('error')
    }
  }

  // Block body scroll when modal is open
  useEffect(() => {
    const isModalOpen = isThesisOpen || isFeedbackRequestOpen || selectedProject !== null || selectedActivity !== null || lightboxImage !== null || previewImages !== null
    
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''
    }
  }, [isThesisOpen, isFeedbackRequestOpen, selectedProject, selectedActivity, lightboxImage, previewImages])

  useEffect(() => {
    if (!isThesisOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsThesisOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isThesisOpen])

  useEffect(() => {
    if (!isFeedbackRequestOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && feedbackRequestStatus !== 'submitting') {
        setIsFeedbackRequestOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isFeedbackRequestOpen, feedbackRequestStatus])

  // Swipe handlers for lightbox
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || lightboxImages.length <= 1) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      const nextIndex = lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0
      setLightboxIndex(nextIndex)
      setLightboxImage(lightboxImages[nextIndex])
    } else if (isRightSwipe) {
      const prevIndex = lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1
      setLightboxIndex(prevIndex)
      setLightboxImage(lightboxImages[prevIndex])
    }
  }

  // NOTE: autoplay is stopped when the lightbox is closed (handled in the overlay/close handlers below)

  // Manage autoplay interval for activity presentation slides (preview mode)
  useEffect(() => {
    if (!activityAutoplay) {
      if (activityAutoplayRef.current) {
        clearInterval(activityAutoplayRef.current)
        activityAutoplayRef.current = null
      }
      return
    }

    const slides = selectedActivity?.details.presentationSlides || []
    if (!slides || slides.length === 0) {
      setActivityAutoplay(false)
      return
    }

    activityAutoplayRef.current = window.setInterval(() => {
      setActivityPreviewIndex((prev) => {
        return (prev + 1) % slides.length
      })
    }, ACTIVITY_AUTOPLAY_INTERVAL_MS) as unknown as number

    return () => {
      if (activityAutoplayRef.current) {
        clearInterval(activityAutoplayRef.current)
        activityAutoplayRef.current = null
      }
    }
  }, [activityAutoplay, selectedActivity])

  // Project autoplay (for selectedProject presentation slides)
  useEffect(() => {
    if (!projectAutoplay) {
      if (projectAutoplayRef.current) {
        clearInterval(projectAutoplayRef.current)
        projectAutoplayRef.current = null
      }
      return
    }

    const slides = selectedProject?.details.images || []
    if (!slides || slides.length === 0) {
      setProjectAutoplay(false)
      return
    }

    projectAutoplayRef.current = window.setInterval(() => {
      setProjectPreviewIndex((prev) => {
        return (prev + 1) % slides.length
      })
    }, ACTIVITY_AUTOPLAY_INTERVAL_MS) as unknown as number

    return () => {
      if (projectAutoplayRef.current) {
        clearInterval(projectAutoplayRef.current)
        projectAutoplayRef.current = null
      }
    }
  }, [projectAutoplay, selectedProject])

  useEffect(() => {
    setProjectPreviewIndex(0)
    setProjectAutoplay(false)
    setProjectAutoplayUserPaused(false)
  }, [selectedProject?.id])

  // Start project autoplay when project slides section enters view
  useEffect(() => {
    if (!projectPreviewRef.current) return
    const el = projectPreviewRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!projectAutoplayUserPaused && !projectAutoplay) {
              if (projectAutoplayStartTimeoutRef.current) {
                clearTimeout(projectAutoplayStartTimeoutRef.current)
                projectAutoplayStartTimeoutRef.current = null
              }
              projectAutoplayStartTimeoutRef.current = window.setTimeout(() => {
                setProjectAutoplay(true)
                projectAutoplayStartTimeoutRef.current = null
              }, ACTIVITY_AUTOPLAY_INTERVAL_MS) as unknown as number
            }
          } else {
            if (projectAutoplayStartTimeoutRef.current) {
              clearTimeout(projectAutoplayStartTimeoutRef.current)
              projectAutoplayStartTimeoutRef.current = null
            }
            setProjectAutoplay(false)
          }
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (projectAutoplayStartTimeoutRef.current) {
        clearTimeout(projectAutoplayStartTimeoutRef.current)
        projectAutoplayStartTimeoutRef.current = null
      }
    }
  }, [selectedProject, projectAutoplayUserPaused, projectAutoplay])

  // Start autoplay automatically when the Presentation Slides section enters the viewport.
  // Delay the auto-start by the chosen interval (e.g. 3s) so the user can settle on the content.
  useEffect(() => {
    if (!slidesSectionRef.current) return
    const el = slidesSectionRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // only schedule auto-start if user hasn't manually paused
            if (!activityAutoplayUserPaused && !activityAutoplay) {
              // clear any previous scheduled start
              if (activityAutoplayStartTimeoutRef.current) {
                clearTimeout(activityAutoplayStartTimeoutRef.current)
                activityAutoplayStartTimeoutRef.current = null
              }
              // schedule autoplay to start after the selected interval
              activityAutoplayStartTimeoutRef.current = window.setTimeout(() => {
                setActivityAutoplay(true)
                activityAutoplayStartTimeoutRef.current = null
              }, ACTIVITY_AUTOPLAY_INTERVAL_MS) as unknown as number
            }
          } else {
            // clear scheduled start if user scrolls away and stop autoplay
            if (activityAutoplayStartTimeoutRef.current) {
              clearTimeout(activityAutoplayStartTimeoutRef.current)
              activityAutoplayStartTimeoutRef.current = null
            }
            setActivityAutoplay(false)
          }
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (activityAutoplayStartTimeoutRef.current) {
        clearTimeout(activityAutoplayStartTimeoutRef.current)
        activityAutoplayStartTimeoutRef.current = null
      }
    }
  }, [selectedActivity, activityAutoplayUserPaused, activityAutoplay])

  useEffect(() => {
    const docWithWebkit = document as Document & { webkitFullscreenElement?: Element | null }
    const onFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || docWithWebkit.webkitFullscreenElement || null
      setIsSlideFullscreen(fullscreenElement === slidePreviewRef.current)
      setIsProjectFullscreen(fullscreenElement === projectPreviewRef.current)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
    }
  }, [])

  const toggleSlideFullscreen = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!slidePreviewRef.current) return

    const docWithWebkit = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void
      webkitFullscreenElement?: Element | null
    }
    const previewWithWebkit = slidePreviewRef.current as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void
    }

    const fullscreenElement = document.fullscreenElement || docWithWebkit.webkitFullscreenElement || null

    try {
      if (fullscreenElement === slidePreviewRef.current) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (docWithWebkit.webkitExitFullscreen) {
          await docWithWebkit.webkitExitFullscreen()
        }
        return
      }

      if (slidePreviewRef.current.requestFullscreen) {
        await slidePreviewRef.current.requestFullscreen()
      } else if (previewWithWebkit.webkitRequestFullscreen) {
        await previewWithWebkit.webkitRequestFullscreen()
      }
    } catch {
      // Ignore if fullscreen is blocked by browser policy.
    }
  }

  const toggleProjectFullscreen = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!projectPreviewRef.current) return

    const docWithWebkit = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void
      webkitFullscreenElement?: Element | null
    }
    const previewWithWebkit = projectPreviewRef.current as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void
    }

    const fullscreenElement = document.fullscreenElement || docWithWebkit.webkitFullscreenElement || null

    try {
      if (fullscreenElement === projectPreviewRef.current) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (docWithWebkit.webkitExitFullscreen) {
          await docWithWebkit.webkitExitFullscreen()
        }
        return
      }

      if (projectPreviewRef.current.requestFullscreen) {
        await projectPreviewRef.current.requestFullscreen()
      } else if (previewWithWebkit.webkitRequestFullscreen) {
        await previewWithWebkit.webkitRequestFullscreen()
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="app">
      <header className="nav">
        <div className="logo">Carla<span>Maria</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#research">Research</a>
          <a href="#activities">Activities</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="eyebrow">Portfolio · 2026</p>
              <h1>
                Carla - Maria <span>Bărăștean</span>
              </h1>
              <h2>Automation and Computer Science Graduate</h2>
              <p className="description">
                I'm an Automation and Computer Science graduate driven by a simple question:{' '}
                <span className="highlight-quote">"How does this actually work?"</span> This curiosity took me from
                building robots in high school to optimizing Electric Vehicle models at Bosch and developing AI-powered
                apps.
                <br />
                <br />
                I love bridging the gap between complex hardware and user-friendly software. Whether I'm debugging a
                Simulink model or perfecting a React component, I'm all about building solutions that matter.
                <br />
                <br />
                <span className="highlight-insight">
                  And if there's one thing I've discovered, it's that the correct solution is usually the simplest
                  one - even if I occasionally try the hard way first.
                </span>
              </p>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore selected work
              </button>
              <div className="hero-notes" aria-label="Areas of focus">
                <span>Control systems</span>
                <span>Software engineering</span>
                <span>Applied AI</span>
              </div>
            </div>
            <div className="hero-visual">
              <svg className="portrait-sparkle" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M32 3C34.5 20.5 43.5 29.5 61 32C43.5 34.5 34.5 43.5 32 61C29.5 43.5 20.5 34.5 3 32C20.5 29.5 29.5 20.5 32 3Z" />
              </svg>
              <div className="hero-image-wrapper" style={{ cursor: 'pointer' }} onClick={() => setProfileImageIndex((prev) => (prev + 1) % profileImages.length)}>
                <img 
                  src={profileImages[profileImageIndex].src}
                  alt={profileImages[profileImageIndex].alt}
                  title="Click to cycle through photos"
                  style={{ objectPosition: profileImages[profileImageIndex].objectPosition }}
                />
              </div>
              <p className="portrait-caption">
                <span>Portrait / {String(profileImageIndex + 1).padStart(2, '0')}</span>
                Click the photograph to cycle
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="section-header">
            <p className="eyebrow">My Journey</p>
            <h3>About Me</h3>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                My journey in technology began in Brad, Hunedoara, where I completed my primary and middle school
                education. Driven by a growing passion for programming and personal development, I made the decision to
                pursue my high school studies in Deva, Hunedoara - a choice that marked the beginning of my commitment to
                following my interests, regardless of distance.
              </p>
              <p>
                This dedication to growth led me further to Cluj-Napoca, Cluj, where I graduated in Automation and
                Computer Science with a final average of 9.25/10. Each step of this journey has been a conscious choice
                to prioritize learning, growth, and the pursuit of what truly matters to me.
              </p>
              <div className="academic-highlight" aria-label="Bachelor's degree achievement">
                <div className="academic-highlight-header">
                  <span className="academic-label">Bachelor's Degree</span>
                  <span className="academic-grade">
                    <strong>9.25</strong>
                    <span>/ 10 final average</span>
                  </span>
                </div>
                <div className="thesis-info">
                  <span className="thesis-label">Bachelor's Thesis</span>
                  <p>Automation of Nonlinear Control Analysis and Design: A MATLAB Implementation Based on Feedback Linearization</p>
                  <button className="thesis-explore-btn" onClick={() => setIsThesisOpen(true)}>
                    <span>Explore thesis & toolbox</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="journey-map">
              <div className="map-container">
                <div className="location-point" data-location="Brad">
                  <div className="point-marker"></div>
                  <div className="location-label">
                    <span className="location-name">Brad</span>
                    <span className="location-details">Primary & Middle School</span>
                  </div>
                </div>
                <div className="journey-line">
                  <div className="line-segment" style={{ '--distance': '38km' } as React.CSSProperties}>
                    <span className="distance-label">38 km</span>
                  </div>
                </div>
                <div className="location-point" data-location="Deva">
                  <div className="point-marker"></div>
                  <div className="location-label">
                    <span className="location-name">Deva</span>
                    <span className="location-details">High School</span>
                  </div>
                </div>
                <div className="journey-line">
                  <div className="line-segment" style={{ '--distance': '160km' } as React.CSSProperties}>
                    <span className="distance-label">160 km</span>
                  </div>
                </div>
                <div className="location-point" data-location="Cluj">
                  <div className="point-marker"></div>
                  <div className="location-label">
                    <span className="location-name">Cluj-Napoca</span>
                    <span className="location-details">Automation &amp; Computer Science Graduate</span>
                  </div>
                </div>
              </div>
              <div className="motto">
                <p className="motto-text">
                  "No distance is too far when passion is the destination."
                </p>
                <p className="motto-subtitle">
                  I'm willing to go anywhere and do anything for what I'm passionate about.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience">
          <div className="section-header">
            <p className="eyebrow">Professional Path</p>
            <h3>Experience</h3>
          </div>
          <div className="experience-list">
            {experiences.map((exp) => (
              <article key={exp.role} className="experience-card">
                <div className="experience-meta">
                  <h4>{exp.role}</h4>
                  <p>{exp.company}</p>
                  <span>{exp.period}</span>
                </div>
                <div className="experience-details">
                  <ul>
                    {exp.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {exp.requestFeedback && (
                    <div className="feedback-request-note">
                      <p>Official experience feedback is available after a brief identity review.</p>
                      <button type="button" className="feedback-request-trigger" onClick={openFeedbackRequest}>
                        Request verified feedback
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="projects"
          style={{ '--note-color': projectNoteColor } as React.CSSProperties}
        >
          <div className="section-header">
            <p className="eyebrow">Selected Work</p>
            <h3><span className="heading-annotation">Projects</span></h3>
          </div>
          <div className="filters">
            <div className="filter-group">
              <label>Category</label>
              <div className="filter-buttons">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${projectCategoryFilter === category ? 'active' : ''}`}
                    aria-pressed={projectCategoryFilter === category}
                    onClick={() => setProjectCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Year</label>
              <div className="filter-buttons">
                {projectYears.map((year) => (
                  <button
                    key={year}
                    className={`filter-btn ${projectYearFilter === year ? 'active' : ''}`}
                    aria-pressed={projectYearFilter === year}
                    onClick={() => setProjectYearFilter(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="results-note" aria-hidden="true">
            <span>Filtered results</span>
            <svg viewBox="0 0 30 34">
              <path d="M5 2C5 18 20 12 19 27" />
              <path d="M13 22L19 28L25 22" />
            </svg>
          </div>
          <div className="project-grid">
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <p>No projects found matching the selected filters.</p>
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setProjectCategoryFilter('All')
                    setProjectYearFilter('All')
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  style={{ '--project-color': project.color } as React.CSSProperties}
                >
                  <div className="project-meta">
                    <h4>{project.title}</h4>
                    <p className="project-subtitle">{project.subtitle}</p>
                    {project.period && (
                      <span className="project-period">{project.period}</span>
                    )}
                    <div className="project-stack">
                      {project.stack.split(' · ').map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-card-hint">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section
          id="research"
          className="research"
          style={{ '--note-color': '#26899a' } as React.CSSProperties}
        >
          <div className="section-header">
            <p className="eyebrow">Submitted Manuscript</p>
            <h3><span className="heading-annotation">Research</span></h3>
          </div>
          <article className="research-paper">
            <div className="research-copy">
              <div className="research-meta">
                <span className="research-status">Submitted to ICCP 2026</span>
                <span>Paper / 2026</span>
              </div>
              <h4>
                As the Crow Flies, or as the River Flows? Graph Topology vs. Proximity in
                Satellite Water-Quality Monitoring
              </h4>
              <p className="research-authors">
                Doru Leșe · Monica Vătafu · Carla Bărăștean · Ciprian Oprișa
              </p>
              <p className="research-description">
                A controlled study of whether physical river-flow topology adds predictive value beyond
                geographic proximity in satellite-based water-quality monitoring. Using matched connectivity
                baselines across national-scale river networks in Germany and Romania, the work examines where
                flow-aware graph structure is informative - especially for dynamic temporal behavior - and where
                proximity alone is sufficient.
              </p>
              <div className="research-tags" aria-label="Research topics">
                <span>Remote sensing</span>
                <span>River networks</span>
                <span>Graph learning</span>
                <span>Controlled evaluation</span>
              </div>
              <p className="research-note">
                Manuscript submitted for review. The full text is not publicly available.
              </p>
            </div>
            <button
              className="research-preview"
              aria-label="Open a preview of the paper's first page"
              onClick={() => {
                setLightboxImages([researchPaperFirstPage])
                setLightboxIndex(0)
                setLightboxVariant('default')
                setLightboxImage(researchPaperFirstPage)
              }}
            >
              <img
                src={researchPaperFirstPage}
                alt="First page of the manuscript submitted to ICCP 2026"
              />
              <span className="research-preview-caption">
                <span>First-page preview</span>
                <span>Open image ↗</span>
              </span>
            </button>
          </article>
        </section>

        <section
          id="activities"
          className="activities"
          style={{ '--note-color': activityNoteColor } as React.CSSProperties}
        >
          <div className="section-header">
            <p className="eyebrow">Beyond Coursework</p>
            <h3>Activities & <span className="heading-annotation">Leadership</span></h3>
          </div>
          <div className="filters">
            <div className="filter-group">
              <label>Type</label>
              <div className="filter-buttons">
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${activityTypeFilter === type ? 'active' : ''}`}
                    aria-pressed={activityTypeFilter === type}
                    onClick={() => setActivityTypeFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="results-note" aria-hidden="true">
            <span>Filtered results</span>
            <svg viewBox="0 0 30 34">
              <path d="M5 2C5 18 20 12 19 27" />
              <path d="M13 22L19 28L25 22" />
            </svg>
          </div>
          <div className="activities-grid">
            {filteredActivities.length === 0 ? (
              <div className="empty-state">
                <p>No activities found matching the selected filters.</p>
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setActivityTypeFilter('All')
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <article
                  key={activity.id}
                  className="activity-card"
                  onClick={() => {
                    // Always open the activity slideshow from the first slide.
                    setActivityPreviewIndex(0)
                    setActivityAutoplay(false)
                    setActivityAutoplayUserPaused(false)
                    if (activityAutoplayStartTimeoutRef.current) {
                      clearTimeout(activityAutoplayStartTimeoutRef.current)
                      activityAutoplayStartTimeoutRef.current = null
                    }
                    setSelectedActivity(activity)
                  }}
                  style={{ '--activity-color': activity.color } as React.CSSProperties}
                >
                  <div className="activity-header">
                    <h4>{activity.title}</h4>
                    <div className="activity-meta">
                      <span className="activity-role">{activity.role}</span>
                      {activity.period && <span className="activity-period">{activity.period}</span>}
                    </div>
                  </div>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-card-hint">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="stack">
          <div className="section-header">
            <p className="eyebrow">Toolkit</p>
            <h3>Tech Stack</h3>
          </div>
          <ul className="stack-list">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        <section id="contact" className="contact">
          <div className="section-header">
            <p className="eyebrow">Let’s Connect</p>
            <h3>Contact</h3>
          </div>
          <div className="contact-grid">
            <div>
              <h4>Email</h4>
              <a href="mailto:carlabarastean@gmail.com">carlabarastean@gmail.com</a>
            </div>
            <div>
              <h4>Location</h4>
              <p>Cluj-Napoca, Romania</p>
            </div>
            <div>
              <h4>Socials</h4>
              <a href="https://www.linkedin.com/in/your-link" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/carlabarastean" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
      </section>
      </main>

      {isFeedbackRequestOpen && (
        <div className="modal-overlay feedback-request-overlay" onClick={closeFeedbackRequest}>
          <section
            className="feedback-request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-request-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="feedback-request-close"
              aria-label="Close feedback request"
              onClick={closeFeedbackRequest}
              disabled={feedbackRequestStatus === 'submitting'}
            >
              ×
            </button>

            {feedbackRequestStatus === 'success' ? (
              <div className="feedback-request-success" aria-live="polite">
                <p className="eyebrow">Request received</p>
                <h2 id="feedback-request-title">Thank you.</h2>
                <p>
                  I will review your details. If access is approved, the document will be sent automatically to
                  the email address you provided.
                </p>
                <button type="button" className="feedback-request-submit" onClick={closeFeedbackRequest}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <header className="feedback-request-header">
                  <p className="eyebrow">Verified access</p>
                  <h2 id="feedback-request-title">Request my Bosch feedback</h2>
                  <p>
                    This is an official professional document, so I share it individually rather than publishing
                    it online. Please leave enough information for me to verify your request.
                  </p>
                </header>

                <form className="feedback-request-form" onSubmit={handleFeedbackRequest}>
                  <div className="feedback-request-field">
                    <label htmlFor="feedback-full-name">Full name <span>required</span></label>
                    <input
                      id="feedback-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="feedback-request-field">
                    <label htmlFor="feedback-company">Company or organization <span>required</span></label>
                    <input
                      id="feedback-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                      required
                    />
                  </div>

                  <div className="feedback-request-field feedback-request-field-wide">
                    <label htmlFor="feedback-email">Professional email <span>required</span></label>
                    <input
                      id="feedback-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={180}
                      required
                    />
                    <small>A company domain helps with verification, but is not mandatory.</small>
                  </div>

                  <div className="feedback-request-field feedback-request-field-wide">
                    <label htmlFor="feedback-reason">Why would you like to see it? <span>optional</span></label>
                    <textarea id="feedback-reason" name="reason" rows={3} maxLength={600} />
                  </div>

                  <div className="feedback-request-honeypot" aria-hidden="true">
                    <label htmlFor="feedback-website">Website</label>
                    <input id="feedback-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="feedback-request-footer feedback-request-field-wide">
                    <p>
                      Your details are used only to review and answer this request. The document is sent only
                      after I explicitly approve access.
                    </p>
                    <button
                      type="submit"
                      className="feedback-request-submit"
                      disabled={feedbackRequestStatus === 'submitting'}
                    >
                      {feedbackRequestStatus === 'submitting' ? 'Sending request...' : 'Send request'}
                    </button>
                  </div>

                  {feedbackRequestError && (
                    <p className="feedback-request-error feedback-request-field-wide" role="alert">
                      {feedbackRequestError}
                    </p>
                  )}
                </form>
              </>
            )}
          </section>
        </div>
      )}

      {isThesisOpen && (
        <div className="modal-overlay thesis-overlay" onClick={() => setIsThesisOpen(false)}>
          <article
            className="thesis-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="thesis-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close thesis-modal-close"
              aria-label="Close thesis details"
              onClick={() => setIsThesisOpen(false)}
            >
              ×
            </button>

            <header className="thesis-modal-header">
              <div className="thesis-modal-intro">
                <p className="eyebrow">Bachelor's Thesis / 2026</p>
                <h2 id="thesis-modal-title">RobustFBL<wbr />Toolbox</h2>
                <p className="thesis-modal-subtitle">
                  Automation of Nonlinear Control Analysis and Design: A MATLAB Implementation Based on
                  Feedback Linearization
                </p>
                <div className="thesis-facts" aria-label="Thesis facts">
                  <span><strong>70</strong> pages</span>
                  <span><strong>8</strong> chapters</span>
                  <span><strong>5</strong> public API functions</span>
                  <span><strong>.mltbx</strong> MATLAB Add-On</span>
                </div>
              </div>
              <figure className="thesis-cover">
                <img src={bachelorThesisCover} alt="Cover of Carla Bărăștean's bachelor's thesis" />
                <figcaption>Technical University of Cluj-Napoca / 2026</figcaption>
              </figure>
            </header>

            <div className="thesis-modal-body">
              <section className="thesis-section thesis-overview">
                <div className="thesis-section-label">01 / What I built</div>
                <div>
                  <h3>A reusable nonlinear-control workflow</h3>
                  <p>
                    I designed and implemented a modular MATLAB toolbox that takes a symbolic, input-affine
                    nonlinear SISO model - <code>x_dot = f(x) + g(x)u, y = h(x)</code> - through analysis,
                    nominal controller design, closed-loop simulation, perturbation diagnostics and numerical
                    validation. The goal was to turn feedback-linearization calculations that are manageable by
                    hand only for small examples into a reproducible software workflow.
                  </p>
                </div>
              </section>

              <section className="thesis-section">
                <div className="thesis-section-label">02 / Workflow</div>
                <div>
                  <h3>From symbolic model to validated controller</h3>
                  <ol className="thesis-workflow">
                    <li>
                      <span>01</span>
                      <strong>Analyze geometry</strong>
                      <p>Lie derivatives, relative degree, decoupling term and input-output coordinates.</p>
                    </li>
                    <li>
                      <span>02</span>
                      <strong>Design nominal control</strong>
                      <p>Feedback-linearizing law and linear pole placement in the transformed coordinates.</p>
                    </li>
                    <li>
                      <span>03</span>
                      <strong>Simulate the closed loop</strong>
                      <p>Nominal trajectories, convergence checks and structured MATLAB results.</p>
                    </li>
                    <li>
                      <span>04</span>
                      <strong>Compare perturbations</strong>
                      <p>The same controller is applied to nominal and perturbed models for a fair comparison.</p>
                    </li>
                    <li>
                      <span>05</span>
                      <strong>Evaluate robustness</strong>
                      <p>Channel diagnostics, Lyapunov and LMI checks, pole tuning and linear L2 indicators.</p>
                    </li>
                    <li>
                      <span>06</span>
                      <strong>Validate and reproduce</strong>
                      <p>Automated tests, report generation and traceable examples across relative degrees 1 to 4.</p>
                    </li>
                  </ol>
                </div>
              </section>

              <div className="thesis-columns">
                <section className="thesis-panel">
                  <div className="thesis-section-label">03 / Theory & literature</div>
                  <h3>Literature translated into software</h3>
                  <p>
                    The literature review connects exact input-output feedback linearization with relative degree,
                    zero dynamics and control-channel perturbations. It then links these ideas to Lyapunov stability,
                    linear matrix inequalities, L2 performance and the symbolic and optimization tools available in
                    MATLAB.
                  </p>
                  <div className="thesis-theory-tags">
                    <span>Feedback linearization</span>
                    <span>Lie derivatives</span>
                    <span>Relative degree</span>
                    <span>Zero dynamics</span>
                    <span>Lyapunov stability</span>
                    <span>LMI / SDP</span>
                    <span>L2 gain</span>
                    <span>Symbolic computation</span>
                  </div>
                </section>

                <section className="thesis-panel">
                  <div className="thesis-section-label">04 / MATLAB architecture</div>
                  <h3>A small public API over modular internals</h3>
                  <p>
                    Geometry, controller design, simulation, Lyapunov analysis, perturbation diagnostics and
                    numerical optimization are separated into MATLAB packages. Users interact through five public
                    entry points and receive structured results that can be reused in scripts, tests and reports.
                  </p>
                  <div className="thesis-api-list" aria-label="Public MATLAB API">
                    <code>rfbl.analyzeSISO</code>
                    <code>rfbl.designNominalSISO</code>
                    <code>rfbl.simulateNominalSISO</code>
                    <code>rfbl.comparePerturbedSISO</code>
                    <code>rfbl.tuneRobustAwareSISO</code>
                  </div>
                </section>
              </div>

              <section className="thesis-section thesis-installation">
                <div className="thesis-section-label">05 / Install as a MATLAB Add-On</div>
                <div>
                  <h3>Packaged for normal use and source-level development</h3>
                  <p>
                    For normal use, RobustFBLToolbox is packaged as a <code>.mltbx</code> file. It can be installed
                    by double-clicking the package or directly from MATLAB. Once installed, the <code>rfbl.*</code>
                    functions are available without running the project's startup script.
                  </p>
                  <div className="thesis-install-grid">
                    <div className="thesis-dependencies">
                      <div>
                        <span>Core requirements</span>
                        <strong>MATLAB</strong>
                        <strong>Symbolic Math Toolbox</strong>
                      </div>
                      <div>
                        <span>Optional LMI checks</span>
                        <strong>YALMIP</strong>
                        <strong>MOSEK, SeDuMi or SDPT3</strong>
                      </div>
                    </div>
                    <pre className="thesis-code"><code>{`matlab.addons.toolbox.installToolbox( ...
    'path/to/RobustFBLToolbox.mltbx')

rfbl.version()
which rfbl.analyzeSISO`}</code></pre>
                  </div>
                  <p className="thesis-source-note">
                    Development mode is also supported by opening the source project and running
                    <code> startup.m</code>, which adds the local <code>src</code> package to the MATLAB path.
                  </p>
                </div>
              </section>

              <section className="thesis-section thesis-validation">
                <div className="thesis-section-label">06 / Validation & scope</div>
                <div>
                  <h3>Tested behavior, with explicit limits</h3>
                  <p>
                    Validation covers symbolic analysis, nominal design, closed-loop simulation,
                    nominal-versus-perturbed comparison, Lyapunov checks, LMI prototypes, robust-aware pole
                    selection, a linear L2 indicator and reproducible report generation. The public interface was
                    audited on examples with relative degrees from 1 to 4, including a state-dependent decoupling
                    term.
                  </p>
                  <p className="thesis-scope-note">
                    Scope: the current toolbox targets symbolically defined, input-affine nonlinear SISO systems.
                    LMI and L2 results apply to the linearized dynamics in transformed coordinates and should be
                    interpreted with the assumptions of the feedback-linearization model, not as an unrestricted
                    nonlinear robustness guarantee.
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ '--project-color': selectedProject.color } as React.CSSProperties}
          >
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ×
            </button>
            <div className="modal-header">
              <div className="modal-header-left">
                <h2>{selectedProject.title}</h2>
                <p className="modal-subtitle">{selectedProject.subtitle}</p>
              </div>
              <div className="modal-header-right">
                {selectedProject.period && (
                  <span className="modal-period">{selectedProject.period}</span>
                )}
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="section-title">
                  <h3>Project Overview</h3>
                </div>
                <p className="section-content">{selectedProject.details.overview}</p>
                {selectedProject.details.features && (
                  <ul className="feature-list">
                    {selectedProject.details.features.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-section">
                <div className="section-title">
                  <h3>Key Technical Contributions</h3>
                </div>
                <ul className="contributions-list">
                  {selectedProject.details.contributions.map((contribution, idx) => {
                    const [title, ...description] = contribution.split(': ')
                    return (
                      <li key={idx}>
                        <span className="contribution-title">{title}:</span>
                        <span className="contribution-desc"> {description.join(': ')}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {selectedProject.details.results && (
                <div className="modal-section highlight-section">
                  <div className="section-title">
                    <h3>Results & Impact</h3>
                  </div>
                  <p className="section-content highlight-content">{selectedProject.details.results}</p>
                </div>
              )}
                {selectedProject.details.images && selectedProject.details.images.length > 0 && (
                        <div className="modal-section">
                          <div className="section-title">
                            <h3>
                              {(selectedProject.id === 'sleep-ai' || selectedProject.id === 'eeg-bci') && 'Presentation Slides'}
                              {usesTechnicalProjectPreview(selectedProject.id) && 'Implementation & Simulation Results'}
                              {selectedProject.id === 'budgetly' && 'Features & Interface Screenshots'}
                              {!usesProjectSlidePreview(selectedProject.id) && selectedProject.id !== 'budgetly' && 'Gallery'}
                            </h3>
                          </div>
                          {usesProjectSlidePreview(selectedProject.id) ? (
                            <div className="activity-gallery">
                              <div
                                ref={projectPreviewRef}
                                className={`slide-preview slide-preview--full gallery-item ${usesTechnicalProjectPreview(selectedProject.id) ? 'slide-preview--technical' : ''} ${isProjectFullscreen ? 'is-fullscreen' : ''}`}
                                onClick={() => {
                                  if (projectAutoplayStartTimeoutRef.current) {
                                    clearTimeout(projectAutoplayStartTimeoutRef.current)
                                    projectAutoplayStartTimeoutRef.current = null
                                  }
                                  setProjectAutoplay((prev) => {
                                    const next = !prev
                                    setProjectAutoplayUserPaused(!next)
                                    return next
                                  })
                                }}
                              >
                                <div
                                  className={`slide-fullscreen-trigger ${isProjectFullscreen ? 'is-active' : ''}`}
                                  role="button"
                                  tabIndex={0}
                                  title={isProjectFullscreen ? 'Exit full screen' : 'View full screen'}
                                  aria-label={isProjectFullscreen ? 'Exit full screen' : 'View full screen'}
                                  onClick={(e) => { void toggleProjectFullscreen(e) }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { void toggleProjectFullscreen(e) } }}
                                >
                                  <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span>{isProjectFullscreen ? 'Exit' : 'Fullscreen'}</span>
                                </div>
                                <img
                                  src={selectedProject.details.images[projectPreviewIndex]}
                                  alt={`${selectedProject.title} - ${usesTechnicalProjectPreview(selectedProject.id) ? 'Technical view' : 'Slide'} ${projectPreviewIndex + 1}`}
                                />
                                <div className="gallery-overlay">
                                  <span>{projectAutoplay ? 'Playing...' : 'Click to play'}</span>
                                </div>
                              </div>
                              {usesTechnicalProjectPreview(selectedProject.id) && (
                                <div className="project-slide-controls" aria-label="Technical gallery controls">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProjectAutoplay(false)
                                      setProjectAutoplayUserPaused(true)
                                      setProjectPreviewIndex((current) => (
                                        current > 0 ? current - 1 : selectedProject.details.images.length - 1
                                      ))
                                    }}
                                  >
                                    ← Previous
                                  </button>
                                  <span>
                                    Technical capture {String(projectPreviewIndex + 1).padStart(2, '0')} / {String(selectedProject.details.images.length).padStart(2, '0')}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProjectAutoplay(false)
                                      setProjectAutoplayUserPaused(true)
                                      setProjectPreviewIndex((current) => (
                                        (current + 1) % selectedProject.details.images.length
                                      ))
                                    }}
                                  >
                                    Next →
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="activity-gallery">
                              {selectedProject.details.images.slice(0, selectedProject.details.images.length > 3 ? 2 : selectedProject.details.images.length).map((image, idx) => (
                                <div
                                  key={idx}
                                  className="gallery-item"
                                  onClick={() => {
                                    if (selectedProject.details.images) {
                                      setLightboxImages(selectedProject.details.images)
                                      setLightboxIndex(idx)
                                      setLightboxVariant((selectedProject.id === 'sleep-ai' || selectedProject.id === 'eeg-bci') ? 'sleep-ai' : 'default')
                                      setLightboxImage(image)
                                    }
                                  }}
                                >
                                  <img
                                    src={image}
                                    alt={`${selectedProject.title} - ${
                                      (selectedProject.id === 'sleep-ai' || selectedProject.id === 'eeg-bci') ? 'Slide' :
                                      selectedProject.id === 'budgetly' ? 'Screenshot' :
                                      'Image'
                                    } ${idx + 1}`}
                                  />
                                  <div className="gallery-overlay">
                                    <span>Click to enlarge</span>
                                  </div>
                                </div>
                              ))}
                              {selectedProject.details.images.length > 3 && (
                                <div
                                  className="gallery-item gallery-more"
                                  onClick={() => {
                                    if (selectedProject.details.images) {
                                      setPreviewImages(selectedProject.details.images.slice(2))
                                    }
                                  }}
                                >
                                  <div className="gallery-more-content">
                                    <span className="gallery-more-count">+{selectedProject.details.images.length - 2}</span>
                                    <span className="gallery-more-text">
                                      {selectedProject.id === 'budgetly' && 'more screenshots'}
                                      {selectedProject.id !== 'budgetly' && 'more images'}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                <div className="modal-section">
                <div className="section-title">
                  <h3>Tech Stack</h3>
                </div>
                <div className="tech-stack-tags">
                  {selectedProject.details.techStack.split(', ').map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {selectedProject.repository && (
                <div className="modal-footer">
                  <a
                    href={selectedProject.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-repo-link"
                  >
                    <span>View on GitHub</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedActivity && (
        <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ '--project-color': selectedActivity.color } as React.CSSProperties}
          >
            <button className="modal-close" onClick={() => setSelectedActivity(null)}>
              ×
            </button>
            <div className="modal-header">
              <div className="modal-header-left">
                <h2>{selectedActivity.title}</h2>
                <p className="modal-subtitle">{selectedActivity.role}</p>
              </div>
              <div className="modal-header-right">
                {selectedActivity.period && (
                  <span className="modal-period">{selectedActivity.period}</span>
                )}
                {selectedActivity.location && (
                  <span className="modal-location">📍 {selectedActivity.location}</span>
                )}
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="section-title">
                  <h3>Overview</h3>
                </div>
                <p className="section-content">{selectedActivity.details.overview}</p>
              </div>
              <div className="modal-section">
                <div className="section-title">
                  <h3>Key Contributions</h3>
                </div>
                <ul className="contributions-list">
                  {selectedActivity.details.contributions.map((contribution, idx) => (
                    <li key={idx}>
                      <span className="contribution-desc">{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedActivity.details.impact && (
                <div className="modal-section highlight-section">
                  <div className="section-title">
                    <h3>Impact & Learning</h3>
                  </div>
                  <p className="section-content highlight-content">
                    {formatImpactText(selectedActivity.details.impact)}
                  </p>
                </div>
              )}
              {selectedActivity.details.presentationSlides && selectedActivity.details.presentationSlides.length > 0 && (
                <div className="modal-section" ref={slidesSectionRef}>
                  <div className="section-title">
                    <h3>Presentation Slides</h3>
                  </div>
                  <div className="activity-gallery activity-gallery--slides">
                    {/* Single preview image that autoplays when in view. Click toggles pause/resume. */}
                    <div
                      ref={slidePreviewRef}
                      className="slide-preview slide-preview--full gallery-item"
                      onClick={() => {
                        // Prevent a delayed auto-start callback from overriding manual pause/resume.
                        if (activityAutoplayStartTimeoutRef.current) {
                          clearTimeout(activityAutoplayStartTimeoutRef.current)
                          activityAutoplayStartTimeoutRef.current = null
                        }
                        // toggle autoplay (user click pauses/resumes)
                        setActivityAutoplay((prev) => {
                          const next = !prev
                          setActivityAutoplayUserPaused(!next)
                          return next
                        })
                      }}
                    >
                      <div className={`slide-fullscreen-trigger ${isSlideFullscreen ? 'is-active' : ''}`}
                        role="button"
                        tabIndex={0}
                        title={isSlideFullscreen ? 'Exit full screen' : 'View full screen'}
                        aria-label={isSlideFullscreen ? 'Exit full screen' : 'View full screen'}
                        onClick={(e) => {
                          void toggleSlideFullscreen(e)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            void toggleSlideFullscreen(e)
                          }
                        }}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{isSlideFullscreen ? 'Exit' : 'Fullscreen'}</span>
                      </div>
                      <img
                        src={selectedActivity.details.presentationSlides[activityPreviewIndex]}
                        alt={`${selectedActivity.title} - Slide ${activityPreviewIndex + 1}`}
                      />
                      <div className="gallery-overlay">
                        <span>{activityAutoplay ? 'Playing...' : 'Click to play'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedActivity.details.images && selectedActivity.details.images.length > 0 && (
                <div className="modal-section">
                  <div className="section-title gallery-section-title">
                    <h3>Gallery</h3>
                    <span>{selectedActivity.details.images.length} images</span>
                  </div>
                  <div className={`activity-gallery activity-gallery--photos activity-gallery--count-${Math.min(selectedActivity.details.images.length, 3)}`}>
                    {selectedActivity.details.images.slice(0, selectedActivity.details.images.length > 3 ? 2 : selectedActivity.details.images.length).map((image, idx) => (
                      <div
                        key={idx}
                        className="gallery-item"
                        data-index={String(idx + 1).padStart(2, '0')}
                        onClick={() => {
                          setLightboxImages(selectedActivity.details.images!)
                          setLightboxIndex(idx)
                          setLightboxVariant('default')
                          setLightboxImage(image)
                        }}
                      >
                        <img src={image} alt={`${selectedActivity.title} - Image ${idx + 1}`} />
                        <div className="gallery-overlay">
                          <span>Click to enlarge</span>
                        </div>
                      </div>
                    ))}
                    {selectedActivity.details.images.length > 3 && (
                      <div
                        className="gallery-item gallery-more"
                        onClick={() => {
                          setPreviewImages(selectedActivity.details.images!.slice(2))
                        }}
                      >
                        <div className="gallery-more-content">
                          <span className="gallery-more-count">+{selectedActivity.details.images.length - 2}</span>
                          <span className="gallery-more-text">more images</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="modal-section">
                <div className="section-title">
                  <h3>Skills Developed</h3>
                </div>
                <div className="tech-stack-tags">
                  {selectedActivity.details.skills.split(', ').map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
            className={`lightbox-overlay ${lightboxVariant === 'sleep-ai' ? 'lightbox-overlay--sleep-ai' : ''}`}
            onClick={() => {
              setLightboxImage(null)
              setLightboxImages([])
              setLightboxIndex(0)
              setLightboxVariant('default')
              setActivityAutoplay(false)
            }}
          onKeyDown={(e) => {
            if (lightboxImages.length > 1) {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                const prevIndex = lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1
                setLightboxIndex(prevIndex)
                setLightboxImage(lightboxImages[prevIndex])
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                const nextIndex = lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0
                setLightboxIndex(nextIndex)
                setLightboxImage(lightboxImages[nextIndex])
              } else if (e.key === 'Escape') {
                setLightboxImage(null)
                setLightboxImages([])
                setLightboxIndex(0)
                setLightboxVariant('default')
                setActivityAutoplay(false)
              }
            }
          }}
          tabIndex={0}
        >
          <button
            className="lightbox-close"
            onClick={() => {
              setLightboxImage(null)
              setLightboxImages([])
              setLightboxIndex(0)
              setLightboxVariant('default')
              setActivityAutoplay(false)
            }}
          >
            ×
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation()
                  const prevIndex = lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1
                  setLightboxIndex(prevIndex)
                  setLightboxImage(lightboxImages[prevIndex])
                }}
              >
                ‹
              </button>
              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation()
                  const nextIndex = lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0
                  setLightboxIndex(nextIndex)
                  setLightboxImage(lightboxImages[nextIndex])
                }}
              >
                ›
              </button>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            </>
          )}
          <img
            src={lightboxImage}
            alt="Gallery"
            className={`lightbox-image ${lightboxVariant === 'sleep-ai' ? 'lightbox-image--sleep-ai' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              // Toggle autoplay when user clicks the slide while viewing activity slides
              if (selectedActivity && selectedActivity.details.presentationSlides?.includes(lightboxImage!)) {
                if (activityAutoplay) {
                  setActivityAutoplay(false)
                  setActivityAutoplayUserPaused(true)
                } else {
                  setActivityAutoplay(true)
                  setActivityAutoplayUserPaused(false)
                }
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      )}

      {previewImages && previewImages.length > 0 && (
        <div
          className="preview-overlay"
          onClick={() => setPreviewImages(null)}
        >
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="preview-close"
              onClick={() => setPreviewImages(null)}
            >
              ×
            </button>
            <h3>Select an image to view</h3>
            <div className="preview-grid">
              {previewImages.map((image, idx) => {
                const allImages = selectedProject?.details.images || selectedActivity?.details.images || []
                const actualIndex = allImages.indexOf(image)
                return (
                  <div
                    key={idx}
                    className="preview-item"
                    onClick={() => {
                      setLightboxImages(allImages)
                      setLightboxIndex(actualIndex)
                      setLightboxVariant((selectedProject?.id === 'sleep-ai' || selectedProject?.id === 'eeg-bci') ? 'sleep-ai' : 'default')
                      setLightboxImage(image)
                      setPreviewImages(null)
                    }}
                  >
                    <img src={image} alt={`Preview ${idx + 1}`} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>© {new Date().getFullYear()} Carla - Maria Bărăștean. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
