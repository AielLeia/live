'use client';

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import React from 'react';

import LiveVideo from '@/components/stream-palyer/live-video';
import LoadingVideo from '@/components/stream-palyer/loading-video';
import OfflineVideo from '@/components/stream-palyer/offline-video';

type VideoProps = {
  hostname: string;
  hostIdentity: string;
};

const Video = ({ hostname, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content: React.ReactNode;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostname} />;
  } else if (!participant && tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant!} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export default Video;
