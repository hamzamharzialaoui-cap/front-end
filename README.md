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

### 2. Serve the Widget Files

You need to serve the widget files via HTTP. You can use any simple HTTP server:

**Option A: Using Python**
```bash
cd bot-widget
python -m http.server 8000
```

**Option B: Using Node.js (http-server)**
```bash
cd bot-widget
npx http-server -p 8000
```

**Option C: Using PHP**
```bash
cd bot-widget
php -S localhost:8000
```

### 3. Test the Widget

Open your browser and navigate to:
```
http://localhost:8000/demo.html
```

Click the purple button in the bottom-right corner to open the chat widget!

## Integration into Your Website

Add this single line of code to your website, just before the closing `</body>` tag:

```html
<script src="http://localhost:8000/chatbot-widget.js"></script>
```

### Production Deployment

For production, you should:

1. **Host the widget file** on your CDN or web server
2. **Update the BACKEND_URL** in `chatbot-widget.js` to point to your production API
3. **Enable CORS** on your backend for your domain

Example for production:
```html
<script src="https://your-cdn.com/chatbot-widget.js"></script>
```

## Configuration

### Backend URL

Edit `chatbot-widget.js` and change the `BACKEND_URL` constant:

```javascript
const BACKEND_URL = 'https://your-api-domain.com/api/chat';
```

### Customization

You can customize the widget by modifying the CSS in `chatbot-widget.js`:

- **Colors**: Change the gradient colors in `.energy-bot-button` and `.energy-bot-header`
- **Position**: Modify `bottom` and `right` properties in `.energy-bot-widget`
- **Size**: Adjust `width` and `height` in `.energy-bot-chat-window`

## API Requirements

The widget expects your backend to have the following endpoint:

**POST** `/api/chat/message`

Request body:
```json
{
  "message": "User's question",
  "sessionId": "unique-session-id",
  "clientType": "electricity" // or "gas"
}
```

Response:
```json
{
  "response": "Bot's response",
  "sessionId": "session-id",
  "success": true,
  "timestamp": 1234567890
}
```

## CORS Configuration

Make sure your backend allows requests from your website's domain. The `@CrossOrigin(origins = "*")` annotation in your `ChatController` should handle this for development.

For production, update it to:
```java
@CrossOrigin(origins = "https://your-website.com")
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

### Can't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration
- Look at browser network tab for failed requests
- Ensure `BACKEND_URL` is correct in the widget script

### Messages not sending
- Check backend logs for errors
- Verify the API endpoint is working (test with Postman)
- Check browser console for error messages

## License

MIT License
