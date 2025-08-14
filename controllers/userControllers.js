const bcrypt = require('bcrypt');
const User = require('../model/User');


//creating a new user account
exports.createUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized: Only admins can create users' });
        }
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({ message: 'Missing required fields' });
        }
        const exstingUser = await User.findOne({ email });
        if (exstingUser) return res.status(401).json({ message: 'Email already registered' });
        const hashedPassword = await bcrypt.hash(hashedPassword, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ success:true, message: 'User created successfully' });
    } catch (err) {
        console.error('creating user error', err);
        res.status(500).json({success:false,  error: 'creating user failed' , error:err.message});
    }
}


//Get a user by ID 
exports.getUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only view your own profile' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({success:false,  message: 'User not found' });
        }
        res.status(200).json({ sucess:true, message:'User retrived successfully',data: {user} });
    } catch (err) {
        console.error('getting user error', err);
        res.status(500).json({success:false,message:'getting user failed' ,message: 'getting user is failed' , error:err.message});
    }
}

//update a users profile
exports.updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only update your own profile' });
        }
        const { password, ...updateData } = req.params;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true , runValidators:true});
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        res.status(200).json({ success:true,message:'user updated successfully',data: {user} });
    } catch (err) {
        console.error('updating user error', err);
        res.status(500).json({success:false, message: 'updating user failed', error:err.message });
    }
}

//Delete a user account
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only delete your own profile' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ message:'user deleted successfully',user: user });
    } catch (err) {
        console.error('deleting user error', err);
        res.status(500).json({ success:false, message: 'deleting user failed', error:err.message });
    }
}

//get A list of all users

exports.getAllUsers = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({
            success: false,
            message: "Unauthorized: Only admins can view all users",
          });
      }
      const users = await User.find();
      res
        .status(200)
        .json({
          success: true,
          message: "Users retrieved successfully",
          data: { users },
        });
    } catch (err) {

      console.error("Getting all users error:", err);
      res
        .status(500)
        .json({
          success: false,
          message: "Getting all users failed",
          error: err.message,
        });
    }
}