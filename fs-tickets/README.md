# FiveSense Ticket Viewer

A simple web application to view Discord ticket transcripts.

## Features

- View Discord ticket transcripts in a clean, easy-to-read interface
- Responsive design that works on desktop and mobile devices
- Easy to deploy and run locally

## Files

- `index.html` - Main web page for viewing tickets
- `ticket/transcript.html` - The actual ticket transcript file
- `server.py` - Simple Python server to host the viewer locally

## How to Use

1. Make sure you have Python installed on your system
2. Navigate to this directory in your terminal/command prompt
3. Run the server:
   ```
   python server.py
   ```
4. Your browser should automatically open to `http://localhost:8000`
5. Click the "Load Transcript" button to view the ticket

## Manual Access

If your browser doesn't open automatically, navigate to:
- http://localhost:8000 - Main viewer page
- http://localhost:8000/ticket/transcript.html - Direct access to transcript

## Stopping the Server

Press `Ctrl+C` in the terminal/command prompt where the server is running to stop it.