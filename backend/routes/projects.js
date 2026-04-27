const { Router } = require('express');
const Store = require('../lib/store');
const { prjId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');

const projects = new Store('projects.json');

const router = Router();
router.use(requireAuth);

// GET /projects — list projects where user is in team
router.get('/', asyncHandler((req, res) => {
  const userProjects = projects
    .readAll()
    .filter((p) => p.team.includes(req.user.id));

  res.json(userProjects);
}));

// POST /projects — create project
router.post('/', asyncHandler((req, res) => {
  const { title, status, description, team, icon } = req.body;

  console.log(req.body);
  

  if (!title) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Title is required');
  }

  const validStatuses = ['active', 'archived', 'draft'];
  if (status && !validStatuses.includes(status)) {
    throw new AppError(400, 'VALIDATION_ERROR', `Status must be one of: ${validStatuses.join(', ')}`);
  }

  const now = new Date().toISOString();
  const project = {
    id: prjId(),
    title,
    status: status || 'draft',
    description: description || null,
    team: Array.isArray(team) ? [...new Set([req.user.id, ...team])] : [req.user.id],
    icon: icon || null,
    createdAt: now,
    updatedAt: now,
  };

  projects.insert(project);
  res.status(201).json(project);
}));

// GET /projects/:id — get project by ID
router.get('/:id', asyncHandler((req, res) => {
  const project = projects.findById(req.params.id);
  if (!project) {
    throw new AppError(404, 'NOT_FOUND', 'Project not found');
  }
  if (!project.team.includes(req.user.id)) {
    throw new AppError(403, 'FORBIDDEN', 'You are not a member of this project');
  }

  res.json(project);
}));

// PATCH /projects/:id — update project
router.patch('/:id', asyncHandler((req, res) => {
  const project = projects.findById(req.params.id);
  if (!project) {
    throw new AppError(404, 'NOT_FOUND', 'Project not found');
  }
  if (!project.team.includes(req.user.id)) {
    throw new AppError(403, 'FORBIDDEN', 'You are not a member of this project');
  }

  const { title, status, description, team, icon } = req.body;
  const updates = { updatedAt: new Date().toISOString() };

  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (icon !== undefined) updates.icon = icon;

  if (status !== undefined) {
    const validStatuses = ['active', 'archived', 'draft'];
    if (!validStatuses.includes(status)) {
      throw new AppError(400, 'VALIDATION_ERROR', `Status must be one of: ${validStatuses.join(', ')}`);
    }
    updates.status = status;
  }

  if (team !== undefined) {
    if (!Array.isArray(team)) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Team must be an array of user IDs');
    }
    updates.team = [...new Set(team)];
  }

  const updated = projects.update(req.params.id, updates);
  res.json(updated);
}));

// DELETE /projects/:id — delete project
router.delete('/:id', asyncHandler((req, res) => {
  const project = projects.findById(req.params.id);
  if (!project) {
    throw new AppError(404, 'NOT_FOUND', 'Project not found');
  }
  if (!project.team.includes(req.user.id)) {
    throw new AppError(403, 'FORBIDDEN', 'You are not a member of this project');
  }

  projects.remove(req.params.id);
  res.status(204).end();
}));

module.exports = router;
