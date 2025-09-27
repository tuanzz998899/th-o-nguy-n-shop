// Đây là backend mẫu Node.js (Express) cho shop của bạn
// File: server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Bộ nhớ tạm để lưu đơn hàng (khi restart sẽ mất)
let orders = [];

// Route test
app.get('/', (req, res) => {
  res.send('Backend đang chạy!');
});

// Nhận đơn hàng từ frontend
app.post('/orders', (req, res) => {
  const order = req.body;
  if (!order || !order.customer || !order.items) {
    return res.status(400).json({ error: 'Dữ liệu đơn hàng không hợp lệ' });
  }
  orders.push(order);
  console.log('Đơn hàng mới:', order);
  res.json({ message: 'Đặt hàng thành công!', order });
});

// Xem tất cả đơn hàng
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
