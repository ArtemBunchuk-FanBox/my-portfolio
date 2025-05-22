# Artem Bunchuk - Personal Portfolio

A dynamic, responsive portfolio website built with Next.js that showcases professional experience through interactive role-based highlighting and context-aware content presentation.

## Key Features

**Interactive Role Showcase**: Cycling job titles with context-aware highlighting that dynamically emphasizes relevant experience, skills, and profile content based on the selected professional role.

**Fully Responsive Design**: Separate mobile and desktop components with optimized layouts, touch-friendly navigation, and device-specific interactions.

**Animated Visual Elements**: Dynamic night sky background with twinkling stars, smooth Framer Motion animations, and consistent gradient design system throughout.

**Smart Content Organization**: Timeline-based experience display, filterable tech stack, project showcase with detailed modals, and skills matrix that adapts to highlight relevant competencies.

## Acknowledgments

Layout inspiration from [Ted's portfolio](https://tedawf.com) - check it out for more creative developer portfolio ideas.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # Reusable components
│   ├── ExperienceSection/  # Timeline and experience display
│   ├── HeroSection/        # Profile, job titles, and bio
│   ├── NavMenu/           # Navigation components
│   ├── RecentProjectsSection/ # Project showcase
│   ├── SkillsSection/     # Skills matrix
│   ├── TechStackSection/  # Technology display
│   └── Sky/               # Animated background
├── context/               # React contexts
├── data/                  # Project and content data
└── public/               # Static assets
```
## Tech Stack

- **Framework**: Next.js 15.3.2 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.7
- **Animations**: Framer Motion 12.12.1
- **Icons**: React Icons 5.5.0
- **Deployment**: Vercel


## License

This project is for portfolio demonstration purposes. Feel free to use as inspiration for your own portfolio, but please don't copy directly.

---

*Built with curiosity, caffeine, and a healthy dose of productive procrastination.*