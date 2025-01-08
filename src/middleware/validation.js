const { body, validationResult } = require('express-validator');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const voterValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async (email) => {
            // Verificar si existe como votante
            const voter = await Voter.findByEmail(email);
            if (voter) {
                throw new Error('Email already registered as a voter');
            }

            // Verificar si existe como candidato
            const candidate = await Candidate.findByEmail(email);
            if (candidate) {
                throw new Error('This email belongs to a candidate and cannot be registered as a voter');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

const candidateValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('party').trim().notEmpty().withMessage('Party is required'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async (email) => {
            // Verificar si existe como candidato
            const candidate = await Candidate.findByEmail(email);
            if (candidate) {
                throw new Error('Email already registered as a candidate');
            }

            // Verificar si existe como votante
            const voter = await Voter.findByEmail(email);
            if (voter) {
                throw new Error('This email belongs to a voter and cannot be registered as a candidate');
            }
            return true;
        }),
];

const voteValidationRules = [
    body('voter_id')
        .isInt()
        .withMessage('Valid voter ID is required')
        .custom(async (voterId) => {
            const voter = await Voter.findById(voterId);
            if (!voter) {
                throw new Error('Voter not found');
            }
            const hasVoted = voter.has_voted;
            if (hasVoted) {
                throw new Error('Voter has already voted');
            }
            return true;
        }),
    body('candidate_id')
        .isInt()
        .withMessage('Valid candidate ID is required')
        .custom(async (candidateId) => {
            const candidate = await Candidate.findById(candidateId);
            if (!candidate) {
                throw new Error('Candidate not found');
            }
            return true;
        }),
];

module.exports = {
    handleValidationErrors,
    voterValidationRules,
    candidateValidationRules,
    voteValidationRules,
};