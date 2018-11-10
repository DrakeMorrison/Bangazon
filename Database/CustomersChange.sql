/*
   Saturday, November 10, 201810:29:25 AM
   User: 
   Server: DESKTOP-62V0Q5Q
   Database: NewBangazon
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_Customers
	(
	Id int NOT NULL IDENTITY (1, 1),
	ActiveOrder bit NULL,
	FirstName varchar(255) NULL,
	LastName varchar(255) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Customers SET (LOCK_ESCALATION = TABLE)
GO
SET IDENTITY_INSERT dbo.Tmp_Customers ON
GO
IF EXISTS(SELECT * FROM dbo.Customers)
	 EXEC('INSERT INTO dbo.Tmp_Customers (Id, ActiveOrder, FirstName, LastName)
		SELECT Id, ActiveOrder, FirstName, LastName FROM dbo.Customers WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_Customers OFF
GO
ALTER TABLE dbo.Products
	DROP CONSTRAINT FK__Products__Custom__52593CB8
GO
ALTER TABLE dbo.Orders
	DROP CONSTRAINT FK__Orders__Customer__534D60F1
GO
ALTER TABLE dbo.CustomersPaymentTypes
	DROP CONSTRAINT FK__Customers__Custo__5441852A
GO
DROP TABLE dbo.Customers
GO
EXECUTE sp_rename N'dbo.Tmp_Customers', N'Customers', 'OBJECT' 
GO
ALTER TABLE dbo.Customers ADD CONSTRAINT
	PK__Customer__3214EC0723FBB10C PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.Customers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Customers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Customers', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.CustomersPaymentTypes ADD CONSTRAINT
	FK__Customers__Custo__5441852A FOREIGN KEY
	(
	CustomerId
	) REFERENCES dbo.Customers
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CustomersPaymentTypes SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.CustomersPaymentTypes', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.CustomersPaymentTypes', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.CustomersPaymentTypes', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Orders ADD CONSTRAINT
	FK__Orders__Customer__534D60F1 FOREIGN KEY
	(
	CustomerId
	) REFERENCES dbo.Customers
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.Orders SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Orders', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Orders', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Orders', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.Products ADD CONSTRAINT
	FK__Products__Custom__52593CB8 FOREIGN KEY
	(
	CustomerId
	) REFERENCES dbo.Customers
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.Products SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Products', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Products', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Products', 'Object', 'CONTROL') as Contr_Per 