const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Optionally, you can configure CORS for specific origins:
// app.use(cors({ origin: 'http://localhost:3000' }));

// Example admin routes (replace with your actual routes)
app.get('/admin/getAllBuses', (req, res) => {
  // Fetch all buses (dummy data for illustration)
  res.json([{ id: 1, busName: 'Bus 1', busNumber: '123', capacity: 50 }]);
});

app.put('/admin/updateBus/:id', (req, res) => {
  const { id } = req.params;
  const updatedBus = req.body;

  // Mock updating a bus in your database
  res.json({ message: `Bus with ID ${id} updated`, bus: updatedBus });
});

// Start the server
app.listen(3500, () => {
  console.log('Server running on http://3.95.0.143:3500');
});
