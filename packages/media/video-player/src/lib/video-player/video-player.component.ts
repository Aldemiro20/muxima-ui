import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VideoSource {
  src: string;
  type: string;
  quality?: string;
}

export interface Subtitle {
  src: string;
  srclang: string;
  label: string;
}

export interface VideoPlayerConfig {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playbackRates?: number[];
  showSubtitles?: boolean;
  poster?: string;
  enablePiP?: boolean;
  enableScreenshot?: boolean;
  enableKeyboardShortcuts?: boolean;
  enableGestures?: boolean;
  thumbnailPreview?: string;
}

@Component({
  selector: 'muxima-video-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressBar', { static: false }) progressBar!: ElementRef<HTMLDivElement>;

  @Input() sources: VideoSource[] = [];
  @Input() subtitles: Subtitle[] = [];
  @Input() config: VideoPlayerConfig = {};
  @Input() width: string = '100%';
  @Input() height: string = 'auto';

  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() ended = new EventEmitter<void>();
  @Output() timeUpdate = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();
  @Output() screenshot = new EventEmitter<string>();
  @Output() pipToggle = new EventEmitter<boolean>();

  // Player state
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  isMuted = false;
  isFullscreen = false;
  isPiP = false;
  isTheaterMode = false;
  showControls = true;
  bufferedPercentage = 0;
  brightness = 100;
  contrast = 100;
  saturation = 100;

  // UI state
  showVolumeSlider = false;
  showPlaybackRateMenu = false;
  showSubtitlesMenu = false;
  showQualityMenu = false;
  showSettingsMenu = false;
  showVideoFilters = false;
  currentPlaybackRate = 1;
  currentQuality: string | null = null;
  currentSubtitle: string | null = null;
  previewTime = 0;
  showPreview = false;
  previewPosition = 0;

  // Available options
  playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  // Control visibility timer
  private hideControlsTimer: any;
  private progressUpdateInterval: any;

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
    } else {
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

  seek(event: MouseEvent) {
    const progressBar = this.progressBar.nativeElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const video = this.videoElement.nativeElement;
    video.currentTime = percent * this.duration;
  }

  skipBackward(seconds: number = 10) {
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.max(0, video.currentTime - seconds);
  }

  skipForward(seconds: number = 10) {
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.min(this.duration, video.currentTime + seconds);
  }

  setVolume(event: Event) {
    const input = event.target as HTMLInputElement;
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

  setPlaybackRate(rate: number) {
    const video = this.videoElement.nativeElement;
    video.playbackRate = rate;
    this.currentPlaybackRate = rate;
    this.showPlaybackRateMenu = false;
  }

  setSubtitle(subtitle: Subtitle | null) {
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
    } else {
      this.currentSubtitle = null;
    }

    this.showSubtitlesMenu = false;
  }

  setQuality(source: VideoSource) {
    const video = this.videoElement.nativeElement;
    const currentTime = video.currentTime;
    const wasPlaying = this.isPlaying;

    // Find the source index and update
    const sourceElement = video.querySelector(`source[src="${source.src}"]`) as HTMLSourceElement;
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
    } else {
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

  private clearHideControlsTimer() {
    if (this.hideControlsTimer) {
      clearTimeout(this.hideControlsTimer);
    }
  }

  private updateBuffered() {
    const video = this.videoElement.nativeElement;
    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      this.bufferedPercentage = (bufferedEnd / this.duration) * 100;
    }
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  get progressPercentage(): number {
    return (this.currentTime / this.duration) * 100 || 0;
  }

  get qualitySources(): VideoSource[] {
    return this.sources.filter(s => s.quality);
  }

  get videoFilters(): string {
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
      } else {
        if (document.exitPictureInPicture) {
          await document.exitPictureInPicture();
          this.isPiP = false;
          this.pipToggle.emit(false);
        }
      }
    } catch (error) {
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
  setBrightness(value: number) {
    this.brightness = value;
  }

  setContrast(value: number) {
    this.contrast = value;
  }

  setSaturation(value: number) {
    this.saturation = value;
  }

  resetFilters() {
    this.brightness = 100;
    this.contrast = 100;
    this.saturation = 100;
  }

  // Timeline preview
  showTimelinePreview(event: MouseEvent) {
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

  // Gesture controls (double tap)
  private lastTapTime = 0;
  private tapTimeout: any;

  onVideoTap(event: MouseEvent) {
    if (!this.config.enableGestures) return;

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
      } else if (tapX > (videoWidth * 2) / 3) {
        // Right side - skip forward
        this.skipForward(10);
        this.showSkipAnimation('forward');
      } else {
        // Center - toggle play
        this.togglePlay();
      }

      clearTimeout(this.tapTimeout);
    } else {
      this.tapTimeout = setTimeout(() => {
        // Single tap - show/hide controls
        this.showControls = !this.showControls;
      }, 300);
    }

    this.lastTapTime = currentTime;
  }

  private showSkipAnimation(direction: 'forward' | 'backward') {
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

  // Keyboard shortcuts
  private keyboardHandler = (event: KeyboardEvent) => {
    if (!this.config.enableKeyboardShortcuts) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

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
        if (nextRate) this.setPlaybackRate(nextRate);
        break;
      case '<':
        event.preventDefault();
        const prevRate = [...this.playbackRates].reverse().find(r => r < this.currentPlaybackRate);
        if (prevRate) this.setPlaybackRate(prevRate);
        break;
    }
  };

  private setupKeyboardShortcuts() {
    document.addEventListener('keydown', this.keyboardHandler);
  }

  private removeKeyboardShortcuts() {
    document.removeEventListener('keydown', this.keyboardHandler);
  }
}
