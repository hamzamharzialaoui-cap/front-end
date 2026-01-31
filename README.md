# Energy Bot Widget

An embeddable chatbot widget that connects to your Energy Bot backend API.

## Features

- 🎨 Modern, responsive UI with smooth animations
- ⚡ Support for both electricity and gas client types
- 🔌 Easy integration with a single script tag
- 💬 Real-time chat interface
- 🎯 Session management
- 📱 Mobile-friendly design

## Quick Start

### 1. Start the Backend

Make sure your Spring Boot backend is running:

```bash
cd bot-backend
java -jar target/bot-back-0.0.1-SNAPSHOT.jar
```

The backend should be running on `http://localhost:8080`

### 2. Test the Widget

Open your browser and navigate to:
```
https://enrgie-bot.netlify.app/
```

Click the purple button in the bottom-right corner to open the chat widget!

### 3. Integration into Your Website

Add this single line of code to your website, just before the closing `</body>` tag:

```html
 <script src="https://enrgie-bot.netlify.app/chatbot-widget.js"></script>
```


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## File Structure

```
bot-widget/
├── chatbot-widget.js    # Main widget script (embeddable)
├── demo.html            # Demo page to test the widget
└── README.md            # This file
```

## Troubleshooting

### Widget doesn't appear
- Check browser console for errors
- Verify the script is loaded correctly
- Ensure there are no JavaScript errors on your page

### Messages not sending
- Check backend logs for errors
- Verify the API endpoint is working (test with Postman)
- Check browser console for error messages


MIT License
