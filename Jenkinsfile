pipeline {
    agent any 
    stages {
        stage('Install') { 
            steps {
                sh : 'npm install'
            }
        }
        stage('Build') { 
            steps {
                sh : 'npm run build'
            }
        }
        // stage('Test') { 
        //     steps {
        //         // 
        //     }
        // }
        // stage('Deploy') { 
        //     steps {
        //         // 
        //     }
        // }
    }
}