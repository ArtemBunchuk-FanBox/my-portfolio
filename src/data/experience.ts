export type Role = {
  title: string;
  period: string;
  summary?: string; // Added summary field
  responsibilities: string[];
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
    logo: '/images/wearefanbox_logo (1).jpg',
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
          'Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.',
          'Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments, achieving a 4x efficiency gain in key operational processes.',
          'Designed pricing frameworks and cost models across consumer products and client deliverables, balancing engagement, scalability, and profitability.',
          'Founded and led the Content Department, overseeing B2B and B2C strategy across social channels. Launched a fully monetized YouTube channel, achieved a 25% newsletter open rate, and generated new client conversations.',
          'Conducted risk assessments and implemented contingency plans, strengthening company resilience and ensuring business continuity.',
          'Launched \'Tech Grooming Tuesdays,\' reducing development backlog by 22% and increasing issue resolution speed by 28%.',
          'Established an evaluation framework for emerging technologies, assessing business impact and compatibility with existing infrastructure.'
        ]
      },
      {
        title: 'Head of Research, Insights & Audience Activation',
        period: 'Jul 2021 - Jul 2023',
        summary: 'Led an interdisciplinary team of psychologists, data scientists, marketers, and linguists, driving audience growth, mixed-method research innovation, and delivery of actionable insights to clients in media, creative, and entertainment.',
        responsibilities: [
          'Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.',
          'Developed the \'Movie Dimensions\' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform\'s recommendation generator.',
          'Scaled the platform\'s reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000.',
          'Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.',
          'Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products.'
        ]
      },
      {
        title: 'Head of Project Delivery – Universal Pictures (UP)',
        period: 'Jul 2020 - Jul 2021',
        summary: "Managed Fanbox's largest client, Universal Pictures ($2M account), overseeing the full research lifecycle from design and implementation to analysis, insight development, and client presentation, while coordinating cross-departmental stakeholders to ensure seamless delivery.",
        responsibilities: [
          'Negotiated scope and deliverables to align client needs with internal capacity, protecting margins and maintaining long-term account growth.',
          'Conducted creative asset testing to optimize campaign performance and boost audience engagement across major film releases.',
          'Developed detailed audience profiles for major film IPs, identifying key psychographic and demographic segments, optimal media channels, and core appeal drivers.',
          'Provided data-driven insights to inform decisions around release timing and media planning, directly shaping marketing strategy for major film campaigns.',
          'Facilitated workshops with client stakeholders that reshaped internal approaches to audience research and campaign planning.',
          'Led broader market research projects focused on film industry trends, genre performance, and audience segments to support client strategy, positioning, and long-term planning.'
        ]
      },
      {
        title: 'Strategy Consultant',
        period: 'Jul 2019 - Jun 2020',
        summary: 'Managed mixed-method research projects across entertainment, health, and consumer sectors, translating complex data into clear, actionable insights for internal teams and client stakeholders.',
        responsibilities: [
          'Analyzed results from psychometric research and translated them into strategic insights for clients in banking, hospitality, music, and film.',
          'Conducted qualitative research including focus groups, interviews, and specialized studies to uncover behavioral and psychological insights.',
          'Led R&D initiatives focused on platform innovation, including early experimentation with machine learning-based features such as automated face-swapping and rotoscoping.',
          'Contributed to a pro-bono product for NHS Foundation Trusts during the COVID-19 pandemic, delivering insights into frontline healthcare professionals\' wellbeing and team dynamics.',
          'Introduced lightweight productivity tools and automated workflows, such as Trello tasking and transcription tools, significantly reducing turnaround times.'
        ]
      }
    ]
  },
  {
    name: 'Foundation for Integrity & Sports',
    logo: '/images/IntegrityInSports.png',
    bannerImage: '/images/IntegrityInSports-banner.png',
    description: undefined, // Remove description
    link: undefined,
    period: '',
    roles: [
      {
        title: 'Freelance Lead Research Consultant',
        period: 'Oct 2018 - Jun 2019',
        summary: "Led a team of five researchers investigating FIFA corruption and human rights violations linked to Qatar's 2022 World Cup bid for an opposition-organized advocacy initiative.",
        responsibilities: [
          'Conducted primary and secondary research including interviews, financial document analysis, and evidence gathering.',
          'Produced briefing papers, conference commentary, and public-facing social media content.',
          'Assisted with conference organization including speaker coordination, guest management, and event logistics.'
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
    link: undefined,
    period: '',
    roles: [
      {
        title: 'International Business Development Director',
        period: '10/2016 - 04/2018',
        summary: 'Led international operations and supplier partnerships, managing relationships with global manufacturers and technology partners to support industrial modernization and expansion.',
        responsibilities: [
          'Developed and executed market entry strategies across the CIS, Eastern Europe, and Asia, establishing new distribution channels and regional partnerships.',
          'Negotiated exclusive distribution agreements with leading OEMs, including MAZAK and OPS-INGERSOLL, significantly expanding the product portfolio.',
          'Collaborated with clients\' engineering teams to adapt advanced manufacturing solutions to local market requirements.',
          'Represented VAKTEC at global trade shows and industry events, building brand presence and generating commercial leads.',
          'Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts.'
        ]
      }
    ]
  }
];

// Education data
export const educationExperience: Institution[] = [
  {
    name: 'University of Manchester',
    logo: '/images/MCR.jpg',
    link: undefined,
    period: '',
    roles: [
      {
        title: 'BSc Physics with Philosophy',
        period: '2012 - 2015',
        responsibilities: []
      }
    ]
  },
  {
    name: 'University College London',
    logo: '/images/university_college_london_logo.jpg',
    link: undefined,
    period: '',
    roles: [
      {
        title: 'MSc. Advanced Neuroimaging',
        period: '2015 - 2016',
        responsibilities: []
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
        "Founded and led the Content Department, overseeing B2B and B2C strategy across social channels.",
        "Established an evaluation framework for emerging technologies, assessing business impact and compatibility with existing infrastructure."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Scaled the platform's reach through an influencer-driven audience acquisition strategy, growing the subscriber base from 5,000 to over 120,000."
      ],
      "Head of Project Delivery – Universal Pictures (UP)": [
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
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts."
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
        "Launched 'Tech Grooming Tuesdays,' reducing development backlog by 22% and increasing issue resolution speed by 28%.",
        "Established an evaluation framework for emerging technologies, assessing business impact and compatibility with existing infrastructure."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures (UP)": [
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
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts."
      ]
    }
  },
  "Innovation Lead": {
    "Fanbox": {
      "Head of Operations": [
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Introduced automation workflows across analytics, invoicing, and reporting, cutting repetitive admin time and streamlining freelancer payments.",
        "Launched 'Tech Grooming Tuesdays,' reducing development backlog by 22% and increasing issue resolution speed by 28%.",
        "Established an evaluation framework for emerging technologies, assessing business impact and compatibility with existing infrastructure."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization."
      ],
      "Head of Project Delivery – Universal Pictures (UP)": [
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
      "Head of Project Delivery – Universal Pictures (UP)": [
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
        "Played a key role in a $5M technology transfer project that enabled VAKTEC to become the first CIS-based manufacturer of carbide blank inserts."
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
        "Spearheaded AI integration across consumer-facing products and internal productivity tools, driving both user engagement and operational efficiency.",
        "Established an evaluation framework for emerging technologies, assessing business impact and compatibility with existing infrastructure."
      ],
      "Head of Research, Insights & Audience Activation": [
        "Directed R&D initiatives exploring dynamically adapted content and AI-modified media for creative testing.",
        "Developed the 'Movie Dimensions' taxonomy from 13+ million film reviews to support content and audience profiling and power the platform's recommendation generator.",
        "Integrated data from multiple third-party APIs with 120,000 Fanbox behavioral profiles into an automated database, improving audience targeting and content personalization.",
        "Developed a framework to grow a COPPA compliant parent–child research panel and designed child-friendly methodologies to support effective testing of family-focused products."
      ],
      "Head of Project Delivery – Universal Pictures (UP)": [
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
      "Head of Project Delivery – Universal Pictures (UP)": [
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
      "Head of Project Delivery – Universal Pictures (UP)": [
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
