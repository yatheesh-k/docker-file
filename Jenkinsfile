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
		       set -x
	              sonar-scanner 
		      -Dsonar.projectKey=arzoo01 
                       -Dsonar.projectName="arzoo01"  

                       -Dsonar.sources=src/ 
                       -Dsonar.host.url=https://172.31.47.80:9000/   
                       -Dsonar.login=${SONARQUBE}

                    '''
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


        stage('Publish to Nexus') {
            steps {
               script{
                      
		                       
                    nexusArtifactUploader(
                    credentialsId: 'nexuslogin',
		    groupid: 'com.myproject',
                    protocol:'http',   
                    
                    nexusUrl: '54.166.178.31:8081/',
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


