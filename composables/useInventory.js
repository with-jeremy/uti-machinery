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

  function getMachineById(invID) {
    return machinesData.find(m => m.invID === invID)
  }

  function getSpecsForMachine(invID) {
    return specsData.filter(s => s.invid === invID)
  }

  return {
    getAllMachines,
    getMachineById,
    getSpecsForMachine
  }
}
