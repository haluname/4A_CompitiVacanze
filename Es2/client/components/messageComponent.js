const messageTemplate = document.createElement('template');

messageTemplate.innerHTML = `
    <style>
        .message {
            margin-bottom: 15px;
        }

        .message.sent {
            text-align: right;
        }

        .message.received {
            text-align: left;
        }

        .content {
            display: inline-block;
            padding: 10px 15px;
            border-radius: 5px;
        }

        .sent .content {
            background-color: #007bff;
            color: #fff;
        }

        .received .content {
            background-color: #f0f0f0;
            color: #333;
        }
    </style>
    <div class="message">
        <div class="content"></div>
        <div class="timestamp"></div>
    </div>
`;

class MessageComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(messageTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const senderId = this.getAttribute('sender-id');
        const content = this.getAttribute('content');
        const timestamp = this.getAttribute('timestamp');
        const currentUserId = sessionStorage.getItem('idUser');

        const messageElement = this.shadowRoot.querySelector('.message');
        const contentElement = this.shadowRoot.querySelector('.content');
        const timestampElement = this.shadowRoot.querySelector('.timestamp');

        contentElement.textContent = content;
        timestampElement.textContent = timestamp;

        if (senderId === currentUserId) {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }
    }
}

customElements.define('message-component', MessageComponent);
