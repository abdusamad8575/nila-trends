const Product = require('../models/product');
const Category = require('../models/category')

// const getProducts = async (req, res) => {
//   try {
//     const data = await Product.find().sort({ createdAt: -1 })
//     res.status(200).json({ data })
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error?.message ?? "Something went wrong !" });
//   }
// };

const getProducts = async (req, res) => {
  try {
    const { page = 1, perPage = 9, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 },
      populate: 'category',
    };

    const products = await Product.paginate(query, options)

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


const getAdminProducts = async (req, res) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const products = await Product.paginate(query, options);


    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};


const getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id }).populate('category').populate('similarProduct')
    res.status(200).json({ data, message: 'product found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}
const getClientProductById = async (req, res) => {
  console.log('getClientProductById');
  const id = req.params.id
  console.log('getClientProductById id',id);
  
  try {
    const product = await Product.findById(id).populate('category').populate('similarProduct');
    console.log('product',product);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
}

const addProduct = async (req, res) => {
  try {
    console.log(req.files);
    const { name, subheading, category, brand, price, stock, discount, material, sale_rate, description, feature, spec, sizes, sizeQuantity, fitAndCare, similarProduct } = req?.body


    const sizesArray = Array.isArray(sizes) ? sizes : [sizes];
    const similarProductArray = Array.isArray(similarProduct) ? similarProduct : [similarProduct];

    const quantityArray = Array.isArray(sizeQuantity) ? sizeQuantity : [sizeQuantity];

    const sizesInside = sizesArray.map((sizes, index) => ({
      sizes,
      quantity: quantityArray[index]
    }));
    const sizeValue = sizesInside[0]?.sizes ? sizesInside : undefined;
    if (req.files.length != 0) {
      const product = new Product({
        name, subheading, category, brand, price, stock, discount, material, sale_rate, description, fitAndCare, feature, spec, sizes: sizeValue, similarProduct,
        image: req.files.map((x) => x.filename),
      });
      await product.save();

      if (similarProductArray.length>0) {
        
        similarProductArray?.forEach(proId => {
           const updateFunction = async() =>{
            const updateProduct =  await Product.updateOne({ _id: proId }, { $push: { similarProduct: product._id} })
          }
          updateFunction()
        });
      }
      if (product) {
        await Category.updateOne({ _id: category }, { $push: { products: product._id } })
        res.status(200).json({ message: "Product added successfully !" });

      } else {
        res.status(400).json({ message: "Something went wrong !" });
      }
    } else {
      res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id, name, subheading, brand, price, stock, discount, material, sale_rate, description, image, isAvailable, fitAndCare, feature, spec, sizes, sizeQuantity,similarProduct } = req?.body

    const sizesArray = Array.isArray(sizes) ? sizes : [sizes];
    const similarProductArray = Array.isArray(similarProduct) ? similarProduct : [similarProduct];
    const quantityArray = Array.isArray(sizeQuantity) ? sizeQuantity : [sizeQuantity];

    const sizesInside = sizesArray.map((sizes, index) => ({
      sizes,
      quantity: quantityArray[index]
    }));
    const sizeValue = sizesInside[0]?.sizes ? sizesInside : undefined;

    const images = JSON.parse(image) ?? []
    if (req?.files?.length != 0) {
      req?.files?.map((x) => images.push(x.filename))
    }
    if (similarProductArray?.length > 0) {
      const product = await Product.findById(_id);
      
      similarProductArray?.forEach(proId => {
        const updateFunction = async() =>{
          
          if (!product.similarProduct.includes(proId)) {
            
         const updateProduct =  await Product.updateOne({ _id: proId }, { $push: { similarProduct: _id} })
          }
       }
       
       updateFunction()
     });
   }
    await Product.updateOne({ _id }, {
      $set: { name, subheading, brand, price, stock, discount, material, sale_rate, description, isAvailable, fitAndCare, feature, spec, sizes: sizeValue, image: images,similarProduct }
    })
    
    res.status(200).json({ message: "Product updated successfully !" });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const getTagProducts = async (req, res) => {
  try {
    const data = await Product.find({ isAvailable: true }).sort({ createdAt: -1 })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};
const getSimilrProducts = async (req, res) => {
  try {
    const data = await Product.find({ isAvailable: true }).sort({ createdAt: -1 }).populate('similarProduct')
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};


module.exports = {
  getProducts,
  getProductById,
  getClientProductById,
  updateProduct,
  addProduct,
  deleteProduct,
  getAdminProducts,
  getTagProducts,
  getSimilrProducts

}  