require("dotenv").config();
const express = require("express");
const middlewareLogRequest = require("./middleware/logs");
const cors = require("cors");
const upload = require("./middleware/multer");
const bodyParser = require('body-parser');

// Routers
const categoryPageRoutes = require('./routes/categoryPageRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const highlightProductRoutes = require('./routes/highlightProductRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const productRoutes = require('./routes/productRoutes');
const newsRoutes = require('./routes/newsRoutes');
const aboutUsYtEmbedRoutes = require('./routes/aboutUsYtEmbedRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const jobRoutes = require('./routes/jobRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(middlewareLogRequest);
app.use(express.json());

// example access : http://localhost:4000/assets/1716133623281-Logo_Waresix.png
// API Upload
app.use("/assets", express.static("public/assets"));
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "Upload berhasil",
    fileName: req.file.filename,
    fileUrl: req.file.path.replace("public", ""),
  });
});

// Apis
app.use('/categoryPage', categoryPageRoutes);
app.use('/banner', bannerRoutes);
app.use('/highlightProduct', highlightProductRoutes);
app.use('/productCategory', productCategoryRoutes);
app.use('/marketplace', marketplaceRoutes);
app.use('/product', productRoutes);
app.use('/news', newsRoutes);
app.use('/aboutUsYtEmbed', aboutUsYtEmbedRoutes);
app.use('/aboutUs', aboutUsRoutes);
app.use('/event', eventRoutes);
app.use('/job', jobRoutes);


// Eror handling
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});
