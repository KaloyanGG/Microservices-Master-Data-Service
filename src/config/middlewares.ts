import express, { Express } from 'express';

export function setupMiddlewares(app: Express) {
    app.use(express.json()); // Add this middleware to parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Add this middleware to parse URL-encoded bodies
}