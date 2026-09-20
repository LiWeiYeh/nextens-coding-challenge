## Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- Angular CLI

Install Angular CLI if you don't already have it:

```bash
npm install -g @angular/cli
```

### Run the API

The API runs on:

```text
https://localhost:7122
```

### Run the Angular application

Open a terminal and from the repository root:

```bash
cd Client
npm install
ng serve
```

The Angular application will be available at:

```text
http://localhost:4200
```

Open the URL in your browser.

### Run the frontend tests

From the `Client` directory:

```bash
ng test
```

To run the tests once without watch mode:

```bash
ng test --watch=false
```

### Project structure

```text
/
├── API/
│   └── Rekentool
│
└── Client/
    └── Angular application
```

The Angular application communicates with the API running on `https://localhost:7122`.
