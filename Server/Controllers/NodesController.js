const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /nodes - Get all nodes with related ACE versions
exports.getAllNodes = async (req, res) => {
    try {
      const nodes = await prisma.node.findMany({
        include: {
          aceVersions: {
          where: {
            isSelected: true,
          },// Include associated ACE versions
          select: {
            version: true, // Select only the version attribute
          },
        },
    },
      });
      res.status(200).json(nodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /nodes/:id - Get node by ID
exports.getNodeById = async (req, res) => {
  const { id } = req.params;
  try {
    const node = await prisma.node.findUnique({
      where: { id: parseInt(id) },
    });
    if (!node) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.status(200).json(node);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /nodes - Create a new node
exports.createNode = async (req, res) => {
    const {
      name,
      port,
      webUi,
      webUiAlternative,
      environment,
      isName,
      upgradedDate,
      aceVersions, // Array of ACE versions data
    } = req.body;
  
    try {
      // Create the node
      const newNode = await prisma.node.create({
        data: {
          name,
          port,
          webUi,
          webUiAlternative,
          environment,
          isName,
          upgradedDate,
          aceVersions: { // Create related ACE versions
            create: aceVersions.map(version => ({
              version: version.version,
              isSelected: version.isSelected,
              // Add other ACE version fields here as needed
            })),
          },
        },
        include: {
          aceVersions: true, // Include created ACE versions in the response
        },
      });
  
      res.status(201).json(newNode);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// // POST /nodes - Create a new node
// exports.createNode = async (req, res) => {
//   try {
//     const { name, port, webUi, webUiAlternative,environment, isName, upgradedDate } = req.body;
//     const newNode = await prisma.node.create({
//       data: {
//         name,
//         port,
//         webUi,
//         webUiAlternative,
//         environment,
//         isName,
//         upgradedDate,
//       },
//     });
//     res.status(201).json(newNode);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// PUT /nodes/:id - Update node by ID
exports.updateNode = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, port, webUi, environment, isName, upgradedDate } = req.body;
    const updatedNode = await prisma.node.update({
      where: { id: parseInt(id) },
      data: {
        name,
        port,
        webUi,
        environment,
        isName,
        upgradedDate,
      },
    });
    res.status(200).json(updatedNode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /nodes/:id - Delete node by ID
exports.deleteNode = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.node.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
