pipeline {
    agent any
    tools {
    
        nodejs 'nodejs12'
    }
    environment {
        NEXUS_USER = credentials('admin')
        NEXUS_PASS = credentials('priya')
        NEXUS_IP = '204.236.255.99'
        NEXUS_PORT = '8081'
        RELEASE_REPO = 'arzoo01-release'
        SONARSERVER = 'sonartoken'
        CONTAINER_URL = 'http://localhost:8080/manager/text'  // Container URL
        CONTAINER_CREDENTIALS_ID = 'tomcat_credential_id'  // Jenkins credentials ID for the container
    }
    

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                node{
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                node
		{
                    junit '**/test-results/*.xml'
                 }
      	    }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARSERVER) {
                    sh 'npm run sonar'
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
            }
        }
        
        
        stage('Publish to Nexus') {
            steps {
                sh """curl -v -u ${NEXUS_USER}:${NEXUS_PASS} \
                    --upload-file build/arzoo01 \
                    http://${NEXUS_IP}:${NEXUS_PORT}/${RELEASE_REPO}/"""         
            }
        }
        stage('Deploy to Container') {
            steps {
                deployToContainer(
                    url: "${CONTAINER_URL}",
                    credentialsId: "${CONTAINER_CREDENTIALS_ID}",
                    path: 'build/arzoo01.war',
                    deployPath: ''  // Specify the correct path in your container
                )
            }
        }
        stage('Clean Up') {
            steps {
                sh 'rm -rf build/'
            }
        }
    }
    post {
        always {
	     node
	     {
            junit '**/test-results/*.xml'
        }
	}
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
    }

