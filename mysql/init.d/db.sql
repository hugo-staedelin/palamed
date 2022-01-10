DROP DATABASE IF EXISTS shfr;
CREATE DATABASE shfr;
USE shfr;
CREATE USER 'shfragent'@'localhost' IDENTIFIED BY 'toor';
GRANT FILE ON *.* TO 'shfragent'@'localhost';