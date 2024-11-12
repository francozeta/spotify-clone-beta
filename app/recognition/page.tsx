'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Music2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from '@/components/Header'

interface RecognitionResult {
  status: string
  result?: {
    title: string
    artist: string
    album: string
    release_date: string
    song_link: string
    spotify?: {
      external_urls: {
        spotify: string
      }
    }
    apple_music?: {
      url: string
    }
  }
  error?: {
    error_code: number
    error_message: string
  }
}

export default function Page() {
  const [isRecording, setIsRecording] = useState(false)
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [progress, setProgress] = useState(0)

  const startRecording = async () => {
    setIsRecording(true)
    setResult(null)
    setProgress(0)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks: BlobPart[] = []

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data)
      })

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks)
        sendAudioToAudD(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      })

      mediaRecorder.start()
      const duration = 5000 // 5 seconds
      const interval = 100 // Update progress every 100ms
      let elapsed = 0
      const timer = setInterval(() => {
        elapsed += interval
        setProgress((elapsed / duration) * 100)
        if (elapsed >= duration) {
          clearInterval(timer)
          mediaRecorder.stop()
        }
      }, interval)
    } catch (error) {
      console.error('Error al iniciar la grabación:', error)
      setIsRecording(false)
    }
  }

  const sendAudioToAudD = async (audioBlob: Blob) => {
    const formData = new FormData()
    formData.append('file', audioBlob)
    formData.append('return', 'apple_music,spotify')
    formData.append('api_token', process.env.NEXT_PUBLIC_AUDD_API_TOKEN!)

    try {
      const response = await fetch('https://api.audd.io/', {
        method: 'POST',
        body: formData
      })
      const data: RecognitionResult = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error al enviar audio a AudD:', error)
    } finally {
      setIsRecording(false)
      setProgress(0)
    }
  }

  return (
    <div className="container mx-auto p-4 w-full h-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Recognition
          </h1>
        </div>
      </Header>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Tap the button to listen and recognize the song in seconds. Try it now!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={startRecording}
            disabled={isRecording}
            className="w-full mb-4 h-16 text-lg"
          >
            {isRecording ? (
              <>
                <Mic className="mr-2 h-6 w-6 animate-pulse" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-6 w-6" />
                Start Recognition
              </>
            )}
          </Button>
          {isRecording && (
            <Progress value={progress} className="w-full mb-4" />
          )}
          {result?.status === "success" && result.result && (
            <Alert>
              <Music2 className="h-4 w-4" />
              <AlertTitle>Recognized Song</AlertTitle>
              <AlertDescription>
                <p className="font-semibold">{result.result.title}</p>
                <p>Artista: {result.result.artist}</p>
                {result.result.album && <p>Álbum: {result.result.album}</p>}
                {result.result.release_date && (
                  <p>Fecha de lanzamiento: {result.result.release_date}</p>
                )}
                <div className="flex gap-2 mt-2">
                  {result.result.spotify && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(result.result?.spotify?.external_urls.spotify, '_blank')}
                    >
                      Open in Spotify
                    </Button>
                  )}
                  {result.result.apple_music && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(result.result?.apple_music?.url, '_blank')}
                    >
                      Open in Apple Music
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
          {(result?.status === "failed" || (result && !result.result)) && (
            <Alert variant="destructive">
              <AlertTitle>No se pudo reconocer la canción</AlertTitle>
              <AlertDescription>
                {result.error?.error_message ||
                  "Intenta de nuevo con una parte más reconocible de la canción."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}