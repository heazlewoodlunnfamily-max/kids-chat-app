# Friend Chat App 💬

Real-time group chat app for Esther, Valley, and Amaaya!

## What's Inside

```
kids-chat-app/
├── server.js          (Backend - handles messaging)
├── package.json       (Dependencies)
├── public/
│   └── index.html     (Frontend - chat interface)
└── README.md          (This file)
```

## Quick Start

### Option 1: Deploy to Render (FREE & EASY) ✅

1. **Create GitHub Account** (if you don't have one)
   - Go to github.com
   - Sign up (takes 1 minute)

2. **Upload This Folder to GitHub**
   - Go to github.com and create new repository called `kids-chat-app`
   - Click "Add file" → "Upload files"
   - Drag this entire folder into GitHub
   - Click "Commit changes"

3. **Deploy to Render**
   - Go to render.com
   - Sign up and click "New Web Service"
   - Connect your GitHub account
   - Select the `kids-chat-app` repository
   - Fill in:
     - **Name:** `kids-chat-app`
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Click "Create Web Service"
   - Wait 2-3 minutes...
   - You'll get a URL like: `https://kids-chat-app-xyz.onrender.com`

4. **Share the URL**
   - Open it on both iPhones in Safari
   - Kids tap their names and start chatting!
   - Messages appear INSTANTLY

### Option 2: Run Locally (For Testing)

```bash
npm install
npm start
```

Then open `http://localhost:3000` in your browser on all devices.

## Features

✅ Real-time group messaging  
✅ 150+ emojis  
✅ Works on iPhone & iPad  
✅ Parent dashboard (📊 button) to see all messages  
✅ Instant syncing across households  

## Customization

### Change Kids' Names
Edit `public/index.html`, find line ~490 and change:
```javascript
const USERS = {
    you: { name: 'Esther', color: '#667eea' },
    friend1: { name: 'Valley', color: '#ff6b9d' },
    friend2: { name: 'Amaaya', color: '#4ecdc4' },
    friend3: { name: 'Parent', color: '#ffa502' }
};
```

### Add More Emojis
Find the `EMOJIS` array and add any emojis you want!

## Parent Dashboard

Tap the 📊 button to:
- See all messages with timestamps
- View statistics
- Clear messages if needed

## Troubleshooting

**Messages not syncing?**
- Check the green dot in header (connection status)
- Refresh the page
- Wait 3 seconds for reconnection

**Can't see the app?**
- Make sure both devices are on the same internet
- Wait 5 minutes for Render to start (first time)
- Refresh the page

**Need to change something?**
- Edit files in GitHub
- Render will automatically redeploy in 1-2 minutes

## Support

Need help? Check the connection status indicator in the app header!
