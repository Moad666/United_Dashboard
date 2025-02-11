// samples.ts
import type { AppProps } from '@/types/external/Application'

// Sample data
export const sampleApps: AppProps[] = [
  {
    'App Ref': '1',
    'App Key': 'app1',
    SME: 'John Doe',
    'Tier Level': '1 - Critical',
    PCI: 'TRUE',
    'EQA Test Cases': 'TRUE',
    'PII Data': 'FALSE',
    'Application Name': 'App One',
    'Queue Manager(s)': 'QM1',
    Nodes: 'Node1',
    'Who are my dependencies?': 'Dependency1',
    'Who Calls Me?': 'Caller1',
    Notes: 'Some notes',
    'Application Image': 'image1.jpg',
  },
  {
    'App Ref': '2',
    'App Key': 'app2',
    SME: 'Jane Smith',
    'Tier Level': '2 - Somewhat Critical',
    PCI: 'FALSE',
    'EQA Test Cases': 'TRUE',
    'PII Data': 'TRUE',
    'Application Name': 'App Two',
    'Queue Manager(s)': 'QM2',
    Nodes: 'Node2',
    'Who are my dependencies?': 'Dependency2',
    'Who Calls Me?': 'Caller2',
    Notes: 'More notes',
    'Application Image': 'image2.jpg',
  },
  {
    'App Ref': '3',
    'App Key': 'app3',
    SME: 'Bob Johnson',
    'Tier Level': '3 - Less Critical',
    PCI: 'TRUE',
    'EQA Test Cases': 'FALSE',
    'PII Data': 'TRUE',
    'Application Name': 'App Three',
    'Queue Manager(s)': 'QM3',
    Nodes: 'Node3',
    'Who are my dependencies?': 'Dependency3',
    'Who Calls Me?': 'Caller3',
    Notes: 'Additional notes',
    'Application Image': 'image3.jpg',
  },
  {
    'App Ref': '4',
    'App Key': 'app4',
    SME: 'Alice Williams',
    'Tier Level': '4 - Not Critical',
    PCI: 'FALSE',
    'EQA Test Cases': 'FALSE',
    'PII Data': 'FALSE',
    'Application Name': 'App Four',
    'Queue Manager(s)': 'QM4',
    Nodes: 'Node4',
    'Who are my dependencies?': 'Dependency4',
    'Who Calls Me?': 'Caller4',
    Notes: 'More additional notes',
    'Application Image': 'image4.jpg',
  },
]
