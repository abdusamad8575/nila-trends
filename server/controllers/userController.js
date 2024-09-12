const User = require('../models/user')
const Product = require('../models/product');

// const getUsers = async (req, res) => {
//   try {
//     const data = await User.find()
//     res.status(200).json({ data })
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
//   }
// };
const  getUsers = async (req, res) => {
  console.log('getUsers');    
  
  try {
    const { page = 1, perPage = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    const query = search ? { username: { $regex: search, $options: 'i' } } : {};

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const data = await User.paginate(query, options);
    // console.log('data1-',data);
    
    

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getUser = async (req, res) => {
  
  try {
    const { _id } = req?.decoded
    const data = await User.find({ _id })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const updateQty = async (req, res) => {
  try {   
    const { _id } = req?.decoded
    const { qty, productId,size} = req?.body
    
    const userData = await User.findById({ _id })
    await userData.updateCart( productId, qty ,size)
    res.status(201).json({ message: 'Quantity updated to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const addToCart = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const { size } = req.body
    console.log('new size',size);
    
    const productId = req?.params?.id
    const userData =await User.findById({ _id })
    const productData =await Product.findById({ _id:productId })
    await userData.addToCart(productData,size)
    res.status(201).json({userData, message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromCart = async (req, res) => {
  try {
   const { _id } = req?.decoded
    const productId = req?.params?.id 
    const {size} = req.body
    
    const userData = await User.findById({ _id })
    
    await userData.removefromCart(productId,size)

    res.status(201).json({userData,message: 'Product removed from cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const addToWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const productId = req?.params?.id
    const userData = await User.findById({ _id })
    const productData = await Product.findById({ _id:productId })
    userData.addToWishlist(productData)
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const productId = req?.params?.id
    const userData = await User.findById({ _id })
    userData.removefromWishlist(productId)
    res.status(201).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const getCartDetailsByUserId = async (req, res) => {
  const { _id } = req?.decoded

  if (_id) {
    try {
      const cart = await User.getCartWithProductsByUserId(_id);

      if (cart) {
          return res.status(200).json({ data:cart });
      } else {
          return res.status(404).json({data:[] });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }

  }else{

    return res.status(404).json({ data: [] });
  }


}

const updateUserProfile = async (req, res) => {  
  try {
      const { _id } = req.decoded;
      console.log('user1.id',_id);
      
      const { name, email, phone } = req.body;
      

      const updatedUser = await User.findByIdAndUpdate(_id, {
          username:name,
          email,
          phone,
      }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }   

      res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
  } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateUserStatus = async (req, res) => {
  console.log('updateUserStatus');
  
  const { userId, newStatus } = req.body;
  console.log(userId, newStatus);
  
  try {
    const order = await User.findById(userId);
    if (!order) {
      return res.status(404).json({ message: 'user not found' });
    }
    if(newStatus){
      order.is_verified = !order?.is_verified;
    }

    
    await order.save();

    res.status(200).json({ message: 'user status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};


module.exports = {
    getUser,
    getUsers,
    updateQty,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    updateUserProfile,
    getCartDetailsByUserId,
    updateUserStatus
    
  }