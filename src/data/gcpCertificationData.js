export const gcpCertificationData = {
  'Google-Cloud-Professional-Cloud-Architect': {
    Compute: [
      'Compute Engine: Virtual machine instances, machine types, autoscaling, load balancing',
      'Google Kubernetes Engine (GKE): Managed Kubernetes service, cluster management, node pools',
      'App Engine: Platform as a Service (PaaS), Standard and Flexible environments, scaling options',
      'Cloud Functions: Event-driven serverless compute, triggers, function deployment',
      'Cloud Run: Serverless execution of containerized applications, stateless HTTP containers',
      'Preemptible VMs: Cost-effective VMs for fault-tolerant workloads, limitations, use cases'
    ],
    'Storage And Databases': [
      'Cloud Storage: Object storage, buckets, lifecycle management, versioning, storage classes',
      'Persistent Disk: Block storage for VM instances, SSD and HDD options, snapshots',
      'Filestore: Managed file storage, network-attached storage (NAS), performance tiers',
      'Cloud SQL: Managed relational databases for MySQL, PostgreSQL, SQL Server, high availability',
      'Cloud Spanner: Globally distributed relational database, horizontal scaling, strong consistency',
      'Cloud Bigtable: NoSQL wide-column database, low latency, scalability for big data workloads',
      'Firestore: NoSQL document database, real-time synchronization, offline support',
      'Cloud Memorystore: Managed Redis and Memcached services, caching solutions'
    ],
    Networking: [
      'Virtual Private Cloud (VPC): Network segmentation, subnets, firewall rules, routes',
      'Cloud Load Balancing: HTTP(S), SSL proxy, TCP/UDP, regional and global load balancing',
      'Cloud CDN: Content delivery network, edge caching, reducing latency',
      'Cloud DNS: Scalable, managed DNS service, private zones, DNSSEC',
      'Cloud Interconnect: Dedicated and partner connections, hybrid connectivity, VLAN attachments',
      'Cloud VPN: Secure site-to-site connectivity, IPsec tunnels, HA VPN',
      'Network Service Tiers: Premium and Standard tiers, routing features, pricing differences'
    ],
    'Security Identity Compliance': [
      'Identity and Access Management (IAM): Roles, permissions, service accounts, least privilege',
      'Cloud Identity: Identity management, single sign-on (SSO), multi-factor authentication (MFA)',
      'Cloud Key Management Service (KMS): Create and manage cryptographic keys, key rings',
      'Security Command Center: Centralized security management, threat detection, vulnerability scanning',
      'Cloud Armor: DDoS protection, WAF rules, access control for web applications',
      'VPC Service Controls: Protecting services from data exfiltration, perimeter security',
      'Cloud Audit Logs: Audit trails for admin activity, data access, and system events',
      'Data Loss Prevention API: Sensitive data classification, redaction, de-identification'
    ],
    'Operations Management': [
      'Cloud Monitoring: Metrics collection, dashboards, uptime checks, alerting policies',
      'Cloud Logging: Centralized log management, log sinks, export options',
      'Cloud Trace: Distributed tracing, latency analysis, performance optimization',
      'Cloud Debugger: Real-time application debugging without impacting performance',
      'Cloud Profiler: Continuous profiling of resource usage, CPU and heap analysis',
      'Deployment Manager: Infrastructure as code, templates, configuration files, repeatable deployments',
      'Cloud Scheduler: Managed cron service, job automation, retry policies'
    ],
    'Application Development': [
      'Cloud Build: Continuous integration, build triggers, container builds',
      'Artifact Registry: Secure storage for container images and language packages, vulnerability scanning',
      'Cloud Source Repositories: Hosted Git repositories, code management, integration with other tools',
      'Cloud Pub/Sub: Asynchronous messaging, event ingestion, real-time processing',
      'Cloud Tasks: Asynchronous execution of tasks, task queues, rate limiting',
      'Cloud Endpoints: API management, authentication, monitoring, developer portals',
      'API Gateway: Managed gateway for serverless backends, API exposure, security enforcement'
    ],
    'Data Analytics And BigData': [
      'BigQuery: Serverless data warehouse, SQL queries, data analytics at scale',
      'Dataflow: Stream and batch data processing, Apache Beam SDK, unified programming model',
      'Dataproc: Managed Hadoop and Spark clusters, cost-effective data processing',
      'Cloud Data Fusion: Visual data integration, ETL workflows, pre-built connectors',
      'Dataprep: Intelligent data service for exploration, cleaning, and preparation',
      'Composer: Managed Apache Airflow service, workflow orchestration, dependency management',
      'Pub/Sub: Messaging service for event-driven systems, real-time data streaming'
    ],
    'Machine Learning And AI': [
      'AI Platform: End-to-end machine learning workflows, training and prediction services',
      'AutoML: Automated model training, custom machine learning models with minimal code',
      'TensorFlow Enterprise: Optimized for GCP, long-term version support, performance tuning',
      'Vision AI: Image and video analysis, object detection, labeling services',
      'Natural Language API: Text analysis, sentiment detection, entity recognition',
      'Speech-to-Text and Text-to-Speech: Audio processing, speech recognition, voice synthesis',
      'Translation API: Neural machine translation, language detection, glossary support',
      'Dialogflow: Building conversational interfaces, chatbots, voice assistants'
    ],
    'Hybrid And Multi Cloud': [
      'Anthos: Hybrid and multi-cloud application platform, consistent operations across environments',
      'Migrate for Compute Engine: Automated migration of VMs from on-premises or other clouds',
      'Cloud Run for Anthos: Serverless container deployment on GKE, Knative integration',
      'Config Connector: Kubernetes-native management of GCP resources, infrastructure as code',
      'Traffic Director: Service mesh management, global load balancing for microservices',
      'BigQuery Omni: Analyze data across clouds using standard SQL queries'
    ],
    'Management Tools': [
      'Cloud Console and Mobile App: Web and mobile interfaces for resource management',
      'Cloud Shell: Command-line access in the browser, pre-configured environment',
      'Cloud SDK: Command-line tools for interacting with GCP services, scripting automation',
      'Billing Management: Budgets, alerts, cost controls, billing export',
      'Resource Manager: Organization hierarchy, projects, folders, access control',
      'Service Catalogue: Curated set of approved services, self-service provisioning, standardization'
    ],
    'High Availability And Resilience': [
      'Designing Distributed Systems: Fault-tolerant architectures, failure domains, redundancy',
      'Multi-zonal and Multi-regional Deployments: Data replication, high availability strategies',
      'Managed Instance Groups: Automated instance healing, autoscaling policies, regional MIGs',
      'Load Balancing Options: Traffic distribution, health checks, session affinity',
      'Disaster Recovery Planning: RTO and RPO considerations, backup strategies, failover mechanisms',
      'Data Replication Services: Cloud SQL replication, Cloud Spanner multi-region configurations'
    ],
    'Cost Optimization': [
      'Sustained Use Discounts: Automatic savings for sustained resource usage',
      'Committed Use Contracts: Discounts in exchange for usage commitments, custom machine types',
      'Right-Sizing Resources: Selecting appropriate VM sizes, resource allocation',
      'Monitoring and Managing Costs: Billing reports, cost breakdowns, identifying cost drivers',
      'Storage Cost Management: Choosing storage classes, lifecycle policies, data retention',
      'Network Egress Optimization: Data transfer costs, content caching with Cloud CDN'
    ],
    'Migration Planning': [
      'Cloud Adoption Framework: Assessing readiness, defining migration strategies',
      'Application Modernization: Refactoring applications for cloud-native environments',
      'Data Migration: Transferring databases, migrating data warehouses to BigQuery',
      'Hybrid Connectivity: Setting up VPNs, Interconnects, ensuring secure data transfer',
      'Change Management: Training, stakeholder engagement, updating operational processes',
      'Migration Tools: Velostrata, Transfer Appliance, Database Migration Service'
    ],
    'Architecture Best Practices': [
      'Well-Architected Framework: Reliability, security, cost optimization, performance efficiency, operational excellence',
      'Microservices and Containerization: Designing scalable and maintainable applications',
      'Event-Driven Architectures: Utilizing Pub/Sub and Cloud Functions for decoupled systems',
      'Security Best Practices: Implementing IAM correctly, data encryption, securing endpoints',
      'Network Design: Subnetting strategies, VPC peering, shared VPCs, service controls',
      'Monitoring and Logging: Implementing observability, leveraging Stackdriver suite effectively'
    ],
    'Case Studies And Scenarios': [
      'Analyzing Business Requirements: Translating business needs into technical solutions',
      'Trade-offs and Decision Making: Evaluating options for scalability, cost, and complexity',
      'Regulatory Compliance: Understanding compliance requirements (e.g., GDPR, HIPAA) in design',
      'Performance Optimization: Identifying bottlenecks, caching strategies, CDN utilization',
      'Migration Case Studies: Lessons learned from real-world GCP migrations',
      'Cost-Benefit Analysis: Justifying architectural decisions based on business value'
    ]
  },
  'GoogleCloud-DataScientist': {
    "Data Engineering and Infrastructure": [
       "BigQuery: Querying, loading, and exporting data; managing datasets and tables; optimizing query performance; understanding cost management.",
       "Cloud Storage: Storing and managing data; working with different storage classes; using lifecycle management; data transfer options.",
       "Cloud Composer: Building and managing workflows using Apache Airflow; integrating with other GCP services; creating DAGs.",
        "Cloud Dataflow: Developing data processing pipelines; batch and stream processing; using Beam SDK; managing pipeline deployments.",
       "Cloud Dataproc: Running Hadoop and Spark clusters; managing cluster resources; configuring cluster settings; integrating with other GCP services.",
       "Dataflow SQL: Using SQL for data transformation within Dataflow pipelines; understanding SQL syntax and functions.",
       "Cloud Functions: Serverless functions for data processing and event-driven tasks; deploying and managing functions.",
       "Cloud Pub/Sub: Building real-time messaging systems; understanding topics and subscriptions; integrating with other GCP services.",
       "Networking for Data: Understanding VPC networks, subnets, and firewalls; configuring network settings for data services.",
       "Infrastructure as Code: Using tools like Terraform or Deployment Manager to provision and manage data infrastructure.",
        "Data Lineage and Governance: Understanding data provenance, data quality, and data security; implementing data governance policies.",
       "Data Security: Implementing security best practices for data storage, processing, and access; using IAM and encryption.",
        "Hybrid and Multi-Cloud Data Management: Understanding data transfer options, interoperability, and data integration strategies across different environments."

    ],
    "Machine Learning and AI": [
      "Vertex AI: Building, training, and deploying ML models; using pre-built models; managing model versions.",
       "AutoML: Using automated ML for building models without coding; understanding different AutoML options.",
      "TensorFlow: Building and training deep learning models; using Keras and other TensorFlow libraries.",
      "PyTorch: Using PyTorch for building and training deep learning models; understanding its features and advantages.",
      "ML APIs: Using pre-trained models for vision, language, and other tasks; integrating APIs into applications.",
       "Feature Engineering: Selecting, transforming, and creating features for ML models; understanding feature importance.",
      "Model Evaluation: Assessing model performance using metrics; understanding bias and variance; model validation strategies.",
      "Hyperparameter Tuning: Optimizing model parameters; using techniques like grid search and Bayesian optimization.",
      "Model Deployment: Deploying models for online prediction and batch processing; using Vertex AI endpoints.",
      "Model Monitoring: Monitoring model performance over time; detecting drift and anomalies; retraining models.",
        "Explainable AI: Understanding and interpreting model predictions; using techniques to explain feature importance.",
        "Generative AI: Understanding the concepts and techniques of generative models, including GANs, VAEs, and diffusion models.",
        "Ethical Considerations in AI: Addressing bias, fairness, and transparency in AI applications; implementing responsible AI practices."
    ],
    "Data Analysis and Visualization": [
      "BigQuery ML: Using SQL to build and train ML models; integrating models with data analysis.",
        "Data Visualization with Looker Studio: Creating dashboards and visualizations; connecting to different data sources; sharing reports.",
      "Data Exploration: Using tools and techniques to explore and understand data; identifying patterns and insights.",
      "Statistical Analysis: Applying statistical methods to data analysis; understanding distributions, hypothesis testing, and regression.",
      "Data Wrangling: Cleaning, transforming, and preparing data for analysis; using tools and techniques for data quality.",
        "A/B Testing: Designing and analyzing A/B tests to measure the impact of changes; using statistical methods for significance testing.",
      "Data Storytelling: Communicating insights using visualizations and narratives; presenting findings to stakeholders."

    ],
    "Programming and Development": [
       "Python Programming: Writing Python code for data analysis, machine learning, and data engineering; understanding libraries like Pandas, NumPy, and Scikit-learn.",
       "SQL: Writing SQL queries for data extraction, transformation, and analysis; understanding database concepts.",
       "Git and Version Control: Managing code using Git; understanding branching, merging, and pull requests.",
        "Command Line Tools: Using command-line interfaces for interacting with GCP services and data.",
        "Containerization with Docker: Building and deploying containerized applications; understanding Dockerfiles and images.",
        "CI/CD: Implementing continuous integration and continuous delivery pipelines; automating code deployment.",
        "Scripting: Automating data workflows using scripting languages like Bash or Python."
    ],
      "Business Acumen and Communication": [
          "Business Understanding: Aligning data science solutions with business goals; understanding business needs and challenges.",
          "Stakeholder Management: Communicating with stakeholders; understanding their needs and expectations.",
          "Project Management: Planning and managing data science projects; understanding agile methodologies.",
          "Documentation: Creating clear and concise documentation for data, models, and processes.",
           "Presentation Skills: Presenting findings to technical and non-technical audiences; using visualizations and storytelling."
      ]
  },
  'GCP-MachineLearningEngineer': {
    'Machine Learning Concepts and Principles': [
      'Understanding of core ML concepts: supervised, unsupervised, and reinforcement learning',
      'Model evaluation metrics: accuracy, precision, recall, F1-score, AUC-ROC',
       'Bias and fairness in ML: identifying and mitigating bias in data and models',
      'Overfitting and underfitting: techniques to address these issues',
      'Feature engineering: feature selection, transformation, and creation',
      'Regularization techniques: L1, L2 regularization',
      'Hyperparameter tuning: grid search, random search, Bayesian optimization'
    ],
      'Data Engineering for Machine Learning': [
      'Data ingestion: methods for importing data from various sources',
      'Data cleaning and preprocessing: handling missing values, outliers, and inconsistencies',
      'Data transformation: scaling, normalization, and feature encoding',
      'Data storage: options for storing data for ML tasks on GCP (Cloud Storage, BigQuery)',
       'Data versioning: tracking changes to data',
        'Data validation: ensuring data quality and consistency',
      'Feature Store: managing and sharing features across ML projects',
      'Data pipelines: building and managing data workflows (Dataflow, Dataproc)'
    ],
    'Model Development and Training': [
      'Choosing the right ML algorithm for the problem',
      'Building and training ML models using TensorFlow and/or PyTorch on GCP',
       'Model architecture design: choosing appropriate layers and connections',
      'Distributed training: scaling model training using multiple machines (Vertex AI, Cloud TPUs)',
      'Custom model training: writing custom training loops and optimizers',
        'Transfer learning: leveraging pre-trained models',
        'Model debugging: identifying and resolving issues in model training',
        'Model Explainability: understanding how models make predictions',
      'Model evaluation and validation: assessing model performance on held-out data'
    ],
    'Model Deployment and Production': [
        'Model deployment options: deploying models as REST APIs, batch predictions, and edge deployments',
      'Model serving: managing and scaling model endpoints (Vertex AI Prediction, AI Platform)',
        'Model monitoring: tracking model performance in production',
      'Model versioning: managing different versions of a model',
        'A/B testing: comparing different model versions',
      'Model retraining: updating models with new data',
      'CI/CD for ML: automating the ML lifecycle',
        'Containerization for ML: using Docker and Kubernetes for model deployment',
    ],
    'ML Solutions on Google Cloud': [
        'Vertex AI: unified platform for ML development and deployment',
        'BigQuery ML: using SQL to build and train ML models',
      'Cloud Vision API: image analysis and recognition',
      'Cloud Natural Language API: text analysis and understanding',
        'Cloud Speech-to-Text and Text-to-Speech APIs: converting speech to text and vice versa',
        'AutoML: building and training custom ML models with minimal coding',
        'TensorFlow Extended (TFX): building production-ready ML pipelines',
      'Kubeflow: open-source ML platform on Kubernetes',
        'Dialogflow: building conversational interfaces',
        'Recommendations AI: building personalized recommendations',
    ],
    'MLOps and Automation': [
      'Automated ML workflows: building and managing automated ML pipelines',
        'ML Metadata Management: tracking artifacts of ML workflows',
        'Reproducible ML: ensuring that ML experiments can be repeated',
      'Infrastructure automation: automating the provisioning and management of ML infrastructure',
        'Monitoring and alerting: setting up monitoring and alerting for ML systems',
        'Version control for ML models and code',
        'ML Security best practices',
    ],
    'Business Understanding and Problem Framing': [
        'Identifying business problems that can be solved with ML',
        'Defining success metrics for ML projects',
      'Understanding business constraints and requirements',
        'Communicating ML results to business stakeholders',
        'Aligning ML solutions with business goals'
    ]
  }

}