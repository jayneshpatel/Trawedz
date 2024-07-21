const Resort = require('../models/resort'); // Adjust this path if necessary

exports.addResort = async (req, res) => {
  try {
    const { name, location, description, facilities, category } = req.body;

    // Create new resort
    const newResort = new Resort({
      name,
      location,
      description,
      facilities,
      category
    });

    // Save the resort
    await newResort.save();

    res.status(201).json({ message: 'Resort added successfully', resort: newResort });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
