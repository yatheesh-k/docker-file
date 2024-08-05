pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
	sonarQubeScanner 'scanner'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch:'main',url:'https://github.com/lakshmipriyapbt/arzoo01.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                
                    sh 'npm install'
                
            }
        }

        stage('Build') {
            steps {
                
                    sh 'npm run build'
                
            }
        }

        stage('SonarQube Analysis') {
            environment {
	         
                SONARQUBE = credentials('sonartoken') // Add SonarQube token as Jenkins credential
            }
            steps {
                
                    withSonarQubeEnv('sonarserver') {
                    sh '''
		       sonarQubeScanner \
                       
                       -Dsonar.projectKey=arzoo01 \
                       -Dsonar.sources=src \
                       -Dsonar.host.url=http://172.31.47.80:9000/ \
                       -Dsonar.login=$SONARQUBE
                    '''
                
            }
        }
	}

        stage('Publish to Nexus') {
            steps {
               script{
                    def artifactId = 'arzoo01'
                    def version = '1.0.0'
                    def file = 'build.zip'
                    
		    sh "zip -r ${file} build/"
                    
                    nexusArtifactUploader artifacts: [
                        [artifactId: artifactId, file: file, type: 'zip', version: version]
                    ],
                    credentialsId: 'nexuslogin',
		    groupid: 'com.myproject',
 
                    
                    nexusUrl: 'http://172.31.46.99',
                    nexusVersion: 'nexus2',
                    repository: 'reactappl'
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after the build
        }
    }
}


