
# PromptCollective - AI Prompt Management Platform

PromptCollective is a web application that allows users to create, share, discover, and manage AI prompts. Users can browse public prompts, create their own, organize them by categories, and share them with the community.

![PromptCollective Screenshot](https://source.unsplash.com/random/1200x630/?ai)

## Features

- **User Authentication**: Register and login via email
- **Prompt Management**: Create, edit, and delete your own prompts
- **Gallery**: Browse and discover prompts created by the community
- **Categories**: Filter prompts by categories
- **Favorites**: Save your favorite prompts for easy access
- **Social Features**: Like and share prompts on social media
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
promptcollective/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components (buttons, inputs, etc.)
│   │   ├── layout/      # Layout components (navbar, footer, etc.)
│   │   └── ui/          # UI design system components
│   ├── context/         # React context for state management
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── utils/           # Helper functions
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v6
- **State Management**: React Context API and Tanstack Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/promptcollective.git
cd promptcollective
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Environment Variables

Create a `.env` file in the root directory with the following variables (once you implement a backend):

```
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
# Add other necessary environment variables
```

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This will generate a `dist` folder with production-ready assets.

### Deployment Options

1. **Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command to `npm run build` or `yarn build`
   - Set publish directory to `dist`

2. **Vercel**:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Vite and configure the build settings

3. **GitHub Pages**:
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add to package.json: `"deploy": "gh-pages -d dist"`
   - Run: `npm run build && npm run deploy`

## Backend Integration

The application is currently using mock data. To connect to a real backend:

1. Create API endpoints that match the expected data structure
2. Update the fetch functions in the application to use your real API endpoints
3. Implement proper authentication and authorization

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Router](https://reactrouter.com/) - Routing library
- [Lucide Icons](https://lucide.dev/) - Icon library
