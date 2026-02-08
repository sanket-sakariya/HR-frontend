type PermissionStatus = 'prompt' | 'granted' | 'denied' | 'error';

class MediaStore {
  stream = $state<MediaStream | null>(null);
  videoEnabled = $state(true);
  audioEnabled = $state(true);
  permissionStatus = $state<PermissionStatus>('prompt');
  errorMessage = $state<string | null>(null);
  audioLevel = $state(0);

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animationFrame: number | null = null;

  async initialize() {
    try {
      this.permissionStatus = 'prompt';
      this.errorMessage = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.stream = stream;
      this.permissionStatus = 'granted';
      this.setupAudioAnalysis(stream);

      return stream;
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          this.permissionStatus = 'denied';
          this.errorMessage = 'Camera and microphone access was denied. Please enable permissions in your browser settings.';
        } else if (error.name === 'NotFoundError') {
          this.permissionStatus = 'error';
          this.errorMessage = 'No camera or microphone found. Please connect a device.';
        } else {
          this.permissionStatus = 'error';
          this.errorMessage = `Failed to access media devices: ${error.message}`;
        }
      } else {
        this.permissionStatus = 'error';
        this.errorMessage = 'An unexpected error occurred while accessing media devices.';
      }
      throw error;
    }
  }

  private setupAudioAnalysis(stream: MediaStream) {
    try {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      const updateLevel = () => {
        if (!this.analyser || !this.audioEnabled) {
          this.audioLevel = 0;
          this.animationFrame = requestAnimationFrame(updateLevel);
          return;
        }

        this.analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        this.audioLevel = Math.min(100, (average / 128) * 100);

        this.animationFrame = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (error) {
      console.error('Failed to setup audio analysis:', error);
    }
  }

  toggleVideo() {
    if (!this.stream) return;

    const videoTracks = this.stream.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    this.videoEnabled = videoTracks[0]?.enabled ?? false;
  }

  toggleAudio() {
    if (!this.stream) return;

    const audioTracks = this.stream.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    this.audioEnabled = audioTracks[0]?.enabled ?? false;
  }

  cleanup() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    this.permissionStatus = 'prompt';
    this.audioLevel = 0;
    this.errorMessage = null;
  }
}

export const mediaStore = new MediaStore();
