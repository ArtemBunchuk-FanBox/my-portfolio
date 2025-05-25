export type Role = {
  title: string;
  period: string;
  summary?: string; // Added summary field
  responsibilities: {
    text: string;
    bold: string;
  }[];
};

export type Institution = {
  name: string;
  logo?: string;
  bannerImage?: string;
  description?: string;
  link?: string;
  period: string;
  roles: Role[];
};

// Definition of which responsibility points relate to each job title
export interface JobTitleResponsibilityMap {
  [jobTitle: string]: {
    [institution: string]: {
      [roleTitle: string]: string[]; // Array of responsibility text snippets to highlight
    }
  }
}

// Work experience data
export const workExperience: Institution[] = [
  {
    name: 'Fanbox',
    logo: '/images/fanbox.png',
    bannerImage: '/images/fanbox-banner.png',
    description: "Over six years at FanBox, I've grown with the company and led teams across research, insights, creative content, and operations. I started in an analysis-focused role during the company's first major growth phase and quickly moved into managing flagship entertainment accounts. From there, I evolved into a strategic leadership position where I built our insights and audience activation function, developed products, and designed research methodologies from the ground up. Most recently, I've taken on the operational side of the business, focusing on scaling systems, shaping company direction, developing content strategies, and ensuring teams and individuals have what they need to deliver exceptional work.",
    link: 'https://www.linkedin.com/company/75001700/',
    period: '',
    roles: [
      {
        title: 'Head of Operations',
        period: 'Jul 2023 - Present',
        summary: 'Led day-to-day operations and strategic planning for a 30-person workforce across multiple departments, including full-time, part-time, and freelance staff. Partnered directly with founders to shape company direction, identify new business opportunities, and translate vision into actionable roadmaps.',
        responsibilities: [
          {
            text: 'Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.',
            bold: 'Spearheaded AI integration'
          },
          {
            text: 'Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments, achieving a 4x efficiency gain in key operational processes.',
            bold: 'Introduced automation workflows'
          },
          {
            text: 'Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.',
            bold: 'Designed pricing frameworks'
          },
          {
            text: 'Founded and led the Content Department, overseeing B2B and B2C strategy across social channels. Launched a fully monetized YouTube channel, achieved a 25% newsletter open rate, and generated new client conversations.',
            bold: 'Founded and led the Content Department'
          },
          {
            text: 'Conducted risk assessments and implemented contingency plans, strengthening company resilience and ensuring business continuity.',
            bold: 'Conducted risk assessments'
          },
          {
            text: 'Launched \'Tech Grooming Tuesdays,\' reducing development backlog by 22% and increasing issue resolution speed by 28%.',
            bold: 'Launched \'Tech Grooming Tuesdays\''
          }
        ]
      },
      {
        title: 'Head of Research, Insights & Audience Activation',
        period: 'Jul 2021 - Jul 2023',
        summary: 'Led an interdisciplinary team of psychologists, data scientists, marketers, and linguists, driving audience growth, mixed-method research innovation, and delivery of actionable insights to clients in media, creative, and entertainment.',
        responsibilities: [
          {
            text: 'Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.',
            bold: 'Directed R&D initiatives'
          },
          {
            text: 'Developed the \'Movie Dimensions\' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform\'s recommendation generator.',
            bold: 'Developed the \'Movie Dimensions\' taxonomy'
          },
          {
            text: 'Scaled the platform\'s reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000.',
            bold: 'Scaled the platform\'s reach'
          },
          {
            text: 'Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.',
            bold: 'Integrated data from multiple third-party APIs'
          },
          {
            text: 'Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products.',
            bold: 'Developed a COPPA compliant research panel'
          }
        ]
      },
      {
        title: 'Head of Project Delivery – Universal Pictures',
        period: 'Jul 2020 - Jul 2021',
        summary: "Managed Fanbox's largest client, Universal Pictures ($2M account), overseeing the full research lifecycle from design and implementation to analysis, insight development, and client presentation, while coordinating cross-departmental stakeholders to ensure seamless delivery.",
        responsibilities: [
          {
            text: 'Negotiated scope and deliverables to align client needs with internal capacity, protecting margins and maintaining long-term account growth.',
            bold: 'Negotiated scope and deliverables'
          },
          {
            text: 'Conducted creative asset testing to optimize campaign performance and boost audience engagement across major film releases.',
            bold: 'Conducted creative asset testing'
          },
          {
            text: 'Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.',
            bold: 'Developed detailed audience profiles'
          },
          {
            text: 'Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns.',
            bold: 'Provided data-driven insights'
          },
          {
            text: 'Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning.',
            bold: 'Facilitated workshops'
          },
          {
            text: 'Led broader market research projects focused on film industry trends, genre performance, and audience segments to support client strategy, positioning, and long-term planning.',
            bold: 'Led broader market research projects'
          }
        ]
      },
      {
        title: 'Strategy Consultant',
        period: 'Jul 2019 - Jun 2020',
        summary: 'Managed mixed-method research projects across entertainment, health, and consumer sectors, translating complex data into clear, actionable insights for internal teams and client stakeholders.',
        responsibilities: [
          {
            text: 'Analyzed results from psychometric research and translated them into strategic insights for clients in banking, hospitality, music, and film.',
            bold: 'Analyzed results from psychometric research'
          },
          {
            text: 'Conducted qualitative research including focus groups, interviews, and specialized studies to uncover behavioral and psychological insights.',
            bold: 'Conducted qualitative research'
          },
          {
            text: 'Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.',
            bold: 'Led R&D initiatives'
          },
          {
            text: 'Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals\' wellbeing and team dynamics.',
            bold: 'Contributed to a pro-bono product'
          },
          {
            text: 'Introduced lightweight productivity tools and automated workflows, such as Trello tasking and transcription tools, significantly reducing turnaround times.',
            bold: 'Introduced lightweight productivity tools'
          }
        ]
      }
    ]
  },
  {
    name: 'Foundation for Integrity & Sports',
    logo: '/images/IntegrityInSports.png',
    bannerImage: '/images/IntegrityInSports-banner.png',
    description: undefined, // Remove description
    link: "https://www.youtube.com/@foundationforsportsintegri8514",
    period: '',
    roles: [
      {
        title: 'Freelance Lead Research Consultant',
        period: 'Oct 2018 - Jun 2019',
        summary: "Led a team of five researchers investigating FIFA corruption and human rights violations linked to Qatar's 2022 World Cup bid for an opposition-organized advocacy initiative.",
        responsibilities: [
          {
            text: 'Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.',
            bold: 'Conducted primary and secondary research'
          },
          {
            text: 'Produced briefing papers, conference commentary, and public-facing social media content.',
            bold: 'Produced briefing papers and content'
          },
          {
            text: 'Assisted with conference organization including speaker coordination, guest management, and event logistics.',
            bold: 'Assisted with conference organization'
          }
        ]
      }
    ]
  },
  {
    name: 'Qatar Global Security & Stability Conference',
    bannerImage: '/images/QGSC-banner.png',
    logo: '/images/QGSC.png',
    description: undefined, // Remove description
    link: undefined,
    period: '',
    roles: [
      {
        title: 'Freelance Research Consultant',
        period: 'Mar 2018 - Aug 2018',
        summary: 'Conducted independent research and interviews related to Gulf region security and geopolitical stability for international conference. Contributed to briefing materials and talking points for speakers, and assisted in the selection and coordination of panelists and VIP guests.',
        responsibilities: []
      }
    ]
  },
  {
    name: 'VAKTEC',
    logo: '/images/VAKTEC.jpg',
    bannerImage: '/images/vaktec-banner.png',
    description: "Helped establish and scale a family business specializing in technical re-equipment and modernization solutions for Russian manufacturing enterprises. Supported the company's transition from a machinery and tooling distributor to developing proprietary carbide cutting tool manufacturing capabilities using European/Swiss technology to reduce Russia's dependence on imported metalworking tools. Though no longer active in daily operations, I still assist with international negotiations and strategic decision-making as needed.",
    link: "https://www.vaktec-pro.ru/main-eng",
    period: '',
    roles: [
      {
        title: 'International Business Development Director',
        period: '10/2016 - 04/2018',
        summary: 'Led international operations and supplier partnerships, managing relationships with global manufacturers and technology partners to support industrial modernization and expansion.',
        responsibilities: [
          {
            text: 'Developed and executed market entry strategies across the CIS, Eastern Europe, and Asia, establishing new distribution channels and regional partnerships.',
            bold: 'Developed and executed market entry strategies'
          },
          {
            text: 'Negotiated exclusive distribution agreements with leading OEMs, including MAZAK and OPS-INGERSOLL, significantly expanding the product portfolio.',
            bold: 'Negotiated exclusive distribution agreements'
          },
          {
            text: 'Collaborated with clients\' engineering teams to adapt advanced manufacturing solutions to local market requirements.',
            bold: 'Collaborated with clients\' engineering teams'
          },
          {
            text: 'Represented VAKTEC at global trade shows and industry events, building brand presence and generating commercial leads.',
            bold: 'Represented VAKTEC at global trade shows'
          },
          {
            text: 'Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts.',
            bold: 'Played a key role in a $5M technology transfer project'
          },
          {
            text: 'Secured sponsorships that made VAKTEC the first and only Russian member of the European Association of Machine Tool Merchants.',
            bold: 'Secured sponsorships'
          }
        ]
      }
    ]
  }
];

// Education data
export const educationExperience: Institution[] = [

  {
    name: 'University College London',
    logo: '/images/UCL.png',
    bannerImage: '/images/UCL-banner.png',
    link: undefined,
    period: '',
    description: "While studying physics in Manchester, I became increasingly interested in applied and medical physics, often attending lectures beyond my core curriculum. Around the same time, I encountered Roger Penrose's work on consciousness and theoretical models of the brain. This combination of influences created a perfect storm that led me to transfer to UCL for my master's.",
    roles: [
      {
        title: 'MSc. Advanced Neuroimaging',
        period: 'Sep 2015 - Aug 2016',
        summary: "The program provided me with foundational knowledge in neuroimaging, which I used to explore deeper questions about brain function and cognition. I focused my research on neuropsychology, particularly studying how brain stimulation affects cognitive performance.",
        responsibilities: [
          {
            text: "Completed core modules in neuroanatomy, neuroimaging instrumentation, data acquisition techniques, and image processing at UCL's Queen Square Institute of Neurology",
            bold: ""
          },
          {
            text: "Conducted library research project on transcranial magnetic stimulation and electroconvulsive therapy applications in treatment of depression in schizophrenic patients",
            bold: ""
          },
          {
            text: "Designed dissertation research project investigating the effect of deep brain stimulation of the subthalamic nucleus in Parkinson's Disease (PD) on perceptual decision-making as a function of task difficulty and speed-accuracy instructions, involving eight PD patients and eleven healthy controls",
            bold: ""
          },
          {
            text: "Collaborated with researchers at the National Hospital for Neurology and Neurosurgery on subthalamic nucleus stimulation techniques",
            bold: ""
          }
        ]
      }
    ]
  },
  {
    name: 'University of Manchester',
    logo: '/images/MCR.png',
    bannerImage: '/images/MCR-banner.png',
    link: undefined,
    period: '',
    description: "What is physics if not natural philosophy? Like many young people, I wanted to understand how the world works on a fundamental level. And what better place to study that than a department with such a rich legacy, home to 13 Nobel Prize winners, some of whom were still actively teaching, along with everyone's favourite TV physicist Brian Cox. At Manchester, I quickly discovered that science is not a place of answers but a space where each discovery leads to better questions. That, I learned, is the joy of the absurd, Sisyphean task of learning.",
    roles: [
      {
        title: 'BSc Physics with Philosophy',
        period: 'Sep 2012 - Aug 2015',
        summary: "My physics-focused degree provided a robust scientific foundation, with around 80% of modules taken in the physics department while still allowing exploration of the philosophical underpinnings of scientific inquiry. The program combined rigorous scientific training with critical philosophical thinking.",
        responsibilities: [
          {
            text: "Developed technical problem-solving skills through physics laboratory work and computational modeling",
            bold: ""
          },
          {
            text: "Completed dissertation on applications of Optical Coherence Tomography for brain imaging",
            bold: ""
          },
          {
            text: "Contributed to Philosophy of Mathematics journal with peer-reviewed paper",
            bold: ""
          },
          {
            text: "Served as student representative for the physics department throughout duration of study",
            bold: ""
          },
          {
            text: "Chaired university debating society and served as secretary of the cheese and wine society",
            bold: ""
          },
          {
            text: "Studied philosophical inquiries into scientific knowledge, reality, ethics, mathematics, and logic",
            bold: ""
          }
        ]
      }
    ]
  }
];

// Project tags related to experience
export const projectTags = [
  { name: 'NFTVue', url: '#' }
];

// Map of job titles to relevant experience bullets
export const jobTitleToResponsibilities: JobTitleResponsibilityMap = {
  "Strategy Director": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.",
        "Founded and led the Content Department, overseeing B2B and B2C strategy across social channels."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Scaled the platform's reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Negotiated scope and deliverables to align client needs with internal capacity, protecting margins and maintaining long-term account growth.",
        "Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.",
        "Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns.",
        "Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning.",
        "Led broader market research projects focused on film industry trends, genre performance, and audience segments to support client strategy, positioning, and long-term planning."
      ],
      "Strategy Consultant": [
        "Analyzed results from psychometric research and translated them into strategic insights for clients in banking, hospitality, music, and film.",
        "Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.",
        "Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals' wellbeing and team dynamics."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Developed and executed market entry strategies across the CIS, Eastern Europe, and Asia, establishing new distribution channels and regional partnerships.",
        "Negotiated exclusive distribution agreements with leading OEMs, including MAZAK and OPS-INGERSOLL, significantly expanding the product portfolio.",
        "Collaborated with clients' engineering teams to adapt advanced manufacturing solutions to local market requirements.",
        "Represented VAKTEC at global trade shows and industry events, building brand presence and generating commercial leads.",
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts.",
        "Secured sponsorships that made VAKTEC the first and only Russian member of the European Association of Machine Tool Merchants."
      ]
    },
    "Foundation for Integrity & Sports": {
      "Freelance Lead Research Consultant": [
        "Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.",
        "Produced briefing papers, conference commentary, and public-facing social media content."
      ]
    },
    "Qatar Global Security & Stability Conference": {
      "Freelance Research Consultant": []
    }
  },
  "VP of Product": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments.",
        "Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.",
        "Conducted risk assessments and implemented contingency plans, strengthening company resilience and ensuring business continuity.",
        "Launched 'Tech Grooming Tuesdays,' reducing development backlog by 22% and increasing issue resolution speed by 28%."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Negotiated scope and deliverables to align client needs with internal capacity, protecting margins and maintaining long-term account growth.",
        "Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning."
      ],
      "Strategy Consultant": [
        "Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.",
        "Introduced lightweight productivity tools and automated workflows, such as Trello tasking and transcription tools, significantly reducing turnaround times."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Negotiated exclusive distribution agreements with leading OEMs, including MAZAK and OPS-INGERSOLL, significantly expanding the product portfolio.",
        "Collaborated with clients' engineering teams to adapt advanced manufacturing solutions to local market requirements.",
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts.",
        "Secured sponsorships that made VAKTEC the first and only Russian member of the European Association of Machine Tool Merchants."
      ]
    }
  },
  "Innovation Lead": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments.",
        "Launched 'Tech Grooming Tuesdays,' reducing development backlog by 22% and increasing issue resolution speed by 28%."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning."
      ],
      "Strategy Consultant": [
        "Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.",
        "Introduced lightweight productivity tools and automated workflows, such as Trello tasking and transcription tools, significantly reducing turnaround times."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Collaborated with clients' engineering teams to adapt advanced manufacturing solutions to local market requirements.",
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts."
      ]
    }
  },
  "Chief of Staff": {
    "Fanbox": {
      "Head of Operations": [
        "Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.",
        "Founded and led the Content Department, overseeing B2B and B2C strategy across social channels.",
        "Conducted risk assessments and implemented contingency plans, strengthening company resilience and ensuring business continuity.",
        "Launched 'Tech Grooming Tuesdays,' reducing development backlog by 22% and increasing issue resolution speed by 28%."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Scaled the platform's reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Negotiated scope and deliverables to align client needs with internal capacity, protecting margins and maintaining long-term account growth.",
        "Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning."
      ],
      "Strategy Consultant": [
        "Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals' wellbeing and team dynamics.",
        "Introduced lightweight productivity tools and automated workflows, such as Trello tasking and transcription tools, significantly reducing turnaround times."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Developed and executed market entry strategies across the CIS, Eastern Europe, and Asia, establishing new distribution channels and regional partnerships.",
        "Represented VAKTEC at global trade shows and industry events, building brand presence and generating commercial leads.",
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts.",
        "Secured sponsorships that made VAKTEC the first and only Russian member of the European Association of Machine Tool Merchants."
      ]
    },
    "Foundation for Integrity & Sports": {
      "Freelance Lead Research Consultant": [
        "Assisted with conference organization including speaker coordination, guest management, and event logistics."
      ]
    },
    "Qatar Global Security & Stability Conference": {
      "Freelance Research Consultant": []
    }
  },
  "Head of Research": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Conducted creative asset testing to optimize campaign performance and boost audience engagement across major film releases.",
        "Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.",
        "Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns.",
        "Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning.",
        "Led broader market research projects focused on film industry trends, genre performance, and audience segments to support client strategy, positioning, and long-term planning."
      ],
      "Strategy Consultant": [
        "Analyzed results from psychometric research and translated them into strategic insights for clients in banking, hospitality, music, and film.",
        "Conducted qualitative research including focus groups, interviews, and specialized studies to uncover behavioral and psychological insights.",
        "Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.",
        "Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals' wellbeing and team dynamics."
      ]
    },
    "Foundation for Integrity & Sports": {
      "Freelance Lead Research Consultant": [
        "Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.",
        "Produced briefing papers, conference commentary, and public-facing social media content."
      ]
    },
    "Qatar Global Security & Stability Conference": {
      "Freelance Research Consultant": []
    }
  },
  "VP of Marketing": {
    "Fanbox": {
      "Head of Operations": [
        "Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.",
        "Founded and led the Content Department, overseeing B2B and B2C strategy across social channels."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Scaled the platform's reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Conducted creative asset testing to optimize campaign performance and boost audience engagement across major film releases.",
        "Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.",
        "Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns."
      ],
      "Strategy Consultant": [
        "Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.",
        "Produced briefing papers, conference commentary, and public-facing social media content.",
        "Assisted with conference organization including speaker coordination, guest management, and event logistics."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Represented VAKTEC at global trade shows and industry events, building brand presence and generating commercial leads.",
        "Secured sponsorships that made VAKTEC the first and only Russian member of the European Association of Machine Tool Merchants."
      ]
    },
    "Foundation for Integrity & Sports": {
      "Freelance Lead Research Consultant": [
        "Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.",
        "Produced briefing papers, conference commentary, and public-facing social media content.",
        "Assisted with conference organization including speaker coordination, guest management, and event logistics."
      ]
    }
  },
  "Insights Director": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures": [
        "Conducted creative asset testing to optimize campaign performance and boost audience engagement across major film releases.",
        "Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.",
        "Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns.",
        "Led broader market research projects focused on film industry trends, genre performance, and audience segments to support client strategy, positioning, and long-term planning."
      ],
      "Strategy Consultant": [
        "Analyzed results from psychometric research and translated them into strategic insights for clients in banking, hospitality, music, and film.",
        "Conducted qualitative research including focus groups, interviews, and specialized studies to uncover behavioral and psychological insights.",
        "Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals' wellbeing and team dynamics."
      ]
    },
    "VAKTEC": {
      "International Business Development Director": [
        "Collaborated with clients' engineering teams to adapt advanced manufacturing solutions to local market requirements."
      ]
    },
    "Foundation for Integrity & Sports": {
      "Freelance Lead Research Consultant": [
        "Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.",
        "Produced briefing papers, conference commentary, and public-facing social media content."
      ]
    },
    "Qatar Global Security & Stability Conference": {
      "Freelance Research Consultant": []
    }
  }
};

export default {
  workExperience,
  educationExperience,
  jobTitleToResponsibilities,
  projectTags
};
