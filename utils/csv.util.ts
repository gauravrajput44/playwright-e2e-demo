// Calculates the total revenue from a CSV file string
export async function getTotalRevenuefromCsv(csvFile: string): Promise<number> {
  return csvFile
    .split('\n')
    .slice(1) // Skip header row
    .reduce((acc, line) => {
      const values = line.split(',')
      const revenue = values[5] ? Number(values[5]) : 0 // Check if the value exists
      return acc + revenue
    }, 0)
}
