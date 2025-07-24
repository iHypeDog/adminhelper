const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'slowtek-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// File paths for counters
const FILES = {
  chamado: 'contador.json',
  ticket: 'contadort.json',
  devolucao: 'contadordev.json',
  users: 'users.json',
  reports: 'reports.json'
};

// Initialize files if they don't exist
for (const file of Object.values(FILES)) {
  if (!fs.existsSync(file)) {
    if (file === 'users.json') {
      // Create admin user
      const adminPassword = bcrypt.hashSync('slowtekadmiro123', 10);
      fs.writeFileSync(file, JSON.stringify({
        users: [{
          id: 1,
          username: 'slowtek',
          password: adminPassword,
          role: 'admin',
          createdAt: new Date().toISOString()
        }]
      }, null, 2));
    } else if (file === 'reports.json') {
      fs.writeFileSync(file, JSON.stringify({ reports: [] }, null, 2));
    } else {
      fs.writeFileSync(file, JSON.stringify({ total: 0 }, null, 2));
    }
  }
}

// Helper functions
const readCount = (file) => JSON.parse(fs.readFileSync(file, 'utf8')).total;
const updateCount = (file, value) => fs.writeFileSync(file, JSON.stringify({ total: value }, null, 2));

const readUsers = () => JSON.parse(fs.readFileSync(FILES.users, 'utf8'));
const saveUsers = (data) => fs.writeFileSync(FILES.users, JSON.stringify(data, null, 2));

const readReports = () => JSON.parse(fs.readFileSync(FILES.reports, 'utf8'));
const saveReports = (data) => fs.writeFileSync(FILES.reports, JSON.stringify(data, null, 2));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied. Admin privileges required.');
  }
};

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: null });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userData = readUsers();
  const user = userData.users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/dashboard', requireAuth, (req, res) => {
  const chamados = readCount(FILES.chamado);
  const tickets = readCount(FILES.ticket);
  const devolucoes = readCount(FILES.devolucao);

  res.render('dashboard', {
    user: req.session.user,
    counters: { chamados, tickets, devolucoes }
  });
});

app.post('/increment/:type', requireAuth, (req, res) => {
  const type = req.params.type;
  if (['chamado', 'ticket', 'devolucao'].includes(type)) {
    const file = FILES[type];
    const current = readCount(file);
    const newCount = current + 1;
    updateCount(file, newCount);
    
    res.json({ success: true, newCount, message: `${type.charAt(0).toUpperCase() + type.slice(1)} registrado!` });
  } else {
    res.json({ success: false, message: 'Invalid counter type' });
  }
});

app.get('/reports', requireAuth, (req, res) => {
  const reportsData = readReports();
  res.render('reports', { 
    user: req.session.user, 
    reports: reportsData.reports.reverse() // Show newest first
  });
});

app.post('/reports', requireAuth, (req, res) => {
  const { idDenunciado, nomeTicket, motivo, adv, link } = req.body;
  
  const reportsData = readReports();
  const newReport = {
    id: Date.now(),
    idDenunciado,
    nomeTicket,
    motivo,
    adv,
    link,
    createdBy: req.session.user.username,
    createdAt: new Date().toISOString()
  };
  
  reportsData.reports.push(newReport);
  saveReports(reportsData);

  // Increment ticket counter
  const current = readCount(FILES.ticket);
  updateCount(FILES.ticket, current + 1);

  res.json({ success: true, message: 'Relatório enviado com sucesso!' });
});

app.get('/users', requireAuth, requireAdmin, (req, res) => {
  const userData = readUsers();
  res.render('users', { 
    user: req.session.user, 
    users: userData.users 
  });
});

app.post('/users', requireAuth, requireAdmin, (req, res) => {
  const { username, password, role } = req.body;
  
  if (!username || !password || !role) {
    return res.json({ success: false, message: 'All fields are required' });
  }

  const userData = readUsers();
  
  // Check if username already exists
  if (userData.users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'Username already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: userData.users.length + 1,
    username,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString()
  };

  userData.users.push(newUser);
  saveUsers(userData);

  res.json({ success: true, message: 'User created successfully' });
});

app.delete('/users/:id', requireAuth, requireAdmin, (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = readUsers();
  
  // Don't allow deleting the admin user
  const userToDelete = userData.users.find(u => u.id === userId);
  if (userToDelete && userToDelete.username === 'slowtek') {
    return res.json({ success: false, message: 'Cannot delete admin user' });
  }

  userData.users = userData.users.filter(u => u.id !== userId);
  saveUsers(userData);

  res.json({ success: true, message: 'User deleted successfully' });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});