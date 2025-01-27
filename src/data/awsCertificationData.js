export const awsCertificationData = {
  'AWS-SolutionsArchitect': {
    Compute: [
      'Amazon EC2: Instance types, pricing models, Auto Scaling, Load Balancing',
      'AWS Lambda: Serverless compute, Function as a Service, Event triggers',
      'Amazon ECS and EKS: Container orchestration with Docker and Kubernetes',
      'AWS Elastic Beanstalk: Simplified application deployment and management',
      'AWS Batch: Managed batch processing at any scale',
      'Amazon Lightsail: Easy-to-use virtual private servers'
    ],
    Storage: [
      'Amazon S3: Object storage, Bucket policies, Lifecycle management, Versioning',
      'Amazon EBS: Block storage volumes for EC2, Snapshots, Encryption',
      'Amazon EFS: Scalable file storage for EC2, Performance modes, Mount targets',
      'Amazon S3 Glacier: Archival storage, Retrieval options',
      'AWS Storage Gateway: Hybrid cloud storage integration',
      'AWS Backup: Centralized backup service for AWS resources'
    ],
    'Networking And Content Delivery': [
      'Amazon VPC: Customizable virtual networks, Subnets, Route tables, Security groups',
      'Elastic Load Balancing: Distribute traffic across multiple targets',
      'Amazon Route 53: Scalable DNS and domain name registration, Routing policies',
      'AWS Direct Connect: Dedicated network connection from on-premises to AWS',
      'Amazon CloudFront: Content Delivery Network, Edge locations, Web distribution',
      'AWS Transit Gateway: Connect VPCs and on-premises networks through a central hub'
    ],
    Databases: [
      'Amazon RDS: Managed relational databases, Multi-AZ, Read replicas',
      'Amazon DynamoDB: Fully managed NoSQL database, Global Tables, DAX',
      'Amazon Aurora: High-performance MySQL and PostgreSQL-compatible relational database',
      'Amazon Redshift: Fast, scalable data warehousing service',
      'Amazon ElastiCache: In-memory data store for Redis and Memcached',
      'AWS Database Migration Service: Migrate databases securely and with minimal downtime'
    ],
    'Security Identity Compliance': [
      'AWS IAM: User access management, Roles, Policies, MFA',
      'AWS KMS: Secure key management, Customer master keys',
      'AWS Shield: DDoS protection service, Standard and Advanced',
      'AWS WAF: Web application firewall, Rules and conditions',
      'Amazon Cognito: User sign-up, sign-in, and access control',
      'AWS Security Hub: Centralized security views and automated compliance checks',
      'AWS Organizations: Manage multiple AWS accounts with policies',
      'AWS Secrets Manager: Rotate, manage, and retrieve database credentials and other secrets'
    ],
    'Management And Governance': [
      'AWS CloudTrail: Governance, compliance, and auditing, Log AWS API calls',
      'Amazon CloudWatch: Monitoring and observability, Metrics, Logs, Alarms',
      'AWS Config: Resource inventory, configuration history, and change notifications',
      'AWS Auto Scaling: Scale resources to maintain performance and cost',
      'AWS CloudFormation: Infrastructure as code, Templates for resource provisioning',
      'AWS Systems Manager: Manage EC2 and on-premises systems, Patch and configuration management',
      'AWS Trusted Advisor: Optimize AWS environment, Reduce cost, Improve security and performance'
    ],
    'Application Integration': [
      'Amazon SQS: Decoupled and scalable message queuing, Standard and FIFO queues',
      'Amazon SNS: Pub/Sub messaging, Push notifications, Mobile notifications',
      'AWS Step Functions: Coordinate distributed applications, Visual workflows',
      'Amazon EventBridge: Serverless event bus for integrating applications',
      'Amazon MQ: Managed message broker service for Apache ActiveMQ and RabbitMQ',
      'AWS AppSync: Managed GraphQL service, Real-time data synchronization'
    ],
    'Deployment And Provisioning': [
      'AWS CodeCommit: Secure, highly scalable hosted Git repositories',
      'AWS CodeBuild: Fully managed continuous integration service, Build and test code',
      'AWS CodeDeploy: Automate code deployments to any instance',
      'AWS CodePipeline: Continuous delivery service, Automate release pipelines',
      'AWS OpsWorks: Configuration management service, Manage Chef and Puppet environments',
      'AWS Elastic Beanstalk: Deploy and scale web applications and services'
    ],
    'Monitoring And Logging': [
      'Amazon CloudWatch Logs: Monitor, store, and access log files',
      'AWS CloudTrail Logs: Track user activity and API usage',
      'AWS X-Ray: Analyze and debug distributed applications',
      'AWS Config Rules: Evaluate resource configurations for compliance',
      'AWS Personal Health Dashboard: Personalized view of AWS service health'
    ],
    'Cost Management': [
      'AWS Cost Explorer: Visualize, understand, and manage AWS costs and usage',
      'AWS Budgets: Set custom budgets and receive alerts',
      'AWS Cost and Usage Report: Most detailed information about AWS costs and usage',
      'AWS Reserved Instances and Savings Plans: Cost-saving options for predictable workloads',
      'AWS Pricing Calculator: Estimate AWS costs for your architecture'
    ],
    'High Availability And Fault Tolerance': [
      'Multi-AZ Deployments: Enhance availability and data durability',
      'Auto Scaling Groups: Automatically adjust capacity to maintain steady performance',
      'Load Balancing: Distribute incoming traffic across multiple targets',
      'Cross-Region Replication: Replicate data across AWS Regions for disaster recovery',
      'Pilot Light and Warm Standby Architectures: Strategies for disaster recovery'
    ],
    'Architecture Design Principles': [
      'AWS Well-Architected Framework: Pillars of operational excellence, security, reliability, performance efficiency, and cost optimization',
      'Decoupling Applications: Use of queues, load balancers, and service discovery',
      'Design for Failure: Implementing redundancy and graceful degradation',
      'Microservices Architecture: Building applications as a collection of small services',
      'Caching Strategies: Improve performance using services like Amazon ElastiCache and CloudFront',
      'Event-Driven Architectures: Reacting to state changes and events with services like AWS Lambda and Amazon Kinesis'
    ],
    'Migration And Transfer': [
      'AWS Migration Hub: Track progress of application migrations',
      'AWS Snow Family: Physically migrate large amounts of data (Snowball, Snowmobile)',
      'AWS DataSync: Transfer data between on-premises storage and AWS',
      'AWS Server Migration Service: Migrate on-premises servers to AWS',
      'AWS Application Discovery Service: Gather information about on-premises data centers'
    ],
    Analytics: [
      'Amazon Kinesis: Collect, process, and analyze real-time streaming data',
      'Amazon EMR: Managed Hadoop framework for big data processing',
      'Amazon Athena: Query data in S3 using SQL',
      'Amazon Elasticsearch Service: Real-time search and analytics',
      'AWS Glue: Fully managed extract, transform, and load (ETL) service',
      'Amazon QuickSight: Business intelligence and data visualization service'
    ],
    'Artificial Intelligence And Machine Learning': [
      'Amazon SageMaker: Build, train, and deploy machine learning models',
      'Amazon Rekognition: Image and video analysis',
      'Amazon Lex: Build conversational interfaces using voice and text',
      'Amazon Comprehend: Natural language processing (NLP) service',
      'Amazon Forecast: Time-series forecasting service',
      'Amazon Personalize: Real-time personalized recommendations'
    ],
    'Edge Computing': [
      'AWS IoT Core: Connect devices to AWS services and other devices',
      'AWS Greengrass: Local compute, messaging, data caching for connected devices',
      'AWS Lambda@Edge: Run Lambda functions at AWS Edge locations',
      'AWS Outposts: Run AWS services on-premises',
      'Amazon CloudFront Edge Functions: Customize content delivery'
    ]
  },
  'AWS-DataScientist': {
    'Machine Learning': [
      'Supervised Learning: Regression (Linear, Polynomial), Classification (Logistic Regression, SVM, Decision Trees, Random Forests, Gradient Boosting)',
      'Unsupervised Learning: Clustering (K-Means, DBSCAN), Dimensionality Reduction (PCA, t-SNE)',
      'Deep Learning: Neural Networks (ANN, CNN, RNN), Transfer Learning, Model Architectures',
      'Model Evaluation and Selection: Metrics (Accuracy, Precision, Recall, F1-Score, AUC-ROC), Cross-validation, Hyperparameter Tuning',
      'Feature Engineering: Feature selection, Transformation, Scaling, Encoding',
      'Model Deployment: Using SageMaker, Deploying to EC2/ECS, Monitoring Model Performance',
      'Model Explainability: Understanding model predictions (SHAP, LIME)',
      'Natural Language Processing (NLP): Text Classification, Sentiment Analysis, Named Entity Recognition, Topic Modeling',
      'Time Series Analysis: Forecasting, Anomaly Detection, Time Series Modeling'
    ],
    'Data Engineering': [
       'Data Ingestion: Batch and stream data ingestion using services like Kinesis, Glue, and S3',
       'Data Transformation: Using AWS Glue for ETL, Data wrangling, Data cleaning, and Feature Engineering',
       'Data Storage: S3, Data Lakes, Data Warehousing using Redshift',
       'Data Processing: Using EMR, Spark, Athena, and Batch Processing for large-scale data',
       'Data Pipelines: Designing and managing data workflows using Step Functions and Airflow',
       'Data Governance: Data quality, security, compliance, and metadata management',
       'Database Technologies: SQL, NoSQL (DynamoDB), Relational Databases (RDS), Graph Databases (Neptune)'
    ],
     'Exploratory Data Analysis': [
      'Data Visualization: Using libraries like Matplotlib, Seaborn, and QuickSight to create plots and dashboards',
      'Statistical Analysis: Hypothesis testing, Correlation analysis, Descriptive statistics',
      'Data Cleaning: Handling missing values, Outlier detection and treatment',
      'Data Understanding: Summarizing and interpreting data to extract insights',
      'Feature Importance: Identifying the most influential features',
      'Data Distribution: Understanding the spread and skewness of data'
    ],
     'AWS Services': [
       'Amazon SageMaker: Building, training, and deploying machine learning models',
       'Amazon S3: Data storage and management',
       'Amazon EMR: Big data processing with Hadoop and Spark',
       'AWS Glue: Data cataloging, ETL, and data preparation',
       'Amazon Kinesis: Real-time data streaming',
       'Amazon Athena: Querying data in S3 using SQL',
       'Amazon Redshift: Data warehousing',
       'Amazon DynamoDB: NoSQL database',
       'AWS Lambda: Serverless compute for data processing',
       'Amazon QuickSight: Business intelligence and data visualization',
       'AWS Step Functions: Orchestrating data pipelines',
       'AWS IAM: Access control and security',
       'AWS CloudWatch: Monitoring and logging',
       'AWS Lake Formation: Building data lakes'
    ],
    'Mathematics and Statistics': [
      'Linear Algebra: Vectors, Matrices, Matrix operations',
      'Probability: Random variables, Probability distributions',
      'Statistics: Descriptive statistics, Inferential statistics, Hypothesis testing',
      'Calculus: Derivatives, Integrals',
      'Optimization: Gradient descent, Convex optimization',
      'Bayesian Statistics: Bayesian inference, Bayesian modeling'
    ],
    'Model Evaluation and Validation': [
        'Metrics for Classification: Accuracy, Precision, Recall, F1-score, AUC-ROC, Confusion Matrix',
        'Metrics for Regression: Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), R-squared',
        'Cross-validation: K-fold cross-validation, Stratified cross-validation',
        'Bias-Variance Tradeoff: Understanding overfitting and underfitting',
        'Hyperparameter Tuning: Grid search, Random search, Bayesian optimization',
        'Model Selection: Choosing the right model for the problem'
    ],
    'Data Security and Compliance': [
        'Data Encryption: Encryption at rest and in transit',
        'Access Control: IAM policies, Resource-based policies',
        'Compliance: GDPR, HIPAA, PCI',
        'Data Masking: Protecting sensitive data',
        'VPC Security: Securing data within VPCs',
        'Auditing and Monitoring: Logging and monitoring data access'
    ],
     'Best Practices': [
       'Scalability: Designing scalable data solutions',
       'Cost Optimization: Optimizing cost using reserved instances, spot instances, and right-sizing',
       'Performance Optimization: Optimizing data processing and model training',
       'Reliability: Building fault-tolerant systems',
       'Security: Implementing security best practices',
       'Version Control: Managing code and models using Git and SageMaker Model Registry',
       'Reproducibility: Ensuring the reproducibility of results'
     ]
  },
  'AWS-MachineLearningEngineer': {
    DataEngineering: [
        'Data Collection and Ingestion: Strategies for gathering data from various sources including databases, APIs, and streaming platforms, and methods for ingesting this data into AWS services like S3, Kinesis, and Glue.',
        'Data Storage and Management: Utilizing S3 for scalable object storage, designing optimal data lake architectures, implementing data lifecycle management policies, and understanding different storage formats such as Parquet and ORC.',
        'Data Transformation and Processing: Techniques for cleaning, transforming, and preparing data for machine learning, leveraging AWS Glue for ETL operations, and using EMR for large-scale data processing.',
        'Data Wrangling: Expertise in data cleaning, feature engineering, and handling missing or inconsistent data using various data manipulation libraries and techniques.',
        'Feature Store: Designing and implementing feature stores for managing and serving features to machine learning models, using services like SageMaker Feature Store.'
    ],
    ExploratoryDataAnalysis: [
        'Data Visualization: Using tools like Matplotlib, Seaborn, and QuickSight to visualize data distributions, identify patterns, and gain insights.',
        'Statistical Analysis: Applying statistical methods to understand data characteristics, identify outliers, and validate assumptions, using libraries like SciPy.',
        'Data Understanding: Developing a deep understanding of the data, its context, and its limitations to ensure appropriate usage in machine learning models.',
        'Hypothesis Testing: Formulating and testing hypotheses to validate assumptions about the data.',
        'Correlation Analysis: Identifying relationships between different features in the data.'
    ],
    ModelDevelopment: [
        'Algorithm Selection: Choosing appropriate machine learning algorithms based on the problem type (classification, regression, clustering) and data characteristics.',
        'Model Training: Using SageMaker to train machine learning models, including configuring training jobs, optimizing hyperparameters, and utilizing different instance types.',
        'Model Evaluation: Evaluating model performance using metrics such as accuracy, precision, recall, F1-score, ROC curves, and AUC.',
        'Hyperparameter Tuning: Implementing hyperparameter optimization techniques using SageMaker\'s automatic model tuning to enhance model performance.',
         'Model Selection: Employing techniques such as cross-validation to select the best performing model.'
    ],
     MachineLearningAlgorithms: [
        'Supervised Learning: In-depth understanding and implementation of algorithms like Linear Regression, Logistic Regression, Support Vector Machines (SVM), Decision Trees, Random Forests, and Gradient Boosting Machines.',
        'Unsupervised Learning: Deep knowledge of algorithms such as K-Means clustering, Hierarchical clustering, Principal Component Analysis (PCA), and Anomaly Detection techniques.',
        'Deep Learning: Implementation of Neural Networks, Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), and Transformer models using frameworks like TensorFlow, PyTorch, and Keras.',
        'Ensemble Methods: Combining multiple models to improve prediction accuracy using techniques like bagging, boosting, and stacking.'
    ],
    ModelDeployment: [
         'Deployment Strategies: Implementing different deployment strategies for machine learning models, including batch prediction, online prediction, and real-time inference.',
        'Model Hosting: Using SageMaker Hosting to deploy models as API endpoints, and configuring endpoints for scalability and availability.',
        'Containerization: Packaging models and dependencies using Docker, and deploying containers on ECS or EKS.',
        'Model Versioning: Implementing version control for machine learning models and deploying different versions using SageMaker Model Registry.',
        'Serverless Deployment: Using AWS Lambda for deploying machine learning models in a serverless environment for specific use cases.'
    ],
    ModelMonitoringAndMaintenance: [
        'Performance Monitoring: Tracking model performance in production using CloudWatch metrics, and setting up alerts for model degradation.',
        'Data Drift Detection: Implementing techniques to detect changes in data distributions, and retrain models when necessary.',
        'Model Retraining: Establishing processes for retraining models with new data to maintain model accuracy and relevance.',
        'A/B Testing: Conducting A/B tests to evaluate different versions of models, and select the optimal version for deployment.',
        'Model Explainability: Employing techniques like SHAP and LIME to understand model predictions and improve model transparency.'
    ],
    MachineLearningServices: [
         'Amazon SageMaker: Comprehensive knowledge of using SageMaker for the entire machine learning lifecycle, including data preparation, model training, model deployment, and model monitoring.',
         'Amazon Rekognition: Implementing image and video analysis using pre-trained models for tasks like object detection, facial recognition, and content moderation.',
         'Amazon Comprehend: Using natural language processing (NLP) services for text analysis, sentiment analysis, and entity recognition.',
        'Amazon Translate: Implementing language translation services for multilingual applications.',
        'Amazon Transcribe: Using speech-to-text services to convert audio files to text.',
        'Amazon Lex and Polly: Building conversational interfaces using chatbots and text-to-speech services.',
        'Amazon Forecast: Implementing time series forecasting for demand planning and predictions.',
        'Amazon Personalize: Using real-time recommendation engines for personalized user experiences.'
    ],
    SecurityAndCompliance: [
        'Data Security: Implementing security measures for data at rest and in transit, including encryption and access control using IAM roles and policies.',
        'Model Security: Protecting machine learning models from unauthorized access and tampering.',
        'Compliance: Ensuring compliance with regulations and standards like GDPR, HIPAA, and SOC 2.',
        'Vulnerability Management: Implementing security scans and patches to mitigate risks and vulnerabilities.',
        'Audit Trails: Tracking access and modifications to data and models using services like CloudTrail.'
    ],
    OptimizationAndScalability: [
        'Cost Optimization: Implementing strategies to optimize costs related to data storage, compute resources, and machine learning services, using Cost Explorer and Reserved Instances.',
         'Performance Optimization: Optimizing model training and inference performance using techniques like distributed training, model quantization, and model pruning.',
        'Scalability: Designing scalable machine learning pipelines that can handle large datasets and high traffic volumes, using Auto Scaling and load balancing.',
        'Resource Management: Efficiently managing compute resources and storage using services like SageMaker, EC2, and S3.',
         'Monitoring and Alerting: Setting up monitoring and alerting mechanisms to proactively identify and resolve performance and scalability issues.'
    ],
    EthicalConsiderations: [
       'Bias Detection and Mitigation: Implementing techniques to identify and mitigate bias in data and machine learning models.',
        'Fairness and Transparency: Ensuring fairness, transparency, and accountability in machine learning systems.',
       'Data Privacy: Respecting data privacy and implementing techniques like differential privacy to protect sensitive information.',
       'Responsible AI: Adhering to ethical principles and guidelines for the development and deployment of machine learning systems.',
       'Explainable AI (XAI): Developing models that are transparent and understandable to users, using techniques like SHAP and LIME.'
    ]
  }
}