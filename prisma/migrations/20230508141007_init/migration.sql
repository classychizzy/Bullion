-- CreateTable
CREATE TABLE `Employees` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `level` INTEGER NULL,
    `jobTitle` VARCHAR(50) NULL,
    `department` VARCHAR(255) NULL,
    `EmployeeId` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LevelSalary` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `Salary` INTEGER NOT NULL,
    `employeesId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LevelSalary` ADD CONSTRAINT `LevelSalary_employeesId_fkey` FOREIGN KEY (`employeesId`) REFERENCES `Employees`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
