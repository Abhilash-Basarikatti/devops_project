const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Session setup
// app.use(session({
//   secret: 'yourSuperSecretKey123!',  // Use a secure random string in production
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }  // Set true only if using HTTPS
// }));

// // Admin credentials
// const adminUser = {
//   username: 'admin',
//   // bcrypt hash for password 'admin123'
//   passwordHash: '$2b$10$mEaCVhR7StOfXhJNH4ZtFOH0wH2OLjVQQkEYF0gS3IVQZMPjD/PQa'
// };

// // Admin login page
// app.get('/admin/login', (req, res) => {
//   if (req.session.isAdmin) {
//     return res.redirect('/admin.html');
//   }
//   res.send(`
//     <form method="POST" action="/admin/login" style="max-width:320px;margin:auto;padding:30px;">
//       <h2>Admin Login</h2>
//       <input name="username" placeholder="Username" required style="width:100%;padding:10px;margin-bottom:12px;" />
//       <input type="password" name="password" placeholder="Password" required style="width:100%;padding:10px;margin-bottom:12px;" />
//       <button type="submit" style="width:100%;padding:10px;background:#4a90e2;color:white;font-weight:bold;border:none;border-radius:6px;">Login</button>
//     </form>
//   `);
// });

// // Handle login submission
// app.post('/admin/login', async (req, res) => {
//   const { username, password } = req.body;
//   if (username === adminUser.username && await bcrypt.compare(password, adminUser.passwordHash)) {
//     req.session.isAdmin = true;
//     return res.redirect('/admin.html');
//   } else {
//     return res.send('<p style="color:red;text-align:center;margin-top:20px;">Invalid credentials. <a href="/admin/login">Try again</a></p>');
//   }
// });

// // Admin logout
// app.get('/admin/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/admin/login');
//   });
// });

// // Middleware to protect admin pages
// function ensureAdmin(req, res, next) {
//   if (req.session.isAdmin) {
//     next();
//   } else {
//     res.status(401).send('Unauthorized. Please <a href="/admin/login">login</a>.');
//   }
// }

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use true if HTTPS
}));

// Simple admin credentials
const adminUser = {
  username: 'admin',
  password: 'admin123' // plain text password
};

// Admin login page
app.get('/admin/login', (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin.html');
  }
  res.send(`
    <form method="POST" action="/admin/login" style="max-width:320px;margin:auto;padding:30px;">
      <h2>Admin Login</h2>
      <input name="username" placeholder="Username" required style="width:100%;padding:10px;margin-bottom:12px;" />
      <input type="password" name="password" placeholder="Password" required style="width:100%;padding:10px;margin-bottom:12px;" />
      <button type="submit" style="width:100%;padding:10px;background:#4a90e2;color:white;font-weight:bold;border:none;border-radius:6px;">Login</button>
    </form>
  `);
});

// Login POST handler
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    req.session.isAdmin = true;
    res.redirect('/admin.html');
  } else {
    res.send('<p style="color:red;text-align:center;margin-top:20px;">Invalid credentials. <a href="/admin/login">Try again</a></p>');
  }
});

// Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// // Protect admin pages
// function ensureAdmin(req, res, next) {
//   if (req.session.isAdmin) {
//     next();
//   } else {
//     res.status(401).send('Unauthorized. Please <a href="/admin/login">login</a>.');
//   }
// }


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MySQL without DB to create DB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Create DB if not exists
  connection.query(`CREATE DATABASE IF NOT EXISTS foodapp`, err => {
    if (err) throw err;
    console.log('Database checked/created');

    // const db = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: '',
    //   database: 'foodapp'
    // });

    // db.connect(err => {
    //   if (err) throw err;
    //   console.log('Connected to foodapp database');


const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // will be 'mysql' from docker-compose
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'fooddb'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');

      const createUsers = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100),
          password VARCHAR(100)
        )`;

      const createFoods = `
        CREATE TABLE IF NOT EXISTS foods (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          description TEXT,
          price DECIMAL(10,2),
          image_url TEXT
        )`;

     const createOrders = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT,
    customer_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;


      db.query(createUsers);
      db.query(createFoods);
      db.query(createOrders);

      // Insert sample food items if table is empty
      const checkFoods = 'SELECT COUNT(*) AS count FROM foods';
      db.query(checkFoods, (err, results) => {
        if (err) throw err;

        if (results[0].count === 0) {
          const sampleFoods = [
            ["Pizza Margherita", "Classic Italian pizza with tomato, mozzarella and basil.", 8.99, "https://via.placeholder.com/150"],
            ["Veg Burger", "A delicious veggie patty burger with lettuce and tomato.", 5.49, "https://via.placeholder.com/150"],
            ["Chicken Biryani", "Spicy and aromatic chicken biryani served with raita.", 9.99, "https://via.placeholder.com/150"],
            ["Pasta Alfredo", "Creamy Alfredo pasta topped with herbs and cheese.", 7.99, "https://via.placeholder.com/150"],
            ["Mango Smoothie", "Refreshing mango smoothie with ice cream.", 3.49, "https://via.placeholder.com/150"]
          ];

          const insertFoods = 'INSERT INTO foods (name, description, price, image_url) VALUES ?';
          db.query(insertFoods, [sampleFoods], err => {
            if (err) throw err;
            console.log('Sample foods inserted');
          });
        }
      });

      // Setup routes
      setupRoutes(db);
    });
  });
});

// All routes
function setupRoutes(db) {
  // Register
  app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], err => {
      if (err) return res.status(500).send('Error registering');
      res.redirect('/login.html');
    });
  });

  // Login
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (results.length > 0) {
        res.redirect('/home.html');
      } else {
        res.send('Invalid credentials');
      }
    });
  });

//   // Get all foods
//   app.get('/foods', (req, res) => {
//     db.query('SELECT * FROM foods', (err, results) => {
//       if (err) return res.status(500).send('Error fetching foods');
//       res.json(results);
//     });
//   });

//   // Get one food
//   app.get('/food/:id', (req, res) => {
//     db.query('SELECT * FROM foods WHERE id = ?', [req.params.id], (err, results) => {
//       if (err || results.length === 0) return res.status(404).send('Not found');
//       res.json(results[0]);
//     });
//   });

//   // Place order
//   app.post('/order', (req, res) => {
//     const { full_name, address, city, phone, food_id } = req.body;
//     db.query('INSERT INTO orders (food_id, name, address, city, phone) VALUES (?, ?, ?, ?, ?)',
//       [food_id, full_name, address, city, phone],
//       err => {
//         if (err) return res.status(500).send('Order failed');
//         res.sendStatus(200);
//       });
//   });
// Get foods, optional search query
app.get('/api/foods', (req, res) => {
  const search = req.query.search || '';
  const sql = `
    SELECT * FROM foods
    WHERE name LIKE ?
    ORDER BY name
  `;
  db.query(sql, [`%${search}%`], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json([]);
    }
    res.json(results);
  });
});

// Get single food by id
app.get('/api/food/:id', (req, res) => {
  const foodId = req.params.id;
  const sql = 'SELECT * FROM foods WHERE id = ?';
  db.query(sql, [foodId], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(results[0]);
  });
});

app.get('/admin.html', ensureAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});


// Place order
app.post('/api/orders', (req, res) => {
  const { foodId, name, phone, address } = req.body;

  if (!foodId || !name || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const insertSql = `
    INSERT INTO orders (food_id, customer_name, phone, address)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertSql, [foodId, name, phone, address], (err, result) => {
    if (err) {
      console.error('DB error on order insert:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Order placed successfully', orderId: result.insertId });
  });
});


// Get all orders with food details for admin
app.get('/api/admin/orders', (req, res) => {
  const sql = `
    SELECT orders.id, foods.name AS food_name, orders.customer_name, orders.phone, orders.address, orders.created_at
    FROM orders
    JOIN foods ON orders.food_id = foods.id
    ORDER BY orders.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error fetching orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.redirect('/login.html'); // or '/index.html' if you prefer
});

//   app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port http://0.0.0.0:${PORT}`));

}
