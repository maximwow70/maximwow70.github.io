function AudioPlayer(audioPlayerVM, audios) {

    console.log(audioPlayerVM);

    var audio = audioPlayerVM.querySelector('.audio-value');

    var audioCoverVM = audioPlayerVM.querySelector('.audio-cover');
    var audioNameVM = audioPlayerVM.querySelector('.audio-name');
    var audioPerformerVM = audioPlayerVM.querySelector('.audio-performer');

    var isPlayingVM = audioPlayerVM.querySelector('.audio_controls-is_playing');

    var progressTimeVM = audioPlayerVM.querySelector('.audio_progress-progress_time');
    var fullTimeVM = audioPlayerVM.querySelector('.audio_progress-full_time');
    var progressBarVM = audioPlayerVM.querySelector('.audio_progress-progress_bar');
    var progressControlVM = audioPlayerVM.querySelector('.audio_progress-control');


    var numberAudio = 0;

    var btnPlay = audioPlayerVM.querySelector('.audio_controls-btn--play');
    btnPlay.addEventListener('click', togglePlay);

    var btnForward = audioPlayerVM.querySelector('.audio_controls-btn--forward');
    btnForward.addEventListener('click', forward);

    var btnBackward = audioPlayerVM.querySelector('.audio_controls-btn--backward');
    btnBackward.addEventListener('click', backward);


    function togglePlay() {
        if (isPlaying()) {
            audio.pause();
            renderTime();
            window.clearInterval(renderTimeInterval);
        } else {
            audio.play();
            renderTime();
            renderTimeInterval = window.setInterval(renderTime, 1000);
        }
    }
    function forward() {
        setTimeout(function () {
            if (audios[numberAudio + 1]) {
                numberAudio += 1;
                audio.src = audios[numberAudio].url;
            } else {
                audio.src = audios[audios.length - 1].url;
                numberAudio = audios.length - 1;
            }
            audio.play();

            isPlayingVM.checked = true;
            renderVM();
        }, 100);
    }
    function backward() {
        setTimeout(function () {
            if (audios[numberAudio - 1]) {
                numberAudio -= 1;
                audio.src = audios[numberAudio].url;
            } else {
                audio.src = audios[0].url;
                numberAudio = 0;
            }
            audio.play();

            isPlayingVM.checked = true;
            renderVM();
        }, 100);
    }

    function isPlaying() {
        return !audio.paused;
    }

    function renderVM() {
        audioCoverVM.src = audios[numberAudio].coverUrl;
        audioNameVM.innerText = audios[numberAudio].name;
        audioPerformerVM.innerText = audios[numberAudio].performer;
    }

    function renderTime() {
        if (audio.currentTime >= audio.duration) {
            if (audios[numberAudio + 1]) {
                forward();
            } else {
                isPlayingVM.checked = false;
            }
        }


        var duration = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);

        var currentTime = "";

        var currentMinutes = Math.floor(audio.currentTime / 60);
        currentMinutes = !isNaN(currentMinutes) ? currentMinutes : 0;

        var currentSeconds = Math.round(audio.currentTime % 60);
        currentSeconds = !isNaN(currentSeconds) ? currentSeconds : 0;

        if (audio.currentTime < audio.duration) {
            currentTime += currentMinutes + ":";
            if (currentSeconds < 10) {
                currentTime += "0" + currentSeconds;
            } else {
                currentTime += currentSeconds;
            }
        } else {
            currentTime = duration;
        }

        progressTimeVM.innerText = currentTime;
        fullTimeVM.innerText = duration;

        var currentProgress = Math.min(
            Math.round((audio.currentTime / audio.duration * 100 * 10000)) / 10000,
            100
        );

        progressBarVM.style.width = currentProgress + "%";
        progressControlVM.style.left = currentProgress + "%";
    }

    audio.src = audios[0].url;
    renderVM();
}
(function initAudioPlayer() {

    new AudioPlayer(
        document.querySelector('.audio_player'),
        [
            new Audio(
                'Lost',
                'Carpark North',
                './audio-player/src/3/Carpark North-Lost.mp3',
                './audio-player/src/3/lost.jpg'
            ),
            new Audio(
                'Just for life',
                'Lana Del Rey',
                './audio-player/src/4/Lana Del Rey - Lust For Life.mp3',
                './audio-player/src/4/just-for-life.jpg'
            ),
            new Audio(
                'Stargazer',
                'Aether',
                './audio-player/src/1/Aether-Forgive Me.mp3',
                './audio-player/src/default.svg'
            ),
            new Audio(
                'Forgive Me',
                'Aether',
                './audio-player/src/2/Aether-Stargazer.mp3',
                './audio-player/src/default.svg'
            )
        ]
    );
})();

function Audio(name, performer, url, coverUrl) {
    this.name = name;
    this.performer = performer;
    this.url = url;
    this.coverUrl = coverUrl;
}