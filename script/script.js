const luzes = document.querySelectorAll('.luz');
const semaforo = document.querySelector('.container-semaforo');
const logo = document.querySelector('.logo-f1');
const scuderiasContainer = document.querySelector('.container-scuderias');
const sliderOverlay = document.querySelector('.car-slider-overlay');
const slides = document.querySelectorAll('.slide');

const teamCircles = document.querySelectorAll('.team'); 

let index = 0;
let introFinalizada = false;
let currentSlideIndex = 0; 


function iniciarSemaforo() {
    if (index < luzes.length) {
        luzes[index].classList.add('acesa');
        index++;
        setTimeout(iniciarSemaforo, 1300);
    } else {
        setTimeout(apagarTudo, 1300);
    }
}

function apagarTudo() {
    luzes.forEach(luz => luz.classList.remove('acesa'));
    setTimeout(() => {
        semaforo.classList.add('sair');
    }, 900);
    setTimeout(() => {
        logo.classList.add('mostrar');
        introFinalizada = true;
    }, 1000);
}

setTimeout(iniciarSemaforo, 1300);


window.addEventListener('wheel', (evento) => {
    if (introFinalizada && evento.deltaY > 30) {
        logo.classList.add('subir');
        scuderiasContainer.classList.add('ativo');
        introFinalizada = false;
    }
});


teamCircles.forEach((circle) => {
    circle.addEventListener('click', function() {
        const indexAtributo = this.getAttribute('data-index');
        
      
        if (indexAtributo !== null) {
            const indexParaAbrir = parseInt(indexAtributo);
            
            if(indexParaAbrir < slides.length) {
                abrirSlider(indexParaAbrir);
            } else {
                console.warn("Erro!");
            }
        }
    });
});

function abrirSlider(index) {
    currentSlideIndex = index;
    atualizarSlides();
    sliderOverlay.classList.add('show-slider');
}

window.fecharSlider = function() {
    sliderOverlay.classList.remove('show-slider');
}

window.mudarSlide = function(direcao) {
    currentSlideIndex += direcao;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    atualizarSlides();
}

function atualizarSlides() {
    slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.add('active');
            const corBotao = slide.getAttribute('data-btn-color');
            if (corBotao) {
                sliderOverlay.style.setProperty('--btn-bg', corBotao);
            }
        } else {
            slide.classList.remove('active');
        }
    });
}