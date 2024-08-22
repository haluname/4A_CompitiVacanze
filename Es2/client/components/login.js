const template = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

        * {
            font-family: 'Montserrat', sans-serif;
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
        
        h2 {
            text-align: center;
            color: #333;
        }

        form {
            margin-top: 20px;
        }
        
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        
        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        button:active {
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
            cursor: pointer;
        }
        
        p a:hover {
            text-decoration: underline;
        }

        #registerForm {
            display: none; /* Nasconde il modulo di registrazione per default */
        }
    </style>
    
    <div id="loginComponent">
        <h2 id="formTitle">Login</h2>
        
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>

        <form id="registerForm">
            <input type="text" id="regUsername" placeholder="Username" required>
            <input type="password" id="regPassword" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>

        <p id="toggleForm">Not registered? <a id="toggleLink">Create an account</a></p>
    </div>
`;

class LoginComponent extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;

        const loginForm = shadowRoot.querySelector('#loginForm');
        const registerForm = shadowRoot.querySelector('#registerForm');
        const toggleLink = shadowRoot.querySelector('#toggleLink');
        const formTitle = shadowRoot.querySelector('#formTitle');
        const toggleFormText = shadowRoot.querySelector('#toggleForm');

        // Funzione per passare tra login e registrazione
        toggleLink.addEventListener('click', () => {
            if (loginForm.style.display !== "none") {
                loginForm.style.display = "none";
                registerForm.style.display = "block";
                formTitle.textContent = "Register";
                toggleFormText.innerHTML = `Already have an account? <a id="toggleLink">Login</a>`;
            } else {
                loginForm.style.display = "block";
                registerForm.style.display = "none";
                formTitle.textContent = "Login";
                toggleFormText.innerHTML = `Not registered? <a id="toggleLink">Create an account</a>`;
            }
        });

        // Gestione del form di login
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = shadowRoot.querySelector('#username').value;
            const password = shadowRoot.querySelector('#password').value;
            
            const data = {
                username: username,
                password: password
            };
            let response = await fetch("server/validation.php", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data),
            });

            let responseData = await response.json();

            console.log(responseData);
            if (responseData.success) {
                alert("Login Done!");
                sessionStorage.setItem("idUser", responseData.id);
                window.location.href = "client/chat.html";
            } else {
                alert("Login failed. Please check your username and password.");
            }
        });

        // Gestione del form di registrazione
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = shadowRoot.querySelector('#regUsername').value;
            const password = shadowRoot.querySelector('#regPassword').value;
            
            const data = {
                username: username,
                password: password
            };
            let response = await fetch("server/register.php", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data),
            });

            let responseData = await response.json();

            console.log(responseData);
            if (responseData.success) {
                alert("Registration Done! You can now log in.");
                loginForm.style.display = "block";
                registerForm.style.display = "none";
                formTitle.textContent = "Login";
                toggleFormText.innerHTML = `Not registered? <a id="toggleLink">Create an account</a>`;
            } else {
                alert("Registration failed. Please try again.");
            }
        });
    }
}

customElements.define('login-component', LoginComponent);
