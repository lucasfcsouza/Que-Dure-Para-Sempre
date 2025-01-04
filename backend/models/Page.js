const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  coupleName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  photos: [{
    url: String,
    order: Number
  }],
  music: {
    url: String,
    name: String
  },
  theme: {
    type: String,
    default: 'default'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'disabled'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

pageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Método para gerar slug único
pageSchema.statics.generateUniqueSlug = async function(coupleName) {
  const slug = coupleName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
    
  const existingPage = await this.findOne({ slug });
  if (!existingPage) return slug;
  
  let counter = 1;
  while (true) {
    const newSlug = `${slug}_${counter}`;
    const existingPageWithCounter = await this.findOne({ slug: newSlug });
    if (!existingPageWithCounter) return newSlug;
    counter++;
  }
};

module.exports = mongoose.model('Page', pageSchema);
