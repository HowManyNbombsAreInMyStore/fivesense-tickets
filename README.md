# FiveSense Ticket Viewer - React Version

A modern React application for viewing Discord ticket transcripts, optimized for Vercel deployment.

## Features

- View Discord ticket transcripts in a clean, easy-to-read interface
- Responsive design that works on desktop and mobile devices
- Dynamic ticket loading via URL parameters
- Password protection for secure access
- Automatic session management (24-hour sessions)
- Optimized for Vercel deployment with proper routing

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```
   cd react-ticket-viewer
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:
```
npm start
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:
```
npm run build
```

## Deployment to Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Deploy the application:
   ```
   vercel
   ```

## Usage

### Password Protection
The application is protected with a password. The default password is `kubcas3xbmw`.
- Correct password grants 24-hour access
- Wrong password redirects to https://fivesense.re/
- Users can logout manually to end their session

### Accessing Tickets
Access tickets by specifying the ticket name in the URL using the `ticket` parameter:

Example: `https://your-site.vercel.app/?ticket=ticket123`

This will load the ticket file located at `ticket/ticket123.html`.

## Project Structure

```
react-ticket-viewer/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── ticket/
│   └── transcript.html
├── package.json
└── vercel.json
```

## Customization

To customize the appearance or functionality:

1. Modify the CSS in `src/App.css`
2. Update the React component in `src/App.js`
3. Adjust routing rules in `vercel.json` if needed
4. Change the password in `src/App.js` (search for 'kubcas3xbmw')

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To learn React, check out the [React documentation](https://reactjs.org/).