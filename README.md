# Document Registration API

A Node.js Express application that handles document registration and file downloading.

## Features

- **POST /register-document**: Registers a document by downloading it from a URL and organizing it in a structured folder system
- Automatic folder creation for document organization
- File download with error handling
- Input validation and sanitization

## Installation

The application uses the existing dependencies from the project. All required packages are already included in `package.json`.

## Usage

### Starting the Server

```bash
# Using npm script
npm run server

# Or directly with node
node server.js
```

The server will start on port 3000 by default, or you can set the `PORT` environment variable.

### API Endpoints

#### POST /register-document

Registers a document by downloading it from a URL and organizing it in folders.

**Request Body:**
```json
{
  "document_url": "https://example.com/document.pdf",
  "document_name": "my-document"
}
```

**Response:**
```json
{
  "message": "Document registered successfully",
  "document_name": "my-document",
  "paths": {
    "base": "/path/to/ms_graphrag/docs/my-document",
    "input": "/path/to/ms_graphrag/docs/my-document/input",
    "output": "/path/to/ms_graphrag/docs/my-document/output",
    "downloaded_file": "/path/to/ms_graphrag/docs/my-document/input/document.pdf"
  }
}
```

**What happens:**
1. Creates folder: `/ms_graphrag/docs/{document_name}`
2. Creates folder: `/ms_graphrag/docs/{document_name}/input`
3. Creates folder: `/ms_graphrag/docs/{document_name}/output`
4. Downloads file from `document_url` and saves it to the input folder

#### GET /health

Health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Example Usage

```bash
# Test the health endpoint
curl http://localhost:3000/health

# Register a document
curl -X POST http://localhost:3000/register-document \
  -H "Content-Type: application/json" \
  -d '{
    "document_url": "https://example.com/sample.pdf",
    "document_name": "sample-document"
  }'
```

## Error Handling

The application handles various error scenarios:

- **400 Bad Request**: Missing required fields or invalid URL
- **500 Internal Server Error**: File system errors or download failures

## File Structure

After registering a document, the following structure is created:

```
ms_graphrag/
└── docs/
    └── {document_name}/
        ├── input/
        │   └── {downloaded_file}
        └── output/
```

## Security Features

- Document names are sanitized to be filesystem-safe
- Input validation for required fields
- Timeout protection for downloads (30 seconds)
- Error handling for network issues

## Environment Variables

- `PORT`: Server port (default: 3000)