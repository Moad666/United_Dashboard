import type { NodeProps } from '@/types/external/Node'
import type { EnviromentEnum } from '@/types/external/QueueManager'

// Function to generate random data for the Node type
function generateRandomNode(): NodeProps {
  return {
    Name: `Node_${Math.floor(Math.random() * 1000)}`,
    Port: Math.floor(Math.random() * 65535) + 1,
    WebUi: `http://webui_${Math.floor(Math.random() * 1000)}`,
    'ACE Version': `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    Environment: getRandomEnvironment(),
    'IS Name(s)': Math.floor(Math.random() * 100),
    'Upgraded Date': new Date(),
  }
}

// Function to get a random environment from the EnviromentEnum
function getRandomEnvironment(): EnviromentEnum {
  const environments: EnviromentEnum[] = [
    'Dev',
    'Test',
    'PreProd/Stage',
    'Prod',
  ]
  const randomIndex = Math.floor(Math.random() * environments.length)
  return environments[randomIndex]
}

// Generate 40 instances of the Node type
export const nodes: NodeProps[] = Array.from({ length: 40 }, generateRandomNode)
