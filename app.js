const NodeMediaServer = require('node-media-server');

// Configura el servidor RTSP
const rtspServerConfig = {
  logType: 3, // nivel de registro (opcional)
  rtmp: {
    port: 1935, // puerto RTMP (opcional)
    chunk_size: 60000, // tamaño de los fragmentos RTMP (opcional)
    gop_cache: true, // activa el caché de GOP (opcional)
    ping: 60, // intervalo de ping en segundos (opcional)
    ping_timeout: 30 // tiempo de espera del ping en segundos (opcional)
  },
  http: {
    port: 8000, // puerto HTTP (opcional)
    allow_origin: '*', // origen permitido (opcional)
  },
  rtsp: {
    port: 8554, // puerto RTSP (obligatorio)
    // Configura la fuente de video
    mediaServer: {
      webport: 8080,
      ffmpeg: '/usr/local/bin/ffmpeg',
      tasks: [
        {
          app: 'live',
          mode: 'push',
          edge: 'rtmp://localhost/live',
          rtsp: {
            url: '/dev/video0', // ruta al dispositivo de captura de video
            // opciones de codificación de video
            options: '-r 30 -g 60 -s 640x480 -codec:v h264_omx -b:v 2000k -bf 0',
          },
        },
      ],
    },
  },
};

// Crea la instancia del servidor RTSP
const nms = new NodeMediaServer(rtspServerConfig);
nms.run();
