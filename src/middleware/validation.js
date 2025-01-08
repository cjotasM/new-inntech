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
            const voter = await Voter.findByEmail(email);
            if (voter) {
                throw new Error('Email already registered');
            }
            return true;
        }),
];

const candidateValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('party').optional().trim(),
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