// Team code -> display name + flag emoji. Codes match The Athletic bracket image verbatim
// (note: AUD = Australia, COD = DR Congo, CPV = Cape Verde).
export const TEAMS = {
  GER: { name: 'Germany', flag: '🇩🇪' },
  PAR: { name: 'Paraguay', flag: '🇵🇾' },
  FRA: { name: 'France', flag: '🇫🇷' },
  SWE: { name: 'Sweden', flag: '🇸🇪' },
  RSA: { name: 'South Africa', flag: '🇿🇦' },
  CAN: { name: 'Canada', flag: '🇨🇦' },
  NED: { name: 'Netherlands', flag: '🇳🇱' },
  MAR: { name: 'Morocco', flag: '🇲🇦' },
  POR: { name: 'Portugal', flag: '🇵🇹' },
  CRO: { name: 'Croatia', flag: '🇭🇷' },
  ESP: { name: 'Spain', flag: '🇪🇸' },
  AUT: { name: 'Austria', flag: '🇦🇹' },
  USA: { name: 'United States', flag: '🇺🇸' },
  BIH: { name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
  BEL: { name: 'Belgium', flag: '🇧🇪' },
  SEN: { name: 'Senegal', flag: '🇸🇳' },
  BRA: { name: 'Brazil', flag: '🇧🇷' },
  JPN: { name: 'Japan', flag: '🇯🇵' },
  CIV: { name: 'Ivory Coast', flag: '🇨🇮' },
  NOR: { name: 'Norway', flag: '🇳🇴' },
  MEX: { name: 'Mexico', flag: '🇲🇽' },
  ECU: { name: 'Ecuador', flag: '🇪🇨' },
  ENG: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  COD: { name: 'DR Congo', flag: '🇨🇩' },
  ARG: { name: 'Argentina', flag: '🇦🇷' },
  CPV: { name: 'Cape Verde', flag: '🇨🇻' },
  AUD: { name: 'Australia', flag: '🇦🇺' },
  EGY: { name: 'Egypt', flag: '🇪🇬' },
  SUI: { name: 'Switzerland', flag: '🇨🇭' },
  ALG: { name: 'Algeria', flag: '🇩🇿' },
  COL: { name: 'Colombia', flag: '🇨🇴' },
  GHA: { name: 'Ghana', flag: '🇬🇭' },
}

export function teamName(code) {
  return TEAMS[code]?.name ?? code
}

export function teamFlag(code) {
  return TEAMS[code]?.flag ?? '🏳️'
}
