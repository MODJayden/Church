const Member = require("../model/member");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      password,
      role,
      occupation,
      confirmPassword,
    } = req.body;
    if (!name || !email || !phone || !location || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingMember = await Member.findOne({ or: [{ email }, { phone }] });
    if (existingMember) {
      return res.status(400).json({ message: "Member already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new Member({
      name,
      email,
      phone,
      location,
      occupation,
      role,
      password: hashedPassword,
    });
    await newMember.save();
    res.status(201).json({
      message: "Member created successfully",
      success: true,
      data: newMember,
    });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, member.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        email: member.email,
        role: member.role,
        name: member.name,
        phone: member.phone,
        location: member.location,
        occupation: member.occupation,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      data: {
        id: member._id,
        email: member.email,
        role: member.role,
        name: member.name,
        phone: member.phone,
        location: member.location,
        occupation: member.occupation,
      },
    });
  } catch (error) {
    console.error("Error logging in member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMember = async (req, res) => {
  try {
    const member = await Member.find();
    res.status(200).json({
      message: "Member fetched successfully",
      success: true,
      data: member,
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createMember, loginMember, getMember };
