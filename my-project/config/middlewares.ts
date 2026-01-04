export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
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
        'http://127.0.0.1:8080',
        // Local development
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:8080',
        'http://localhost:8081',
        
        // Production domains
        'https://ktrh.or.ke',
        'https://www.ktrh.or.ke',
        'https://kisiiteachinghospital.or.ke',
        'https://admin.ktrh.or.ke',
         'https://ktrh.vercel.app',      
      'https://ktrh.vercel.app/', 
        
        // Strapi admin (if separate)
        process.env.ADMIN_URL || 'http://localhost:1337',
        
        // Allow all subdomains of your domain
        /\.ktrh\.or\.ke$/,
        /\.kisiiteachinghospital\.or\.ke$/,
        
        // Development patterns
        /^http:\/\/localhost:\d+$/,
        /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
        'X-CSRF-Token',
        'X-Forwarded-Proto',
        'X-Forwarded-Host',
        'X-Forwarded-Port',
        'X-Forwarded-For',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
        'Accept-Language',
        'Accept-Encoding',
        'Referer',
        'User-Agent',
      ],
      keepHeaderOnError: true,
      credentials: true,
      maxAge: 3600,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200MB
        keepExtensions: true,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
