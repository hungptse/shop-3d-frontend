pipeline {
    agent any 
    stages {
        // stage('Install') { 
        //     steps {
        //         sh  'npm install'
        //     }
        // }
        stage('Build') { 
            steps {
                sh 'docker build -t fe .'
            }
        }
        stage('Release') { 
            steps {
                sh 'docker run -it -d -p 3000:3000 fe:latest'
            }
        }
    }
}