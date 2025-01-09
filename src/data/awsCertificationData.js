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
    NetworkingAndContentDelivery: [
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
    SecurityIdentityCompliance: [
      'AWS IAM: User access management, Roles, Policies, MFA',
      'AWS KMS: Secure key management, Customer master keys',
      'AWS Shield: DDoS protection service, Standard and Advanced',
      'AWS WAF: Web application firewall, Rules and conditions',
      'Amazon Cognito: User sign-up, sign-in, and access control',
      'AWS Security Hub: Centralized security views and automated compliance checks',
      'AWS Organizations: Manage multiple AWS accounts with policies',
      'AWS Secrets Manager: Rotate, manage, and retrieve database credentials and other secrets'
    ],
    ManagementAndGovernance: [
      'AWS CloudTrail: Governance, compliance, and auditing, Log AWS API calls',
      'Amazon CloudWatch: Monitoring and observability, Metrics, Logs, Alarms',
      'AWS Config: Resource inventory, configuration history, and change notifications',
      'AWS Auto Scaling: Scale resources to maintain performance and cost',
      'AWS CloudFormation: Infrastructure as code, Templates for resource provisioning',
      'AWS Systems Manager: Manage EC2 and on-premises systems, Patch and configuration management',
      'AWS Trusted Advisor: Optimize AWS environment, Reduce cost, Improve security and performance'
    ],
    ApplicationIntegration: [
      'Amazon SQS: Decoupled and scalable message queuing, Standard and FIFO queues',
      'Amazon SNS: Pub/Sub messaging, Push notifications, Mobile notifications',
      'AWS Step Functions: Coordinate distributed applications, Visual workflows',
      'Amazon EventBridge: Serverless event bus for integrating applications',
      'Amazon MQ: Managed message broker service for Apache ActiveMQ and RabbitMQ',
      'AWS AppSync: Managed GraphQL service, Real-time data synchronization'
    ],
    DeploymentAndProvisioning: [
      'AWS CodeCommit: Secure, highly scalable hosted Git repositories',
      'AWS CodeBuild: Fully managed continuous integration service, Build and test code',
      'AWS CodeDeploy: Automate code deployments to any instance',
      'AWS CodePipeline: Continuous delivery service, Automate release pipelines',
      'AWS OpsWorks: Configuration management service, Manage Chef and Puppet environments',
      'AWS Elastic Beanstalk: Deploy and scale web applications and services'
    ],
    MonitoringAndLogging: [
      'Amazon CloudWatch Logs: Monitor, store, and access log files',
      'AWS CloudTrail Logs: Track user activity and API usage',
      'AWS X-Ray: Analyze and debug distributed applications',
      'AWS Config Rules: Evaluate resource configurations for compliance',
      'AWS Personal Health Dashboard: Personalized view of AWS service health'
    ],
    CostManagement: [
      'AWS Cost Explorer: Visualize, understand, and manage AWS costs and usage',
      'AWS Budgets: Set custom budgets and receive alerts',
      'AWS Cost and Usage Report: Most detailed information about AWS costs and usage',
      'AWS Reserved Instances and Savings Plans: Cost-saving options for predictable workloads',
      'AWS Pricing Calculator: Estimate AWS costs for your architecture'
    ],
    HighAvailabilityAndFaultTolerance: [
      'Multi-AZ Deployments: Enhance availability and data durability',
      'Auto Scaling Groups: Automatically adjust capacity to maintain steady performance',
      'Load Balancing: Distribute incoming traffic across multiple targets',
      'Cross-Region Replication: Replicate data across AWS Regions for disaster recovery',
      'Pilot Light and Warm Standby Architectures: Strategies for disaster recovery'
    ],
    ArchitectureDesignPrinciples: [
      'AWS Well-Architected Framework: Pillars of operational excellence, security, reliability, performance efficiency, and cost optimization',
      'Decoupling Applications: Use of queues, load balancers, and service discovery',
      'Design for Failure: Implementing redundancy and graceful degradation',
      'Microservices Architecture: Building applications as a collection of small services',
      'Caching Strategies: Improve performance using services like Amazon ElastiCache and CloudFront',
      'Event-Driven Architectures: Reacting to state changes and events with services like AWS Lambda and Amazon Kinesis'
    ],
    MigrationAndTransfer: [
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
    ArtificialIntelligenceAndMachineLearning: [
      'Amazon SageMaker: Build, train, and deploy machine learning models',
      'Amazon Rekognition: Image and video analysis',
      'Amazon Lex: Build conversational interfaces using voice and text',
      'Amazon Comprehend: Natural language processing (NLP) service',
      'Amazon Forecast: Time-series forecasting service',
      'Amazon Personalize: Real-time personalized recommendations'
    ],
    EdgeComputing: [
      'AWS IoT Core: Connect devices to AWS services and other devices',
      'AWS Greengrass: Local compute, messaging, data caching for connected devices',
      'AWS Lambda@Edge: Run Lambda functions at AWS Edge locations',
      'AWS Outposts: Run AWS services on-premises',
      'Amazon CloudFront Edge Functions: Customize content delivery'
    ]
  }
}