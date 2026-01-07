export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            'images.unsplash.com',
            '*.strapi.io',
            `${process.env.STRAPI_HOST || 'http://localhost:1337'}`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
          'frame-src': ["'self'", 'youtube.com', 'vimeo.com'],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'cdn.jsdelivr.net',
            'maps.googleapis.com',
          ],
          'style-src': [
            "'self'",
            "'unsafe-inline'",
            'fonts.googleapis.com',
            'cdn.jsdelivr.net',
          ],
          'font-src': [
            "'self'",
            'data:',
            'fonts.gstatic.com',
            'cdn.jsdelivr.net',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        // Local development
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:8080',
        'http://localhost:8081',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:1337',
        
        // Production domains (IMPORTANT: Remove trailing slash)
        'https://ktrh.vercel.app',
        
        // Your Strapi Cloud URL (you need to add this)
        'https://better-friend-c539968cc5.strapiapp.com',
        'https://better-friend-c539968cc5.strapiapp.com/',
        
        // Strapi admin
        process.env.ADMIN_URL || 'http://localhost:1337',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
      ],
      keepHeaderOnError: true,
      credentials: true,
    },
  },
  'strapi::logger',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
        keepExtensions: true,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
