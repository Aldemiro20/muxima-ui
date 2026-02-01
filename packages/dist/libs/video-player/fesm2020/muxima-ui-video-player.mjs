import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewChild, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class VideoPlayerComponent {
    constructor() {
        this.sources = [];
        this.subtitles = [];
        this.config = {};
        this.width = '100%';
        this.height = 'auto';
        this.play = new EventEmitter();
        this.pause = new EventEmitter();
        this.ended = new EventEmitter();
        this.timeUpdate = new EventEmitter();
        this.volumeChange = new EventEmitter();
        this.screenshot = new EventEmitter();
        this.pipToggle = new EventEmitter();
        // Player state
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 1;
        this.isMuted = false;
        this.isFullscreen = false;
        this.isPiP = false;
        this.isTheaterMode = false;
        this.showControls = true;
        this.bufferedPercentage = 0;
        this.brightness = 100;
        this.contrast = 100;
        this.saturation = 100;
        // UI state
        this.showVolumeSlider = false;
        this.showPlaybackRateMenu = false;
        this.showSubtitlesMenu = false;
        this.showQualityMenu = false;
        this.showSettingsMenu = false;
        this.showVideoFilters = false;
        this.currentPlaybackRate = 1;
        this.currentQuality = null;
        this.currentSubtitle = null;
        this.previewTime = 0;
        this.showPreview = false;
        this.previewPosition = 0;
        // Available options
        this.playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
        // Gesture controls (double tap)
        this.lastTapTime = 0;
        // Keyboard shortcuts
        this.keyboardHandler = (event) => {
            if (!this.config.enableKeyboardShortcuts)
                return;
            const target = event.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
                return;
            switch (event.key.toLowerCase()) {
                case ' ':
                case 'k':
                    event.preventDefault();
                    this.togglePlay();
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    this.skipBackward(5);
                    break;
                case 'arrowright':
                    event.preventDefault();
                    this.skipForward(5);
                    break;
                case 'j':
                    event.preventDefault();
                    this.skipBackward(10);
                    break;
                case 'l':
                    event.preventDefault();
                    this.skipForward(10);
                    break;
                case 'arrowup':
                    event.preventDefault();
                    this.volume = Math.min(1, this.volume + 0.1);
                    this.videoElement.nativeElement.volume = this.volume;
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    this.volume = Math.max(0, this.volume - 0.1);
                    this.videoElement.nativeElement.volume = this.volume;
                    break;
                case 'm':
                    event.preventDefault();
                    this.toggleMute();
                    break;
                case 'f':
                    event.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 't':
                    event.preventDefault();
                    this.toggleTheaterMode();
                    break;
                case 'i':
                    if (this.config.enablePiP) {
                        event.preventDefault();
                        this.togglePiP();
                    }
                    break;
                case 's':
                    if (this.config.enableScreenshot) {
                        event.preventDefault();
                        this.captureScreenshot();
                    }
                    break;
                case 'c':
                    event.preventDefault();
                    this.showSubtitlesMenu = !this.showSubtitlesMenu;
                    break;
                case '0':
                case 'home':
                    event.preventDefault();
                    this.videoElement.nativeElement.currentTime = 0;
                    break;
                case 'end':
                    event.preventDefault();
                    this.videoElement.nativeElement.currentTime = this.duration;
                    break;
                case '>':
                    event.preventDefault();
                    const nextRate = this.playbackRates.find(r => r > this.currentPlaybackRate);
                    if (nextRate)
                        this.setPlaybackRate(nextRate);
                    break;
                case '<':
                    event.preventDefault();
                    const prevRate = [...this.playbackRates].reverse().find(r => r < this.currentPlaybackRate);
                    if (prevRate)
                        this.setPlaybackRate(prevRate);
                    break;
            }
        };
    }
    ngOnInit() {
        if (this.config.playbackRates) {
            this.playbackRates = this.config.playbackRates;
        }
        // Setup keyboard shortcuts
        if (this.config.enableKeyboardShortcuts !== false) {
            this.setupKeyboardShortcuts();
        }
    }
    ngOnDestroy() {
        this.clearHideControlsTimer();
        if (this.progressUpdateInterval) {
            clearInterval(this.progressUpdateInterval);
        }
        this.removeKeyboardShortcuts();
    }
    onVideoLoaded() {
        const video = this.videoElement.nativeElement;
        this.duration = video.duration;
        this.volume = video.volume;
        this.isMuted = video.muted;
        if (this.config.autoplay) {
            this.playVideo();
        }
        // Update buffered progress
        this.progressUpdateInterval = setInterval(() => {
            this.updateBuffered();
        }, 500);
    }
    togglePlay() {
        if (this.isPlaying) {
            this.pauseVideo();
        }
        else {
            this.playVideo();
        }
    }
    playVideo() {
        const video = this.videoElement.nativeElement;
        video.play();
        this.isPlaying = true;
        this.play.emit();
    }
    pauseVideo() {
        const video = this.videoElement.nativeElement;
        video.pause();
        this.isPlaying = false;
        this.pause.emit();
    }
    onTimeUpdate() {
        const video = this.videoElement.nativeElement;
        this.currentTime = video.currentTime;
        this.timeUpdate.emit(this.currentTime);
    }
    onVideoEnded() {
        this.isPlaying = false;
        this.ended.emit();
        if (this.config.loop) {
            this.playVideo();
        }
    }
    seek(event) {
        const progressBar = this.progressBar.nativeElement;
        const rect = progressBar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        const video = this.videoElement.nativeElement;
        video.currentTime = percent * this.duration;
    }
    skipBackward(seconds = 10) {
        const video = this.videoElement.nativeElement;
        video.currentTime = Math.max(0, video.currentTime - seconds);
    }
    skipForward(seconds = 10) {
        const video = this.videoElement.nativeElement;
        video.currentTime = Math.min(this.duration, video.currentTime + seconds);
    }
    setVolume(event) {
        const input = event.target;
        const video = this.videoElement.nativeElement;
        this.volume = parseFloat(input.value);
        video.volume = this.volume;
        this.isMuted = this.volume === 0;
        this.volumeChange.emit(this.volume);
    }
    toggleMute() {
        const video = this.videoElement.nativeElement;
        this.isMuted = !this.isMuted;
        video.muted = this.isMuted;
        if (!this.isMuted && this.volume === 0) {
            this.volume = 0.5;
            video.volume = this.volume;
        }
        this.volumeChange.emit(this.isMuted ? 0 : this.volume);
    }
    setPlaybackRate(rate) {
        const video = this.videoElement.nativeElement;
        video.playbackRate = rate;
        this.currentPlaybackRate = rate;
        this.showPlaybackRateMenu = false;
    }
    setSubtitle(subtitle) {
        const video = this.videoElement.nativeElement;
        const tracks = video.textTracks;
        // Disable all tracks
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = 'disabled';
        }
        // Enable selected track
        if (subtitle) {
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].label === subtitle.label) {
                    tracks[i].mode = 'showing';
                    this.currentSubtitle = subtitle.label;
                    break;
                }
            }
        }
        else {
            this.currentSubtitle = null;
        }
        this.showSubtitlesMenu = false;
    }
    setQuality(source) {
        const video = this.videoElement.nativeElement;
        const currentTime = video.currentTime;
        const wasPlaying = this.isPlaying;
        // Find the source index and update
        const sourceElement = video.querySelector(`source[src="${source.src}"]`);
        if (sourceElement) {
            video.src = source.src;
            video.currentTime = currentTime;
            if (wasPlaying) {
                video.play();
            }
            this.currentQuality = source.quality || null;
        }
        this.showQualityMenu = false;
    }
    toggleFullscreen() {
        const container = this.videoElement.nativeElement.parentElement;
        if (!this.isFullscreen) {
            if (container?.requestFullscreen) {
                container.requestFullscreen();
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        this.isFullscreen = !this.isFullscreen;
    }
    onMouseMove() {
        this.showControls = true;
        this.clearHideControlsTimer();
        if (this.isPlaying) {
            this.hideControlsTimer = setTimeout(() => {
                this.showControls = false;
            }, 3000);
        }
    }
    onMouseLeave() {
        if (this.isPlaying) {
            this.clearHideControlsTimer();
            this.hideControlsTimer = setTimeout(() => {
                this.showControls = false;
            }, 1000);
        }
    }
    clearHideControlsTimer() {
        if (this.hideControlsTimer) {
            clearTimeout(this.hideControlsTimer);
        }
    }
    updateBuffered() {
        const video = this.videoElement.nativeElement;
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            this.bufferedPercentage = (bufferedEnd / this.duration) * 100;
        }
    }
    formatTime(seconds) {
        if (isNaN(seconds))
            return '0:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    get progressPercentage() {
        return (this.currentTime / this.duration) * 100 || 0;
    }
    get qualitySources() {
        return this.sources.filter(s => s.quality);
    }
    get videoFilters() {
        return `brightness(${this.brightness}%) contrast(${this.contrast}%) saturate(${this.saturation}%)`;
    }
    // Advanced Features
    // Picture-in-Picture
    async togglePiP() {
        const video = this.videoElement.nativeElement;
        try {
            if (!this.isPiP) {
                if (video.requestPictureInPicture) {
                    await video.requestPictureInPicture();
                    this.isPiP = true;
                    this.pipToggle.emit(true);
                }
            }
            else {
                if (document.exitPictureInPicture) {
                    await document.exitPictureInPicture();
                    this.isPiP = false;
                    this.pipToggle.emit(false);
                }
            }
        }
        catch (error) {
            console.error('PiP error:', error);
        }
    }
    // Screenshot capture
    captureScreenshot() {
        const video = this.videoElement.nativeElement;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Apply current filters
            ctx.filter = this.videoFilters;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            this.screenshot.emit(dataUrl);
            // Download automatically
            const link = document.createElement('a');
            link.download = `screenshot-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        }
    }
    // Theater mode
    toggleTheaterMode() {
        this.isTheaterMode = !this.isTheaterMode;
    }
    // Video filters
    setBrightness(value) {
        this.brightness = value;
    }
    setContrast(value) {
        this.contrast = value;
    }
    setSaturation(value) {
        this.saturation = value;
    }
    resetFilters() {
        this.brightness = 100;
        this.contrast = 100;
        this.saturation = 100;
    }
    // Timeline preview
    showTimelinePreview(event) {
        const progressBar = this.progressBar.nativeElement;
        const rect = progressBar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.previewTime = percent * this.duration;
        this.previewPosition = event.clientX - rect.left;
        this.showPreview = true;
    }
    hideTimelinePreview() {
        this.showPreview = false;
    }
    onVideoTap(event) {
        if (!this.config.enableGestures)
            return;
        const currentTime = Date.now();
        const tapGap = currentTime - this.lastTapTime;
        if (tapGap < 300 && tapGap > 0) {
            // Double tap detected
            const videoRect = this.videoElement.nativeElement.getBoundingClientRect();
            const tapX = event.clientX - videoRect.left;
            const videoWidth = videoRect.width;
            if (tapX < videoWidth / 3) {
                // Left side - skip backward
                this.skipBackward(10);
                this.showSkipAnimation('backward');
            }
            else if (tapX > (videoWidth * 2) / 3) {
                // Right side - skip forward
                this.skipForward(10);
                this.showSkipAnimation('forward');
            }
            else {
                // Center - toggle play
                this.togglePlay();
            }
            clearTimeout(this.tapTimeout);
        }
        else {
            this.tapTimeout = setTimeout(() => {
                // Single tap - show/hide controls
                this.showControls = !this.showControls;
            }, 300);
        }
        this.lastTapTime = currentTime;
    }
    showSkipAnimation(direction) {
        // This will be handled in the template with animations
        const animationElement = document.createElement('div');
        animationElement.className = `skip-animation ${direction}`;
        animationElement.textContent = direction === 'forward' ? '+10s' : '-10s';
        const container = this.videoElement.nativeElement.parentElement;
        container?.appendChild(animationElement);
        setTimeout(() => {
            animationElement.remove();
        }, 800);
    }
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', this.keyboardHandler);
    }
    removeKeyboardShortcuts() {
        document.removeEventListener('keydown', this.keyboardHandler);
    }
}
VideoPlayerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: VideoPlayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
VideoPlayerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: VideoPlayerComponent, isStandalone: true, selector: "muxima-video-player", inputs: { sources: "sources", subtitles: "subtitles", config: "config", width: "width", height: "height" }, outputs: { play: "play", pause: "pause", ended: "ended", timeUpdate: "timeUpdate", volumeChange: "volumeChange", screenshot: "screenshot", pipToggle: "pipToggle" }, viewQueries: [{ propertyName: "videoElement", first: true, predicate: ["videoElement"], descendants: true }, { propertyName: "progressBar", first: true, predicate: ["progressBar"], descendants: true }], ngImport: i0, template: "<div class=\"video-player-container\" \r\n     [class.theater-mode]=\"isTheaterMode\"\r\n     [style.width]=\"width\" \r\n     [style.height]=\"height\"\r\n     (mousemove)=\"onMouseMove()\"\r\n     (mouseleave)=\"onMouseLeave()\">\r\n  \r\n  <!-- Video Element -->\r\n  <video #videoElement\r\n         class=\"video-element\"\r\n         [style.filter]=\"videoFilters\"\r\n         [poster]=\"config.poster\"\r\n         [loop]=\"config.loop || false\"\r\n         [muted]=\"config.muted || false\"\r\n         (loadedmetadata)=\"onVideoLoaded()\"\r\n         (timeupdate)=\"onTimeUpdate()\"\r\n         (ended)=\"onVideoEnded()\"\r\n         (click)=\"onVideoTap($event)\">\r\n    \r\n    <source *ngFor=\"let source of sources\" \r\n            [src]=\"source.src\" \r\n            [type]=\"source.type\">\r\n    \r\n    <track *ngFor=\"let subtitle of subtitles\"\r\n           [src]=\"subtitle.src\"\r\n           [srclang]=\"subtitle.srclang\"\r\n           [label]=\"subtitle.label\"\r\n           kind=\"subtitles\">\r\n    \r\n    Seu navegador n\u00E3o suporta o elemento de v\u00EDdeo.\r\n  </video>\r\n\r\n  <!-- Play/Pause Overlay -->\r\n  <div class=\"play-overlay\" *ngIf=\"!isPlaying && duration > 0\" (click)=\"togglePlay()\">\r\n    <div class=\"play-button\">\r\n      <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n        <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Loading Spinner -->\r\n  <div class=\"loading-spinner\" *ngIf=\"duration === 0\">\r\n    <div class=\"spinner\"></div>\r\n  </div>\r\n\r\n  <!-- Controls -->\r\n  <div class=\"controls\" [class.hidden]=\"!showControls\">\r\n    \r\n    <!-- Progress Bar -->\r\n    <div class=\"progress-container\">\r\n      <div #progressBar \r\n           class=\"progress-bar\" \r\n           (click)=\"seek($event)\"\r\n           (mousemove)=\"showTimelinePreview($event)\"\r\n           (mouseleave)=\"hideTimelinePreview()\">\r\n        <div class=\"buffered\" [style.width.%]=\"bufferedPercentage\"></div>\r\n        <div class=\"progress\" [style.width.%]=\"progressPercentage\"></div>\r\n        <div class=\"progress-handle\" [style.left.%]=\"progressPercentage\"></div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Control Buttons -->\r\n    <div class=\"controls-row\">\r\n      \r\n      <!-- Left Controls -->\r\n      <div class=\"controls-left\">\r\n        <!-- Play/Pause -->\r\n        <button class=\"control-btn\" (click)=\"togglePlay()\" title=\"Play/Pause\">\r\n          <svg *ngIf=\"!isPlaying\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\r\n          </svg>\r\n          <svg *ngIf=\"isPlaying\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect>\r\n            <rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Skip Backward -->\r\n        <button class=\"control-btn\" (click)=\"skipBackward(10)\" title=\"Voltar 10s\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"11 19 2 12 11 5 11 19\"></polygon>\r\n            <polygon points=\"22 19 13 12 22 5 22 19\"></polygon>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Skip Forward -->\r\n        <button class=\"control-btn\" (click)=\"skipForward(10)\" title=\"Avan\u00E7ar 10s\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"13 19 22 12 13 5 13 19\"></polygon>\r\n            <polygon points=\"2 19 11 12 2 5 2 19\"></polygon>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Volume -->\r\n        <div class=\"volume-control\" \r\n             (mouseenter)=\"showVolumeSlider = true\"\r\n             (mouseleave)=\"showVolumeSlider = false\">\r\n          <button class=\"control-btn\" (click)=\"toggleMute()\" title=\"Mudo\">\r\n            <!-- Muted -->\r\n            <svg *ngIf=\"isMuted || volume === 0\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line>\r\n              <line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>\r\n            </svg>\r\n            <!-- Low Volume -->\r\n            <svg *ngIf=\"!isMuted && volume > 0 && volume < 0.5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\r\n            </svg>\r\n            <!-- High Volume -->\r\n            <svg *ngIf=\"!isMuted && volume >= 0.5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"volume-slider\" [class.show]=\"showVolumeSlider\">\r\n            <input type=\"range\" \r\n                   min=\"0\" \r\n                   max=\"1\" \r\n                   step=\"0.01\" \r\n                   [value]=\"volume\"\r\n                   (input)=\"setVolume($event)\">\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Time Display -->\r\n        <div class=\"time-display\">\r\n          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Right Controls -->\r\n      <div class=\"controls-right\">\r\n        \r\n        <!-- Playback Rate -->\r\n        <div class=\"menu-control\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showPlaybackRateMenu = !showPlaybackRateMenu\"\r\n                  title=\"Velocidade\">\r\n            <span class=\"icon\">{{ currentPlaybackRate }}x</span>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showPlaybackRateMenu\">\r\n            <div class=\"menu-header\">Velocidade</div>\r\n            <button *ngFor=\"let rate of playbackRates\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentPlaybackRate === rate\"\r\n                    (click)=\"setPlaybackRate(rate)\">\r\n              {{ rate }}x\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Subtitles -->\r\n        <div class=\"menu-control\" *ngIf=\"subtitles.length > 0\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showSubtitlesMenu = !showSubtitlesMenu\"\r\n                  title=\"Legendas\">\r\n            <span class=\"icon\">CC</span>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showSubtitlesMenu\">\r\n            <div class=\"menu-header\">Legendas</div>\r\n            <button class=\"menu-item\"\r\n                    [class.active]=\"currentSubtitle === null\"\r\n                    (click)=\"setSubtitle(null)\">\r\n              Desativado\r\n            </button>\r\n            <button *ngFor=\"let subtitle of subtitles\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentSubtitle === subtitle.label\"\r\n                    (click)=\"setSubtitle(subtitle)\">\r\n              {{ subtitle.label }}\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Quality -->\r\n        <div class=\"menu-control\" *ngIf=\"qualitySources.length > 0\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showQualityMenu = !showQualityMenu\"\r\n                  title=\"Qualidade\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\r\n              <path d=\"M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m17.8 5.2l-4.2-4.2m0-6l4.2-4.2\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showQualityMenu\">\r\n            <div class=\"menu-header\">Qualidade</div>\r\n            <button *ngFor=\"let source of qualitySources\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentQuality === source.quality\"\r\n                    (click)=\"setQuality(source)\">\r\n              {{ source.quality }}\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Screenshot -->\r\n        <button class=\"control-btn\" \r\n                *ngIf=\"config.enableScreenshot !== false\"\r\n                (click)=\"captureScreenshot()\" \r\n                title=\"Capturar Screenshot (S)\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path>\r\n            <circle cx=\"12\" cy=\"13\" r=\"4\"></circle>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Picture-in-Picture -->\r\n        <button class=\"control-btn\" \r\n                *ngIf=\"config.enablePiP !== false\"\r\n                (click)=\"togglePiP()\" \r\n                title=\"Picture-in-Picture (I)\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"></path>\r\n            <rect x=\"13\" y=\"13\" width=\"9\" height=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Theater Mode -->\r\n        <button class=\"control-btn\" \r\n                (click)=\"toggleTheaterMode()\" \r\n                title=\"Modo Teatro (T)\">\r\n          <svg *ngIf=\"!isTheaterMode\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"2\" y=\"7\" width=\"20\" height=\"10\" rx=\"2\"></rect>\r\n          </svg>\r\n          <svg *ngIf=\"isTheaterMode\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"2\" y=\"3\" width=\"20\" height=\"18\" rx=\"2\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Settings / Filters -->\r\n        <div class=\"menu-control\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showSettingsMenu = !showSettingsMenu\"\r\n                  title=\"Configura\u00E7\u00F5es\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\r\n              <path d=\"M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m17.8 5.2l-4.2-4.2m0-6l4.2-4.2\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu settings-menu\" *ngIf=\"showSettingsMenu\">\r\n            <div class=\"menu-header\">Filtros de V\u00EDdeo</div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Brilho: {{ brightness }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"brightness\"\r\n                     (input)=\"setBrightness($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Contraste: {{ contrast }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"contrast\"\r\n                     (input)=\"setContrast($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Satura\u00E7\u00E3o: {{ saturation }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"saturation\"\r\n                     (input)=\"setSaturation($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <button class=\"menu-item reset-btn\" (click)=\"resetFilters()\">\r\n              Resetar Filtros\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Fullscreen -->\r\n        <button class=\"control-btn\" (click)=\"toggleFullscreen()\" title=\"Tela Cheia (F)\">\r\n          <svg *ngIf=\"!isFullscreen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>\r\n          </svg>\r\n          <svg *ngIf=\"isFullscreen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Timeline Preview -->\r\n  <div class=\"timeline-preview\" \r\n       *ngIf=\"showPreview\"\r\n       [style.left.px]=\"previewPosition\">\r\n    <div class=\"preview-time\">{{ formatTime(previewTime) }}</div>\r\n  </div>\r\n\r\n  <!-- Keyboard Shortcuts Help -->\r\n  <div class=\"keyboard-shortcuts-hint\" *ngIf=\"showControls && config.enableKeyboardShortcuts !== false\">\r\n    <span>Pressione '?' para atalhos</span>\r\n  </div>\r\n</div>\r\n", styles: [".video-player-container{position:relative;background:#000;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px #0000004d;max-width:100%}.video-player-container:fullscreen{border-radius:0}.video-element{width:100%;height:100%;display:block;cursor:pointer}.play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);cursor:pointer;transition:opacity .3s ease}.play-overlay:hover{background:rgba(0,0,0,.4)}.play-overlay:hover .play-button{transform:scale(1.1)}.play-button{width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;box-shadow:0 8px 16px #667eea66;transition:transform .3s ease}.play-button .icon{font-size:2rem;color:#fff;margin-left:4px}.play-button svg{width:32px;height:32px;fill:#fff;margin-left:4px}.loading-spinner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.8)}.spinner{width:50px;height:50px;border:4px solid rgba(255,255,255,.1);border-top-color:#667eea;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.controls{position:absolute;bottom:0;left:0;right:0;padding:1rem;background:linear-gradient(to top,rgba(0,0,0,.8),transparent);transition:opacity .3s ease,transform .3s ease}.controls.hidden{opacity:0;transform:translateY(100%);pointer-events:none}.progress-container{margin-bottom:1rem}.progress-bar{position:relative;height:6px;background:rgba(255,255,255,.2);border-radius:3px;cursor:pointer;transition:height .2s ease}.progress-bar:hover{height:8px}.progress-bar:hover .progress-handle{opacity:1;transform:translate(-50%,-50%) scale(1)}.buffered{position:absolute;top:0;left:0;height:100%;background:rgba(255,255,255,.3);border-radius:3px;transition:width .2s ease}.progress{position:absolute;top:0;left:0;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:3px;transition:width .1s ease}.progress-handle{position:absolute;top:50%;width:14px;height:14px;background:white;border-radius:50%;box-shadow:0 2px 4px #0000004d;transform:translate(-50%,-50%) scale(0);opacity:0;transition:all .2s ease}.controls-row{display:flex;align-items:center;justify-content:space-between;gap:1rem}.controls-left,.controls-right{display:flex;align-items:center;gap:.5rem}.control-btn{padding:.5rem;background:transparent;border:none;color:#fff;font-size:1.25rem;cursor:pointer;border-radius:6px;transition:all .2s ease;display:flex;align-items:center;justify-content:center;min-width:36px;height:36px}.control-btn .icon{display:block}.control-btn svg{width:20px;height:20px;stroke:#fff;fill:none}.control-btn:hover{background:rgba(255,255,255,.1);transform:scale(1.1)}.control-btn:active{transform:scale(.95)}.volume-control{position:relative;display:flex;align-items:center}.volume-slider{position:absolute;bottom:100%;left:50%;transform:translate(-50%) translateY(-10px);width:40px;height:100px;padding:.75rem 0;background:rgba(0,0,0,.9);border-radius:8px;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s ease}.volume-slider.show{opacity:1;pointer-events:all}.volume-slider input[type=range]{appearance:none;-webkit-appearance:none;width:80px;height:4px;background:rgba(255,255,255,.2);border-radius:2px;outline:none;transform:rotate(-90deg)}.volume-slider input[type=range]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:12px;height:12px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease}.volume-slider input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2)}.volume-slider input[type=range]::-moz-range-thumb{width:12px;height:12px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border:none;border-radius:50%;cursor:pointer;-moz-transition:all .2s ease;transition:all .2s ease}.volume-slider input[type=range]::-moz-range-thumb:hover{transform:scale(1.2)}.time-display{padding:0 .5rem;color:#fff;font-size:.875rem;font-weight:500;white-space:nowrap}.menu-control{position:relative}.dropdown-menu{position:absolute;bottom:100%;right:0;margin-bottom:10px;min-width:140px;background:rgba(0,0,0,.95);border-radius:8px;overflow:hidden;box-shadow:0 4px 12px #00000080;z-index:1000}.menu-header{padding:.75rem 1rem;color:#fff9;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.1)}.menu-item{width:100%;padding:.75rem 1rem;background:transparent;border:none;color:#fff;font-size:.875rem;text-align:left;cursor:pointer;transition:all .2s ease;border-left:3px solid transparent}.menu-item:hover{background:rgba(255,255,255,.1)}.menu-item.active{background:rgba(102,126,234,.2);border-left-color:#667eea;font-weight:600}@media (max-width: 768px){.controls{padding:.75rem}.controls-row{gap:.25rem}.control-btn{padding:.375rem;font-size:1rem;min-width:32px;height:32px}.time-display{font-size:.75rem;padding:0 .25rem}.play-button{width:60px;height:60px}.play-button .icon{font-size:1.5rem}}.video-player-container.theater-mode{max-width:100%!important;width:100%!important;margin:0 auto}.video-player-container.theater-mode .video-element{max-height:85vh}.timeline-preview{position:absolute;bottom:80px;transform:translate(-50%);background:rgba(0,0,0,.9);padding:.5rem .75rem;border-radius:6px;pointer-events:none;z-index:1000}.timeline-preview .preview-time{color:#fff;font-size:.875rem;font-weight:600;white-space:nowrap}.settings-menu{width:280px!important;max-height:400px}.settings-menu .filter-control{padding:1rem;border-bottom:1px solid rgba(255,255,255,.1)}.settings-menu .filter-control label{display:block;color:#fff;font-size:.875rem;margin-bottom:.5rem;font-weight:500}.settings-menu .filter-control input[type=range]{width:100%;height:4px;background:rgba(255,255,255,.2);border-radius:2px;outline:none;cursor:pointer}.settings-menu .filter-control input[type=range]::-webkit-slider-thumb{appearance:none;width:14px;height:14px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer}.settings-menu .filter-control input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2)}.settings-menu .filter-control input[type=range]::-moz-range-thumb{width:14px;height:14px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;border:none;cursor:pointer}.settings-menu .filter-control input[type=range]::-moz-range-thumb:hover{transform:scale(1.2)}.settings-menu .reset-btn{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)!important;color:#fff;font-weight:600;text-align:center;justify-content:center;margin:.5rem;border-radius:6px}.settings-menu .reset-btn:hover{opacity:.9}.keyboard-shortcuts-hint{position:absolute;bottom:80px;left:50%;transform:translate(-50%);background:rgba(0,0,0,.8);color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.75rem;opacity:0;animation:fadeInOut 4s ease-in-out;pointer-events:none}@keyframes fadeInOut{0%,to{opacity:0}10%,90%{opacity:1}}@keyframes skipAnimation{0%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.2)}to{opacity:0;transform:scale(.8)}}.skip-animation{position:absolute;top:50%;transform:translateY(-50%);background:rgba(102,126,234,.9);color:#fff;padding:1rem 1.5rem;border-radius:12px;font-size:1.5rem;font-weight:700;pointer-events:none;z-index:1000;animation:skipAnimation .8s ease-out}.skip-animation.forward{right:20%}.skip-animation.backward{left:20%}.pip-indicator{position:absolute;top:1rem;right:1rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.75rem;font-weight:600;z-index:1000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: VideoPlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-video-player', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"video-player-container\" \r\n     [class.theater-mode]=\"isTheaterMode\"\r\n     [style.width]=\"width\" \r\n     [style.height]=\"height\"\r\n     (mousemove)=\"onMouseMove()\"\r\n     (mouseleave)=\"onMouseLeave()\">\r\n  \r\n  <!-- Video Element -->\r\n  <video #videoElement\r\n         class=\"video-element\"\r\n         [style.filter]=\"videoFilters\"\r\n         [poster]=\"config.poster\"\r\n         [loop]=\"config.loop || false\"\r\n         [muted]=\"config.muted || false\"\r\n         (loadedmetadata)=\"onVideoLoaded()\"\r\n         (timeupdate)=\"onTimeUpdate()\"\r\n         (ended)=\"onVideoEnded()\"\r\n         (click)=\"onVideoTap($event)\">\r\n    \r\n    <source *ngFor=\"let source of sources\" \r\n            [src]=\"source.src\" \r\n            [type]=\"source.type\">\r\n    \r\n    <track *ngFor=\"let subtitle of subtitles\"\r\n           [src]=\"subtitle.src\"\r\n           [srclang]=\"subtitle.srclang\"\r\n           [label]=\"subtitle.label\"\r\n           kind=\"subtitles\">\r\n    \r\n    Seu navegador n\u00E3o suporta o elemento de v\u00EDdeo.\r\n  </video>\r\n\r\n  <!-- Play/Pause Overlay -->\r\n  <div class=\"play-overlay\" *ngIf=\"!isPlaying && duration > 0\" (click)=\"togglePlay()\">\r\n    <div class=\"play-button\">\r\n      <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n        <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Loading Spinner -->\r\n  <div class=\"loading-spinner\" *ngIf=\"duration === 0\">\r\n    <div class=\"spinner\"></div>\r\n  </div>\r\n\r\n  <!-- Controls -->\r\n  <div class=\"controls\" [class.hidden]=\"!showControls\">\r\n    \r\n    <!-- Progress Bar -->\r\n    <div class=\"progress-container\">\r\n      <div #progressBar \r\n           class=\"progress-bar\" \r\n           (click)=\"seek($event)\"\r\n           (mousemove)=\"showTimelinePreview($event)\"\r\n           (mouseleave)=\"hideTimelinePreview()\">\r\n        <div class=\"buffered\" [style.width.%]=\"bufferedPercentage\"></div>\r\n        <div class=\"progress\" [style.width.%]=\"progressPercentage\"></div>\r\n        <div class=\"progress-handle\" [style.left.%]=\"progressPercentage\"></div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Control Buttons -->\r\n    <div class=\"controls-row\">\r\n      \r\n      <!-- Left Controls -->\r\n      <div class=\"controls-left\">\r\n        <!-- Play/Pause -->\r\n        <button class=\"control-btn\" (click)=\"togglePlay()\" title=\"Play/Pause\">\r\n          <svg *ngIf=\"!isPlaying\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\r\n          </svg>\r\n          <svg *ngIf=\"isPlaying\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect>\r\n            <rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Skip Backward -->\r\n        <button class=\"control-btn\" (click)=\"skipBackward(10)\" title=\"Voltar 10s\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"11 19 2 12 11 5 11 19\"></polygon>\r\n            <polygon points=\"22 19 13 12 22 5 22 19\"></polygon>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Skip Forward -->\r\n        <button class=\"control-btn\" (click)=\"skipForward(10)\" title=\"Avan\u00E7ar 10s\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <polygon points=\"13 19 22 12 13 5 13 19\"></polygon>\r\n            <polygon points=\"2 19 11 12 2 5 2 19\"></polygon>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Volume -->\r\n        <div class=\"volume-control\" \r\n             (mouseenter)=\"showVolumeSlider = true\"\r\n             (mouseleave)=\"showVolumeSlider = false\">\r\n          <button class=\"control-btn\" (click)=\"toggleMute()\" title=\"Mudo\">\r\n            <!-- Muted -->\r\n            <svg *ngIf=\"isMuted || volume === 0\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line>\r\n              <line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>\r\n            </svg>\r\n            <!-- Low Volume -->\r\n            <svg *ngIf=\"!isMuted && volume > 0 && volume < 0.5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\r\n            </svg>\r\n            <!-- High Volume -->\r\n            <svg *ngIf=\"!isMuted && volume >= 0.5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\r\n              <path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"volume-slider\" [class.show]=\"showVolumeSlider\">\r\n            <input type=\"range\" \r\n                   min=\"0\" \r\n                   max=\"1\" \r\n                   step=\"0.01\" \r\n                   [value]=\"volume\"\r\n                   (input)=\"setVolume($event)\">\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Time Display -->\r\n        <div class=\"time-display\">\r\n          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Right Controls -->\r\n      <div class=\"controls-right\">\r\n        \r\n        <!-- Playback Rate -->\r\n        <div class=\"menu-control\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showPlaybackRateMenu = !showPlaybackRateMenu\"\r\n                  title=\"Velocidade\">\r\n            <span class=\"icon\">{{ currentPlaybackRate }}x</span>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showPlaybackRateMenu\">\r\n            <div class=\"menu-header\">Velocidade</div>\r\n            <button *ngFor=\"let rate of playbackRates\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentPlaybackRate === rate\"\r\n                    (click)=\"setPlaybackRate(rate)\">\r\n              {{ rate }}x\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Subtitles -->\r\n        <div class=\"menu-control\" *ngIf=\"subtitles.length > 0\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showSubtitlesMenu = !showSubtitlesMenu\"\r\n                  title=\"Legendas\">\r\n            <span class=\"icon\">CC</span>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showSubtitlesMenu\">\r\n            <div class=\"menu-header\">Legendas</div>\r\n            <button class=\"menu-item\"\r\n                    [class.active]=\"currentSubtitle === null\"\r\n                    (click)=\"setSubtitle(null)\">\r\n              Desativado\r\n            </button>\r\n            <button *ngFor=\"let subtitle of subtitles\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentSubtitle === subtitle.label\"\r\n                    (click)=\"setSubtitle(subtitle)\">\r\n              {{ subtitle.label }}\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Quality -->\r\n        <div class=\"menu-control\" *ngIf=\"qualitySources.length > 0\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showQualityMenu = !showQualityMenu\"\r\n                  title=\"Qualidade\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\r\n              <path d=\"M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m17.8 5.2l-4.2-4.2m0-6l4.2-4.2\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu\" *ngIf=\"showQualityMenu\">\r\n            <div class=\"menu-header\">Qualidade</div>\r\n            <button *ngFor=\"let source of qualitySources\"\r\n                    class=\"menu-item\"\r\n                    [class.active]=\"currentQuality === source.quality\"\r\n                    (click)=\"setQuality(source)\">\r\n              {{ source.quality }}\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Screenshot -->\r\n        <button class=\"control-btn\" \r\n                *ngIf=\"config.enableScreenshot !== false\"\r\n                (click)=\"captureScreenshot()\" \r\n                title=\"Capturar Screenshot (S)\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path>\r\n            <circle cx=\"12\" cy=\"13\" r=\"4\"></circle>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Picture-in-Picture -->\r\n        <button class=\"control-btn\" \r\n                *ngIf=\"config.enablePiP !== false\"\r\n                (click)=\"togglePiP()\" \r\n                title=\"Picture-in-Picture (I)\">\r\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"></path>\r\n            <rect x=\"13\" y=\"13\" width=\"9\" height=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Theater Mode -->\r\n        <button class=\"control-btn\" \r\n                (click)=\"toggleTheaterMode()\" \r\n                title=\"Modo Teatro (T)\">\r\n          <svg *ngIf=\"!isTheaterMode\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"2\" y=\"7\" width=\"20\" height=\"10\" rx=\"2\"></rect>\r\n          </svg>\r\n          <svg *ngIf=\"isTheaterMode\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <rect x=\"2\" y=\"3\" width=\"20\" height=\"18\" rx=\"2\"></rect>\r\n          </svg>\r\n        </button>\r\n\r\n        <!-- Settings / Filters -->\r\n        <div class=\"menu-control\">\r\n          <button class=\"control-btn\" \r\n                  (click)=\"showSettingsMenu = !showSettingsMenu\"\r\n                  title=\"Configura\u00E7\u00F5es\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n              <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\r\n              <path d=\"M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m17.8 5.2l-4.2-4.2m0-6l4.2-4.2\"></path>\r\n            </svg>\r\n          </button>\r\n          \r\n          <div class=\"dropdown-menu settings-menu\" *ngIf=\"showSettingsMenu\">\r\n            <div class=\"menu-header\">Filtros de V\u00EDdeo</div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Brilho: {{ brightness }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"brightness\"\r\n                     (input)=\"setBrightness($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Contraste: {{ contrast }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"contrast\"\r\n                     (input)=\"setContrast($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <div class=\"filter-control\">\r\n              <label>Satura\u00E7\u00E3o: {{ saturation }}%</label>\r\n              <input type=\"range\" \r\n                     min=\"0\" \r\n                     max=\"200\" \r\n                     [value]=\"saturation\"\r\n                     (input)=\"setSaturation($any($event.target).value)\">\r\n            </div>\r\n            \r\n            <button class=\"menu-item reset-btn\" (click)=\"resetFilters()\">\r\n              Resetar Filtros\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Fullscreen -->\r\n        <button class=\"control-btn\" (click)=\"toggleFullscreen()\" title=\"Tela Cheia (F)\">\r\n          <svg *ngIf=\"!isFullscreen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>\r\n          </svg>\r\n          <svg *ngIf=\"isFullscreen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Timeline Preview -->\r\n  <div class=\"timeline-preview\" \r\n       *ngIf=\"showPreview\"\r\n       [style.left.px]=\"previewPosition\">\r\n    <div class=\"preview-time\">{{ formatTime(previewTime) }}</div>\r\n  </div>\r\n\r\n  <!-- Keyboard Shortcuts Help -->\r\n  <div class=\"keyboard-shortcuts-hint\" *ngIf=\"showControls && config.enableKeyboardShortcuts !== false\">\r\n    <span>Pressione '?' para atalhos</span>\r\n  </div>\r\n</div>\r\n", styles: [".video-player-container{position:relative;background:#000;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px #0000004d;max-width:100%}.video-player-container:fullscreen{border-radius:0}.video-element{width:100%;height:100%;display:block;cursor:pointer}.play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);cursor:pointer;transition:opacity .3s ease}.play-overlay:hover{background:rgba(0,0,0,.4)}.play-overlay:hover .play-button{transform:scale(1.1)}.play-button{width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;box-shadow:0 8px 16px #667eea66;transition:transform .3s ease}.play-button .icon{font-size:2rem;color:#fff;margin-left:4px}.play-button svg{width:32px;height:32px;fill:#fff;margin-left:4px}.loading-spinner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.8)}.spinner{width:50px;height:50px;border:4px solid rgba(255,255,255,.1);border-top-color:#667eea;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.controls{position:absolute;bottom:0;left:0;right:0;padding:1rem;background:linear-gradient(to top,rgba(0,0,0,.8),transparent);transition:opacity .3s ease,transform .3s ease}.controls.hidden{opacity:0;transform:translateY(100%);pointer-events:none}.progress-container{margin-bottom:1rem}.progress-bar{position:relative;height:6px;background:rgba(255,255,255,.2);border-radius:3px;cursor:pointer;transition:height .2s ease}.progress-bar:hover{height:8px}.progress-bar:hover .progress-handle{opacity:1;transform:translate(-50%,-50%) scale(1)}.buffered{position:absolute;top:0;left:0;height:100%;background:rgba(255,255,255,.3);border-radius:3px;transition:width .2s ease}.progress{position:absolute;top:0;left:0;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:3px;transition:width .1s ease}.progress-handle{position:absolute;top:50%;width:14px;height:14px;background:white;border-radius:50%;box-shadow:0 2px 4px #0000004d;transform:translate(-50%,-50%) scale(0);opacity:0;transition:all .2s ease}.controls-row{display:flex;align-items:center;justify-content:space-between;gap:1rem}.controls-left,.controls-right{display:flex;align-items:center;gap:.5rem}.control-btn{padding:.5rem;background:transparent;border:none;color:#fff;font-size:1.25rem;cursor:pointer;border-radius:6px;transition:all .2s ease;display:flex;align-items:center;justify-content:center;min-width:36px;height:36px}.control-btn .icon{display:block}.control-btn svg{width:20px;height:20px;stroke:#fff;fill:none}.control-btn:hover{background:rgba(255,255,255,.1);transform:scale(1.1)}.control-btn:active{transform:scale(.95)}.volume-control{position:relative;display:flex;align-items:center}.volume-slider{position:absolute;bottom:100%;left:50%;transform:translate(-50%) translateY(-10px);width:40px;height:100px;padding:.75rem 0;background:rgba(0,0,0,.9);border-radius:8px;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s ease}.volume-slider.show{opacity:1;pointer-events:all}.volume-slider input[type=range]{appearance:none;-webkit-appearance:none;width:80px;height:4px;background:rgba(255,255,255,.2);border-radius:2px;outline:none;transform:rotate(-90deg)}.volume-slider input[type=range]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:12px;height:12px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease}.volume-slider input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2)}.volume-slider input[type=range]::-moz-range-thumb{width:12px;height:12px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border:none;border-radius:50%;cursor:pointer;-moz-transition:all .2s ease;transition:all .2s ease}.volume-slider input[type=range]::-moz-range-thumb:hover{transform:scale(1.2)}.time-display{padding:0 .5rem;color:#fff;font-size:.875rem;font-weight:500;white-space:nowrap}.menu-control{position:relative}.dropdown-menu{position:absolute;bottom:100%;right:0;margin-bottom:10px;min-width:140px;background:rgba(0,0,0,.95);border-radius:8px;overflow:hidden;box-shadow:0 4px 12px #00000080;z-index:1000}.menu-header{padding:.75rem 1rem;color:#fff9;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.1)}.menu-item{width:100%;padding:.75rem 1rem;background:transparent;border:none;color:#fff;font-size:.875rem;text-align:left;cursor:pointer;transition:all .2s ease;border-left:3px solid transparent}.menu-item:hover{background:rgba(255,255,255,.1)}.menu-item.active{background:rgba(102,126,234,.2);border-left-color:#667eea;font-weight:600}@media (max-width: 768px){.controls{padding:.75rem}.controls-row{gap:.25rem}.control-btn{padding:.375rem;font-size:1rem;min-width:32px;height:32px}.time-display{font-size:.75rem;padding:0 .25rem}.play-button{width:60px;height:60px}.play-button .icon{font-size:1.5rem}}.video-player-container.theater-mode{max-width:100%!important;width:100%!important;margin:0 auto}.video-player-container.theater-mode .video-element{max-height:85vh}.timeline-preview{position:absolute;bottom:80px;transform:translate(-50%);background:rgba(0,0,0,.9);padding:.5rem .75rem;border-radius:6px;pointer-events:none;z-index:1000}.timeline-preview .preview-time{color:#fff;font-size:.875rem;font-weight:600;white-space:nowrap}.settings-menu{width:280px!important;max-height:400px}.settings-menu .filter-control{padding:1rem;border-bottom:1px solid rgba(255,255,255,.1)}.settings-menu .filter-control label{display:block;color:#fff;font-size:.875rem;margin-bottom:.5rem;font-weight:500}.settings-menu .filter-control input[type=range]{width:100%;height:4px;background:rgba(255,255,255,.2);border-radius:2px;outline:none;cursor:pointer}.settings-menu .filter-control input[type=range]::-webkit-slider-thumb{appearance:none;width:14px;height:14px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer}.settings-menu .filter-control input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2)}.settings-menu .filter-control input[type=range]::-moz-range-thumb{width:14px;height:14px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;border:none;cursor:pointer}.settings-menu .filter-control input[type=range]::-moz-range-thumb:hover{transform:scale(1.2)}.settings-menu .reset-btn{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)!important;color:#fff;font-weight:600;text-align:center;justify-content:center;margin:.5rem;border-radius:6px}.settings-menu .reset-btn:hover{opacity:.9}.keyboard-shortcuts-hint{position:absolute;bottom:80px;left:50%;transform:translate(-50%);background:rgba(0,0,0,.8);color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.75rem;opacity:0;animation:fadeInOut 4s ease-in-out;pointer-events:none}@keyframes fadeInOut{0%,to{opacity:0}10%,90%{opacity:1}}@keyframes skipAnimation{0%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.2)}to{opacity:0;transform:scale(.8)}}.skip-animation{position:absolute;top:50%;transform:translateY(-50%);background:rgba(102,126,234,.9);color:#fff;padding:1rem 1.5rem;border-radius:12px;font-size:1.5rem;font-weight:700;pointer-events:none;z-index:1000;animation:skipAnimation .8s ease-out}.skip-animation.forward{right:20%}.skip-animation.backward{left:20%}.pip-indicator{position:absolute;top:1rem;right:1rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.75rem;font-weight:600;z-index:1000}\n"] }]
        }], propDecorators: { videoElement: [{
                type: ViewChild,
                args: ['videoElement', { static: false }]
            }], progressBar: [{
                type: ViewChild,
                args: ['progressBar', { static: false }]
            }], sources: [{
                type: Input
            }], subtitles: [{
                type: Input
            }], config: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], play: [{
                type: Output
            }], pause: [{
                type: Output
            }], ended: [{
                type: Output
            }], timeUpdate: [{
                type: Output
            }], volumeChange: [{
                type: Output
            }], screenshot: [{
                type: Output
            }], pipToggle: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { VideoPlayerComponent };
//# sourceMappingURL=muxima-ui-video-player.mjs.map
