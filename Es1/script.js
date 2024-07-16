document.addEventListener("DOMContentLoaded", function() {
    let divImg = document.querySelector(".imgImpiccato");
    let text = document.querySelector(".indovinaParola");
    let btn = document.querySelector(".inviaParola");
    let caselleParola = document.querySelector(".caselleParola");
    let parolaNascosta = '';
    let nImg = 0;
    const img = [
        "img/Fig1.png",
        "img/Fig2.png",
        "img/Fig3.png",
        "img/Fig4.png",
        "img/Fig5.png"
    ];
    
    fetch('php/get_random_word.php')
        .then(response => response.text())
        .then(word => {
            parolaNascosta = word.trim();
            console.log(parolaNascosta);
            for (let i = 0; i < parolaNascosta.length; i++) {
                caselleParola.innerHTML += "<span> _ </span>";
            }
        });

    divImg.style.backgroundImage = `url("${img[0]}")`;

    btn.addEventListener("click", function() {
        let cont = 0;
        let lettera = text.value.toLowerCase();
        let display = "";

        if (lettera.length === 1) {
            for (let i = 0; i < parolaNascosta.length; i++) {
                if (lettera === parolaNascosta[i]) {
                    cont++;
                    display += "<span>" + parolaNascosta[i] + "</span>";
                } else {
                    display += caselleParola.children[i].outerHTML;
                }
            }

            if (cont === 0) {
                nImg++;
                divImg.style.backgroundImage = `url("${img[nImg]}")`;
                if (nImg === 4) {
                    setTimeout(function() {
                        alert("hai perso, la parola era " + parolaNascosta);
                        location.reload();
                    }, 200);
                }
            }

            caselleParola.innerHTML = display;
            text.value = '';
        } else if (text.value.toLowerCase() === parolaNascosta) {
            caselleParola.innerHTML = "";
            for (let i = 0; i < parolaNascosta.length; i++) {
                caselleParola.innerHTML += "<span>" + parolaNascosta[i] + "</span>";
            }
            setTimeout(function() {
                alert("hai vinto!");
                location.reload();
            }, 500);
        }
        else{
            cont++;
        }
    });
});
