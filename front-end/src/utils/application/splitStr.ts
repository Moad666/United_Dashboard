/**
 * split a string and return unique string values
 * @param {string} str
 * @param {RegExp} regexp
 * @returns {string[]}
 */
function splitStr(str: string, regexp = /,/g): string[] {
  // split the string by the seperator
  const arr = str?.split(regexp)?.map((c) => c.trim())

  // return unique array of names
  return Array.from(new Set(arr))
}

/**
 *  get SMEs from a string
 * @param {string} str
 * @returns {string[]}
 */
export function getSMEsFromStr(str: string): string[] {
  // split the string by the seperator
  return splitStr(str, /;/g)
}

/**
 * get technologies from a string
 * @param {string} str
 * @returns {string[]}
 */
export function getTechnologiesFromStr(str: string): string[] {
  // split the string by the seperator ;
  return splitStr(str, /,/g)
}

/**
 * get links from a string
 * @param {string} str
 * @returns {string[]}
 */
export function getLinksFromStr(str: string): string[] {
  console.log(str)

  // split the string by the seperator ;
  return splitStr(str, / /g)
}
