// app/stream/page.js
import StreamClientComponent from '@/components/blocks/StreamClientComponent';

export default function StreamPage() {
  return (
    <div>
      <h1>Peer-to-Peer FFmpeg Stream</h1>
      <StreamClientComponent />
    </div>
  );
}