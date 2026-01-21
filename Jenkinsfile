pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        nodejs(nodeJSInstallationName: 'node25') {
          sh 'node -v'
          sh 'npm -v'
          sh 'npm ci'
        }
      }
    }
    stage('Test') {
      steps {
        nodejs(nodeJSInstallationName: 'node25') {
          sh 'npm test --if-present'
        }
      }
    }
  }
}
