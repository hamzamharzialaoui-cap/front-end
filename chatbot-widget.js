(function() {
    'use strict';

    const BACKEND_URL = 'https://bot-backend-1-j9ii.onrender.com/api/chat';

    class EnergyBotWidget {
        constructor() {
            this.isOpen = false;
            this.sessionId = this.generateSessionId();
            this.init();
        }

        generateSessionId() {
            return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        init() {
            this.injectStyles();
            this.createWidget();
            this.attachEventListeners();
        }

        injectStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .energy-bot-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    z-index: 9999;
                }

                .energy-bot-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .energy-bot-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }

                .energy-bot-button svg {
                    width: 30px;
                    height: 30px;
                    fill: white;
                }

                .energy-bot-chat-window {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 380px;
                    height: 550px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideUp 0.3s ease;
                    transform-origin: bottom right;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: scale(0.8) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .energy-bot-chat-window.open {
                    display: flex;
                }

                .energy-bot-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .energy-bot-header-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .energy-bot-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .energy-bot-header-text h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .energy-bot-header-text p {
                    margin: 4px 0 0 0;
                    font-size: 12px;
                    opacity: 0.9;
                }

                .energy-bot-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 24px;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .energy-bot-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .energy-bot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    background: #f7f9fc;
                }

                .energy-bot-message {
                    margin-bottom: 16px;
                    display: flex;
                    gap: 8px;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .energy-bot-message.user {
                    flex-direction: row-reverse;
                }

                .energy-bot-message-content {
                    max-width: 75%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .energy-bot-message.bot .energy-bot-message-content {
                    background: white;
                    color: #333;
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                }

                .energy-bot-message.user .energy-bot-message-content {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .energy-bot-typing {
                    display: flex;
                    gap: 4px;
                    padding: 12px 16px;
                    background: white;
                    border-radius: 12px;
                    width: fit-content;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                }

                .energy-bot-typing span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #667eea;
                    animation: typing 1.4s infinite;
                }

                .energy-bot-typing span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .energy-bot-typing span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.5;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }

                .energy-bot-input-area {
                    padding: 16px;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 8px;
                }

                .energy-bot-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #e5e7eb;
                    border-radius: 24px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .energy-bot-input:focus {
                    border-color: #667eea;
                }

                .energy-bot-send {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .energy-bot-send:hover {
                    transform: scale(1.05);
                }

                .energy-bot-send:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .energy-bot-send svg {
                    width: 20px;
                    height: 20px;
                    fill: white;
                }

                /* Responsive Styles */
                @media (max-width: 768px) {
                    .energy-bot-widget {
                        bottom: 10px;
                        right: 10px;
                    }

                    .energy-bot-button {
                        width: 56px;
                        height: 56px;
                    }

                    .energy-bot-button svg {
                        width: 26px;
                        height: 26px;
                    }

                    .energy-bot-chat-window {
                        bottom: 10px;
                        right: 10px;
                        left: 10px;
                        width: calc(100% - 20px);
                        max-width: 400px;
                        height: 500px;
                    }

                    .energy-bot-header {
                        padding: 16px;
                    }

                    .energy-bot-header-text h3 {
                        font-size: 15px;
                    }

                    .energy-bot-header-text p {
                        font-size: 11px;
                    }

                    .energy-bot-avatar {
                        width: 36px;
                        height: 36px;
                        font-size: 18px;
                    }

                    .energy-bot-messages {
                        padding: 16px;
                    }

                    .energy-bot-message-content {
                        max-width: 80%;
                        padding: 10px 14px;
                        font-size: 13px;
                    }

                    .energy-bot-input-area {
                        padding: 12px;
                    }

                    .energy-bot-input {
                        padding: 10px 14px;
                        font-size: 13px;
                    }

                    .energy-bot-send {
                        width: 40px;
                        height: 40px;
                    }
                }

                @media (max-width: 480px) {
                    .energy-bot-chat-window {
                        bottom: 0;
                        right: 0;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        max-width: 100%;
                        border-radius: 0;
                        margin: 0;
                    }

                    .energy-bot-header {
                        padding: 14px;
                    }

                    .energy-bot-messages {
                        padding: 12px;
                    }

                    .energy-bot-message {
                        margin-bottom: 12px;
                    }

                    .energy-bot-message-content {
                        max-width: 85%;
                        padding: 10px 12px;
                        font-size: 14px;
                    }

                    .energy-bot-input-area {
                        padding: 10px;
                    }

                    .energy-bot-input {
                        padding: 10px 12px;
                        font-size: 14px;
                    }
                }

                @media (max-height: 600px) and (max-width: 768px) {
                    .energy-bot-chat-window {
                        height: calc(100vh - 20px);
                    }
                }

            `;
            document.head.appendChild(style);
        }

        createWidget() {
            const widget = document.createElement('div');
            widget.className = 'energy-bot-widget';
            widget.innerHTML = `
                <button class="energy-bot-button" id="energyBotToggle">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                </button>
                <div class="energy-bot-chat-window" id="energyBotWindow">
                    <div class="energy-bot-header">
                        <div class="energy-bot-header-content">
                            <div class="energy-bot-avatar">⚡</div>
                            <div class="energy-bot-header-text">
                                <h3>Assistant Énergie</h3>
                                <p>En ligne</p>
                            </div>
                        </div>
                        <button class="energy-bot-close" id="energyBotClose">×</button>
                    </div>
                    <div class="energy-bot-messages" id="energyBotMessages">
                        <div class="energy-bot-message bot">
                            <div class="energy-bot-message-content">
                                Bonjour! Je suis votre assistant virtuel pour l'énergie. Comment puis-je vous aider aujourd'hui?
                            </div>
                        </div>
                    </div>
                    <div class="energy-bot-input-area">
                        <input type="text" class="energy-bot-input" id="energyBotInput" placeholder="Posez votre question...">
                        <button class="energy-bot-send" id="energyBotSend">
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(widget);
        }

        attachEventListeners() {
            const toggleBtn = document.getElementById('energyBotToggle');
            const closeBtn = document.getElementById('energyBotClose');
            const sendBtn = document.getElementById('energyBotSend');
            const input = document.getElementById('energyBotInput');

            toggleBtn.addEventListener('click', () => this.toggleChat());
            closeBtn.addEventListener('click', () => this.toggleChat());
            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }

        toggleChat() {
            this.isOpen = !this.isOpen;
            const window = document.getElementById('energyBotWindow');
            if (this.isOpen) {
                window.classList.add('open');
                document.getElementById('energyBotInput').focus();
            } else {
                window.classList.remove('open');
            }
        }

        async sendMessage() {
            const input = document.getElementById('energyBotInput');
            const message = input.value.trim();
            
            if (!message) return;

            this.addMessage(message, 'user');
            input.value = '';

            this.showTyping();

            try {
                const response = await fetch(`${BACKEND_URL}/message`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        sessionId: this.sessionId
                    })
                });

                const data = await response.json();
                this.hideTyping();

                if (data.success) {
                    this.addMessage(data.response, 'bot');
                } else {
                    this.addMessage('Désolé, une erreur est survenue. Veuillez réessayer.', 'bot');
                }
            } catch (error) {
                this.hideTyping();
                this.addMessage('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.', 'bot');
                console.error('Error:', error);
            }
        }

        addMessage(text, sender) {
            const messagesContainer = document.getElementById('energyBotMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `energy-bot-message ${sender}`;
            messageDiv.innerHTML = `
                <div class="energy-bot-message-content">${this.escapeHtml(text)}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        showTyping() {
            const messagesContainer = document.getElementById('energyBotMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'energy-bot-message bot';
            typingDiv.id = 'energyBotTyping';
            typingDiv.innerHTML = `
                <div class="energy-bot-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        hideTyping() {
            const typing = document.getElementById('energyBotTyping');
            if (typing) typing.remove();
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new EnergyBotWidget();
        });
    } else {
        new EnergyBotWidget();
    }
})();
