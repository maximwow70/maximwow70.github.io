function AudioPlayer(audioPlayerVM, audios) {

    var audio = audioPlayerVM.querySelector('.audio-value');

    var audioCoverVM = audioPlayerVM.querySelector('.audio-cover');
    var audioNameVM = audioPlayerVM.querySelector('.audio-name');
    var audioPerformerVM = audioPlayerVM.querySelector('.audio-performer');

    var isPlayingVM = audioPlayerVM.querySelector('.audio_controls-is_playing');

    var progressTimeVM = audioPlayerVM.querySelector('.audio_progress-progress_time');
    var fullTimeVM = audioPlayerVM.querySelector('.audio_progress-full_time');
    var progressBarContainerVM = audioPlayerVM.querySelector('.audio_progress-bar');
    var progressBarVM = audioPlayerVM.querySelector('.audio_progress-progress_bar');
    var progressControlVM = audioPlayerVM.querySelector('.audio_progress-control');

    var currentVolume = audio.volume;
    var volumeBarVM = audioPlayerVM.querySelector('.audio_controls-volume_bar');
    var volumeControlVM = volumeBarVM.querySelector('.audio_controls-control');

    var numberAudio = 0;


    var isRandom = false;
    var btnRandom = audioPlayerVM.querySelector('.audio_controls-btn--random');
    btnRandom.addEventListener('click', toggleRandom);

    var btnPlay = audioPlayerVM.querySelector('.audio_controls-btn--play');
    btnPlay.addEventListener('click', togglePlay);

    var btnForward = audioPlayerVM.querySelector('.audio_controls-btn--forward');
    btnForward.addEventListener('click', forward);

    var btnBackward = audioPlayerVM.querySelector('.audio_controls-btn--backward');
    btnBackward.addEventListener('click', backward);

    var btnVolume = audioPlayerVM.querySelector('.audio_controls-btn--volume');
    btnVolume.addEventListener('click', function() {
        if (volumeBarVM.classList.contains('audio_controls-volume_bar--active')){
            volumeBarVM.classList.remove('audio_controls-volume_bar--active');
        } else {
            volumeBarVM.classList.add('audio_controls-volume_bar--active');
        }
    })


    function play() {
        audio.play();
        renderTime();
        renderTimeInterval = window.setInterval(renderTime, 1000);
    }
    function pause() {
        audio.pause();
        renderTime();
        window.clearInterval(renderTimeInterval);
    }
    function togglePlay() {
        if (isPlaying()) {
            pause();
        } else {
            play();
        }
    }
    function forward() {
        if (!isRandom){
            if (audios[numberAudio + 1]) {
                numberAudio += 1;
                audio.src = audios[numberAudio].url;
            } else {
                audio.src = audios[audios.length - 1].url;
                numberAudio = audios.length - 1;
            }
            play();
            renderVM();
            isPlayingVM.checked = true;
        } else {
            playRandomAudio();
        }
    }
    function backward() {
        if (!isRandom){
            if (audios[numberAudio - 1]) {
                numberAudio -= 1;
                audio.src = audios[numberAudio].url;
            } else {
                audio.src = audios[0].url;
                numberAudio = 0;
            }
            play();
            renderVM();
            isPlayingVM.checked = true;
        } else {
            playRandomAudio();
        }
    }
    function toggleRandom() {
        isRandom = isRandom ? false : true;
        if (isRandom) {
            btnRandom.classList.add('audio_controls-btn--active');
        } else {
            btnRandom.classList.remove('audio_controls-btn--active');
        }
    }

    function isPlaying() {
        console.log(audio.paused);
        return !audio.paused;
    }

    function renderVM() {
        audioCoverVM.src = audios[numberAudio].coverUrl;
        audioNameVM.innerText = audios[numberAudio].name;
        audioPerformerVM.innerText = audios[numberAudio].performer;
    }
    function renderTime() {
        if (audio.currentTime >= audio.duration) {
            if (!isRandom) {
                if (audios[numberAudio + 1]) {
                    forward();
                } else {
                    isPlayingVM.checked = false;
                }
            } else {
                playRandomAudio();
            }
        }

        var durationMinutes = Math.floor(audio.duration / 60);
        durationMinutes = isNaN(durationMinutes) ? "0" : durationMinutes;
        var durationSeconds = Math.floor(audio.duration % 60);
        durationSeconds = isNaN(durationSeconds) ? "00" : durationSeconds;
        var duration = durationMinutes + ":" + durationSeconds;

        var currentTime = "";
        var currentMinutes = Math.floor(audio.currentTime / 60);
        currentMinutes = !isNaN(currentMinutes) ? currentMinutes : "0";
        var currentSeconds = Math.round(audio.currentTime % 60);
        currentSeconds = !isNaN(currentSeconds) ? currentSeconds : "00";

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

    function getRandomAudioNumber(){
        var previousNumberAudio = numberAudio;
        var newNumberAudio = Math.min(
            Math.floor(
                Math.random() * audios.length
            ),
            audios.length - 1
        );
        return  (newNumberAudio != previousNumberAudio) ? newNumberAudio : 0;
    }

    function changeCurrentTime(event) {
        var leftX = event.clientX - progressBarContainerVM.getBoundingClientRect().left;
        var part = leftX / parseFloat(window.getComputedStyle(progressBarContainerVM).width);

        audio.currentTime = audio.duration * part;

        play();
        isPlayingVM.checked = true;
    }
    function changeCurrentVolume(event) {
        event.stopPropagation();

        var topY = event.clientY - volumeBarVM.getBoundingClientRect().top;
        var part = topY / parseFloat(window.getComputedStyle(volumeBarVM).height);
        if (part > 1){
            part = 1;
        } else if (part < 0){
            part = 0;
        }
        part = 1 - part;

        currentVolume = part;
        audio.volume = currentVolume;
        volumeControlVM.style.top = (1 - currentVolume) * 100 + "%";
    }
    function playRandomAudio() {
        numberAudio = getRandomAudioNumber();
        audio.src = audios[numberAudio].url;
        renderVM();
        play();
    }

    progressBarContainerVM.addEventListener('click', changeCurrentTime);
    progressBarContainerVM.addEventListener('mousedown', function () {
        audio.volume = 0;
        progressBarContainerVM.addEventListener('mousemove', changeCurrentTime);
    });
    progressBarContainerVM.addEventListener('mouseup', function () {
        audio.volume = currentVolume;
        progressBarContainerVM.removeEventListener('mousemove', changeCurrentTime);
    });
    progressBarContainerVM.addEventListener('mouseleave', function () {
        audio.volume = currentVolume;
        progressBarContainerVM.removeEventListener('mousemove', changeCurrentTime);
    });


    volumeBarVM.addEventListener('click', changeCurrentVolume);
    volumeBarVM.addEventListener('mousedown', function() {
        volumeBarVM.addEventListener('mousemove', changeCurrentVolume);
    });
    volumeBarVM.addEventListener('mouseup', function () {
        volumeBarVM.removeEventListener('mousemove', changeCurrentVolume);
    });
    volumeBarVM.addEventListener('mouseleave', function () {
        volumeBarVM.removeEventListener('mousemove', changeCurrentVolume);
    });



    audio.src = audios[0].url;
    renderVM();
}

function Audio(name, performer, url, coverUrl) {
    this.name = name;
    this.performer = performer;
    this.url = url;
    this.coverUrl = coverUrl;
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
                './audio-player/src/7/Falling In Reverse - Coming Home.mp3',
                './audio-player/src/7/falling-in-reverse.jpg'
            ),
            new Audio(
                'Just for life',
                'Lana Del Rey',
                './audio-player/src/4/Lana Del Rey - Lust For Life.mp3',
                './audio-player/src/4/just-for-life.jpg'
            ),
            new Audio(
                'All The Right Moves',
                'One Republic',
                './audio-player/src/6/One Republic - All The Right Moves.mp3',
                './audio-player/src/6/all-the-right-moves.jpg'
            ),
            new Audio(
                'Blue',
                'Emarosa',
                './audio-player/src/5/Emarosa - Blue.mp3',
                './audio-player/src/5/emarosa.jpg'
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