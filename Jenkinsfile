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
                sh 'docker build -t 3d-front-end:dev'
            }
        }
        // stage('Release') { 
        //     steps {
        //         sh 'npm run start:prod'
        //     }
        // }
    }
}