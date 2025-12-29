const User = require('../model/User');
const {hashPassword, comparePassword, generateToken} = require('../util/authUtils');

exports.registerUser = async ({name, email, password}) => {
    const existingUser = await User.findOne({email});
    if(existingUser){
       throw new Error('Email đã tồn tại'); 
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    return {message: 'Đăng ký thành công'};
};

exports.loginUser = async ({ email, password }) => {
    // Tìm user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Email không tồn tại');
    }

    // Kiểm tra mật khẩu
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Sai mật khẩu');
    }

    // Tạo token JWT
    const token = generateToken({ id: user.id, name: user.name, email: user.email });

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email }
    };
};


// Google OAuth: xác thực idToken
exports.loginWithGoogle = async (idToken) => {
  const googleUser = await verifyGoogleToken(idToken);

  if (!googleUser.email_verified) {
    throw new Error('Email Google chưa được xác thực');
  }

  let user = await User.findOne({ email: googleUser.email });
  if (!user) {
    user = new User({
      name: googleUser.name,
      email: googleUser.email,
      password: '', // không cần mật khẩu
    });
    await user.save();

    const newUserInf = new UserInf({
      _id: user._id,
      FullName: googleUser.name,
      PhoneNumber: '',
      Gender: '',
      Address: ''
    });
    await newUserInf.save();
  }

  const token = generateToken({ id: user._id, name: user.name, email: user.email });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};
