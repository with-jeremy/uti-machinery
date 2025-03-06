// ~/composables/useInventory.js
import machinesData from '~/assets/data/machines.json'
import specsData from '~/assets/data/specifications.json'

export function useInventory() {
  /**
   * We have raw arrays from .json imports:
   * machinesData = [{invID, manufacturer, ...}, ...]
   * specsData =    [{invid, description, specvalues, ...}, ...]
   *
   * Provide some helper methods for the rest of the app.
   */
  function getAllMachines() {
    // Return them sorted by e.g. year desc, or do no sorting. Up to you.
    return machinesData
  }

  function getFeatured() {
    return machinesData.filter(m => m.Special === 1)
  }

  function getMachineById(InvID) {
    return machinesData.find(m => m.InvID === InvID)
  }

  function getSpecsForMachine(InvID) {
    return specsData.filter(s => s.invid === InvID)
  }

  function getBrandNames() {
    return [...new Set(machinesData.map(m => m.Manufacturer))].sort();
  }

  function getMachineTypes() {
    return [...new Set(machinesData.map(m => m.WebDesc))].sort();
  }

  return {
    getAllMachines,
    getFeatured,
    getMachineById,
    getSpecsForMachine,
    getBrandNames,
    getMachineTypes
  }
}
