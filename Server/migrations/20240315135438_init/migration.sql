-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Viewer', 'Editor', 'Admin');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Dev', 'Test', 'PreProd', 'Prod');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "job" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'Viewer',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "password" TEXT,
    "img" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "appKey" TEXT NOT NULL,
    "tierLevel" TEXT NOT NULL,
    "piiData" BOOLEAN NOT NULL DEFAULT false,
    "pci" BOOLEAN NOT NULL DEFAULT false,
    "appNumber" INTEGER,
    "crosswalkDataMappingLink" TEXT,
    "crosswalkDataMappingAlternativeText" TEXT,
    "technicalDocumentLink" TEXT,
    "technicalDocumentAlternativeText" TEXT,
    "architectDiagramLink" TEXT,
    "architectDiagramAlternativeText" TEXT,
    "schemasLink" TEXT,
    "schemasAlternativeText" TEXT,
    "codeReviewLink" TEXT,
    "codeReviewAlternativeText" TEXT,
    "whoCallsMe" TEXT,
    "whoAreMyDependencies" TEXT,
    "eqaTestCases" BOOLEAN NOT NULL DEFAULT false,
    "linkToApiListLink" TEXT,
    "linkToApiListAlternativeText" TEXT,
    "notes" TEXT,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SME" (
    "applicationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SME_pkey" PRIMARY KEY ("applicationId","userId")
);

-- CreateTable
CREATE TABLE "QueueManager" (
    "id" SERIAL NOT NULL,
    "manager" TEXT NOT NULL,
    "port" INTEGER,
    "svrChannel" TEXT,
    "clustered" BOOLEAN NOT NULL,
    "ipAddress" TEXT,
    "vip" TEXT,
    "drVip" TEXT,
    "drIp" TEXT,
    "rfhUtilLink" TEXT,
    "environment" "Environment" NOT NULL,
    "runsHere" INTEGER,

    CONSTRAINT "QueueManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationQueueManager" (
    "applicationId" INTEGER NOT NULL,
    "queueManagerId" INTEGER NOT NULL,

    CONSTRAINT "ApplicationQueueManager_pkey" PRIMARY KEY ("applicationId","queueManagerId")
);

-- CreateTable
CREATE TABLE "MQVersion" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL,
    "queueManagerId" INTEGER NOT NULL,

    CONSTRAINT "MQVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalPartner" (
    "id" SERIAL NOT NULL,
    "partner" TEXT NOT NULL,
    "queueManagerId" INTEGER NOT NULL,

    CONSTRAINT "ExternalPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "port" INTEGER,
    "webUi" TEXT,
    "webUiAlternative" TEXT,
    "environment" "Environment" NOT NULL,
    "isName" INTEGER,
    "upgradedDate" TIMESTAMP(3),

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationNode" (
    "applicationId" INTEGER NOT NULL,
    "nodeId" INTEGER NOT NULL,

    CONSTRAINT "ApplicationNode_pkey" PRIMARY KEY ("applicationId","nodeId")
);

-- CreateTable
CREATE TABLE "ACEVersion" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL,
    "nodeId" INTEGER NOT NULL,

    CONSTRAINT "ACEVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalPartnerVersion" (
    "id" INTEGER NOT NULL,
    "externalPartnerId" INTEGER NOT NULL,
    "versionNumber" TEXT NOT NULL,
    "description" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExternalPartnerVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SME" ADD CONSTRAINT "SME_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SME" ADD CONSTRAINT "SME_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationQueueManager" ADD CONSTRAINT "ApplicationQueueManager_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationQueueManager" ADD CONSTRAINT "ApplicationQueueManager_queueManagerId_fkey" FOREIGN KEY ("queueManagerId") REFERENCES "QueueManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MQVersion" ADD CONSTRAINT "MQVersion_queueManagerId_fkey" FOREIGN KEY ("queueManagerId") REFERENCES "QueueManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPartner" ADD CONSTRAINT "ExternalPartner_queueManagerId_fkey" FOREIGN KEY ("queueManagerId") REFERENCES "QueueManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationNode" ADD CONSTRAINT "ApplicationNode_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationNode" ADD CONSTRAINT "ApplicationNode_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ACEVersion" ADD CONSTRAINT "ACEVersion_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPartnerVersion" ADD CONSTRAINT "ExternalPartnerVersion_externalPartnerId_fkey" FOREIGN KEY ("externalPartnerId") REFERENCES "ExternalPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
