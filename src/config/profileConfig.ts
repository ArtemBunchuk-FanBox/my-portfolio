/**
 * Global configuration for the portfolio
 * This file centralizes all customizable information
 */

export const profileConfig = {
  // Personal information
  name: "Artem Bunchuk",
  location: "", // Leave empty if you don't want to display location
  
  // Resume and social media links
  resumeUrl: "/your-resume.pdf",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  githubUrl: "https://github.com/yourusername",
  emailAddress: "your.email@example.com",
  blogUrl: "https://your-cooking-blog.com",
  blogName: "Artichoks - My Cooking Blog",
  
  // Job titles for the rotating display
  jobTitles: [
    "Strategy Director", 
    "VP of Product", 
    "Innovation Lead", 
    "Head of Research", 
    "VP of Marketing", 
    "Insights Director", 
    "Dungeon Master"
  ],
  
  // Job-specific highlighted keywords
  jobSpecificHighlights: {
    "Strategy Director": ["strategic thinker", "organisational transformation", "data-driven decision-making", "insight-driven stories"],
    "VP of Product": ["innovation", "data-driven decision-making", "cutting-edge technologies", "revolutionising understanding of human behaviour"],
    "Innovation Lead": ["innovation", "cutting-edge technologies", "strategic thinker", "science"],
    "Head of Research": ["psychometric research", "qualitative", "quantitative research methods", "science", "data-driven decision-making"],
    "VP of Marketing": ["strategic thinker", "insight-driven stories", "compassion", "innovation"],
    "Dungeon Master": ["innovation", "strategic thinker", "cutting-edge technologies", "compassion"],
    "Insights Director": ["insight-driven stories", "data-driven decision-making", "strategic thinker", "revolutionising understanding of human behaviour", "quantitative research methods"]
  }
};

export default profileConfig;
