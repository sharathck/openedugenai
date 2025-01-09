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
    StorageAndDatabases: [
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
    SecurityIdentityCompliance: [
      'Identity and Access Management (IAM): Roles, permissions, service accounts, least privilege',
      'Cloud Identity: Identity management, single sign-on (SSO), multi-factor authentication (MFA)',
      'Cloud Key Management Service (KMS): Create and manage cryptographic keys, key rings',
      'Security Command Center: Centralized security management, threat detection, vulnerability scanning',
      'Cloud Armor: DDoS protection, WAF rules, access control for web applications',
      'VPC Service Controls: Protecting services from data exfiltration, perimeter security',
      'Cloud Audit Logs: Audit trails for admin activity, data access, and system events',
      'Data Loss Prevention API: Sensitive data classification, redaction, de-identification'
    ],
    OperationsManagement: [
      'Cloud Monitoring: Metrics collection, dashboards, uptime checks, alerting policies',
      'Cloud Logging: Centralized log management, log sinks, export options',
      'Cloud Trace: Distributed tracing, latency analysis, performance optimization',
      'Cloud Debugger: Real-time application debugging without impacting performance',
      'Cloud Profiler: Continuous profiling of resource usage, CPU and heap analysis',
      'Deployment Manager: Infrastructure as code, templates, configuration files, repeatable deployments',
      'Cloud Scheduler: Managed cron service, job automation, retry policies'
    ],
    ApplicationDevelopment: [
      'Cloud Build: Continuous integration, build triggers, container builds',
      'Artifact Registry: Secure storage for container images and language packages, vulnerability scanning',
      'Cloud Source Repositories: Hosted Git repositories, code management, integration with other tools',
      'Cloud Pub/Sub: Asynchronous messaging, event ingestion, real-time processing',
      'Cloud Tasks: Asynchronous execution of tasks, task queues, rate limiting',
      'Cloud Endpoints: API management, authentication, monitoring, developer portals',
      'API Gateway: Managed gateway for serverless backends, API exposure, security enforcement'
    ],
    DataAnalyticsAndBigData: [
      'BigQuery: Serverless data warehouse, SQL queries, data analytics at scale',
      'Dataflow: Stream and batch data processing, Apache Beam SDK, unified programming model',
      'Dataproc: Managed Hadoop and Spark clusters, cost-effective data processing',
      'Cloud Data Fusion: Visual data integration, ETL workflows, pre-built connectors',
      'Dataprep: Intelligent data service for exploration, cleaning, and preparation',
      'Composer: Managed Apache Airflow service, workflow orchestration, dependency management',
      'Pub/Sub: Messaging service for event-driven systems, real-time data streaming'
    ],
    MachineLearningAndAI: [
      'AI Platform: End-to-end machine learning workflows, training and prediction services',
      'AutoML: Automated model training, custom machine learning models with minimal code',
      'TensorFlow Enterprise: Optimized for GCP, long-term version support, performance tuning',
      'Vision AI: Image and video analysis, object detection, labeling services',
      'Natural Language API: Text analysis, sentiment detection, entity recognition',
      'Speech-to-Text and Text-to-Speech: Audio processing, speech recognition, voice synthesis',
      'Translation API: Neural machine translation, language detection, glossary support',
      'Dialogflow: Building conversational interfaces, chatbots, voice assistants'
    ],
    HybridAndMultiCloud: [
      'Anthos: Hybrid and multi-cloud application platform, consistent operations across environments',
      'Migrate for Compute Engine: Automated migration of VMs from on-premises or other clouds',
      'Cloud Run for Anthos: Serverless container deployment on GKE, Knative integration',
      'Config Connector: Kubernetes-native management of GCP resources, infrastructure as code',
      'Traffic Director: Service mesh management, global load balancing for microservices',
      'BigQuery Omni: Analyze data across clouds using standard SQL queries'
    ],
    ManagementTools: [
      'Cloud Console and Mobile App: Web and mobile interfaces for resource management',
      'Cloud Shell: Command-line access in the browser, pre-configured environment',
      'Cloud SDK: Command-line tools for interacting with GCP services, scripting automation',
      'Billing Management: Budgets, alerts, cost controls, billing export',
      'Resource Manager: Organization hierarchy, projects, folders, access control',
      'Service Catalogue: Curated set of approved services, self-service provisioning, standardization'
    ],
    HighAvailabilityAndResilience: [
      'Designing Distributed Systems: Fault-tolerant architectures, failure domains, redundancy',
      'Multi-zonal and Multi-regional Deployments: Data replication, high availability strategies',
      'Managed Instance Groups: Automated instance healing, autoscaling policies, regional MIGs',
      'Load Balancing Options: Traffic distribution, health checks, session affinity',
      'Disaster Recovery Planning: RTO and RPO considerations, backup strategies, failover mechanisms',
      'Data Replication Services: Cloud SQL replication, Cloud Spanner multi-region configurations'
    ],
    CostOptimization: [
      'Sustained Use Discounts: Automatic savings for sustained resource usage',
      'Committed Use Contracts: Discounts in exchange for usage commitments, custom machine types',
      'Right-Sizing Resources: Selecting appropriate VM sizes, resource allocation',
      'Monitoring and Managing Costs: Billing reports, cost breakdowns, identifying cost drivers',
      'Storage Cost Management: Choosing storage classes, lifecycle policies, data retention',
      'Network Egress Optimization: Data transfer costs, content caching with Cloud CDN'
    ],
    MigrationPlanning: [
      'Cloud Adoption Framework: Assessing readiness, defining migration strategies',
      'Application Modernization: Refactoring applications for cloud-native environments',
      'Data Migration: Transferring databases, migrating data warehouses to BigQuery',
      'Hybrid Connectivity: Setting up VPNs, Interconnects, ensuring secure data transfer',
      'Change Management: Training, stakeholder engagement, updating operational processes',
      'Migration Tools: Velostrata, Transfer Appliance, Database Migration Service'
    ],
    ArchitectureBestPractices: [
      'Well-Architected Framework: Reliability, security, cost optimization, performance efficiency, operational excellence',
      'Microservices and Containerization: Designing scalable and maintainable applications',
      'Event-Driven Architectures: Utilizing Pub/Sub and Cloud Functions for decoupled systems',
      'Security Best Practices: Implementing IAM correctly, data encryption, securing endpoints',
      'Network Design: Subnetting strategies, VPC peering, shared VPCs, service controls',
      'Monitoring and Logging: Implementing observability, leveraging Stackdriver suite effectively'
    ],
    CaseStudiesAndScenarios: [
      'Analyzing Business Requirements: Translating business needs into technical solutions',
      'Trade-offs and Decision Making: Evaluating options for scalability, cost, and complexity',
      'Regulatory Compliance: Understanding compliance requirements (e.g., GDPR, HIPAA) in design',
      'Performance Optimization: Identifying bottlenecks, caching strategies, CDN utilization',
      'Migration Case Studies: Lessons learned from real-world GCP migrations',
      'Cost-Benefit Analysis: Justifying architectural decisions based on business value'
    ]
  }
}