const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /queue-managers
exports.createQueueManager = async (req, res) => {
    try {
      const { manager, port, svrChannel, clustered, ipAddress, vip, drVip, drIp, rfhUtilLink, environment, runsHere, mqVersions, externalPartners } = req.body;
      const newQueueManager = await prisma.queueManager.create({
        data: {
          manager,
          port,
          svrChannel,
          clustered,
          ipAddress,
          vip,
          drVip,
          drIp,
          rfhUtilLink,
          environment,
          runsHere,
          mqVersions: {
            createMany: {
              data: mqVersions,
            },
          },
          externalPartners: {
            createMany: {
              data: externalPartners,
            },
          },
        },
        include: {
          mqVersions: true,
          externalPartners: true,
        },
      });
      res.status(201).json(newQueueManager);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  // GET /queue-managers
exports.getAllQueueManagers = async (req, res) => {
    try {
      const queueManagers = await prisma.queueManager.findMany({
        include: {
          mqVersions: true,
          externalPartners: true,
        },
      });
      res.status(200).json(queueManagers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  