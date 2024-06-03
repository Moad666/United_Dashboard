const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE new application
exports.addApllication = async (req, res) => {
    const {
      name,
      appKey,
      tierLevel,
      piiData,
      pci,
      appNumber,
      crosswalkDataMappingLink,
      crosswalkDataMappingAlternativeText,
      technicalDocumentLink,
      technicalDocumentAlternativeText,
      architectDiagramLink,
      architectDiagramAlternativeText,
      schemasLink,
      schemasAlternativeText,
      codeReviewLink,
      codeReviewAlternativeText,
      whoCallsMe,
      whoAreMyDependencies,
      eqaTestCases,
      linkToApiListLink,
      linkToApiListAlternativeText,
      notes,
      // Assuming you have the IDs of the nodes and queue managers to be linked
      nodeIds,
      queueManagerIds,
    } = req.body;
    try {
      const newApp = await prisma.application.create({
        data: {
          name,
          appKey,
          tierLevel,
          piiData,
          pci,
          appNumber,
          crosswalkDataMappingLink,
          crosswalkDataMappingAlternativeText,
          technicalDocumentLink,
          technicalDocumentAlternativeText,
          architectDiagramLink,
          architectDiagramAlternativeText,
          schemasLink,
          schemasAlternativeText,
          codeReviewLink,
          codeReviewAlternativeText,
          whoCallsMe,
          whoAreMyDependencies,
          eqaTestCases,
          linkToApiListLink,
          linkToApiListAlternativeText,
          notes,
          // Link nodes and queue managers using their IDs
          nodes: {
            create: nodeIds.map((nodeId) => ({
              node: { connect: { id: nodeId } },
            })),
          },
          queueManagers: {
            create: queueManagerIds.map((qmId) => ({
              queueManager: { connect: { id: qmId } },
            })),
          },
        },
        include: {
          queueManagers: true,
          nodes: true,
        },
      });   
      res.status(201).json(newApp);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  