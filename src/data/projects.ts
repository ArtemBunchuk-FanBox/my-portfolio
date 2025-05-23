export type Technology = {
  name: string;
  color: string;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescriptionHtml?: string; // New field for HTML content
  previewImage: string;
  detailImages?: string[];
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: "ai-album-cover",
    title: "AI Album Cover Generator",
    shortDescription: "From design to integration to pricing, I built an AI-powered album cover generator that creates custom artwork while collecting valuable psychometric research data.",
    fullDescription: "",
    fullDescriptionHtml: 
      "<p style='margin-bottom: 1rem'>At FanBox, we found traditional research panels unreliable and expensive. Instead of paying people $10 to answer tedious questionnaires, we created entertaining research events where audience members actually want to participate.</p>" +
      "<p style='margin-bottom: 1rem'>The Album Cover Generator is a great example. I designed and built an app where users create custom album artwork by choosing visual and stylistic elements. Behind the scenes, it generates a custom prompt and uses OpenAI's latest image generation model to create the image. While users have fun creating, we collect rich behavioral and psychometric data, for instance how mood and music influence users' decision making.</p>" +
      "<p style='margin-bottom: 1rem'>One challenge was integration. Image generation takes about a minute, so instead of making users wait, I used the existing infrastructure for post and comment replies to deliver the result once ready. This kept the experience fast and fluid. I was also responsible for pricing of the feature. Since generation costs can add up, I implemented a model that included bundles and usage limits, maximizing engagement while keeping the feature sustainable.</p>" +
      "<p>Today, this tool is one of FanBox's strongest drivers of engagement and a powerful source of data.</p>",
    previewImage: "/images/projects/album-cover-generator.png",
    technologies: [
      { name: "React", color: "bg-blue-500" },
      { name: "Node.js", color: "bg-green-700" },
      { name: "OpenAI API", color: "bg-green-500" },
      { name: "MongoDB", color: "bg-green-900" },
      { name: "Express", color: "bg-gray-600" }
    ],
    featured: true
  },
  
  {
    id: "this-website",
    title: "This Website",
    shortDescription: "Procrastinated writing a resume by building this with Next.js, TypeScript, and Tailwind CSS instead. Deployed on Vercel.",
    fullDescription: "",
    fullDescriptionHtml: 
      "<p style='margin-bottom: 1rem'>Writing CVs is boring, and I am nothing if not a master of productive procrastination. So instead of just spending a couple of hours writing one, I decided to spend a couple of late nights on this porfolio instead. Like with most daunting tasks, I kicked this one off by watching a dozen or so YouTube videos... for research of course. </p>" +
      "<p style='margin-bottom: 1rem'>Shout out to <a href='https://www.youtube.com/@AnthonySistilli' target='_blank' rel='noopener noreferrer'>Anthony Sistilli's channel</a> where he roasts developers' portfolios. That's where I discovered <a href='https://tedawf.com/' target='_blank' rel='noopener noreferrer'>Ted's portfolio</a>, which inspired this layout. Of course, I had to add my own touches, like the changing role titles and the context-sensitive highlights that showcase the different hats I wear and bring the most relevant information to the front.</p>" +
      "<p>Under the hood, it's built with Next.js, TypeScript, and Tailwind CSS. I used Framer Motion to smooth out the animations, and React Icons to keep things visually sharp. I also integrated the Anthropic API to provide intelligent content recommendations based on user interaction patterns. The site is fully responsive, with separate mobile and desktop components. A few thousand lines of code (some courtesy of Claude), a few bad ideas, lots of caffeine, and one Vercel deploy later, here we are.</p>",
    previewImage: "/images/projects/portfolio.png",
    technologies: [
      { name: "Next.js", color: "bg-black text-white" },
      { name: "React", color: "bg-blue-500" },
      { name: "TypeScript", color: "bg-blue-700" },
      { name: "Tailwind CSS", color: "bg-teal-500" },
      { name: "Framer Motion", color: "bg-purple-600" },
      { name: "Anthropic API", color: "bg-indigo-500" }
    ],
    githubUrl: "https://github.com/ArtemBunchuk-FanBox/my-portfolio",
    featured: true
  },
  
  {
    id: "hugging-face-agents",
    title: "Hugging Face Agents Course",
    shortDescription: "Built a network of specialized AI agents as part of Hugging Face's course, applying multi-step reasoning and tool integration to solve structured challenges based on the GAIA benchmark.",
    fullDescription: "",
    fullDescriptionHtml: 
      "<p style='margin-bottom: 1rem'>With all the buzz and hype around AI Agents, I did not want to fall behind, as I have already introduced several AI implementations in both professional and personal contexts. So when I saw that Hugging Face was launching their <a href='https://huggingface.co/learn/agents-course/en/unit0/introduction' target='_blank' rel='noopener noreferrer'>AI Agents course</a>, I immediately signed up.</p>" +
      "<p style='margin-bottom: 1rem'>To my surprise, I was already building AI agents, like the comment reply system or content analysis tools for FanBox. However, this course was still full of revelations, putting my existing knowledge into context, and providing structure and teaching me valuable taxonomy, along with best practices I hadn't considered.</p>" +
      "<p style='margin-bottom: 1rem'>For the final project, I created a network of specialized agents that scrape data from political think tanks, tag, categorize and summarize content, then store everything in a database. The system answers user questions by querying this database, discussing findings across multiple sources, and providing links to source material.</p>" +
      "<p style='margin-bottom: 1rem'>One key challenge was deciding where implementation of AI was truly beneficial versus where traditional automation would suffice. Since this was an AI agents course, I leaned my decisions towards use of AI, but if I was to recreate this project as a product, a lot of it would employ fewer AI steps since traditional algorithms are still more reliable and cost-effective for many tasks.</p>" +
      "<p>In the end, this course helped bridge the gap between what I had been building intuitively and what is emerging as best practice. It gave me a stronger grasp of agent architecture and pushed me to think more critically about how to balance complexity, performance, and practicality. This perspective has already influenced how we're approaching our next generation of tools at FanBox.</p>",
    previewImage: "/images/projects/hugging-face-agents.png",
    technologies: [
      { name: "AI Agents", color: "bg-yellow-600" },
      { name: "Python", color: "bg-blue-800" },
      { name: "Hugging Face", color: "bg-yellow-500" },
      { name: "LangGraph", color: "bg-purple-800" },
      { name: "LlamaIndex", color: "bg-green-600" },
    ],
    featured: false
  },
  
  {
    id: "powerpoint-automation",
    title: "Automated PowerPoint Reports",
    shortDescription: "Built a system that automatically generates client-ready PowerPoint presentations directly from database queries, saving hours of tedious manual work.",
    fullDescription: "",
    fullDescriptionHtml:
      "<p style='margin-bottom: 1rem'>While I personally prefer working with raw spreadsheet data or interactive Tableau dashboards, our clients consistently request their insights delivered in PowerPoint format. This makes sense for their workflow, since they often just want to copy a few slides directly into their own deck. Tableau's export feature is limited to static images that do not integrate well into presentations. There are workarounds like using TabPy or Tableau Prep for automation, but in practice, our studio clients do not engage with Tableau-based solutions, which is why it is not part of the FanBox stack. So, long decks with many similar slides it is.</p>" +
      "<p style='margin-bottom: 1rem'>Historically, these decks have been a time sink. Once the layout is done, the rest is soul-crushing mechanical work that wastes the time of staff who are far too talented to be copying and pasting data into templates.</p>" +
      "<p style='margin-bottom: 1rem'>To cut this waste, I automated the process. The system supports CSV files, JSON, or direct SQL queries, and builds the majority of report slides with all the charts and tables our clients expect, with just a click of a button.</p>" +
      "<p>This automation not only saves hours of work, it also improves reliability by reducing human error and preserves the sanity of our team. Now our analysts can focus on insights instead of formatting, and clients still get the PowerPoint slides they love.</p>",
    previewImage: "/images/projects/powerpoint-automation.png",
    technologies: [
      { name: "Python", color: "bg-blue-800" },
      { name: "SQL", color: "bg-blue-600" },
      { name: "Office API", color: "bg-red-500" },
      { name: "Pandas", color: "bg-cyan-600" }
    ],
    featured: false
  },
  
  {
    id: "broadway-expansion",
    title: "Broadway & West End Expansion",
    shortDescription: "Led FanBox's expansion into the live entertainment sector, establishing a key partnership with a major Broadway and West End media agency.",
    fullDescription: "",
    fullDescriptionHtml:
      "<p style='margin-bottom: 1rem'>FanBox has traditionally focused on research for the entertainment sector, primarily serving the music and film industries. I identified an opportunity to expand our business into the untapped live entertainment sector, particularly Broadway and West End productions.</p>" +
      "<p style='margin-bottom: 1rem'>Through industry contacts and targeted outreach, I connected with a leading media agency that manages marketing for major theatrical shows. My pitch focused on giving their clients access to first-party audience data and behavioral insights that had previously been out of reach. This included helping them understand which creative assets perform best, how to structure and edit campaign content, and when to release different formats based on audience response patterns. The goal was to sharpen both targeting and creative execution throughout the campaign lifecycle.</p>" +
      "<p style='margin-bottom: 1rem'>From initial prospecting and presales to designing research tailored for live productions, I adapted our existing offerings to better serve this sector. We secured a trial project to prove our value, then successfully closed the deal, positioning FanBox as a trusted research partner in this new vertical.</p>" +
      "<p>This initiative not only diversified our client base but also opened up strategic growth opportunities for FanBox in the live events and performing arts space.</p>",
    previewImage: "/images/projects/broadway-expansion.png",
    technologies: [
      { name: "Market Research", color: "bg-purple-700" },
      { name: "Business Development", color: "bg-blue-900" },
      { name: "Strategy", color: "bg-indigo-600" }
    ],
    featured: false
  },
  
  {
    id: "industry-newsletter",
    title: "Film Industry Insights Newsletter",
    shortDescription: "Created and maintain a weekly film industry insights newsletter that analyzes box office performance, marketing strategies, and audience behavior through detailed case studies.",
    fullDescription: "",
    fullDescriptionHtml: 
      "<p style='margin-bottom: 1rem'><a href='https://www.linkedin.com/pulse/popcorn-insider-borderlands-box-office-bomb-unpacking-failures-xdshe/?trackingId=u0jCVhGSGbPAds5BYdBqaQ%3D%3D' target='_blank' rel='noopener noreferrer'>Popcorn Insider</a> is one of my ongoing projects at FanBox. It is a weekly newsletter that explores box office performance, marketing effectiveness, and audience behavior in the film industry. Each issue focuses on a specific case study, breaking down what worked, what failed, and why.</p>" +
      "<p style='margin-bottom: 1rem'>Each edition of Popcorn Insider includes clear recommendations that studios can apply directly, from improving audience targeting to sharpening creative asset development. It showcases FanBox's research capabilities, positions us as a thought leader in entertainment marketing, and provides real strategic value to studio partners.</p>" +
      "<p style='margin-bottom: 1rem'>I designed the newsletter to be part of our broader content strategy and a part of a feedback loop between the research team's early findings and the public-facing insights we share with the industry and consumers. Insights gathered through psychometrics, social listening, and behavioral data from the Popcorn platform are translated into accessible and actionable guidance for film marketers. These insights also feed into other content formats such as YouTube videos, social media engagement, and infographic campaigns across our distribution channels.</p>" +
      "<p>The newsletter has achieved a consistent 24% opening rate among industry professionals, significantly outperforming the entertainment sector average. It has also become a consistent source of new business inquiries from marketing teams that want to avoid the mistakes we analyze and learn from in each edition.</p>",
    previewImage: "/images/projects/newsletter.png",
    technologies: [
      { name: "Data Analysis", color: "bg-blue-800" },
      { name: "Content Strategy", color: "bg-green-700" },
      { name: "Marketing", color: "bg-pink-600" },
      { name: "Film Industry", color: "bg-red-700" }
    ],
    featured: false
  },
  
  {
    id: "dnd-campaign",
    title: "D&D Collaborative Worldbuilding",
    shortDescription: "Created a collaborative system that gave my D&D players world-building roles beyond their characters, expanding their creative impact on the campaign.",
    fullDescription: "",
    fullDescriptionHtml:
      "<p style='margin-bottom: 1rem'>Over the past five years, I've served as Dungeon Master for two ongoing D&D campaigns. What began as a reworked version of Lost Mine of Phandelver grew into an original world with its own cultures, histories, mythologies, architecture, and even a constructed language.</p>" +
      "<p style='margin-bottom: 1rem'>Several players expressed interest in DMing but were hesitant due to time constraints, rules complexity, or stage fright. Moreover, they didn't want to leave the world we had built together.</p>" +
      "<p style='margin-bottom: 1rem'>To address this, I created a simple but structured collaborative system. Each player received a random selection of 3D-printed miniatures, along with access to a shared document bank I built. The goal was to provide just enough structure to overcome blank page intimidation, while still preserving full creative freedom. Players could develop characters inspired by their miniatures without the pressure of DMing or designing full adventures. Many of these creations are now woven into the campaign as NPCs, historical figures, and potential plot hooks.</p>" +
      "<p>This approach brought fresh energy to the campaign and gave players a deeper sense of ownership over the world. What began as a Christmas gift has grown into an ongoing creative partnership and one of the most rewarding aspects of our game.</p>",
    previewImage: "/images/projects/dnd-worldbuilding.png",
    technologies: [
      { name: "Dungeons & Dragons", color: "bg-red-800" },
      { name: "Worldbuilding", color: "bg-green-800" },
      { name: "Collaborative Design", color: "bg-blue-600" },
      { name: "Storytelling", color: "bg-amber-700" }
    ],
    featured: false
  }
];

export default projects;
