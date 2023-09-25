const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');


const createUser= async (req,res)=>{
    try {
        const data = req.body;

        const user = await userModel.create(data);
        return res.status(201).json({ message: 'User created successfully', user });
}
catch(error){
    res.status(500).json({ message: error.message });
}
};

const LoginUser = async (req,res) => {
    try {
        const {user_email,user_password} = req.body

        if(!user_email||!user_password) {
        return res.status(400).send({status : false , message : "Enter valid credentials "})}
        
        const user = await userModel.findOne($and [{user_email: user_email},{user_password:user_password}])

        if(!user){ 
        return res.status(400).send({status : false , message : "User not found"})}


//=========================TOKEN GENERATION====================

        const token = jwt.sign({userId : user._id} , "thisismysecretkey" , {expiresIn : "24h"})
        if(!token) {
        return res.status(400).send({status : false , message : "Invalid token"})}

        return res.status(200).send({status : true  , message : "User login successfull", 
        data : {userId : user._id , token : token}
        })
    } catch(error) {
        res.status(500).send({status : false , message : error.message})
    }
}


const findDetails= async (req,res)=>{
try {
    const { user_id } = req.query;

    const userDetails = await userModel.findOne({_id: user_id });

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({UserDetails : userDetails});
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const UpdateUser = async (req,res)=> {

try {
    const { user_id } = req.body;
    const data = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required in the request body' });
    }

    let user = await userModel.findOne({ _id: user_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedData = await userModel.findOneAndUpdate({ _id: user_id }, data, { new: true });
    return res.status(200).json({ message: "User updated successfully", data: updatedData });

}
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const findImage = async (req,res)=>{
    try {
        const { user_id } = req.query;

        if (!user_id) {
          return res.status(400).json({ message: 'user_id is required as a query parameter' });
        }
    
        const user = await userModel.findOne({ _id: user_id });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (!user.user_image) {
          return res.status(404).json({ message: 'User does not have an image' });
        }
    
        res.status(200).json({ user_image_link: user.user_image });

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteUser = async (req,res)=>{
    try {
        const { user_id } = req.params;

        if (!user_id) {
          return res.status(400).json({ message: 'user_id is required for deleteing user' });
        }
        const user = await userModel.findOne({ _id: user_id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const deletedUser = await userModel.findOneAndRemove({ _id: user_id });
        return res.status(200).json({ message: 'User deleted successfully' });

      } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }    
}

module.exports = {
    createUser,
    LoginUser,
    findDetails,
    UpdateUser,
    findImage,
    deleteUser
}