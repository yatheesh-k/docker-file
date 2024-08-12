pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
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
	        scannerHome = tool 'scanner' 
                SONARQUBE = credentials('sonartoken') // Add SonarQube token as Jenkins credential
            }
	   
            steps {
                
                    withSonarQubeEnv('sonarserver') {
                    sh '''
		    /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/scanner/bin/sonar-scanner \
			  -Dsonar.projectKey=arzoo01 \
			  -Dsonar.projectName=arzoo01 \
			  -Dsonar.projectVersion=1.0 \
			  -Dsonar.sources=src
      
			  '''
		    }
                
                    }
	}
	
        stage('Publish to Nexus') {
            steps {
               script{
		        sh 'ls -la build/'
                      
		                       
                    nexusArtifactUploader(
                    credentialsId: 'nexuslogin',
		    
                    protocol:'http',   
                    
                    nexusUrl: '3.88.31.211:8081/',
                    nexusVersion: 'nexus2',
                    repository: 'reactappl',
		    artifacts:[
		    [artifactid:'arzoo01',
		    classifier: '',
                            file: '/build/arzoo01',
                            type: '.jar']
			    ]
			    )
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


