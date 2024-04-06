'use client';

import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import FullScreenControl from '@/components/stream-palyer/full-screen-control';
import VolumeControl from '@/components/stream-palyer/volume-control';

type LiveVideoProps = {
  participant: Participant;
};

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (newVolume: number) => {
    setVolume(+newVolume);
    if (videoRef.current) {
      videoRef.current.muted = newVolume === 0;
      videoRef.current.volume = +newVolume * 0.01;
    }
  };
  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const toggleFullScreen = async () => {
    if (isFullScreen) {
      await document.exitFullscreen();
    } else if (wrapperRef.current) {
      await wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onToggle={toggleMute}
            onChange={onVolumeChange}
            volume={volume}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
