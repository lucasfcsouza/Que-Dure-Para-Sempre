document.addEventListener('DOMContentLoaded', function() {
    // Configurações
    const CONFIG = {
        names: 'Luiz e Juliana',
        message: 'Cada momento com você é um lembrente de como a vida pode ser doce. Compartilhar tudo contigo me faz sentir que encontrei meu lar.',
        startDate: '2024-01-04T00:00:00', // Ajuste para a data inicial do relacionamento
        photos: [], // Adicione os URLs das fotos aqui
        songUrl: '' // Adicione o URL da música aqui
    };

    // Elementos DOM
    const welcomePage = document.getElementById('welcome-page');
    const contentPage = document.getElementById('content-page');
    const openButton = document.getElementById('open-surprise');
    const photoContainer = document.getElementById('photo-container');
    const prevButton = document.getElementById('prev-photo');
    const nextButton = document.getElementById('next-photo');
    const photoCounter = document.getElementById('photo-counter');
    const namesElement = document.getElementById('names');
    const messageElement = document.getElementById('love-message');
    const audioElement = document.getElementById('love-song');

    // Estado
    let currentPhotoIndex = 0;

    // Inicialização
    function init() {
        namesElement.textContent = CONFIG.names;
        messageElement.textContent = CONFIG.message;
        if (CONFIG.songUrl) {
            audioElement.src = CONFIG.songUrl;
        }
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    // Eventos
    openButton.addEventListener('click', function() {
        welcomePage.classList.remove('active');
        contentPage.classList.add('active');
    });

    // Controle de fotos
    function updatePhotoView() {
        if (CONFIG.photos.length > 0) {
            photoContainer.innerHTML = `<img src="${CONFIG.photos[currentPhotoIndex]}" alt="Foto ${currentPhotoIndex + 1}">`;
            photoCounter.textContent = `${currentPhotoIndex + 1}/${CONFIG.photos.length}`;
        }
    }

    prevButton.addEventListener('click', function() {
        if (currentPhotoIndex > 0) {
            currentPhotoIndex--;
            updatePhotoView();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPhotoIndex < CONFIG.photos.length - 1) {
            currentPhotoIndex++;
            updatePhotoView();
        }
    });

    // Contador de tempo
    function updateCounter() {
        const start = new Date(CONFIG.startDate);
        const now = new Date();
        const diff = now - start;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('seconds').textContent = seconds;
    }

    // Iniciar
    init();
});
