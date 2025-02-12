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

    const machinesData = machinesResult.machines.machine.map((m) => ({
      invID: m.invID?.[0] || '',
      code: m.code?.[0] || '',
      description: m.description?.[0] || '',
      webCode: m.webCode?.[0] || '',
      webDesc: m.webDesc?.[0] || '',
      groups: m.groups?.[0] || '',
      manufacturer: m.manufacturer?.[0] || '',
      model: m.model?.[0] || '',
      year: m.year?.[0] || '',
      control: m.control?.[0] || '',
      location: m.location?.[0] || '',
      condition: m.condition?.[0] || '',
      advSpec: m.advSpec?.[0] || '',
      sold: m.sold?.[0] || '0',
      offMarket: m.offMarket?.[0] || '0',
      createRep: m.createRep?.[0] || '',
      dontAdvertise: m.dontAdvertise?.[0] || '0',
      special: m.special?.[0] || '0',
      featOrder: m.featOrder?.[0] || ''
    }));

    // Write the machines data to a JSON file
    fs.writeFileSync(machinesJsonPath, JSON.stringify(machinesData, null, 2));
    console.log('✅ Machines XML converted to JSON successfully!');

    // Convert specifications.xml to JSON
    console.log('🔄 Converting Specifications XML to JSON...');
    const specificationsXml = fs.readFileSync(specificationsXmlPath, 'utf-8');
    const specificationsResult = await parseStringPromise(specificationsXml);

    const specificationsData = specificationsResult.specifications.specification.map((s) => ({
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