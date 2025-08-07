# Chatbot Frontend
A React chatbot application built with Vite and react-chatbot-kit.

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot-frontend
```
2. Install dependencies:
```bash
npm install
```
## Running the Project

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`
### Build for Production
```bash
npm run build
```
### Preview Production Build
```bash
npm run preview
```
### Linting
```bash
npm run lint
```

## Project Structure
- `src/components/` - React components including bot configuration and UI elements
- `src/assets/` - Static assets like images and icons
- `public/` - Public assets served directly

## Technologies Used
- React 19
- Vite
- react-chatbot-kit
- Bootstrap 5
- Axios





# Chatbot Backend

A Laravel-based chatbot backend with AWS Bedrock integration for AI-powered conversations.

## Prerequisites
- PHP 8.1 or higher
- Composer
- AWS Account with Bedrock access
- Web server (Apache/Nginx) or PHP built-in server

## Installation
1. **Clone and navigate to the project:**
   ```bash
   cd chatbot-backend
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Set up environment variables:**
   ```bash
   copy .env.example .env
   ```



5. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

## Running the Application

### Option 1: PHP Built-in Server
```bash
php artisan serve
```
The application will be available at `http://localhost:8000`

### Option 2: Local Web Server
Configure your web server to point to the `public` directory.

## API Endpoints

### Basic Chat (Mock Response)
- **URL:** `/api/chat.php`
- **Method:** POST
- **Body:** `{"message": "Hello"}`

### Bedrock Chat (AWS AI)
- **URL:** `/api/bedrock-chat.php`
- **Method:** POST  
- **Body:** `{"message": "Hello"}`

## Testing

Test the API endpoints:

```bash
# Basic chat
curl -X POST http://localhost:8000/api/chat.php \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Bedrock chat
curl -X POST http://localhost:8000/api/bedrock-chat.php \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```


