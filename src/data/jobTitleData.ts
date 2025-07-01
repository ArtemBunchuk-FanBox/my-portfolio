// Common job title data to be used across components

// Job titles list
export const jobTitles = [
  "Strategy Director", 'VP of Product', "Innovation Lead", "Chief of Staff",
  'Research Director', 'VP of Marketing', 'Insights Director', 'Head of Operations', 'Dungeon Master'
];

// Define job-specific highlighted words
export const jobSpecificHighlights: Record<string, string[]> = {
  "Strategy Director": ["strategic thinker", "organisational transformation", "data-driven decision-making", "insight-driven stories"],
  "VP of Product": ["innovation", "data-driven decision-making", "cutting-edge technologies", "revolutionising understanding of human behaviour"],
  "Innovation Lead": ["innovation", "cutting-edge technologies", "strategic thinker", "science"],
  "Chief of Staff": ["organisational transformation", "strategic thinker", "compassion", "data-driven decision-making"],
  "Research Director": ["psychometric research", "qualitative", "quantitative research methods", "science", "data-driven decision-making"],
  "VP of Marketing": ["strategic thinker", "insight-driven stories", "compassion", "innovation"],
  "Head of Operations": ["organisational transformation", "strategic thinker", "data-driven decision-making", "operational efficiency"],
  "Dungeon Master": ["innovation", "strategic thinker", "cutting-edge technologies", "compassion"],
  "Insights Director": ["insight-driven stories", "data-driven decision-making", "strategic thinker", "revolutionising understanding of human behaviour", "quantitative research methods"]
};
