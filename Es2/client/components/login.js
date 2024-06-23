const template = `
    <style>
        /* Stili per il login-component */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

        *{
            font-family: 'Montserrat', sans-serif; /* Applica Montserrat come font principale */
        }
        
        #loginComponent {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        #loginComponent h2 {
            text-align: center;
            color: #333;
        }
        
        #loginForm {
            margin-top: 20px;
        }
        
        #loginForm input[type="text"],
        #loginForm input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        
        #loginForm button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        #loginForm button:hover {
            background-color: #0056b3;
        }
        
        #loginForm button:active {
            background-color: #004799;
        }
        
        p {
            text-align: center;
            margin-top: 10px;
        }
        
        p a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        
        p a:hover {
            text-decoration: underline;
        }
    </style>
    
    <div id="loginComponent">
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>Not registered? <a href="register.html">Create an account</a></p>
    </div>
`;

class LoginComponent extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;

        shadowRoot.querySelector('#loginForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = shadowRoot.querySelector('#username').value;
            const password = shadowRoot.querySelector('#password').value;
            
            console.log(username, password);
        });
    }
}

customElements.define('login-component', LoginComponent);
