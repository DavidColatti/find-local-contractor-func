const { arrayToCsvFile } = require("csv-to-and-from-array");
const registeredContractors = require("./registered-contractors.json");
const localApplicants = require("./local-applicants.json");

const findLocalContractor = () => {
  const foundContractors = [];

  for (let applicant of localApplicants) {
    const { last_name, address } = applicant;
    const lastName = last_name.toLowerCase();
    const streetAddress = address.toLowerCase();

    for (let contractor of registeredContractors) {
      const contractorValues = Object.values(contractor).join("").toLowerCase();

      const addressIsInValues = contractorValues.includes(streetAddress);
      const lastNameIsInValues = contractorValues.includes(lastName);

      if (addressIsInValues && lastNameIsInValues) {
        const data = {
          name: contractor.name,
          company_name: contractor.company_name,
          address: applicant.address,
          city: applicant.city,
          phone_number: applicant.phone_number,
          lic_type: applicant.lic_type,
          lic_number: contractor.lic_number,
          registered_date: contractor.registered_data,
        };

        foundContractors.push(data);
      }
    }
  }

  arrayToCsvFile({
    data: foundContractors,
    filePath: "output.csv",
    callback: () => console.log(`Found ${foundContractors.length} contractors`),
  });
};

findLocalContractor();
