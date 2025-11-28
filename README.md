# FiveSense Ticket Viewer

A modern, password-protected ticket viewing application built with React and Tailwind CSS, designed for deployment on Vercel.

## Features

- Password protection (password: `123`)
- Secure authentication with localStorage
- Automatic redirect to https://fivesense.re/ for incorrect passwords
- Ticket transcript viewing (transcript1.html and transcript2.html)
- Responsive design with dark theme
- Loading states and error handling

## Installation

1. Clone the repository
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

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## File Structure

```
├── components/
│   ├── PasswordModal.jsx      # Password protection modal
│   └── TranscriptViewer.jsx   # Ticket transcript viewer
├── ticket/
│   ├── transcript1.html       # Sample ticket transcript
│   └── transcript2.html       # Sample ticket transcript
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
├── index.css                  # Global styles and Tailwind imports
├── index.html                 # HTML template
├── package.json               # Project dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── vercel.json                # Vercel deployment configuration
```

## How It Works

1. When users visit the site, they're prompted for a password
2. If the password is correct (`123`), authentication is saved to localStorage
3. Users can then view ticket transcripts by selecting them
4. If an incorrect password is entered, users are redirected to https://fivesense.re/
5. Transcripts are loaded from `/ticket/transcript1.html` and `/ticket/transcript2.html`

## Customization

To customize the password:
1. Edit the password check in `App.jsx` in the `handlePasswordSubmit` function
2. Update the password in the modal placeholder text if desired

To add more transcripts:
1. Create additional HTML files in the `/ticket/` directory
2. Update the transcript selection buttons in `TranscriptViewer.jsx`

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- localStorage for authentication persistence