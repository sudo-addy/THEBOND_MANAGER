#!/bin/bash

# Color codes for better UI
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
show_banner() {
    clear
    echo -e "${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║       🏗️  Infrastructure Bond Tokenization Platform  🏗️       ║"
    echo "║                                                               ║"
    echo "║                      CoDevians - 2026                         ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
        return 1
    fi
    return 0
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Install all dependencies
install_dependencies() {
    echo -e "${BLUE}📦 Installing Dependencies...${NC}\n"

    echo -e "${YELLOW}Installing Backend Dependencies...${NC}"
    cd backend
    npm install
    cd ..

    echo -e "${YELLOW}Installing Frontend Dependencies...${NC}"
    cd frontend
    npm install
    cd ..

    echo -e "${YELLOW}Installing Blockchain Dependencies...${NC}"
    cd blockchain
    npm install
    cd ..

    echo -e "${GREEN}✅ All dependencies installed successfully!${NC}"
    read -p "Press Enter to continue..."
}

# Start services with Docker Compose
start_docker() {
    echo -e "${BLUE}🐳 Starting services with Docker Compose...${NC}\n"

    if check_docker; then
        docker-compose up -d
        echo -e "${GREEN}✅ Services started successfully!${NC}"
        echo -e "${CYAN}📍 Backend API: http://localhost:3210${NC}"
        echo -e "${CYAN}📍 Frontend: http://localhost:3000${NC}"
        echo -e "${CYAN}📍 MongoDB: localhost:27017${NC}"
        echo -e "${CYAN}📍 Redis: localhost:6379${NC}"
    fi

    read -p "Press Enter to continue..."
}

# Stop Docker services
stop_docker() {
    echo -e "${YELLOW}🛑 Stopping Docker services...${NC}\n"
    docker-compose down
    echo -e "${GREEN}✅ Services stopped successfully!${NC}"
    read -p "Press Enter to continue..."
}

# Start Backend only (local)
start_backend() {
    echo -e "${BLUE}🚀 Starting Backend Server (Local)...${NC}\n"

    if check_port 3210; then
        echo -e "${YELLOW}⚠️  Port 3210 is already in use!${NC}"
        read -p "Do you want to continue anyway? (y/n): " choice
        if [[ ! $choice =~ ^[Yy]$ ]]; then
            return
        fi
    fi

    cd backend
    echo -e "${CYAN}Starting on port 3210...${NC}"
    npm run dev
    cd ..
}

# Start Frontend only (local)
start_frontend() {
    echo -e "${BLUE}🚀 Starting Frontend Server (Local)...${NC}\n"

    if check_port 3000; then
        echo -e "${YELLOW}⚠️  Port 3000 is already in use!${NC}"
        read -p "Do you want to continue anyway? (y/n): " choice
        if [[ ! $choice =~ ^[Yy]$ ]]; then
            return
        fi
    fi

    cd frontend
    echo -e "${CYAN}Starting on port 3000...${NC}"
    npm run dev
    cd ..
}

# Start both Backend and Frontend in separate terminals
start_full_stack() {
    echo -e "${BLUE}🚀 Starting Full Stack Application...${NC}\n"

    # Check if gnome-terminal or xterm is available
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"
        sleep 2
        gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash"
        echo -e "${GREEN}✅ Backend and Frontend started in separate terminals${NC}"
    elif command -v xterm &> /dev/null; then
        xterm -e "cd backend && npm run dev; bash" &
        sleep 2
        xterm -e "cd frontend && npm run dev; bash" &
        echo -e "${GREEN}✅ Backend and Frontend started in separate terminals${NC}"
    else
        echo -e "${YELLOW}⚠️  No suitable terminal emulator found.${NC}"
        echo -e "${YELLOW}Please start backend and frontend manually in separate terminals.${NC}"
        echo -e "${CYAN}Terminal 1: cd backend && npm run dev${NC}"
        echo -e "${CYAN}Terminal 2: cd frontend && npm run dev${NC}"
    fi

    read -p "Press Enter to continue..."
}

# Seed database
seed_database() {
    echo -e "${BLUE}🌱 Seeding Database...${NC}\n"
    cd backend
    npm run seed
    cd ..
    echo -e "${GREEN}✅ Database seeded successfully!${NC}"
    read -p "Press Enter to continue..."
}

# View Docker logs
view_logs() {
    echo -e "${BLUE}📋 Docker Service Logs${NC}\n"
    echo "1. All services"
    echo "2. Backend only"
    echo "3. Frontend only"
    echo "4. MongoDB only"
    echo "5. Redis only"
    echo "6. Back to main menu"
    echo
    read -p "Select an option [1-6]: " log_choice

    case $log_choice in
        1) docker-compose logs -f ;;
        2) docker-compose logs -f backend ;;
        3) docker-compose logs -f frontend ;;
        4) docker-compose logs -f mongodb ;;
        5) docker-compose logs -f redis ;;
        6) return ;;
        *) echo -e "${RED}Invalid option${NC}" ;;
    esac
}

# Check service status
check_status() {
    echo -e "${BLUE}📊 Service Status${NC}\n"

    echo -e "${YELLOW}Docker Services:${NC}"
    docker-compose ps
    echo

    echo -e "${YELLOW}Port Status:${NC}"
    if check_port 3000; then
        echo -e "${GREEN}✅ Port 3000 (Frontend): Active${NC}"
    else
        echo -e "${RED}❌ Port 3000 (Frontend): Inactive${NC}"
    fi

    if check_port 3210; then
        echo -e "${GREEN}✅ Port 3210 (Backend): Active${NC}"
    else
        echo -e "${RED}❌ Port 3210 (Backend): Inactive${NC}"
    fi

    if check_port 27017; then
        echo -e "${GREEN}✅ Port 27017 (MongoDB): Active${NC}"
    else
        echo -e "${RED}❌ Port 27017 (MongoDB): Inactive${NC}"
    fi

    if check_port 6379; then
        echo -e "${GREEN}✅ Port 6379 (Redis): Active${NC}"
    else
        echo -e "${RED}❌ Port 6379 (Redis): Inactive${NC}"
    fi

    read -p "Press Enter to continue..."
}

# Build Docker images
build_docker() {
    echo -e "${BLUE}🔨 Building Docker Images...${NC}\n"
    docker-compose build
    echo -e "${GREEN}✅ Docker images built successfully!${NC}"
    read -p "Press Enter to continue..."
}

# Clean up Docker resources
cleanup_docker() {
    echo -e "${YELLOW}🧹 Cleaning up Docker resources...${NC}\n"
    read -p "This will remove all stopped containers, unused networks, and dangling images. Continue? (y/n): " confirm

    if [[ $confirm =~ ^[Yy]$ ]]; then
        docker-compose down -v
        docker system prune -f
        echo -e "${GREEN}✅ Cleanup completed!${NC}"
    else
        echo -e "${CYAN}Cleanup cancelled.${NC}"
    fi

    read -p "Press Enter to continue..."
}

# Run tests
run_tests() {
    echo -e "${BLUE}🧪 Running Tests...${NC}\n"
    echo "1. Backend tests"
    echo "2. Frontend lint"
    echo "3. Back to main menu"
    echo
    read -p "Select an option [1-3]: " test_choice

    case $test_choice in
        1)
            cd backend
            npm test
            cd ..
            ;;
        2)
            cd frontend
            npm run lint
            cd ..
            ;;
        3)
            return
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            ;;
    esac

    read -p "Press Enter to continue..."
}

# Main menu
show_menu() {
    show_banner
    echo -e "${MAGENTA}═══════════════════ MAIN MENU ═══════════════════${NC}\n"
    echo -e "${GREEN}1.${NC}  📦 Install Dependencies"
    echo -e "${GREEN}2.${NC}  🐳 Start All Services (Docker Compose)"
    echo -e "${GREEN}3.${NC}  🛑 Stop All Services (Docker)"
    echo -e "${GREEN}4.${NC}  🚀 Start Full Stack (Local - Separate Terminals)"
    echo -e "${GREEN}5.${NC}  ⚙️  Start Backend Only (Local)"
    echo -e "${GREEN}6.${NC}  🎨 Start Frontend Only (Local)"
    echo -e "${GREEN}7.${NC}  🌱 Seed Database"
    echo -e "${GREEN}8.${NC}  🔨 Build Docker Images"
    echo -e "${GREEN}9.${NC}  📋 View Docker Logs"
    echo -e "${GREEN}10.${NC} 📊 Check Service Status"
    echo -e "${GREEN}11.${NC} 🧪 Run Tests"
    echo -e "${GREEN}12.${NC} 🧹 Cleanup Docker Resources"
    echo -e "${GREEN}13.${NC} ❌ Exit"
    echo -e "\n${MAGENTA}══════════════════════════════════════════════════${NC}\n"
}

# Main loop
main() {
    while true; do
        show_menu
        read -p "Select an option [1-13]: " choice

        case $choice in
            1) install_dependencies ;;
            2) start_docker ;;
            3) stop_docker ;;
            4) start_full_stack ;;
            5) start_backend ;;
            6) start_frontend ;;
            7) seed_database ;;
            8) build_docker ;;
            9) view_logs ;;
            10) check_status ;;
            11) run_tests ;;
            12) cleanup_docker ;;
            13)
                echo -e "${CYAN}Thank you for using Bond Tokenization Platform!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid option. Please try again.${NC}"
                sleep 2
                ;;
        esac
    done
}

# Run the main function
main
