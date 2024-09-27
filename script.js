document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('slider-container').style.display = 'block';
    document.getElementById('playButton').style.display = 'none';
    
    let audio = document.getElementById('audio');
    audio.play();

    let images = document.querySelectorAll('.slider-image');
    let subtitle = document.getElementById('subtitle');
    let cakeImage = document.getElementById('cakeImage');
    
    const durations = [5008, 4015, 4015, 7000];  // Durasi setiap slide
    
    // Waktu kemunculan subtitle dalam milidetik
    const subtitleTimings = [
        { start: 5110, end: 7030, text: "It's something like a day dream" }, // Subtitle pertama
        { start: 7040, end: 11070, text: "But I feel so seen in the night" }, // Subtitle kedua
        { start: 11080, end: 15200, text: "So for now, it's only me" },      // Subtitle ketiga
        { start: 15210, end: 20190, text: "And maybe that's all I need" }    // Subtitle keempat
    ];

    let currentSlide = 0;

    function showNextImage() {
        if (currentSlide > 0) {
            // Fade out slide sebelumnya
            images[currentSlide - 1].style.opacity = '0';
            setTimeout(() => {
                images[currentSlide - 1].style.display = 'none'; // Sembunyikan setelah fade out
            }, 1000); // Waktu fade out (sama dengan transition di CSS)
        }

        if (currentSlide < images.length) {
            // Fade in slide berikutnya
            images[currentSlide].style.display = 'block'; // Tampilkan gambar berikutnya
            setTimeout(() => {
                images[currentSlide].style.opacity = '1'; // Fade in gambar
            }, 50); // Delay sedikit untuk memastikan transisi

            // Sinkronisasi subtitle berdasarkan waktu lagunya
            const currentSubtitle = subtitleTimings[currentSlide];
            setTimeout(() => {
                subtitle.textContent = currentSubtitle.text;
                subtitle.style.opacity = '1'; // Fade in subtitle
                setTimeout(() => {
                    subtitle.style.opacity = '0'; // Fade out subtitle setelah waktunya habis
                }, currentSubtitle.end - currentSubtitle.start - 500); // Mengatur waktu subtitle tetap tampil tanpa fade
            }, currentSubtitle.start - durations.slice(0, currentSlide).reduce((a, b) => a + b, 0)); // Delay kemunculan sesuai waktu

            // Pindah ke gambar berikutnya setelah durasi slide selesai
            setTimeout(() => {
                currentSlide++;
                showNextImage();
            }, durations[currentSlide]);
        } else {
            // Setelah semua slide selesai, munculkan gambar cake dengan efek fade
            setTimeout(() => {
                cakeImage.style.display = 'block';
                cakeImage.style.opacity = '1'; // Fade in cake image
            }, 1000); // Tunggu 1 detik sebelum muncul cake
        }
    }

    showNextImage();
});
