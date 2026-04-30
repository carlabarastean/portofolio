import { useState, useEffect } from 'react'
import './App.css'



import photo1 from './assets/images/photo1.jpeg'
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


const experiences = [
  {
    role: 'Model-Based Software Developer',
    company: 'BOSCH · Cluj-Napoca',
    period: 'July 2024 – Jan 2025',
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
    period: '2019 – Present',
    details: [
      'Installed and configured hardware for SMEs',
      'Diagnosed network and workstation issues',
      'Delivered on-site and remote technical support',
    ],
  },
]
const projects = [
  {
    id: 'budgetly',
    title: 'BudgetLy – Collaborative Finance Platform',
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
    category: 'Machine Learning',
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
    category: 'Deep Learning / BCI',
    details: {
      overview:
        'This project explores the use of AI and EEG signal processing to detect motor intentions from brain activity. Using the PhysioNet Motor Movement/Imagery Dataset, I built a research-oriented pipeline for preprocessing EEG signals, extracting frequency-time features, and training CNN models to classify hand movement intentions.',
      contributions: [
        'EEG Data Analysis: Processed recordings from the PhysioNet Motor Movement/Imagery Dataset (64 channels, 160 Hz) to extract motor-relevant segments.',
        'Signal Preprocessing: Implemented band-pass (7.5–30 Hz) and notch filtering, channel standardization, artifact removal, and normalization to improve signal quality.',
        'Channel Selection: Reduced dimensionality by selecting motor-cortex channels (FC5, FC3, FC1, FCz) to focus the model on relevant signals.',
        'Feature Engineering: Converted time-series EEG into spectrogram and frequency-domain representations using STFT and Welch methods.',
        'Deep Learning Modeling: Designed and iterated multiple CNN architectures with regularization (dropout, batch norm), learning-rate schedules, and early stopping using PyTorch.',
        'Evaluation & Analysis: Measured accuracy, precision, recall, F1-score, and confusion matrices to analyze class separability and model generalization.'
      ],
      results:
        'Implemented a full EEG-to-decision pipeline and identified that simpler CNNs generalized better on noisy EEG data. The best model reached ~60.3% accuracy; analysis showed stronger detection of the Rest class and challenges separating left vs right movement—insights useful for future hybrid or larger-scale models.',
      techStack: 'Python, PyTorch, NumPy, SciPy, STFT, Welch, Spectrograms, Jupyter Notebook',
      images: [eeg1, eeg2, eeg3, eeg4, eeg5, eeg6, eeg7, eeg8],
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
        'https://placehold.co/600x400/0f172a/38bdf8?text=CASSINI+Hackathon',
        'https://placehold.co/600x400/0f172a/38bdf8?text=AquaGraph+Platform',
        'https://placehold.co/600x400/0f172a/38bdf8?text=Sentinel-1+Water+Monitoring',
      ],
    },
  },
  {
    id: 'ieee-saci',
    title: 'Panel Speaker – IEEE SACI 2025',
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
    title: 'FIRST Tech Challenge – RO060 Decebal Tech',
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
        "The \"All-Rounder\" Phase: As a member of a startup team, I initially juggled multiple roles—Programming, Mechanics, and PR—ensuring the team's survival and growth during its early stages",
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

const techStack = ['React', 'Node.js', 'Python', 'C/C++', 'MATLAB', 'Simulink', 'Git']

function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxVariant, setLightboxVariant] = useState<'default' | 'sleep-ai'>('default')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [previewImages, setPreviewImages] = useState<string[] | null>(null)
  
  // Project filters
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All')
  const [projectYearFilter, setProjectYearFilter] = useState<string>('All')
  
  // Activity filters
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>('All')
  
  // Get unique values for filters
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const projectYears = ['All', ...Array.from(new Set(projects.map((p) => p.year.toString()))).sort((a, b) => Number(b) - Number(a))]
  
  const activityTypes = ['All', ...Array.from(new Set(activities.map((a) => a.type)))]
  
  // Filter projects
  const filteredProjects = projects.filter((project) => {
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

  // Block body scroll when modal is open
  useEffect(() => {
    const isModalOpen = selectedProject !== null || selectedActivity !== null || lightboxImage !== null || previewImages !== null
    
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject, selectedActivity, lightboxImage, previewImages])

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

  return (
    <div className="app">
      <header className="nav">
        <div className="logo">Carla<span>Maria</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#activities">Activities</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="eyebrow">Portfolio · 2025</p>
              <h1>
                Carla - Maria <span>Bărăștean</span>
              </h1>
              <h2>4th year Automation and Computer Science Student</h2>
              <p className="description">
                I'm a Computer Science student driven by a simple question:{' '}
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
                  one—even if I occasionally try the hard way first.
                </span>
              </p>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View My Work
              </button>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <img src={photo1} alt="Carla Maria Bărăstean" />
              </div>
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
                pursue my high school studies in Deva, Hunedoara—a choice that marked the beginning of my commitment to
                following my interests, regardless of distance.
              </p>
              <p>
                This dedication to growth led me further to Cluj-Napoca, Cluj, where I'm currently pursuing my degree
                in Automation and Computer Science. Each step of this journey has been a conscious choice to prioritize
                learning, growth, and the pursuit of what truly matters to me.
              </p>
              <div className="motto">
                <p className="motto-text">
                  "No distance is too far when passion is the destination."
                </p>
                <p className="motto-subtitle">
                  I'm willing to go anywhere and do anything for what I'm passionate about.
                </p>
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
                    <span className="location-details">University</span>
                  </div>
                </div>
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
                <ul>
                  {exp.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="section-header">
            <p className="eyebrow">Selected Work</p>
            <h3>Projects</h3>
          </div>
          <div className="filters">
            <div className="filter-group">
              <label>Category</label>
              <div className="filter-buttons">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${projectCategoryFilter === category ? 'active' : ''}`}
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
                    onClick={() => setProjectYearFilter(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
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

        <section id="activities" className="activities">
          <div className="section-header">
            <p className="eyebrow">Beyond Coursework</p>
            <h3>Activities & Leadership</h3>
          </div>
          <div className="filters">
            <div className="filter-group">
              <label>Type</label>
              <div className="filter-buttons">
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${activityTypeFilter === type ? 'active' : ''}`}
                    onClick={() => setActivityTypeFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
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
                  onClick={() => setSelectedActivity(activity)}
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
                      {selectedProject.id === 'budgetly' && 'Features & Interface Screenshots'}
                      {selectedProject.id !== 'sleep-ai' && selectedProject.id !== 'budgetly' && 'Gallery'}
                    </h3>
                  </div>
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
                            {(selectedProject.id === 'sleep-ai' || selectedProject.id === 'eeg-bci') && 'more slides'}
                            {selectedProject.id === 'budgetly' && 'more screenshots'}
                            {selectedProject.id !== 'sleep-ai' && selectedProject.id !== 'budgetly' && 'more images'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
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
              {selectedActivity.details.images && selectedActivity.details.images.length > 0 && (
                <div className="modal-section">
                  <div className="section-title">
                    <h3>Gallery</h3>
                  </div>
                  <div className="activity-gallery">
                    {selectedActivity.details.images.slice(0, selectedActivity.details.images.length > 3 ? 2 : selectedActivity.details.images.length).map((image, idx) => (
                      <div
                        key={idx}
                        className="gallery-item"
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
            onClick={(e) => e.stopPropagation()}
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