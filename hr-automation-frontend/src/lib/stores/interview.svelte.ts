import type { TranscriptEntry } from '$lib/api/generated';
import { API_URLS } from '$lib/api/client';

type InterviewStatus = 'idle' | 'connecting' | 'active' | 'completed' | 'error';

class InterviewStore {
  status = $state<InterviewStatus>('idle');
  transcript = $state<TranscriptEntry[]>([]);
  currentStreamText = $state('');
  elapsedSeconds = $state(0);
  errorMessage = $state<string | null>(null);
  sessionId = $state<string | null>(null);
  interviewType = $state<'technical' | 'hr' | null>(null);

  private ws: WebSocket | null = null;
  private timerInterval: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;

  connect(sessionId: string, type: 'technical' | 'hr') {
    this.sessionId = sessionId;
    this.interviewType = type;
    this.status = 'connecting';
    this.errorMessage = null;

    const baseUrl = type === 'technical' ? API_URLS.techInterview : API_URLS.hrInterview;
    const wsUrl = baseUrl.replace('http', 'ws') + `/ws/interview/${sessionId}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.status = 'active';
        this.reconnectAttempts = 0;
        this.startTimer();
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        if (this.status === 'active' && !event.wasClean) {
          this.handleReconnect();
        } else if (this.status !== 'completed') {
          this.status = 'idle';
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.errorMessage = 'Connection error occurred';
        this.status = 'error';
      };
    } catch (error) {
      this.status = 'error';
      this.errorMessage = 'Failed to establish connection';
    }
  }

  private handleMessage(msg: { type: string; data?: unknown }) {
    switch (msg.type) {
      case 'transcript_update': {
        const data = msg.data as { role: 'interviewer' | 'candidate'; content: string };
        const entry: TranscriptEntry = {
          id: crypto.randomUUID(),
          role: data.role,
          content: data.content,
          timestamp: new Date(),
          isStreaming: false
        };
        this.transcript = [...this.transcript, entry];
        this.currentStreamText = '';
        break;
      }

      case 'stream_start': {
        this.currentStreamText = '';
        break;
      }

      case 'stream_chunk': {
        const data = msg.data as { text: string };
        this.currentStreamText += data.text;
        break;
      }

      case 'stream_end': {
        if (this.currentStreamText) {
          const entry: TranscriptEntry = {
            id: crypto.randomUUID(),
            role: 'interviewer',
            content: this.currentStreamText,
            timestamp: new Date(),
            isStreaming: false
          };
          this.transcript = [...this.transcript, entry];
          this.currentStreamText = '';
        }
        break;
      }

      case 'interview_complete': {
        this.status = 'completed';
        this.stopTimer();
        break;
      }

      case 'error': {
        const data = msg.data as { message: string };
        this.errorMessage = data.message;
        break;
      }
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.status = 'connecting';
      setTimeout(() => {
        if (this.sessionId && this.interviewType) {
          this.connect(this.sessionId, this.interviewType);
        }
      }, 2000 * this.reconnectAttempts);
    } else {
      this.status = 'error';
      this.errorMessage = 'Failed to reconnect. Please refresh the page.';
    }
  }

  private startTimer() {
    this.elapsedSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
    }, 1000) as unknown as number;
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  sendMessage(content: string) {
    if (this.ws && this.status === 'active') {
      const entry: TranscriptEntry = {
        id: crypto.randomUUID(),
        role: 'candidate',
        content,
        timestamp: new Date(),
        isStreaming: false
      };
      this.transcript = [...this.transcript, entry];

      this.ws.send(JSON.stringify({
        type: 'candidate_response',
        data: { content }
      }));
    }
  }

  endInterview() {
    if (this.ws && this.status === 'active') {
      this.ws.send(JSON.stringify({ type: 'end_interview' }));
      this.status = 'completed';
      this.stopTimer();
    }
  }

  cleanup() {
    this.stopTimer();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.transcript = [];
    this.currentStreamText = '';
    this.elapsedSeconds = 0;
    this.status = 'idle';
    this.errorMessage = null;
    this.sessionId = null;
    this.interviewType = null;
    this.reconnectAttempts = 0;
  }
}

export const interviewStore = new InterviewStore();
