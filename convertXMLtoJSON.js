import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

// Paths to the XML files
const machinesXmlPath = path.resolve('./assets/data/machines.xml');
const specificationsXmlPath = path.resolve('./assets/data/specifications.xml');

// Paths to the resulting JSON files
const machinesJsonPath = path.resolve('./assets/data/machines.json');
const specificationsJsonPath = path.resolve('./assets/data/specifications.json');

async function convertXmlToJson() {
  try {
    console.log('🔄 Converting Machines XML to JSON...');

    // Convert machines.xml to JSON
    const machinesXml = fs.readFileSync(machinesXmlPath, 'utf-8');
    const machinesResult = await parseStringPromise(machinesXml);
    const machinesArray = machinesResult?.dataroot?.machines || [];

    const machinesData = machinesArray.map((m) => ({
      invID: m.InvID?.[0] || '',
      code: m.Code?.[0] || '',
      description: m.Description?.[0] || '',
      webCode: m.Web_x0020_Code?.[0] || '',
      webDesc: m.Web_x0020_Desc?.[0] || '',
      groups: m.Groups?.[0] || '',
      price: m.Price?.[0] || '',
      manufacturer: m.Manufacturer?.[0] || '',
      model: m.Model?.[0] || '',
      year: m.Year?.[0] || '',
      control: m.Control?.[0] || '',
      location: m.Location?.[0] || '',
      condition: m.Condition?.[0] || '',
      advSpec: m.Adv_x0020_Spec?.[0] || '',
      sold: m.Sold?.[0] || '0',
      offMarket: m.Off_x0020_Market?.[0] || '0',
      createRep: m.Create_x0020_Rep?.[0] || '',
      dontAdvertise: m.dont_advertise?.[0] || '0',
      special: m.Special?.[0] || '0'
    }));

    // Write the machines data to a JSON file
    fs.writeFileSync(machinesJsonPath, JSON.stringify(machinesData, null, 2));
    console.log('✅ Machines XML converted to JSON successfully!');

    // Convert specifications.xml to JSON
    console.log('🔄 Converting Specifications XML to JSON...');
    const specificationsXml = fs.readFileSync(specificationsXmlPath, 'utf-8');
    const specificationsResult = await parseStringPromise(specificationsXml);
    const specsArray = specificationsResult?.dataroot?.specifications || [];

    const specificationsData = specsArray.map((s) => ({
      id: s.id?.[0] || '',
      invid: s.invid?.[0] || '',
      specid: s.specid?.[0] || '',
      groupnames: s.groupnames?.[0] || '',
      description: s.description?.[0] || '',
      specvalues: s.specvalues?.[0] || '',
      ewid: s.ewid?.[0] || '',
      equippedwith: s.equippedwith?.[0] || '',
      groupnameew: s.groupnameew?.[0] || ''
    }));

    // Write the specifications data to a JSON file
    fs.writeFileSync(specificationsJsonPath, JSON.stringify(specificationsData, null, 2));
    console.log('✅ Specifications XML converted to JSON successfully!');
  } catch (error) {
    console.error('❌ Error parsing XML:', error);
  }
}

// Run the conversion
convertXmlToJson();