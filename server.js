// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3000;

// const session = require('express-session');
// const bcrypt = require('bcrypt');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // // Session setup
// // app.use(session({
// //   secret: 'yourSuperSecretKey123!',  // Use a secure random string in production
// //   resave: false,
// //   saveUninitialized: false,
// //   cookie: { secure: false }  // Set true only if using HTTPS
// // }));

// // // Admin credentials
// // const adminUser = {
// //   username: 'admin',
// //   // bcrypt hash for password 'admin123'
// //   passwordHash: '$2b$10$mEaCVhR7StOfXhJNH4ZtFOH0wH2OLjVQQkEYF0gS3IVQZMPjD/PQa'
// // };

// // // Admin login page
// // app.get('/admin/login', (req, res) => {
// //   if (req.session.isAdmin) {
// //     return res.redirect('/admin.html');
// //   }
// //   res.send(`
// //     <form method="POST" action="/admin/login" style="max-width:320px;margin:auto;padding:30px;">
// //       <h2>Admin Login</h2>
// //       <input name="username" placeholder="Username" required style="width:100%;padding:10px;margin-bottom:12px;" />
// //       <input type="password" name="password" placeholder="Password" required style="width:100%;padding:10px;margin-bottom:12px;" />
// //       <button type="submit" style="width:100%;padding:10px;background:#4a90e2;color:white;font-weight:bold;border:none;border-radius:6px;">Login</button>
// //     </form>
// //   `);
// // });

// // // Handle login submission
// // app.post('/admin/login', async (req, res) => {
// //   const { username, password } = req.body;
// //   if (username === adminUser.username && await bcrypt.compare(password, adminUser.passwordHash)) {
// //     req.session.isAdmin = true;
// //     return res.redirect('/admin.html');
// //   } else {
// //     return res.send('<p style="color:red;text-align:center;margin-top:20px;">Invalid credentials. <a href="/admin/login">Try again</a></p>');
// //   }
// // });

// // // Admin logout
// // app.get('/admin/logout', (req, res) => {
// //   req.session.destroy(() => {
// //     res.redirect('/admin/login');
// //   });
// // });

// // // Middleware to protect admin pages
// // function ensureAdmin(req, res, next) {
// //   if (req.session.isAdmin) {
// //     next();
// //   } else {
// //     res.status(401).send('Unauthorized. Please <a href="/admin/login">login</a>.');
// //   }
// // }

// app.use(session({
//   secret: 'yourSecretKey',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Use true if HTTPS
// }));

// // Simple admin credentials
// const adminUser = {
//   username: 'admin',
//   password: 'admin123' // plain text password
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

// // Login POST handler
// app.post('/admin/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === adminUser.username && password === adminUser.password) {
//     req.session.isAdmin = true;
//     res.redirect('/admin.html');
//   } else {
//     res.send('<p style="color:red;text-align:center;margin-top:20px;">Invalid credentials. <a href="/admin/login">Try again</a></p>');
//   }
// });

// // Logout
// app.get('/admin/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/admin/login');
//   });
// });

// // // Protect admin pages
// // function ensureAdmin(req, res, next) {
// //   if (req.session.isAdmin) {
// //     next();
// //   } else {
// //     res.status(401).send('Unauthorized. Please <a href="/admin/login">login</a>.');
// //   }
// // }


// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Connect to MySQL without DB to create DB
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: ''
// });

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Connected to MySQL');

//   // Create DB if not exists
//   connection.query(`CREATE DATABASE IF NOT EXISTS foodapp`, err => {
//     if (err) throw err;
//     console.log('Database checked/created');

//     // const db = mysql.createConnection({
//     //   host: 'localhost',
//     //   user: 'root',
//     //   password: '',
//     //   database: 'foodapp'
//     // });

//     // db.connect(err => {
//     //   if (err) throw err;
//     //   console.log('Connected to foodapp database');


// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'fooddb'
// });

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Connected to MySQL!');

//       const createUsers = `
//         CREATE TABLE IF NOT EXISTS users (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100),
//           email VARCHAR(100),
//           password VARCHAR(100)
//         )`;

//       const createFoods = `
//         CREATE TABLE IF NOT EXISTS foods (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100),
//           description TEXT,
//           price DECIMAL(10,2),
//           image_url TEXT
//         )`;

//      const createOrders = `
//   CREATE TABLE IF NOT EXISTS orders (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     food_id INT,
//     customer_name VARCHAR(100),
//     phone VARCHAR(20),
//     address TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )`;


//       db.query(createUsers);
//       db.query(createFoods);
//       db.query(createOrders);

//       // Insert sample food items if table is empty
//       const checkFoods = 'SELECT COUNT(*) AS count FROM foods';
//       db.query(checkFoods, (err, results) => {
//         if (err) throw err;

//         if (results[0].count === 0) {
//           const sampleFoods = [
//             ["Pizza Margherita", "Classic Italian pizza with tomato, mozzarella and basil.", 8.99, "https://via.placeholder.com/150"],
//             ["Veg Burger", "A delicious veggie patty burger with lettuce and tomato.", 5.49, "https://via.placeholder.com/150"],
//             ["Chicken Biryani", "Spicy and aromatic chicken biryani served with raita.", 9.99, "https://via.placeholder.com/150"],
//             ["Pasta Alfredo", "Creamy Alfredo pasta topped with herbs and cheese.", 7.99, "https://via.placeholder.com/150"],
//             ["Mango Smoothie", "Refreshing mango smoothie with ice cream.", 3.49, "https://via.placeholder.com/150"]
//           ];

//           const insertFoods = 'INSERT INTO foods (name, description, price, image_url) VALUES ?';
//           db.query(insertFoods, [sampleFoods], err => {
//             if (err) throw err;
//             console.log('Sample foods inserted');
//           });
//         }
//       });

//       // Setup routes
//       setupRoutes(db);
//     });
//   });
// });

// // All routes
// function setupRoutes(db) {
//   // Register
//   app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], err => {
//       if (err) return res.status(500).send('Error registering');
//       res.redirect('/login.html');
//     });
//   });

//   // Login
//   app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
//       if (results.length > 0) {
//         res.redirect('/home.html');
//       } else {
//         res.send('Invalid credentials');
//       }
//     });
//   });

// //   // Get all foods
// //   app.get('/foods', (req, res) => {
// //     db.query('SELECT * FROM foods', (err, results) => {
// //       if (err) return res.status(500).send('Error fetching foods');
// //       res.json(results);
// //     });
// //   });

// //   // Get one food
// //   app.get('/food/:id', (req, res) => {
// //     db.query('SELECT * FROM foods WHERE id = ?', [req.params.id], (err, results) => {
// //       if (err || results.length === 0) return res.status(404).send('Not found');
// //       res.json(results[0]);
// //     });
// //   });

// //   // Place order
// //   app.post('/order', (req, res) => {
// //     const { full_name, address, city, phone, food_id } = req.body;
// //     db.query('INSERT INTO orders (food_id, name, address, city, phone) VALUES (?, ?, ?, ?, ?)',
// //       [food_id, full_name, address, city, phone],
// //       err => {
// //         if (err) return res.status(500).send('Order failed');
// //         res.sendStatus(200);
// //       });
// //   });
// // Get foods, optional search query
// app.get('/api/foods', (req, res) => {
//   const search = req.query.search || '';
//   const sql = `
//     SELECT * FROM foods
//     WHERE name LIKE ?
//     ORDER BY name
//   `;
//   db.query(sql, [`%${search}%`], (err, results) => {
//     if (err) {
//       console.error('DB error:', err);
//       return res.status(500).json([]);
//     }
//     res.json(results);
//   });
// });

// // Get single food by id
// app.get('/api/food/:id', (req, res) => {
//   const foodId = req.params.id;
//   const sql = 'SELECT * FROM foods WHERE id = ?';
//   db.query(sql, [foodId], (err, results) => {
//     if (err) {
//       console.error('DB error:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Food not found' });
//     }
//     res.json(results[0]);
//   });
// });

// app.get('/admin.html', ensureAdmin, (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });


// // Place order
// app.post('/api/orders', (req, res) => {
//   const { foodId, name, phone, address } = req.body;

//   if (!foodId || !name || !phone || !address) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const insertSql = `
//     INSERT INTO orders (food_id, customer_name, phone, address)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(insertSql, [foodId, name, phone, address], (err, result) => {
//     if (err) {
//       console.error('DB error on order insert:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.json({ message: 'Order placed successfully', orderId: result.insertId });
//   });
// });


// // Get all orders with food details for admin
// app.get('/api/admin/orders', (req, res) => {
//   const sql = `
//     SELECT orders.id, foods.name AS food_name, orders.customer_name, orders.phone, orders.address, orders.created_at
//     FROM orders
//     JOIN foods ON orders.food_id = foods.id
//     ORDER BY orders.created_at DESC
//   `;
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('DB error fetching orders:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.json(results);
//   });
// });

// app.get('/', (req, res) => {
//   res.redirect('/login.html'); // or '/index.html' if you prefer
// });

// //   app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
// app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port http://0.0.0.0:${PORT}`));

// }


const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup sessions
app.use(session({
  secret: 'yourSecretKey', // change this secret for production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if HTTPS
}));

// Serve static files from /public folder (html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// Helper middleware to protect routes that need admin or login
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).send('Unauthorized! Please login first.');
}

// Initial connection to create database if not exists
const initialConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '' // put your MySQL root password here
});

initialConnection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');

  initialConnection.query('CREATE DATABASE IF NOT EXISTS fooddb', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      process.exit(1);
    }
    console.log('Database "fooddb" ensured.');

    initialConnection.end();

    // Now connect to fooddb database
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',  // your MySQL password
      database: 'fooddb'
    });

    db.connect(err => {
      if (err) {
        console.error('Error connecting to fooddb:', err);
        process.exit(1);
      }
      console.log('Connected to fooddb database');

      // Create tables if they don't exist
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        )`;

      const createFoodsTable = `
        CREATE TABLE IF NOT EXISTS foods (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT
        )`;

      const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          food_id INT NOT NULL,
          customer_name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          address TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (food_id) REFERENCES foods(id)
        )`;

      db.query(createUsersTable, err => {
        if (err) throw err;
        db.query(createFoodsTable, err => {
          if (err) throw err;
          db.query(createOrdersTable, err => {
            if (err) throw err;

            // Insert sample foods if none exist
            db.query('SELECT COUNT(*) AS count FROM foods', (err, results) => {
              if (err) throw err;
              if (results[0].count === 0) {
                const sampleFoods = [
                  ['Pizza Margherita', 'Classic Italian pizza with tomato, mozzarella and basil.', 8.99, 'https://via.placeholder.com/150'],
                  ['Veg Burger', 'Delicious veggie burger with fresh lettuce and tomato.', 5.49, 'https://via.placeholder.com/150'],
                  ['Chicken Biryani', 'Spicy chicken biryani served with raita.', 9.99, 'https://via.placeholder.com/150'],
                  ['Pasta Alfredo', 'Creamy Alfredo pasta topped with cheese.', 7.99, 'https://via.placeholder.com/150'],
                  ['Mango Smoothie', 'Refreshing mango smoothie with ice cream.', 3.49, 'https://via.placeholder.com/150']
                ];
                db.query('INSERT INTO foods (name, description, price, image_url) VALUES ?', [sampleFoods], err => {
                  if (err) throw err;
                  console.log('Sample foods inserted.');
                });
              }
            });

            // Start server and setup routes now that DB is ready
            setupRoutes(db);

            app.listen(PORT, () => {
              console.log(`Server is running on http://localhost:${PORT}`);
            });
          });
        });
      });
    });
  });
});

function setupRoutes(db) {
  // Register user
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Please fill all required fields.');
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Email already registered.');
          }
          return res.status(500).send('Database error during registration.');
        }
        res.redirect('/login.html');
      });
    } catch {
      res.status(500).send('Server error during registration.');
    }
  });

  // Login user
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Please enter email and password.');
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).send('Database error.');
      if (results.length === 0) return res.status(401).send('Invalid email or password.');

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.redirect('/home.html');
      } else {
        res.status(401).send('Invalid email or password.');
      }
    });
  });

  // Logout user
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login.html');
    });
  });

  // Place an order (requires login)
  app.post('/order', ensureLoggedIn, (req, res) => {
    const { foodId, name, phone, address } = req.body;
    if (!foodId || !name || !phone || !address) {
      return res.status(400).send('Please provide all order details.');
    }
    const sql = 'INSERT INTO orders (food_id, customer_name, phone, address) VALUES (?, ?, ?, ?)';
    db.query(sql, [foodId, name, phone, address], (err) => {
      if (err) return res.status(500).send('Failed to place order.');
      res.send('Order placed successfully!');
    });
  });

  // Get all foods - API
  app.get('/api/foods', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    });
  });
}
