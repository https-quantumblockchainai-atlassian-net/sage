## Sage Backend Server
The Sage Backend Server is designed to power the [Sage VS Code Extension](https://marketplace.visualstudio.com/items?itemName=NanoNaut.sage-ai). It provides essential services such as code refactoring, bug analysis, test generation, and documentation generation.

## Features
- **Code Refactoring**: Analyzes and suggests improvements for your code.
- **Bug Analysis**: Scans your code to identify potential bugs or anti-patterns.
- **Test Generation**: Creates tests based on your code.
- **Documentation Generation**: Produces markdown documentation for your code.

## Getting Started

#### Prerequisites
Ensure you have Node.js and npm installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

#### Steps:
1. Clone the repository:
```bash
git clone https://github.com/thiagoadsix/sage.git
```
2. Navigate to the cloned directory:
```bash
cd sage
```
3. Select the version requried version for NodeJS:
```bash
nvm use
```
4. Install the required dependencies:
```bash
npm i
```
5. Set up the environment variables. Create a `.env` file in the root directory of the project and add the following:
```makefile
OPEN_API_KEY=YOUR_OPENAI_API_KEY
OPEN_API_ORG=YOUR_OPENAI_ORG_ID  # This is optional
```
Replace `YOUR_OPENAI_API_KEY` with your actual **OpenAI** API key and `YOUR_OPENAI_ORG_ID` with your **OpenAI** organization ID (if you have one).

6. Once the environment variables are set, you can start the server:
```bash
npm run start
```
The server will start and by default listen on http://localhost:3000.
