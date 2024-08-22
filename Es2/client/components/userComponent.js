const userTemplate = document.createElement('template');

userTemplate.innerHTML = `
    <style>
        .user {
            padding: 15px;
            background-color: #fff;
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .user:hover {
            background-color: #007bff;
            color: #fff;
        }

        .user.active {
            background-color: #0056b3;
            color: #fff;
        }
    </style>
    <div class="user"></div>
`;

class UserComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(userTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('.user').addEventListener('click', () => {
            this.selectUser();
        });
    }

    render() {
        const userName = this.getAttribute('user-name');
        this.shadowRoot.querySelector('.user').textContent = userName;
    }

    selectUser() {
        const users = this.parentElement.querySelectorAll('user-component');
        users.forEach(user => user.shadowRoot.querySelector('.user').classList.remove('active'));
        this.shadowRoot.querySelector('.user').classList.add('active');
    }
}

customElements.define('user-component', UserComponent);
