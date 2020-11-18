


export default {
  SET_WORKERS (state, brands) {
    state.workerList = brands
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.workerList.findIndex((u) => u.id === itemId)
    state.workerList.splice(userIndex, 1)
  }
}
