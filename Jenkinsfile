pipeline {
    agent any

    stages {
        stage('Checkout code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hari2410-sathish/Final-Host-My-Project.git'
            }
        }

        stage('Prepare env file') {
            steps {
                sh '''
                if [ ! -f pahrikyns-backend/.env ]; then
                  echo ".env file missing ❌"
                  exit 1
                fi
                '''
            }
        }

        stage('Build and Deploy with Docker') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
            }
        }
    }
}
