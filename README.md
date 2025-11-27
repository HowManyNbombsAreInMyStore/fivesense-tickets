# FiveSense Ticket Viewer

A simple web application to view Discord ticket transcripts, optimized for Netlify deployment.

## Features

- View Discord ticket transcripts in a clean, easy-to-read interface
- Responsive design that works on desktop and mobile devices
- Multiple access methods: Interactive viewer and direct links
- Optimized for Netlify deployment with proper routing
- No build process required - works with static file hosting

## Files

- `index.html` - Main web page for viewing tickets with multiple access options
- `ticket/transcript.html` - Original ticket transcript file in subdirectory
- `transcript.html` - Copy of transcript file in root directory for direct access
- `netlify.toml` - Netlify configuration for proper routing
- `server.py` - Simple Python server for local testing (optional)

## Deployment to Netlify

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the entire folder to Netlify's deployment area, or:
   - Connect your Git repository to Netlify
   - Set the publish directory to `/` (root)
   - No build command is needed (set to `echo 'No build command needed'`)

## Access Methods

After deployment, you can access your transcript in multiple ways:

1. **Interactive Viewer**: Visit your site URL and click "Load Transcript"
2. **Direct Links**:
   - `[your-site-url]/transcript.html` - Direct access to transcript
   - `[your-site-url]/ticket/transcript.html` - Access from original folder structure

## Local Testing

If you want to test locally:

1. Make sure you have Python installed on your system
2. Navigate to this directory in your terminal/command prompt
3. Run the server:
   ```
   python server.py
   ```
4. Your browser should automatically open to `http://localhost:8000`

## Manual Access

If your browser doesn't open automatically, navigate to:
- http://localhost:8000 - Main viewer page
- http://localhost:8000/transcript.html - Direct access to transcript
- http://localhost:8000/ticket/transcript.html - Access from folder

## Stopping the Server

Press `Ctrl+C` in the terminal/command prompt where the server is running to stop it.