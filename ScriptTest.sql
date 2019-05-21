CREATE TABLE EMPLOYEE
(
	EmpId INT NOT NULL,
    EmpName CHARACTER VARYING (50) NOT NULL,
    DateOfBirth DATE,
    Gender CHARACTER VARYING (3),
	Address TEXT,
	Phone CHARACTER	VARYING (10)
);

ALTER TABLE EMPLOYEE
ADD CONSTRAINT PK_EmpId PRIMARY KEY (EmpId);

SELECT * FROM EMPLOYEE

INSERT INTO EMPLOYEE
VALUES(1,'Huỳnh Thị Phước Minh','1997-10-13','Nữ','Hồ Chí Minh','0932571394')

INSERT INTO EMPLOYEE
VALUES(2,'Nguyễn Văn An','1990-06-20','Nam','Hồ Chí Minh','0912078364')

INSERT INTO EMPLOYEE
VALUES(3,'Trần Thị Quỳnh Hương','1987-02-18','Nữ','Hồ Chí Minh','0967259103')

INSERT INTO EMPLOYEE
VALUES(4,'Trương Tuấn Hưng','1993-10-22','Nam','Vũng Tàu','0912078530')

INSERT INTO EMPLOYEE
VALUES(5,'Lưu Thanh Nhàn','1994-07-08','Nữ','Đồng Nai','0987123942')