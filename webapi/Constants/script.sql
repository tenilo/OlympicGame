USE [OlympicBD]
GO
/****** Object:  UserDefinedTableType [dbo].[CommandTableType]    Script Date: 31/05/2024 15:58:14 ******/
CREATE TYPE [dbo].[CommandTableType] AS TABLE(
	[offerId] [int] NULL,
	[quantity] [int] NULL
)
GO
/****** Object:  Table [dbo].[command]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[command](
	[commandId] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NULL,
	[creationDate] [datetime] NULL,
	[userId] [int] NULL,
	[offerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[commandId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[facture]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[facture](
	[num_facture] [int] IDENTITY(1,1) NOT NULL,
	[creationDate] [datetime] NULL,
	[total] [float] NULL,
	[description] [varchar](max) NULL,
	[userId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[num_facture] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[offers]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[offers](
	[offerId] [int] IDENTITY(1,1) NOT NULL,
	[type] [varchar](100) NULL,
	[access] [int] NULL,
	[price] [float] NULL,
	[description] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[offerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[offres]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[offres](
	[offreId] [int] IDENTITY(1,1) NOT NULL,
	[type] [varchar](100) NULL,
	[access] [int] NULL,
	[price] [float] NULL,
	[description] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[offreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[qrCode]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[qrCode](
	[qrCodeId] [int] IDENTITY(1,1) NOT NULL,
	[firstKey] [varchar](max) NULL,
	[secondKey] [varchar](max) NULL,
	[finalKey] [varchar](max) NULL,
	[userId] [int] NULL,
	[creationDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[qrCodeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](100) NULL,
	[lastName] [varchar](100) NULL,
	[userName] [varchar](100) NULL,
	[email] [varchar](max) NULL,
	[isAdmin] [bit] NULL,
	[passWordHash] [varbinary](max) NULL,
	[passWordSalt] [varbinary](max) NULL,
	[creationDate] [datetime] NULL,
	[address] [varchar](500) NULL,
	[phone] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[command]  WITH CHECK ADD  CONSTRAINT [FK_commandTicketId] FOREIGN KEY([offerId])
REFERENCES [dbo].[offers] ([offerId])
GO
ALTER TABLE [dbo].[command] CHECK CONSTRAINT [FK_commandTicketId]
GO
ALTER TABLE [dbo].[command]  WITH CHECK ADD  CONSTRAINT [FK_commandUserId] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[command] CHECK CONSTRAINT [FK_commandUserId]
GO
ALTER TABLE [dbo].[facture]  WITH CHECK ADD  CONSTRAINT [FK_factureUserId] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[facture] CHECK CONSTRAINT [FK_factureUserId]
GO
ALTER TABLE [dbo].[qrCode]  WITH CHECK ADD  CONSTRAINT [FK_qrCodeUserId] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[qrCode] CHECK CONSTRAINT [FK_qrCodeUserId]
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateClient]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateClient]
       @firstName VARCHAR(100),
       @lastName VARCHAR(100),
       @userName VARCHAR(100),
       @email VARCHAR(max),
       @passWordHash varbinary(max),
       @passWordSalt varbinary(max)
As 
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
insert into users(firstName,lastName,userName,email,isAdmin,passWordHash,passWordSalt,creationDate)
values(@firstName,@lastName,@userName,@email,0,@passWordHash,@passWordSalt, GETDATE())
declare @userId int
declare @firstKey VARCHAR(max)
select @firstKey = cast(NEWID() as VARCHAR(100))+ @firstName 
set @userId = (select top 1 userId from users order by userId desc)
insert into qrCode(firstKey,secondKey,finalKey,userId)
values(@firstKey,null,null,@userId)
END TRY
BEGIN CATCH
 IF (@@TRANCOUNT > 0)
    ROLLBACK TRANSACTION
END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION;  
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateNewCommand]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateNewCommand]
       @userId int,
       @resume VARCHAR(max),
       @creationDate datetime,
       @total float,
       @commandTableType CommandTableType READONLY
	   
       
As 
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
insert into command(
quantity,
creationDate,
userId,
offerId)
select
ctt.quantity,
@creationDate,
@userId,
ctt.offerId
from @commandTableType as ctt

insert into facture(
creationDate,
total,
description,
userId)
values(@creationDate,@total,@resume,@userId)
declare @lastName VARCHAR(100)
declare @secondKey VARCHAR(max)
declare @finalKey VARCHAR(max)
select @lastName = lastname from users where userId = @userId
select @secondKey = cast(NEWID() as VARCHAR(100))+ @lastName
update qrCode
set secondKey = @secondKey,
    creationDate = @creationDate
where userId = @userId

set @finalKey = (select (firstKey + secondKey) from qrCode where userId = @userId)
update qrCode
set finalKey = @finalKey
where userId = @userId

END TRY
BEGIN CATCH
 IF (@@TRANCOUNT > 0)
    ROLLBACK TRANSACTION
	PRINT 'Une erreur s''est produite lors de l'' enregistrement de la commande ';  
    THROW; 
END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION;  
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateOffre]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateOffre]
      @type VARCHAR(100),
	   @description VARCHAR(100),
	   @price float,
	   @access int
As 
BEGIN
 insert into offers (type,access,price,description) values (@type,@access,@price,@description)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateUser]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateUser]
       @firstName VARCHAR(100),
       @lastName VARCHAR(100),
       @userName VARCHAR(100),
       @email VARCHAR(max),
       @passWordHash varbinary(max),
       @passWordSalt varbinary(max)
As 
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
insert into users(firstName,lastName,userName,email,isAdmin,passWordHash,passWordSalt,creationDate)
values(@firstName,@lastName,@userName,@email,0,@passWordHash,@passWordSalt, GETDATE())
declare @userId int
declare @firstKey VARCHAR(max)
select @firstKey = cast(NEWID() as VARCHAR(100))+ @firstName 
set @userId = (select top 1 userId from users order by userId desc)
insert into qrCode(firstKey,secondKey,finalKey,userId)
values(@firstKey,null,null,@userId)
END TRY
BEGIN CATCH
 IF (@@TRANCOUNT > 0)
    ROLLBACK TRANSACTION
END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION;  
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteOffre]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteOffre]
       @offerId int
      
As 
BEGIN
delete from command where offerId = @offerId
delete from offers where offerId = @offerId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllOffres]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllOffres]
As 
BEGIN
	
	SELECT * from offers
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetHistoCommand]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetHistoCommand] 
AS
BEGIN
	SELECT tc.type as type,tc.price as price ,sum(com.quantity) as quantity 
	from command as com
    left join offers as tc on tc.offerId = com.offerId
	group by tc.type,tc.price
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetOffre]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetOffre]
       @offerId int
      
As 
BEGIN
select * from offers where offerId = @offerId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQrCode]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetQrCode]
        @userId int
AS
BEGIN
	SELECT 
	qr.qrCodeId,
	qr.firstKey,
	qr.secondKey,
	qr.finalKey,
	fac.description as CommandResume
   from qrCode qr 
	inner join facture fac on fac.userId = qr.userId and fac.creationDate = qr.creationDate
	where qr.userId = @userId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUsers]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetUsers]
       
As 
BEGIN
select * from users  
END

GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateOffre]    Script Date: 31/05/2024 15:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateOffre]
       @offerId int,
       @type VARCHAR(100),
	   @description VARCHAR(100),
	   @price float,
	   @access int
As 
BEGIN
update offers
set type = @type,
description = @description,
price = @price,
access = @access
where offerId = @offerId
END
GO
