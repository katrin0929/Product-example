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

// 'general' — страница Documents, 'identity' — секция на Profile.
// Старые записи без поля category считаются 'general'.
const CATEGORIES = ['general', 'identity'];
const DEFAULT_CATEGORY = 'general';

function normalizeCategory(value) {
  return CATEGORIES.includes(value) ? value : DEFAULT_CATEGORY;
}

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

// GET /me/documents?category=general|identity
router.get('/', asyncHandler((req, res) => {
  let docs = documents.filterBy('userId', req.user.id);
  if (req.query.category !== undefined) {
    const category = normalizeCategory(req.query.category);
    docs = docs.filter((d) => (d.category || DEFAULT_CATEGORY) === category);
  }
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
    category: normalizeCategory(req.body.category),
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

// Удаляет все документы пользователя: и записи, и файлы с диска.
// Используется при каскадном удалении аккаунта (DELETE /me).
function removeUserDocuments(userId) {
  const userDocs = documents.filterBy('userId', userId);

  for (const doc of userDocs) {
    try {
      fs.unlinkSync(doc.filePath);
    } catch {
      // File might already be deleted
    }
  }

  const rest = documents.readAll().filter((d) => d.userId !== userId);
  documents.writeAll(rest);
}

module.exports = { router, removeUserDocuments };
