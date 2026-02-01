import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent, VideoSource, Subtitle, VideoPlayerConfig } from '@muxima-ui/video-player';

@Component({
  selector: 'app-video-player-doc',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './video-player-doc.component.html',
  styleUrls: ['./video-player-doc.component.scss']
})
export class VideoPlayerDocComponent {
  // Example 1: Basic player
  basicSources: VideoSource[] = [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }
  ];

  basicConfig: VideoPlayerConfig = {
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
  };

  // Example 2: With subtitles
  subtitleSources: VideoSource[] = [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video/mp4' }
  ];

  subtitles: Subtitle[] = [
    { src: '/assets/subtitles/pt-br.vtt', srclang: 'pt-BR', label: 'Português' },
    { src: '/assets/subtitles/en.vtt', srclang: 'en', label: 'English' }
  ];

  // Example 3: Multiple qualities
  qualitySources: VideoSource[] = [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video/mp4', quality: '360p' },
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', type: 'video/mp4', quality: '720p' }
  ];

  // Example 4: Autoplay & Loop
  autoplayConfig: VideoPlayerConfig = {
    autoplay: true,
    loop: true,
    muted: true
  };

  autoplaySources: VideoSource[] = [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video/mp4' }
  ];

  // Code examples
  basicCode = `<muxima-video-player
  [sources]="videoSources"
  [config]="config">
</muxima-video-player>`;

  subtitlesCode = `<muxima-video-player
  [sources]="videoSources"
  [subtitles]="subtitles">
</muxima-video-player>`;

  qualityCode = `<muxima-video-player
  [sources]="qualitySources">
</muxima-video-player>`;

  componentCode = `import { Component } from '@angular/core';
import { VideoPlayerComponent } from '@muxima-ui/video-player';

@Component({
  standalone: true,
  imports: [VideoPlayerComponent],
  template: \`
    <muxima-video-player
      [sources]="videoSources"
      [subtitles]="subtitles"
      [config]="config"
      (play)="onPlay()"
      (pause)="onPause()">
    </muxima-video-player>
  \`
})
export class MyComponent {
  videoSources = [
    { src: 'video.mp4', type: 'video/mp4', quality: '720p' }
  ];

  subtitles = [
    { src: 'pt-br.vtt', srclang: 'pt-BR', label: 'Português' }
  ];

  config = {
    autoplay: false,
    loop: false,
    muted: false
  };

  onPlay() {
    console.log('Video started');
  }

  onPause() {
    console.log('Video paused');
  }
}`;

  onPlay() {
    console.log('Video playing');
  }

  onPause() {
    console.log('Video paused');
  }

  onTimeUpdate(time: number) {
    console.log('Current time:', time);
  }
}
