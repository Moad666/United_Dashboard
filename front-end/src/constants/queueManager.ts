import type { EnviromentEnum, QueueManagerProps } from '@/types/external/QueueManager'

const getRandomVersion = () => {
  const versions = ['1.0', '2.0', '3.0']
  const randomIndex = Math.floor(Math.random() * versions.length)
  return versions[randomIndex]
}

const getRandomEnvironment = () => {
  const environments:EnviromentEnum[] = ['Dev', 'Test', 'PreProd/Stage', 'Prod']
  const randomIndex = Math.floor(Math.random() * environments.length)
  return environments[randomIndex]
}

export const queueManagers: QueueManagerProps[] = [
  {
    Name: 'PIACMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI SSM Conveyance, PI Teletype Rejects, PI Terminal Emulation, PI Upsell Ancillaries, PSS Turnpike',
  },
  {
    Name: 'PIACMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI SSM Conveyance, PI Teletype Rejects, PI Terminal Emulation, PI Upsell Ancillaries',
  },
  {
    Name: 'QIACMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI SSM Conveyance, PI Interline Services',
  },
  {
    Name: 'QIACMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI Interline Services',
  },
  {
    Name: 'TIACMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI Interline Services',
  },
  {
    Name: 'TIACMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI Interline Services',
  },
  {
    Name: 'DAHAMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Employee Number Service',
  },
  {
    Name: 'DAHAMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Employee Number Service',
  },
  {
    Name: 'DAAIMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Teletype Rejects',
  },
  {
    Name: 'DAHAAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Seat Reaccom',
  },
  {
    Name: 'DAWGMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Terminal Emulation',
  },
  {
    Name: 'DAWGMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Terminal Emulation',
  },
  {
    Name: 'DCPMAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares, PI Seat Reaccom',
  },
  {
    Name: 'DCPMAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares',
  },
  {
    Name: 'PAWGMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI Terminal Emulation, PI Terminal Emulation, PI Terminal Emulation',
  },
  {
    Name: 'PAWGMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI Terminal Emulation, PI Terminal Emulation, PI Terminal Emulation',
  },
  {
    Name: 'PAWGAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI Logging, PI Logging, PI Logging, PI Logging, PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Update, PI PNR Update, PI PNR Update, PI PNR Update, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance',
  },
  {
    Name: 'PAWGAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI Logging, PI Logging, PI Logging, PI Logging, PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Update, PI PNR Update, PI PNR Update, PI PNR Update, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance',
  },
  {
    Name: 'PAWGAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI Logging, PI Logging, PI Logging, PI Logging, PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Update, PI PNR Update, PI PNR Update, PI PNR Update, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance',
  },
  {
    Name: 'PAWGAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI Logging, PI Logging, PI Logging, PI Logging, PI ACI History, PI ACI History, PI ACI History, PI ACI History, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Claim, PI PNR Update, PI PNR Update, PI PNR Update, PI PNR Update, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance, PI SSM Conveyance',
  },
  {
    Name: 'PAHAMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Employee Number Service',
  },
  {
    Name: 'PAHAMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Employee Number Service',
  },
  {
    Name: 'PAPBAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI ODM Business Rules',
  },
  {
    Name: 'PAPBAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI ODM Business Rules',
  },
  {
    Name: 'PAPBAN03',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI SCEPTRE Data',
  },
  {
    Name: 'PAPBAN04',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI SCEPTRE Data',
  },
  {
    Name: 'PBHFAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI FQTV Services, PI FQTV Services',
  },
  {
    Name: 'PBHFAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI FQTV Services, PI FQTV Services',
  },
  {
    Name: 'PCPMAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares',
  },
  {
    Name: 'PCPMAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares',
  },
  {
    Name: 'QCPMAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares',
  },
  {
    Name: 'QCPMAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI Google Fares',
  },
  {
    Name: 'QIACMQ01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI SSM Conveyance, PI Interline Services',
  },
  {
    Name: 'QIACMQ02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here':
      'PI ACI History, PI AI, PI APIS Query, PI Credit Auth, PI Dynamic Flight Selection, PI PNR Claim, PI Seat Reaccom, PI Secure Channel, PI Interline Services',
  },
  {
    Name: 'QBHFAN01',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI FQTV Services',
  },
  {
    Name: 'QBHFAN02',
    'MQ Version': getRandomVersion(),
    Environment: getRandomEnvironment(),
    'Applications Runs Here': 'PI FQTV Services',
  },
]
