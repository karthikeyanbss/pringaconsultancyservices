import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  heroDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  techStack: string[];
  providers: ('azure' | 'aws' | 'gcp')[];
  sections: Array<{ title: string; content: string; image?: string }>;
  cta: string;
}

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  id: string | null = null;
  service: ServiceDetail | null = null;

  private servicesData: { [key: string]: ServiceDetail } = {
    web: {
      id: 'web',
      title: 'Website Design & Development',
      subtitle: 'Enterprise-Grade Web Applications',
      icon: 'web',
      heroDescription: 'Modern responsive websites built with cutting-edge frontend frameworks and cloud-native backends.',
      fullDescription: 'We create high-performance, scalable web applications that drive engagement and conversion. From single-page applications (SPAs) to progressive web apps (PWAs), our solutions are built to impress and perform.',
      keyFeatures: [
        'Responsive Design - Perfect on all devices',
        'SEO Optimized - Built for search visibility',
        'Cloud Native - Scalable architecture',
        'Performance - Sub-second load times',
        'Security First - Enterprise-grade protection'
      ],
      techStack: [
        'React / Angular / Vue.js',
        'TypeScript',
        'Node.js / .NET Core',
        'PostgreSQL / MongoDB',
        'Azure / AWS / GCP'
      ],
      providers: ['azure', 'aws', 'gcp'],
      sections: [
        {
          title: 'Frontend Excellence',
          content: 'We leverage modern frameworks like React and Angular to create responsive, performant user interfaces with seamless user experiences. Our focus on accessibility ensures your website reaches every user.'
        },
        {
          title: 'Backend Scalability',
          content: 'Robust server-side architecture using Node.js, Python, or .NET Core. We implement microservices, API-first design, and containerization for maximum scalability and maintainability.'
        },
        {
          title: 'Cloud Integration',
          content: 'Full integration with Azure App Service, AWS Elastic Beanstalk, or GCP App Engine. Automated deployments, CI/CD pipelines, and serverless functions optimize your infrastructure costs.'
        }
      ],
      cta: 'Launch Your Web Application'
    },
    mobile: {
      id: 'mobile',
      title: 'Mobile App Design & Development',
      subtitle: 'Cross-Platform Mobile Solutions',
      icon: 'mobile',
      heroDescription: 'iOS & Android native and cross-platform apps that deliver exceptional user experiences and business results.',
      fullDescription: 'Our mobile development expertise spans native iOS/Android development and cross-platform frameworks. We create apps that users love, with intuitive interfaces, offline capabilities, and seamless cloud integration.',
      keyFeatures: [
        'Native & Cross-Platform - Best of both worlds',
        'Offline First - Works without internet',
        'Push Notifications - Real-time engagement',
        'Analytics Integration - Measure what matters',
        'Enterprise Security - Data protection'
      ],
      techStack: [
        'React Native / Flutter',
        'Swift (iOS) / Kotlin (Android)',
        'Firebase / Azure Mobile Services',
        'GraphQL / REST APIs',
        'SQLite / Realm'
      ],
      providers: ['azure', 'aws', 'gcp'],
      sections: [
        {
          title: 'Cross-Platform Development',
          content: 'Using React Native and Flutter, we build apps that run seamlessly on iOS and Android with 70-90% code reuse, reducing development time and maintenance costs without compromising on performance.'
        },
        {
          title: 'Native Performance',
          content: 'When performance is critical, we develop native apps with Swift and Kotlin. You get full access to device capabilities, optimal performance, and app store integration.'
        },
        {
          title: 'Backend Integration',
          content: 'Seamless integration with Firebase for real-time databases, Azure Mobile Services, or custom APIs. We implement authentication, push notifications, and analytics out of the box.'
        }
      ],
      cta: 'Build Your Mobile App'
    },
    saas: {
      id: 'saas',
      title: 'SaaS Platform Design & Architecture',
      subtitle: 'Multi-Tenant Enterprise Platforms',
      icon: 'saas',
      heroDescription: 'Scalable SaaS platforms built for millions of users with advanced security, compliance, and monetization features.',
      fullDescription: 'We architect and build multi-tenant SaaS platforms that scale effortlessly. Our expertise includes tenant isolation, usage metering, billing integration, and enterprise security features that power successful SaaS companies.',
      keyFeatures: [
        'Multi-Tenancy - Isolated data per tenant',
        'Usage Metering - Track and bill accurately',
        'RBAC & SSO - Enterprise authentication',
        'Compliance Ready - SOC2, HIPAA, GDPR',
        'Auto-Scaling - Handle traffic spikes'
      ],
      techStack: [
        'Node.js / Python / .NET Core',
        'PostgreSQL / MongoDB',
        'Redis / Elasticsearch',
        'Kubernetes / Docker',
        'Stripe / Chargebee'
      ],
      providers: ['azure', 'aws', 'gcp'],
      sections: [
        {
          title: 'Architecture & Design',
          content: 'We design multi-tenant architectures with proper data isolation, resource management, and API rate limiting. Our approach ensures security and compliance while maintaining high performance across thousands of tenants.'
        },
        {
          title: 'Monetization & Billing',
          content: 'Integrated billing solutions with Stripe, Chargebee, or Paddle. We handle subscription management, usage-based pricing, invoicing, and analytics to maximize your revenue.'
        },
        {
          title: 'Compliance & Security',
          content: 'Enterprise-grade security with encryption, audit logging, SSO/SAML integration, and compliance certifications (SOC2, HIPAA, GDPR). Your SaaS platform meets the strictest requirements.'
        }
      ],
      cta: 'Build Your SaaS Platform'
    },
    azure: {
      id: 'azure',
      title: 'Azure Cloud Solutions',
      subtitle: 'Enterprise Microsoft Azure Services',
      icon: 'azure',
      heroDescription: 'Comprehensive Azure services leveraging App Service, SQL, Cosmos DB, Functions, and Enterprise AI for mission-critical workloads.',
      fullDescription: 'We are certified Azure partners with deep expertise across the Azure platform. From migrations to greenfield development, we architect solutions that maximize performance, minimize costs, and ensure enterprise-grade reliability.',
      keyFeatures: [
        'App Service - Web, Mobile, API hosting',
        'Azure SQL - Managed relational databases',
        'Cosmos DB - Global, multi-model databases',
        'Azure Functions - Serverless computing',
        'Azure Synapse - Analytics & data warehousing'
      ],
      techStack: [
        'Azure App Service',
        'Azure SQL / Cosmos DB',
        'Azure Functions / Logic Apps',
        'Azure DevOps',
        'Azure Synapse Analytics',
        'Azure Machine Learning'
      ],
      providers: ['azure'],
      sections: [
        {
          title: 'Cloud Migration',
          content: 'Seamless migration from on-premises to Azure with minimal downtime. We assess, plan, and execute migrations of databases, applications, and infrastructure with proven methodologies.'
        },
        {
          title: 'Serverless Architecture',
          content: 'Reduce operational overhead with Azure Functions, Logic Apps, and Event Grid. Build event-driven, scalable applications that cost only for what you use.'
        },
        {
          title: 'Data & Analytics',
          content: 'Azure Synapse, Cosmos DB, and Azure Data Lake power data-driven insights. We build data pipelines, analytics dashboards, and real-time streaming solutions at scale.'
        }
      ],
      cta: 'Explore Azure Solutions'
    },
    aws: {
      id: 'aws',
      title: 'AWS Cloud Engineering',
      subtitle: 'Amazon Web Services Expertise',
      icon: 'aws',
      heroDescription: 'End-to-end AWS solutions leveraging EC2, RDS, Lambda, DynamoDB, and advanced DevOps practices for enterprise scale.',
      fullDescription: 'Our AWS-certified engineers deliver solutions across compute, storage, databases, and advanced services. We design for reliability, scalability, and cost optimization on the world\'s leading cloud platform.',
      keyFeatures: [
        'EC2 & Auto Scaling - Compute flexibility',
        'RDS & DynamoDB - Database excellence',
        'Lambda & SQS - Serverless patterns',
        'S3 & CloudFront - Global content delivery',
        'CloudWatch & X-Ray - Observability'
      ],
      techStack: [
        'EC2, Lambda, ECS',
        'RDS, DynamoDB, ElastiCache',
        'S3, CloudFront, API Gateway',
        'CloudFormation / Terraform',
        'AWS CodePipeline / CodeDeploy'
      ],
      providers: ['aws'],
      sections: [
        {
          title: 'Infrastructure as Code',
          content: 'We use CloudFormation and Terraform to define your entire infrastructure as code. This enables version control, repeatability, and disaster recovery across environments.'
        },
        {
          title: 'Cost Optimization',
          content: 'Our AWS experts identify cost-saving opportunities through Reserved Instances, Spot Instances, auto-scaling, and resource right-sizing. Reduce AWS bills by 30-50% without sacrificing performance.'
        },
        {
          title: 'DevOps & Automation',
          content: 'Fully automated CI/CD pipelines with CodePipeline and CodeDeploy. Blue-green deployments, canary releases, and automated rollbacks ensure safe, frequent deployments.'
        }
      ],
      cta: 'Start Your AWS Journey'
    },
    gcp: {
      id: 'gcp',
      title: 'Google Cloud Platform Solutions',
      subtitle: 'GCP Expertise & Innovation',
      icon: 'gcp',
      heroDescription: 'Google Cloud Platform solutions spanning Compute Engine, Cloud SQL, Firestore, BigQuery, and ML services for data-driven companies.',
      fullDescription: 'We help companies harness Google Cloud\'s powerful analytics, machine learning, and data capabilities. From startups to enterprises, we architect solutions optimized for GCP\'s strengths in data and AI.',
      keyFeatures: [
        'Compute Engine - Virtual machines at scale',
        'Cloud Run - Containerized applications',
        'Firestore - NoSQL databases',
        'BigQuery - Data warehousing',
        'Vertex AI - Machine learning platform'
      ],
      techStack: [
        'Compute Engine, App Engine, Cloud Run',
        'Cloud SQL, Firestore, Datastore',
        'BigQuery, Pub/Sub',
        'Vertex AI, TensorFlow',
        'Cloud Build, Cloud Deploy'
      ],
      providers: ['gcp'],
      sections: [
        {
          title: 'Big Data & Analytics',
          content: 'Leverage BigQuery\'s petabyte-scale analytics engine for real-time insights. We build data pipelines that ingest, transform, and visualize massive datasets efficiently.'
        },
        {
          title: 'Machine Learning',
          content: 'Vertex AI makes ML accessible. We build custom ML models, use pre-trained APIs, or implement AutoML for classification, prediction, and computer vision tasks.'
        },
        {
          title: 'Cloud-Native Development',
          content: 'Cloud Run, Cloud Functions, and App Engine provide scalable, managed compute without managing infrastructure. Perfect for microservices and event-driven architectures.'
        }
      ],
      cta: 'Explore GCP Solutions'
    },
    genai: {
      id: 'genai',
      title: 'Generative AI Solutions',
      subtitle: 'Enterprise AI & LLM Integration',
      icon: 'genai',
      heroDescription: 'OpenAI, Azure OpenAI, and Anthropic Claude integrations for enterprise applications, RAG systems, and intelligent automation.',
      fullDescription: 'We build cutting-edge AI solutions that leverage the latest large language models. From chatbots to content generation, RAG systems to AI copilots, we bring AI capabilities to your business.',
      keyFeatures: [
        'LLM Integration - OpenAI, Claude, Azure OpenAI',
        'RAG Systems - Knowledge-grounded AI',
        'Fine-Tuning - Custom models for your domain',
        'Prompt Engineering - Optimized outputs',
        'Responsible AI - Ethics & safety first'
      ],
      techStack: [
        'OpenAI API, Azure OpenAI',
        'Anthropic Claude',
        'LangChain, LlamaIndex',
        'Vector Databases (Pinecone, Weaviate)',
        'Prompt Engineering'
      ],
      providers: ['azure', 'aws', 'gcp'],
      sections: [
        {
          title: 'RAG & Knowledge Systems',
          content: 'Retrieval-Augmented Generation (RAG) systems ground LLMs in your business knowledge. We build systems that answer questions accurately using your proprietary data and documents.'
        },
        {
          title: 'AI Copilots & Assistants',
          content: 'Intelligent copilots that augment human work. From code generation assistants to customer service bots, we build AI that understands context and helps your team work smarter.'
        },
        {
          title: 'Compliance & Safety',
          content: 'We implement content filtering, bias detection, and audit logging. Your AI systems are built responsibly with proper governance, transparency, and accountability mechanisms.'
        }
      ],
      cta: 'Build AI Solutions'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.servicesData[this.id]) {
      this.service = this.servicesData[this.id];
    } else {
      this.service = null;
    }
  }
}
