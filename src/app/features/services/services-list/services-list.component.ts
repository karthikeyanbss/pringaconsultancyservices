import { Component } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {
  services = [
    {
      id: 'web',
      title: 'Website Design & Development',
      summary: 'Modern responsive websites.',
      description: 'Enterprise-grade web applications with cutting-edge frontend frameworks and cloud-native backends.'
    },
    {
      id: 'mobile',
      title: 'Mobile App Design & Development',
      summary: 'iOS & Android native/hybrid.',
      description: 'Cross-platform mobile solutions using React Native, Flutter, and native frameworks for iOS and Android.'
    },
    {
      id: 'saas',
      title: 'SaaS Platform Design & Architecture',
      summary: 'Scalable SaaS platforms.',
      description: 'Multi-tenant SaaS architectures with advanced security, scalability, and compliance features built on cloud infrastructure.'
    },
    {
      id: 'azure',
      title: 'Azure Cloud Solutions',
      summary: 'Enterprise Azure solutions.',
      description: 'Comprehensive Azure services including App Service, Azure SQL, Cosmos DB, Azure Functions, and Enterprise AI integrations.'
    },
    {
      id: 'aws',
      title: 'AWS Cloud Engineering',
      summary: 'AWS cloud engineering.',
      description: 'End-to-end AWS solutions leveraging EC2, RDS, Lambda, DynamoDB, SageMaker, and advanced DevOps practices.'
    },
    {
      id: 'gcp',
      title: 'Google Cloud Platform Solutions',
      summary: 'Google Cloud Platform solutions.',
      description: 'GCP expertise spanning Compute Engine, Cloud SQL, Firestore, BigQuery, and Machine Learning services.'
    },
    {
      id: 'genai',
      title: 'Generative AI Solutions',
      summary: 'Enterprise LLM integrations.',
      description: 'OpenAI, Azure OpenAI, and Anthropic Claude integrations for enterprise applications, RAG systems, and intelligent automation.'
    }
  ];
}
