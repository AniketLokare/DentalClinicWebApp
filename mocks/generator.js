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

const patients = createPatients();
const jsonData = JSON.stringify({ patients }, null, 2);

if (fs.existsSync(`${dir}/db.json`)) {
  console.log('db.json already exists!');
} else {
  fs.writeFile(`${dir}/db.json`, jsonData, 'utf8', (err) => {
    console.log(err || 'db.json generated successfully!');
  });
}
