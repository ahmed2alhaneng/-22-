import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'site-data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Default site data
const DEFAULT_DATA = {
  admin: {
    username: 'admin',
    password: 'admin'
  },
  siteInfo: {
    location: 'ديالى، بعقوبة، حي المعلمين',
    phone: '07700583840',
    workingHours: '9:00 AM - 9:00 PM',
    email: 'ahmed2iraq60@gmail.com',
    telegram: 'https://t.me/classic_phone'
  },
  courses: [
    {
      id: 1,
      title: 'دورة صيانة الهواتف المتقدمة',
      price: 250,
      discount: 200,
      duration: '4 أسابيع',
      description: 'تعلم صيانة الهواتف من الصفر حتى الاحتراف، تشمل الهاردوير والسوفتوير.',
      image: 'https://picsum.photos/seed/course1/800/600',
      telegram: 'https://t.me/classic_phone_course',
      phone: '07700583840'
    }
  ],
  portfolio: [
    {
      id: 1,
      title: 'تبديل شاشة آيفون 13 برو ماكس',
      before: 'https://picsum.photos/seed/before1/400/400',
      after: 'https://picsum.photos/seed/after1/400/400',
      date: '2024-02-20',
      phone: '07700583840'
    }
  ]
};

// Load data
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
    return DEFAULT_DATA;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function saveData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  // API Routes
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  });

  app.get('/api/data', (req, res) => {
    const data = loadData();
    // Don't send password to client unless authenticated, but for this simple app we'll just send it for now or handle auth properly
    const { admin, ...publicData } = data;
    res.json(publicData);
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const data = loadData();
    if (username === data.admin.username && password === data.admin.password) {
      res.json({ success: true, token: 'fake-jwt-token' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  app.post('/api/update-site', (req, res) => {
    // In a real app, verify token here
    const data = loadData();
    data.siteInfo = req.body;
    saveData(data);
    res.json({ success: true });
  });

  app.post('/api/update-security', (req, res) => {
    const { oldUsername, oldPassword, newUsername, newPassword } = req.body;
    const data = loadData();
    if (oldUsername === data.admin.username && oldPassword === data.admin.password) {
      data.admin.username = newUsername;
      data.admin.password = newPassword;
      saveData(data);
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Current credentials incorrect' });
    }
  });

  app.post('/api/courses', (req, res) => {
    const data = loadData();
    data.courses = req.body;
    saveData(data);
    res.json({ success: true });
  });

  app.post('/api/portfolio', (req, res) => {
    const data = loadData();
    data.portfolio = req.body;
    saveData(data);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
