import { faker } from '@faker-js/faker';
import fs from 'fs';

const dir = './mocks/data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const createPatients = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    patientId: faker.number.int({ min: 1, max: 9999 }),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    patientAge: faker.number.int({ min: 15, max: 80 }),
    patientGender: faker.person.sex(),
    patientRegDate: faker.date.recent(),
    patientMobile1: faker.phone.number(),
    patientMobile2: faker.phone.number(),
    patientMedicalHistory: faker.lorem.sentence(),
    cashierName: faker.person.fullName(),
    patientReports: faker.lorem.sentence(),
    timestamp: faker.date.recent(),
  }));
};

const createProcedures = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    procedureName: faker.lorem.words(),
    procedureDescription: faker.lorem.sentence(),
    procedureCost: faker.number.float({ min: 100, max: 10000, precision: 0.01 }),
    timestamp: faker.date.recent(),
  }));
};

const createUsers = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    timestamp: faker.date.recent(),
  }));
};

const createMedicines = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    medicineName: faker.lorem.words(),
    medicineDescription: faker.lorem.sentence(),
    medicineCost: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
    timestamp: faker.date.recent(),
  }));
};

const createAppointments = () => {
  const appointments = Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    appointmentId: faker.number.int({ min: 1, max: 9999 }),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    treatment: faker.lorem.sentence(),
    startTime: faker.date.recent(),
    appointmentDate: faker.date.recent(),
    patientMobile1: faker.phone.number(),
    cashierName: faker.person.firstName(),
    timestamp: faker.date.recent(),
  }));
  console.log(appointments); // Debugging statement to check generated data
  return appointments;
};

const procedures = createProcedures();
const patients = createPatients();
const users = createUsers();
const medicines = createMedicines();
const appointments = createAppointments();

const jsonData = JSON.stringify({ patients, procedures, users, medicines, appointments }, null, 2);

if (fs.existsSync(`${dir}/db.json`)) {
  console.log('db.json already exists!');
} else {
  fs.writeFileSync(`${dir}/db.json`, jsonData);
  console.log('db.json has been created with the following data:', jsonData); // Debugging statement to check written data
}