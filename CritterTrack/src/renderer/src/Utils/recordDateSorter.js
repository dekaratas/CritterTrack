// Helper function to compare records based on date
const compareDates = (recordA, recordB) => {
  const dateA = new Date(recordA.date)
  const dateB = new Date(recordB.date)

  if (dateA > dateB) return -1
  if (dateA < dateB) return 1
  return 0
}

// Function to sort records by date
const sortRecordsByDate = (records) => {
  return [...records].sort(compareDates)
}

export default sortRecordsByDate
