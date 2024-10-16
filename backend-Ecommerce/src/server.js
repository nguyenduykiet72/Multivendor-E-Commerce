const app = require("./app");
const port = process.env.PORT;
const socket = require("socket.io");
const http = require("http");
const serverIO = http.createServer(app);

const io = socket(serverIO, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    credentials: true,
  },
});

var allCustomer = [];
var allSeller = [];
let admin = {};

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((user) => user.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({ customerId, socketId, userInfo });
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((user) => user.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({ sellerId, socketId, userInfo });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((s) => s.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((s) => s.socketId !== socketId);
};

io.on("connection", (soc) => {
  console.log("Socket Server Is Running...");
  // add customer
  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit("active_seller", allSeller);
  });
  // add seller
  soc.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, soc.id, userInfo);
    io.emit("active_seller", allSeller);
  });
  // add admin
  soc.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    delete adminInfo.password;
    admin = adminInfo;
    admin.socketId = soc.id;
    io.emit("active_seller", allSeller);
  });

  //gui message tu phia seller
  soc.on("send_seller_message", (msg) => {
    const customer = findCustomer(msg.receiverId);
    if (customer !== undefined) {
      soc.to(customer.socketId).emit("seller_message", msg);
    }
  });
  // gui message tu phia customer
  soc.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("customer_message", msg);
    }
  });
  // gui message tu phia admin cho seller
  soc.on("send_message_admin_to_seller", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("received_admin_message", msg);
    }
  });
  //gui message tu phia seller cho admin
  soc.on("send_message_seller_to_admin", (msg) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit("received_seller_message", msg);
    }
  });

  soc.on("disconnect", () => {
    console.log("User disconnected");
    remove(soc.id);
    io.emit("active_seller", allSeller);
  });
});

const server = serverIO.listen(port, () => {
  console.log(`Serving at port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server has been closed");
  });
});
