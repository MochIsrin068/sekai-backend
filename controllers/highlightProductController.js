const highlightProductModel = require('../models/highlightProduct');
const {deleteFiles} = require('../helper/deleteAsset')

const getAllHighlightProducts = async (req, res) => {
  try {
    const [data] = await highlightProductModel.getAllHighlightProducts();
    res.json({
      message: "GET all highlight products success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getHighlightProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await highlightProductModel.getHighlightProductById(id);
    res.json({
      message: "GET detail highlight product success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createHighlightProduct = async (req, res) => {
  const { title, description, sectionNumber, contents } = req.body;
  const isContentEmpty = !contents || contents?.length === 0;

  if (!title || !description || !sectionNumber || isContentEmpty) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    const [dataSection] = await highlightProductModel.createHighlightProductSection(title, description, sectionNumber);

    if (
      !dataSection ||
      dataSection.length === 0 ||
      dataSection?.affectedRows === 0
    ) {
      return res.status(500).json({
        message: "Failed Add Hightlight",
        serverMessage: null,
      });
    }

    let isContentCreated = false;
    if (!isContentEmpty) {
      const placeholders = contents.map(() => "(?, ?, ?)").join(", ");
      const values = contents.reduce((acc, curr) => {
        acc.push(curr.image, curr.link, dataSection?.insertId);
        return acc;
      }, []);
      const [dataContents] = await highlightProductModel.createHighlightProduct(
        placeholders,
        values
      );
      if (dataContents?.affectedRows > 0) {
        isContentCreated = true;
      }
    }

    if (!isContentCreated) {
      return res.status(500).json({
        message: "Failed Add Hightlight",
        serverMessage: null,
      });
    }

    res.status(201).json({
      message: "CREATE new hightlight product success",
      data: { title, description, sectionNumber, contents },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateHighlightProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, sectionNumber, contents } = req.body;

  const isContentEmpty = !contents || contents?.length === 0;

  if (!title || !description || !sectionNumber || isContentEmpty) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await highlightProductModel.updateHighlightProductSection(id, title, description, sectionNumber);

    // Delete existing product contents
    await highlightProductModel.deleteHighlightProduct(id);
    // Insert new product contents
    if (contents && contents.length > 0) {
      const placeholders = contents.map(() => "(?, ?, ?)").join(", ");
      const values = contents.reduce((acc, curr) => {
        acc.push(curr.image, curr.link, id);
        return acc;
      }, []);
      await highlightProductModel.updateHighlightProduct(placeholders, values);
    }

    res.json({
      message: "UPDATE highlight product success",
      data: {
        isSuccess: true
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};


const deleteHighlightProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [highlightSectionData] = await highlightProductModel.getHighlightProductById(id)
    const highlightProductImages = highlightSectionData?.[0]?.highlight_products?.map((item) => item?.image)

    const isDeleted = await highlightProductModel.deleteHighlightProductSection(id);

    if (isDeleted) {
      if(highlightProductImages && highlightProductImages?.length > 0){
        await deleteFiles(highlightProductImages);
      }
      res.json({
        message: "DELETE highlight product success",
        data: null,
      });
    } else {
      res.status(500).json({
        message: "Failed to delete highlight product",
        serverMessage: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllHighlightProducts,
  createHighlightProduct,
  updateHighlightProduct,
  deleteHighlightProduct,
  getHighlightProductDetail
};
