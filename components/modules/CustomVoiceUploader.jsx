import React, { useState, useRef } from 'react';
import CustomButton from './CustomButton';
import { MdDelete, MdKeyboardVoice } from "react-icons/md";
import { IoPauseSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa6';

const CustomVoiceUploader = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef(null);

  const startRecording = async () => {
    setRecording(true);
    audioChunks.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    // شروع ضبط
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
    if (mediaRecorderRef.current.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      drawWaveform(audioBlob);
    };
  };

  const drawWaveform = (audioBlob) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fileReader = new FileReader();

    fileReader.onloadend = async () => {
      const arrayBuffer = fileReader.result;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioData = await audioContext.decodeAudioData(arrayBuffer);
      const data = audioData.getChannelData(0);
      console.log(data)
      const width = canvas.width;
      const height = canvas.height;
      const step = Math.ceil(data.length / width);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#F9F5F2';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#F1AA6A';
      ctx.beginPath();

      for (let i = 0; i < width; i++) {
        const min = Math.min(...data.slice(i * step, (i + 1) * step));
        const max = Math.max(...data.slice(i * step, (i + 1) * step));
        ctx.moveTo(i, (1 + min) * height / 2);
        ctx.lineTo(i, (1 + max) * height / 2);
      }

      ctx.stroke();
    };

    fileReader.readAsArrayBuffer(audioBlob);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleDelete = () => {
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="flex justify-between items-center border-2 border-custom-primary-color rounded-lg shadow-md p-2">
      <div className='relative'>

        <CustomButton
          onClick={recording ? stopRecording : startRecording}
          className={`text-24 rounded-md bg-transparent p-0 hover:bg-transparent transition-all ${recording ? 'text-red-500 a' : 'text-gray-400'}`}
        >
          <div className={`${recording ? 'animate-pulse' : 'hidden '}  border border-red-500 rounded-full absolute -right-1 top-0 w-8 h-8`}>

          </div>

          <MdKeyboardVoice size={24} />
          {!audioUrl && (
            <span className='text-gray-400'>........</span>
          )}
        </CustomButton>
      </div>
      <canvas ref={canvasRef} height={20} className={`  w-[60%]  outline-none ${audioUrl ? 'block' : 'hidden'}`}></canvas>

      {
        audioUrl && (
          <>
            <audio
              src={audioUrl}
              ref={audioRef}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
              className="hidden" 
            />
            <div className="flex gap-2 ">
              <CustomButton onClick={togglePlayback} className=" text-white p-2 rounded transition-all !text-16">
                {isPlaying ? <IoPauseSharp />
                  : <FaPlay />
                }
              </CustomButton>
              <CustomButton onClick={handleDelete} className="bg-red-500 text-white p-2 !text-16 hover:bg-red-400 rounded transition-all">
                <MdDelete />

              </CustomButton>
            </div>
          </>
        )
      }
    </div >
  );
};

export default CustomVoiceUploader;
