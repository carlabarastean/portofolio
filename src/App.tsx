import { useState } from 'react'
import './App.css'



import photo1 from './assets/images/photo1.jpeg'

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
    subtitle: 'A Full-Stack MERN Application for Personal & Social Financial Management',
    stack: 'React · Node.js · MongoDB · Express',
    description:
      'Modern finance platform with interactive dashboards, social expense sharing, and personalized financial insights.',
    repository: 'https://github.com/carlabarastean/budgetLy_app',
    color: '#6ee7b7',
    year: 2025,
    category: 'Full-Stack Development',
    details: {
      overview:
        'BudgetLy is a modern, responsive web application designed to modernize how users interact with their finances. Built as a collaborative team project, it addresses two core needs: distinct personal budgeting and the management of shared financial responsibilities. The application moves beyond simple expense logging, offering a data-driven dashboard that transforms raw transaction data into actionable visual insights.',
      contributions: [
        'Interactive Dashboard: Developed a comprehensive overview system that aggregates financial data into real-time summaries. Users can visualize net flow, monitor upcoming payments, and analyze spending habits through dynamic charts',
        'Social Finance Module: Engineered a complex "Friends & Payments" system that allows users to track shared expenses. This required implementing relational logic in the database to manage debts, track repayments, and send payment reminders between users',
        'Robust Transaction Management: Implemented a secure RESTful API to handle CRUD operations for incomes and expenses, ensuring data consistency across categorized transaction logs',
        'User-Centric Customization: Focused on UX/UI flexibility, allowing users to personalize their environment with theme toggles (Dark/Light mode), currency preferences, and widget visibility settings',
        'Future Roadmap & AI Integration: The architecture is designed to be scalable for future AI enhancements. The development roadmap includes integrating machine learning models for anomaly detection (flagging unusual subscription charges) and predictive analytics to offer personalized saving suggestions based on spending history',
      ],
      techStack: 'React.js, Node.js, Express, MongoDB, REST API, Git/GitHub',
    },
  },
  {
    id: 'sleep-ai',
    title: 'AI-Based Sleep Quality Prediction System',
    subtitle: 'Comparative Analysis of Ensemble Methods vs. CNNs on Physiological Data',
    stack: 'Python · TensorFlow · XGBoost · LightGBM',
    description:
      'Predicted sleep quality at 91% accuracy using CNN ensembles trained on survey and health signals.',
    repository: 'https://github.com/carlabarastean/sleep-quality-prediction',
    color: '#a78bfa',
    year: 2025,
    category: 'Machine Learning',
    details: {
      overview:
        'Developed during a specialized internship, this project aimed to construct a robust machine learning solution for estimating sleep quality. Using a dataset collected from active military personnel, the goal was to transform subjective questionnaire data into an objective, quantifiable metric. The project addresses the challenge of diagnosing sleep patterns by correlating physiological, behavioral, and environmental factors.',
      contributions: [
        'Target Variable Engineering: Designed a composite sleep_score by aggregating five key indicators: subjective quality, sleep duration, latency, insomnia frequency, and daytime sleepiness',
        'Feature Selection: Utilized Pearson and Spearman correlation analysis to isolate the 7 most impactful factors, including diet quality, thermal discomfort, and sleep apnea frequency',
        'Advanced Preprocessing: Implemented SMOTE (Synthetic Minority Over-sampling Technique) to address class imbalance and normalized data using MinMax scaling',
        'Model Architecture: Designed and compared multiple architectures including CNNs optimized for pattern recognition, XGBoost and LightGBM for gradient boosting, and a Stacking Ensemble meta-model',
        'Optimization: Automated hyperparameter tuning using the Optuna framework to maximize model performance',
      ],
      results:
        'The comparative analysis demonstrated that while CNNs achieved a competitive accuracy of ~89%, the Stacking Ensemble model outperformed all others. It achieved a final accuracy of 91.64% with balanced F1-scores (0.91 for Class 0 and 0.92 for Class 1), proving that combining boosting algorithms yields the most robust prediction for tabular medical data.',
      techStack:
        'Python, TensorFlow/Keras, Scikit-learn, XGBoost, LightGBM, Optuna, Pandas, SMOTE',
    },
  },
  {
    id: 'eeg-bci',
    title: 'EEG-Based Prosthetic Control System',
    subtitle: 'Brain-Computer Interface (BCI) for Motor Intention Detection using CNNs',
    stack: 'PyTorch · CNN · Signal Processing',
    description:
      'Classified motor intentions from EEG signals using CNNs to enable prosthetic hand control for individuals with motor disabilities.',
    repository: '',
    color: '#67e8f9',
    year: 2024,
    category: 'Deep Learning / BCI',
    details: {
      overview:
        'This project explores the intersection of Neuroscience and Artificial Intelligence by developing a control system for prosthetic hands based on Electroencephalography (EEG) signals. The primary objective was to classify motor intentions (Rest, Left Hand Movement, Right Hand Movement) to aid individuals with motor disabilities. Using the PhysioNet Motor Movement/Imagery Dataset, I engineered a deep learning pipeline to interpret noisy brain signals into actionable commands.',
      contributions: [
        'Signal Processing & Noise Reduction: Implemented a rigorous preprocessing pipeline. Applied a Band-Pass Butterworth filter (7.5-30 Hz) to isolate motor-related frequencies and a Notch filter to remove 50Hz power line interference',
        'Feature Engineering: Reduced dimensionality by selecting 4 critical channels located on the motor cortex (Fc5, Fc3, Fc1, FCz). Converted time-series data into Spectrograms using Short-Time Fourier Transform (STFT) to capture frequency changes over time',
        'Deep Learning Architecture: Designed and trained Convolutional Neural Networks (CNN) using PyTorch. I conducted an extensive comparative analysis between a baseline architecture and optimized versions (V1-V4) introducing Dropout, Batch Normalization, and Learning Rate Schedulers',
        'Experimental Analysis: The study revealed that simpler architectures generalized better, achieving a peak accuracy of ~60.3%, while deeper models suffered from overfitting despite regularization attempts',
      ],
      results:
        'The system successfully established a baseline for distinguishing motor imagery tasks. The confusion matrix analysis highlighted the challenge of separating "Left" vs. "Right" movements compared to the "Rest" state, providing clear direction for future hybrid models (CNN-RNN).',
      techStack: 'Python, PyTorch, NumPy, SciPy, Signal Processing (STFT, Welch), Jupyter Notebook',
    },
  },
]

const activities = [
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
        'As a member and later mentor of RO060 Decebal Tech, I participated in the FIRST Tech Challenge robotics competition for three seasons. This experience combined engineering, programming, and teamwork to design and build robots capable of completing complex challenges.',
      contributions: [
        'Robot Design & Construction: Built complex robots using advanced technologies, integrating mechanical systems with electronic components and sensors',
        'Software Development: Programmed robot control systems, implementing algorithms for autonomous navigation and task execution',
        'Mathematical Application: Applied mathematical and physics concepts to optimize robot performance, including kinematics, dynamics, and control theory',
        'Team Mentorship: In the third season, transitioned to a mentoring role, guiding new team members in construction techniques, software development, and competition strategy',
        'Competition Strategy: Developed and executed game strategies, balancing technical capabilities with tactical decision-making',
      ],
      impact:
        'This experience developed my technical skills in robotics, programming, and systems integration, while also building strong leadership and teamwork capabilities. Mentoring others reinforced my understanding of complex systems and improved my ability to explain technical concepts clearly.',
      skills: 'Robotics, Embedded Systems, C/C++, Team Leadership, Mentoring, Competition Strategy',
    },
  },
  {
    id: 'math-olympiad',
    title: 'Mathematics Olympiad',
    role: 'National Competition Participant',
    period: '2023',
    location: 'Romania',
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
    title: 'FIRST Lego League – Mentor',
    role: 'Team Mentor',
    period: '2018-2020',
    location: 'Deva, Romania',
    description:
      'Guided younger students in robot development using LEGO Mindstorms and EV3, enhancing leadership and communication skills while coordinating team efforts.',
    color: '#6ee7b7',
    year: 2020,
    type: 'Mentoring',
    details: {
      overview:
        'Served as a mentor for a FIRST Lego League team, guiding younger students in robotics and programming using LEGO Mindstorms and EV3 platforms. This role focused on teaching fundamental concepts while fostering creativity and problem-solving skills.',
      contributions: [
        'Robot Development Guidance: Taught students to build and program robots using LEGO Mindstorms and EV3, covering basic mechanics, sensors, and programming logic',
        'Leadership Development: Coordinated team efforts, organized practice sessions, and facilitated collaboration among team members',
        'Competition Strategy: Helped develop game strategies and competition approaches, teaching students to balance technical skills with strategic thinking',
        'Communication Skills: Improved ability to explain complex concepts in accessible ways, adapting teaching methods to different learning styles',
      ],
      impact:
        'Mentoring younger students reinforced my own understanding of fundamental concepts and developed my leadership and communication abilities. This experience taught me the value of patience, clear explanation, and fostering enthusiasm for STEM fields.',
      skills: 'Mentoring, Leadership, Communication, LEGO Mindstorms, EV3 Programming, Team Coordination',
    },
  },
  {
    id: 'volunteering',
    title: 'Community Volunteering',
    role: 'Red Cross & LEO Club Member',
    period: '2018-2022',
    location: 'Deva, Romania',
    description:
      'Contributed to community well-being through various initiatives, developing skills in first aid, counseling, and community organization.',
    color: '#a78bfa',
    year: 2022,
    type: 'Volunteering',
    details: {
      overview:
        'Dedicated four years to community service through the Red Cross (2020-2022) and LEO Club Sarmizegetusa (2018-2022) in Deva. These experiences provided opportunities to make meaningful contributions to community well-being while developing essential interpersonal and organizational skills.',
      contributions: [
        'Red Cross Service (2020-2022): Contributed to community well-being through various initiatives, gained skills in first aid, counseling, and effective communication. Developed empathy and a better understanding of people\'s needs',
        'LEO Club Leadership (2018-2022): Led projects supporting health initiatives, elderly care, and disability aid. Organized initiatives focused on education, skills development, and healthy living',
        'Community Organization: Coordinated volunteer efforts, planned events, and managed logistics for community service projects',
        'Health & Safety: Provided first aid training and support, contributing to community safety and emergency preparedness',
      ],
      impact:
        'Volunteering developed my empathy, communication skills, and ability to work with diverse groups of people. Leading community projects enhanced my organizational and leadership capabilities, while the experience of helping others provided valuable perspective on the importance of giving back to the community.',
      skills: 'Community Service, Leadership, Event Organization, First Aid, Counseling, Communication, Project Management',
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
  
  // Project filters
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All')
  const [projectYearFilter, setProjectYearFilter] = useState<string>('All')
  
  // Activity filters
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>('All')
  const [activityYearFilter, setActivityYearFilter] = useState<string>('All')
  
  // Get unique values for filters
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const projectYears = ['All', ...Array.from(new Set(projects.map((p) => p.year.toString()))).sort((a, b) => Number(b) - Number(a))]
  
  const activityTypes = ['All', ...Array.from(new Set(activities.map((a) => a.type)))]
  const activityYears = ['All', ...Array.from(new Set(activities.map((a) => a.year.toString()))).sort((a, b) => Number(b) - Number(a))]
  
  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const categoryMatch = projectCategoryFilter === 'All' || project.category === projectCategoryFilter
    const yearMatch = projectYearFilter === 'All' || project.year.toString() === projectYearFilter
    return categoryMatch && yearMatch
  })
  
  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const typeMatch = activityTypeFilter === 'All' || activity.type === activityTypeFilter
    const yearMatch = activityYearFilter === 'All' || activity.year.toString() === activityYearFilter
    return typeMatch && yearMatch
  })

  return (
    <div className="app">
      <header className="nav">
        <div className="logo">Carla<span>Maria</span></div>
        <nav>
          <a href="#home">Home</a>
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
                Carla - Maria <span>Bărăstean</span>
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
            <div className="filter-group">
              <label>Year</label>
              <div className="filter-buttons">
                {activityYears.map((year) => (
                  <button
                    key={year}
                    className={`filter-btn ${activityYearFilter === year ? 'active' : ''}`}
                    onClick={() => setActivityYearFilter(year)}
                  >
                    {year}
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
                    setActivityYearFilter('All')
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
              <div>
                <h2>{selectedProject.title}</h2>
                <p className="modal-subtitle">{selectedProject.subtitle}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="section-title">
                  <h3>Project Overview</h3>
                </div>
                <p className="section-content">{selectedProject.details.overview}</p>
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
              <div>
                <h2>{selectedActivity.title}</h2>
                <div className="modal-subtitle-group">
                  <p className="modal-subtitle">{selectedActivity.role}</p>
                  {selectedActivity.period && (
                    <span className="modal-period">{selectedActivity.period}</span>
                  )}
                  {selectedActivity.location && (
                    <span className="modal-location">📍 {selectedActivity.location}</span>
                  )}
                </div>
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
                  <p className="section-content highlight-content">{selectedActivity.details.impact}</p>
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

      <footer>
        <p>© {new Date().getFullYear()} Carla - Maria Bărăstean. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App