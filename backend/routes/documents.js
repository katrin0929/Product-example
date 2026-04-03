const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Store = require('../lib/store');
const { docId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');
const config = require('../config');

const documents = new Store('documents.json');

const docStorage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads', 'documents'),
  filename: (req, file, cb) => {
    const id = docId();
    req.generatedDocId = id;
    cb(null, `${id}_${file.originalname}`);
  },
});
const uploadDoc = multer({
  storage: docStorage,
  limits: { fileSize: config.UPLOAD_MAX_SIZE },
});

const router = Router();
router.use(requireAuth);

// GET /me/documents
router.get('/', asyncHandler((req, res) => {
  const docs = documents.filterBy('userId', req.user.id);
  res.json(docs.map(({ userId, filePath, ...d }) => d));
}));

// POST /me/documents
router.post('/', uploadDoc.single('file'), asyncHandler((req, res) => {
  if (!req.file) throw new AppError(400, 'VALIDATION_ERROR', 'File is required');

  const doc = {
    id: req.generatedDocId,
    userId: req.user.id,
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    createdAt: new Date().toISOString(),
    filePath: req.file.path,
  };

  documents.insert(doc);

  const { userId, filePath, ...publicDoc } = doc;
  res.status(201).json(publicDoc);
}));

// GET /me/documents/:documentId
router.get('/:documentId', asyncHandler((req, res) => {
  const doc = documents.findById(req.params.documentId);
  if (!doc || doc.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Document not found');
  }

  res.download(doc.filePath, doc.fileName);
}));

// DELETE /me/documents/:documentId
router.delete('/:documentId', asyncHandler((req, res) => {
  const doc = documents.findById(req.params.documentId);
  if (!doc || doc.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Document not found');
  }

  // Delete file from disk
  try {
    fs.unlinkSync(doc.filePath);
  } catch {
    // File might already be deleted
  }

  documents.remove(doc.id);
  res.status(204).end();
}));

module.exports = router;
