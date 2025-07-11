/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function handleStopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function handleUploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    console.log('Audio uploaded:', result)
  }

  function handleCreateRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        handleUploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Recording started')
    }

    recorder.current.onstop = () => {
      console.log('Recording stopped')
    }

    recorder.current.start()
  }

  async function handleStartRecording() {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    handleCreateRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      handleCreateRecorder(audio)
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={handleStopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={handleStartRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}
