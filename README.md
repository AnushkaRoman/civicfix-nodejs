# CivicFix

## Smart Civic Issue Reporting & Verification System

CivicFix is a Node.js and Express-based web application designed to demonstrate server-side validation and RESTful request handling through a real-world civic infrastructure reporting scenario.

## Problem

Citizens frequently encounter civic infrastructure issues such as potholes, broken streetlights, garbage accumulation, water leakage and damaged footpaths.

CivicFix provides a structured system for reporting and monitoring these issues.

## Technologies

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- JSON-based storage
- REST API

## Features

- Civic issue reporting
- Server-side validation
- Business-rule validation
- REST API
- Automatic priority calculation
- Complaint status workflow
- Dashboard statistics
- Error handling
- Modular project architecture

## Server-side Validation

The server validates:

- Name
- Email
- Issue category
- Location
- Severity
- Description
- Date

Critical issues additionally require a detailed description.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports/:id` | Get a report |
| POST | `/api/reports` | Create report |
| PATCH | `/api/reports/:id/status` | Update status |
| GET | `/api/admin/stats` | Dashboard statistics |

## Running the Project

Install dependencies:

```bash
npm install