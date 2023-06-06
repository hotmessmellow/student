const userSchema = {
  title: "Register ",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Full Name",
      minLength: 3,

    },
    email: {
      type: "string",
      title: "Email",
      format: "email",

    },
    walletAddress: {
      type: "string",
      title: "Wallet Address",
    
    },
    phoneNumber: {
      type: "string",
      title: "Phone Number",
      minLength: 10,
      maxLength: 15,
      
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8,

    },

    college: {
      type: "string",
      title: "College",

    },
    major: {
      type: "string",
      title: "Major",
 
    },
    class: {
      type: "string",
      title: "Class/Year",

    },
    role: {
      type: "string",
      title: "Role",
      enum: ["Student"],
      enumNames: ["Student"],

    },
  },
};

const loginSchema = {
  title: "Login",
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "Email",
      minLength: 5,
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8,
    },
  },
};

module.exports = {
  userSchema,
  loginSchema,
};
