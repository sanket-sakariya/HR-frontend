export async function checkMediaPermissions(): Promise<'granted' | 'denied' | 'prompt'> {
  try {
    const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
    const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });

    if (cameraPermission.state === 'denied' || micPermission.state === 'denied') {
      return 'denied';
    }

    if (cameraPermission.state === 'granted' && micPermission.state === 'granted') {
      return 'granted';
    }

    return 'prompt';
  } catch {
    // Fallback for browsers that don't support permissions API
    return 'prompt';
  }
}

export async function requestMediaPermissions(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch {
    return false;
  }
}

export function getBrowserMediaSupport(): {
  hasCamera: boolean;
  hasMicrophone: boolean;
  supportsMediaDevices: boolean;
} {
  const supportsMediaDevices = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
  
  return {
    hasCamera: supportsMediaDevices,
    hasMicrophone: supportsMediaDevices,
    supportsMediaDevices
  };
}

export async function getAvailableDevices(): Promise<{
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
}> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    return {
      cameras: devices.filter((d) => d.kind === 'videoinput'),
      microphones: devices.filter((d) => d.kind === 'audioinput')
    };
  } catch {
    return { cameras: [], microphones: [] };
  }
}
